// 支付回调 API
import { Hono } from 'hono';
import { updateOrderStatus, getOrderById } from '../db';
import { sendOrderNotification } from '../email';

export const paymentsRouter = new Hono();

// 微信支付回调
paymentsRouter.post('/wechat/notify', async (c) => {
  try {
    const body = await c.req.text();
    console.log('微信支付回调:', body);
    
    // TODO: 验证微信支付签名
    // 解析支付结果
    const paymentResult = JSON.parse(body);
    const { out_trade_no: orderId, trade_state } = paymentResult;
    
    if (trade_state !== 'SUCCESS') {
      return c.text('FAIL');
    }
    
    // 更新订单状态
    await updateOrderStatus(c.env.DB, orderId, 'paid', 'wechat');
    
    // 获取订单信息
    const order = await getOrderById(c.env.DB, orderId);
    if (order) {
      // 发送 SendGrid 通知邮件给管理员
      try {
        await sendOrderNotification(c.env, order);
      } catch (emailError) {
        console.error('发送通知邮件失败:', emailError);
        // 邮件发送失败不影响订单状态
      }
    }
    
    return c.text('SUCCESS');
    
  } catch (error) {
    console.error('微信支付回调处理失败:', error);
    return c.text('FAIL');
  }
});

// 支付宝回调
paymentsRouter.post('/alipay/notify', async (c) => {
  try {
    const body = await c.req.formData();
    console.log('支付宝回调:', body);
    
    // TODO: 验证支付宝签名
    const orderId = body.get('out_trade_no') as string;
    const tradeStatus = body.get('trade_status');
    
    if (tradeStatus !== 'TRADE_SUCCESS') {
      return c.text('fail');
    }
    
    // 更新订单状态
    await updateOrderStatus(c.env.DB, orderId, 'paid', 'alipay');
    
    // 获取订单信息
    const order = await getOrderById(c.env.DB, orderId);
    if (order) {
      // 发送 SendGrid 通知邮件给管理员
      try {
        await sendOrderNotification(c.env, order);
      } catch (emailError) {
        console.error('发送通知邮件失败:', emailError);
      }
    }
    
    return c.text('success');
    
  } catch (error) {
    console.error('支付宝回调处理失败:', error);
    return c.text('fail');
  }
});

// 查询支付状态
paymentsRouter.get('/status/:orderId', async (c) => {
  try {
    const orderId = c.req.param('orderId');
    const order = await getOrderById(c.env.DB, orderId);
    
    if (!order) {
      return c.json({ error: '订单不存在' }, 404);
    }
    
    return c.json({
      order_id: order.id,
      status: order.status,
      payment_method: order.payment_method,
      payment_time: order.payment_time
    });
    
  } catch (error) {
    console.error('查询支付状态失败:', error);
    return c.json({ error: '查询失败' }, 500);
  }
});
