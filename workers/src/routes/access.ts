// 文档访问验证 API
import { Hono } from 'hono';
import { getOrderByToken, recordAccess } from '../db';

export const accessRouter = new Hono();

// 验证访问令牌
accessRouter.get('/verify', async (c) => {
  try {
    const token = c.req.query('token');
    const password = c.req.query('password');
    
    if (!token || !password) {
      return c.json({ 
        valid: false, 
        error: '缺少 token 或 password' 
      }, 400);
    }
    
    // 查询订单
    const order = await getOrderByToken(c.env.DB, token);
    
    if (!order) {
      return c.json({ valid: false, error: '无效的访问令牌' }, 404);
    }
    
    // 验证密码
    if (order.access_password !== password) {
      return c.json({ valid: false, error: '访问密码错误' }, 401);
    }
    
    // 验证订单状态
    if (order.status === 'pending') {
      return c.json({ valid: false, error: '订单尚未支付' }, 403);
    }
    
    // 记录访问
    await recordAccess(c.env.DB, token);
    
    // 生成 R2 预签名 URL（临时访问链接）
    const documentUrls = await generateDocumentUrls(c.env.BUCKET, order.package_type);
    
    return c.json({
      valid: true,
      package: order.package_type,
      documents: documentUrls,
      expires_in: 86400 // 24 小时过期
    });
    
  } catch (error) {
    console.error('验证访问失败:', error);
    return c.json({ valid: false, error: '验证失败' }, 500);
  }
});

// 记录访问
accessRouter.post('/record', async (c) => {
  try {
    const { token } = await c.req.json();
    await recordAccess(c.env.DB, token);
    return c.json({ success: true });
  } catch (error) {
    console.error('记录访问失败:', error);
    return c.json({ error: '记录失败' }, 500);
  }
});

/**
 * 生成文档预签名 URL
 */
async function generateDocumentUrls(bucket: R2Bucket, packageType: string): Promise<any> {
  // 根据套餐类型返回不同的文档列表
  const documents = {
    basic: {
      templates: [
        '01_quality_policy.docx',
        '02_quality_objectives.docx',
        '03_quality_manual.docx',
        // ... 更多文档
      ],
      guides: ['implementation_guide_basic.pdf']
    },
    standard: {
      templates: [
        '01_quality_policy.docx',
        '02_quality_objectives.docx',
        '03_quality_manual.docx',
        // ... 61 个文档
      ],
      guides: ['implementation_guide_full.pdf']
    },
    premium: {
      templates: [
        '01_quality_policy.docx',
        '02_quality_objectives.docx',
        '03_quality_manual.docx',
        // ... 61 个文档
      ],
      guides: ['implementation_guide_full.pdf', 'case_studies.pdf']
    }
  };
  
  const pkg = documents[packageType as keyof typeof documents];
  
  // 生成预签名 URL（24 小时有效期）
  const templateUrls = await Promise.all(
    pkg.templates.map(async (filename: string) => {
      const url = await bucket.createSignedUrl(`templates/${filename}`, {
        expiresIn: 86400
      });
      return { filename, url };
    })
  );
  
  const guideUrls = await Promise.all(
    pkg.guides.map(async (filename: string) => {
      const url = await bucket.createSignedUrl(`guides/${filename}`, {
        expiresIn: 86400
      });
      return { filename, url };
    })
  );
  
  return {
    templates: templateUrls,
    guides: guideUrls
  };
}
