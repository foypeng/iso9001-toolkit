// Workers 入口文件
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { ordersRouter } from './routes/orders';
import { paymentsRouter } from './routes/payments';
import { accessRouter } from './routes/access';
import { adminRouter } from './routes/admin';

const app = new Hono();

// 全局 CORS 中间件
app.use('/*', cors());

// 健康检查
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 路由注册
app.route('/api/orders', ordersRouter);
app.route('/api/payments', paymentsRouter);
app.route('/api/access', accessRouter);
app.route('/api/admin', adminRouter);

// 404 处理
app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404);
});

// 错误处理
app.onError((err, c) => {
  console.error('Error:', err);
  return c.json({ error: 'Internal Server Error' }, 500);
});

export default app;
