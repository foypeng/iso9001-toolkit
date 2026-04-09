// SendGrid 邮件发送工具
import { Env } from './index';
import { Order } from './db';

/**
 * 发送订单通知邮件给管理员
 */
export async function sendOrderNotification(env: Env, order: Order): Promise<void> {
  const message = {
    personalizations: [
      {
        to: [{ email: env.ADMIN_EMAIL }],
        subject: `🎉 新订单通知 - ¥${order.amount} - ${getPackageName(order.package_type)}`
      }
    ],
    from: {
      email: env.SENDGRID_FROM_EMAIL,
      name: 'ISO 9001 工具包系统'
    },
    content: [
      {
        type: 'text/html',
        value: createOrderNotificationHtml(order)
      }
    ]
  };

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('SendGrid 发送失败:', response.status, errorText);
    throw new Error(`SendGrid API error: ${response.status}`);
  }

  console.log(`订单通知邮件已发送至：${env.ADMIN_EMAIL}`);
}

/**
 * 获取套餐中文名称
 */
function getPackageName(packageType: string): string {
  const names: Record<string, string> = {
    basic: '基础版',
    standard: '标准版',
    premium: '专业版'
  };
  return names[packageType] || packageType;
}

/**
 * 创建订单通知邮件 HTML 内容
 */
function createOrderNotificationHtml(order: Order): string {
  const packageName = getPackageName(order.package_type);
  const adminUrl = `https://admin.${process.env.DOMAIN || 'yourdomain.com'}/orders/${order.id}`;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #007bff; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }
    .order-info { background: white; padding: 15px; border-radius: 5px; margin: 15px 0; }
    .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
    .info-row:last-child { border-bottom: none; }
    .label { color: #666; }
    .value { font-weight: bold; }
    .amount { color: #e74c3c; font-size: 18px; }
    .btn { display: inline-block; background: #007bff; color: white; padding: 12px 24px; 
           text-decoration: none; border-radius: 5px; margin-top: 15px; }
    .footer { color: #999; font-size: 12px; margin-top: 20px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 新订单通知</h1>
    </div>
    <div class="content">
      <p>您好，</p>
      <p>收到一笔新的 ISO 9001 文档工具包订单，请及时处理。</p>
      
      <div class="order-info">
        <div class="info-row">
          <span class="label">订单号：</span>
          <span class="value">${order.id}</span>
        </div>
        <div class="info-row">
          <span class="label">客户邮箱：</span>
          <span class="value">${order.email}</span>
        </div>
        <div class="info-row">
          <span class="label">购买套餐：</span>
          <span class="value">${packageName}</span>
        </div>
        <div class="info-row">
          <span class="label">订单金额：</span>
          <span class="value amount">¥${order.amount}</span>
        </div>
        <div class="info-row">
          <span class="label">支付时间：</span>
          <span class="value">${order.payment_time || '-'}</span>
        </div>
        <div class="info-row">
          <span class="label">支付渠道：</span>
          <span class="value">${order.payment_method === 'wechat' ? '微信支付' : order.payment_method === 'alipay' ? '支付宝' : '-'}</span>
        </div>
      </div>
      
      <a href="${adminUrl}" class="btn">登录管理后台发送邮件 →</a>
      
      <div class="footer">
        <p>这是系统自动发送的订单通知邮件，请勿回复。</p>
        <p>ISO 9001 文档工具包系统</p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}
