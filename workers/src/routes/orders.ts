// 订单相关 API
import { Hono } from 'hono';
import { createOrder, getOrderById } from '../db';

export const ordersRouter = new Hono();

// 价格配置
const PRICES = {
  basic: 369,
  standard: 669,
  premium: 969
};

// 创建订单
ordersRouter.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const { email, package: packageType } = body;
    
    // 参数验证
    if (!email || !packageType) {
      return c.json({ error: '缺少必要参数：email 和 package' }, 400);
    }
    
    if (!['basic', 'standard', 'premium'].includes(packageType)) {
      return c.json({ error: '无效的套餐类型' }, 400);
    }
    
    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: '无效的邮箱格式' }, 400);
    }
    
    // 生成订单号
    const orderId = `ORD${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    const amount = PRICES[packageType as keyof typeof PRICES];
    
    // 创建订单
    await createOrder(c.env.DB, {
      id: orderId,
      email,
      package_type: packageType as 'basic' | 'standard' | 'premium',
      amount,
      status: 'pending',
      created_at: new Date().toISOString()
    });
    
    // 返回订单信息和支付参数
    return c.json({
      order_id: orderId,
      email,
      package: packageType,
      amount,
      payment_params: {
        // 这里返回支付所需的参数
        // 实际项目中需要调用微信支付/支付宝 API 获取
        wechat: {
          // 微信支付参数
        },
        alipay: {
          // 支付宝参数
        }
      }
    });
    
  } catch (error) {
    console.error('创建订单失败:', error);
    return c.json({ error: '创建订单失败' }, 500);
  }
});

// 查询订单状态
ordersRouter.get('/:id', async (c) => {
  try {
    const orderId = c.req.param('id');
    const order = await getOrderById(c.env.DB, orderId);
    
    if (!order) {
      return c.json({ error: '订单不存在' }, 404);
    }
    
    // 返回订单信息（隐藏敏感字段）
    return c.json({
      order_id: order.id,
      email: order.email,
      package_type: order.package_type,
      amount: order.amount,
      status: order.status,
      payment_method: order.payment_method,
      payment_time: order.payment_time,
      created_at: order.created_at
    });
    
  } catch (error) {
    console.error('查询订单失败:', error);
    return c.json({ error: '查询订单失败' }, 500);
  }
});
