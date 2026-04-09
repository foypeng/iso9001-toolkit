-- ISO 9001 Toolkit 数据库 Schema

-- 订单表
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    package_type TEXT NOT NULL CHECK(package_type IN ('basic', 'standard', 'premium')),
    amount REAL NOT NULL,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'paid', 'sent', 'completed', 'refunded')),
    
    payment_method TEXT CHECK(payment_method IN ('wechat', 'alipay')),
    payment_time DATETIME,
    
    -- 访问凭证
    access_token TEXT UNIQUE,
    access_password TEXT,
    access_generated_at DATETIME,
    
    -- SendGrid 通知记录
    admin_notified_at DATETIME,
    admin_notified_status TEXT,
    admin_notified_error TEXT,
    
    -- 手动发送记录
    email_sent_at DATETIME,
    email_sent_by TEXT,
    admin_notes TEXT,
    
    -- 客户访问记录
    first_access_at DATETIME,
    last_access_at DATETIME,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_token ON orders(access_token);

-- 咨询表（标准版/专业版）
CREATE TABLE IF NOT EXISTS consultations (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'replied', 'closed')),
    reply_content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    replied_at DATETIME,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE INDEX IF NOT EXISTS idx_consultations_order ON consultations(order_id);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
