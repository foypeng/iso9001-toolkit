// 数据库操作工具函数
import { Env } from './index';

export interface Order {
  id: string;
  email: string;
  package_type: 'basic' | 'standard' | 'premium';
  amount: number;
  status: string;
  payment_method?: string;
  payment_time?: string;
  access_token?: string;
  access_password?: string;
  created_at: string;
}

// 创建订单
export async function createOrder(db: D1Database, order: Order): Promise<void> {
  await db.run(
    `INSERT INTO orders (id, email, package_type, amount, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [order.id, order.email, order.package_type, order.amount, order.status, order.created_at]
  );
}

// 根据 ID 查询订单
export async function getOrderById(db: D1Database, id: string): Promise<Order | null> {
  const result = await db.prepare('SELECT * FROM orders WHERE id = ?').bind(id).first();
  return result as Order | null;
}

// 根据邮箱查询订单
export async function getOrdersByEmail(db: D1Database, email: string): Promise<Order[]> {
  const result = await db.prepare('SELECT * FROM orders WHERE email = ? ORDER BY created_at DESC')
    .bind(email)
    .all();
  return result.results as Order[];
}

// 更新订单状态
export async function updateOrderStatus(
  db: D1Database,
  id: string,
  status: string,
  paymentMethod?: string
): Promise<void> {
  const paymentTime = paymentMethod ? new Date().toISOString() : null;
  
  await db.run(
    `UPDATE orders 
     SET status = ?, payment_method = ?, payment_time = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [status, paymentMethod, paymentTime, id]
  );
}

// 生成访问凭证
export async function generateAccessCredentials(
  db: D1Database,
  id: string,
  token: string,
  password: string
): Promise<void> {
  await db.run(
    `UPDATE orders 
     SET access_token = ?, access_password = ?, access_generated_at = CURRENT_TIMESTAMP,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [token, password, id]
  );
}

// 根据 token 查询订单
export async function getOrderByToken(db: D1Database, token: string): Promise<Order | null> {
  const result = await db.prepare('SELECT * FROM orders WHERE access_token = ?').bind(token).first();
  return result as Order | null;
}

// 记录客户访问
export async function recordAccess(db: D1Database, token: string): Promise<void> {
  await db.run(
    `UPDATE orders 
     SET first_access_at = COALESCE(first_access_at, CURRENT_TIMESTAMP),
         last_access_at = CURRENT_TIMESTAMP,
         updated_at = CURRENT_TIMESTAMP
     WHERE access_token = ?`,
    [token]
  );
}

// 获取所有订单（管理后台）
export async function getAllOrders(db: D1Database, status?: string): Promise<Order[]> {
  let query = 'SELECT * FROM orders ORDER BY created_at DESC';
  const params: any[] = [];
  
  if (status) {
    query = 'SELECT * FROM orders WHERE status = ? ORDER BY created_at DESC';
    params.push(status);
  }
  
  const result = await db.prepare(query).bind(...params).all();
  return result.results as Order[];
}
