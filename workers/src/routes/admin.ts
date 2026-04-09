// 管理后台 API
import { Hono } from 'hono';
import { getAllOrders, getOrderById, generateAccessCredentials, updateOrderStatus } from '../db';

export const adminRouter = new Hono();

// 简单的认证中间件（实际项目中应使用更安全的认证方式）
const authMiddleware = async (c: any, next: any) => {
  const authHeader = c.req.header('Authorization');
  const adminToken = c.env.ADMIN_TOKEN || 'admin123'; // 应从环境变量读取
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: '未授权' }, 401);
  }
  
  const token = authHeader.split(' ')[1];
  if (token !== adminToken) {
    return c.json({ error: '令牌无效' }, 401);
  }
  
  await next();
};

// 应用认证中间件
adminRouter.use('/*', authMiddleware);

// 获取订单列表
adminRouter.get('/orders', async (c) => {
  try {
    const status = c.req.query('status');
    const orders = await getAllOrders(c.env.DB, status);
    
    return c.json({
      total: orders.length,
      orders: orders.map(order => ({
        id: order.id,
        email: order.email,
        package_type: order.package_type,
        amount: order.amount,
        status: order.status,
        payment_method: order.payment_method,
        payment_time: order.payment_time,
        created_at: order.created_at
      }))
    });
  } catch (error) {
    console.error('获取订单列表失败:', error);
    return c.json({ error: '获取订单失败' }, 500);
  }
});

// 获取订单详情
adminRouter.get('/orders/:id', async (c) => {
  try {
    const orderId = c.req.param('id');
    const order = await getOrderById(c.env.DB, orderId);
    
    if (!order) {
      return c.json({ error: '订单不存在' }, 404);
    }
    
    return c.json({
      order: {
        ...order,
        admin_notified_at: order.admin_notified_at,
        email_sent_at: order.email_sent_at,
        first_access_at: order.first_access_at,
        last_access_at: order.last_access_at,
        admin_notes: order.admin_notes
      }
    });
  } catch (error) {
    console.error('获取订单详情失败:', error);
    return c.json({ error: '获取订单失败' }, 500);
  }
});

// 生成访问链接
adminRouter.post('/orders/:id/generate', async (c) => {
  try {
    const orderId = c.req.param('id');
    const order = await getOrderById(c.env.DB, orderId);
    
    if (!order) {
      return c.json({ error: '订单不存在' }, 404);
    }
    
    // 生成 token 和密码
    const token = `tok_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`;
    const password = Math.random().toString(36).substr(2, 8).toUpperCase();
    
    // 保存到数据库
    await generateAccessCredentials(c.env.DB, orderId, token, password);
    
    const accessUrl = `https://${c.env.DOMAIN}/access?token=${token}&password=${password}`;
    
    return c.json({
      success: true,
      access_token: token,
      access_password: password,
      access_url: accessUrl
    });
  } catch (error) {
    console.error('生成访问链接失败:', error);
    return c.json({ error: '生成失败' }, 500);
  }
});

// 标记订单完成
adminRouter.post('/orders/:id/complete', async (c) => {
  try {
    const orderId = c.req.param('id');
    const { note } = await c.req.json();
    
    // 更新订单状态和备注
    await c.env.DB.run(
      `UPDATE orders 
       SET status = 'completed', email_sent_at = CURRENT_TIMESTAMP, 
           admin_notes = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [note || '已手动发送邮件', orderId]
    );
    
    return c.json({ success: true });
  } catch (error) {
    console.error('标记订单完成失败:', error);
    return c.json({ error: '更新失败' }, 500);
  }
});

// 获取统计数据
adminRouter.get('/stats', async (c) => {
  try {
    const stats = await c.env.DB.prepare(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) as paid,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN package_type = 'basic' THEN amount ELSE 0 END) as basic_revenue,
        SUM(CASE WHEN package_type = 'standard' THEN amount ELSE 0 END) as standard_revenue,
        SUM(CASE WHEN package_type = 'premium' THEN amount ELSE 0 END) as premium_revenue
      FROM orders
    `).first();
    
    return c.json({ stats });
  } catch (error) {
    console.error('获取统计数据失败:', error);
    return c.json({ error: '获取统计失败' }, 500);
  }
});
