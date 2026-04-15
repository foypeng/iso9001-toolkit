// 前端 JavaScript
let selectedPackage = '';
let selectedPackagePrice = 0;

const PACKAGE_PRICES = {
  basic: 369,
  standard: 669,
  premium: 969
};

const PACKAGE_NAMES = {
  basic: '基础版',
  standard: '标准版',
  premium: '专业版'
};

// 选择套餐
function selectPackage(packageType) {
  selectedPackage = packageType;
  selectedPackagePrice = PACKAGE_PRICES[packageType];
  
  // 更新弹窗内容
  document.getElementById('selectedPackage').textContent = 
    `${PACKAGE_NAMES[packageType]} (¥${selectedPackagePrice})`;
  
  // 显示弹窗
  document.getElementById('purchaseModal').style.display = 'block';
}

// 关闭弹窗
function closeModal() {
  document.getElementById('purchaseModal').style.display = 'none';
}

// 点击弹窗外部关闭
window.onclick = function(event) {
  const modal = document.getElementById('purchaseModal');
  if (event.target === modal) {
    closeModal();
  }
}

// 处理购买表单提交
async function handlePurchase(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const payment = document.querySelector('input[name="payment"]:checked').value;
  
  if (!selectedPackage) {
    alert('请选择套餐');
    return;
  }
  
  // 禁用按钮，防止重复提交
  const submitBtn = event.target.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = '处理中...';
  
  try {
    // 创建订单
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        package: selectedPackage
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || '创建订单失败');
    }
    
    // 保存订单号到 localStorage
    localStorage.setItem('currentOrderId', data.order_id);
    
    // 跳转到支付页面
    redirectToPayment(data, payment);
    
  } catch (error) {
    alert('创建订单失败：' + error.message);
    submitBtn.disabled = false;
    submitBtn.textContent = '提交订单';
  }
}

// 跳转到支付
function redirectToPayment(orderData, paymentMethod) {
  // 实际项目中这里应该跳转到支付页面或调用支付 SDK
  // 现在先显示提示信息
  alert(
    `订单创建成功！\n\n` +
    `订单号：${orderData.order_id}\n` +
    `金额：¥${orderData.amount}\n` +
    `支付方式：${paymentMethod === 'wechat' ? '微信支付' : '支付宝'}\n\n` +
    `【开发中】接下来将跳转到${paymentMethod === 'wechat' ? '微信' : '支付宝'}支付页面...`
  );
  
  // TODO: 实现真实支付流程
  // 微信支付：调用微信支付 JSAPI
  // 支付宝：跳转支付宝支付页面
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // 检查是否有未完成的订单
  const orderId = localStorage.getItem('currentOrderId');
  if (orderId) {
    console.log('发现未完成的订单:', orderId);
    // 可以在这里添加订单状态检查逻辑
  }
  
  // 表单验证和提交
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
  
  // 产品卡片悬停效果
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    });
  });
  
  // 方案卡片悬停效果
  const solutionCards = document.querySelectorAll('.solution-card');
  solutionCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      if (!this.classList.contains('popular')) {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      if (!this.classList.contains('popular')) {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
      }
    });
  });
  
  // 导航栏滚动效果
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
      navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      navbar.style.backgroundColor = 'white';
    }
  });
});

// 处理联系表单提交
function handleContactSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const submitBtn = form.querySelector('button[type="submit"]');
  
  // 禁用按钮
  submitBtn.disabled = true;
  submitBtn.textContent = '提交中...';
  
  // 模拟表单提交
  setTimeout(() => {
    // 收集表单数据
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    console.log('表单数据:', data);
    
    // 显示成功消息
    alert('感谢您的咨询！我们会在24小时内与您联系。');
    
    // 重置表单
    form.reset();
    
    // 恢复按钮状态
    submitBtn.disabled = false;
    submitBtn.textContent = '提交咨询';
    
  }, 1500);
}

// 产品选择功能
function selectProduct(productId) {
  // 根据产品ID跳转到相应页面
  switch(productId) {
    case 'iso9001':
      window.location.href = 'iso9001.html';
      break;
    case 'iso27001':
      alert('ISO 27001 产品即将推出，敬请期待！');
      break;
    case 'gdpr':
      alert('EU GDPR 产品即将推出，敬请期待！');
      break;
    default:
      alert('产品详情页面开发中...');
  }
}

// 方案选择功能
function selectSolution(solutionType) {
  // 这里可以添加方案选择的逻辑
  alert(`您选择了${solutionType}方案，正在跳转到购买页面...`);
  // 实际项目中可以跳转到购买页面或显示购买弹窗
}

// 显示支付成功页面（支付回调后）
function showPaymentSuccess(orderId) {
  const modalContent = `
    <div style="text-align: center; padding: 40px;">
      <div style="font-size: 60px; color: #28a745; margin-bottom: 20px;">✓</div>
      <h2 style="margin-bottom: 20px;">支付成功！</h2>
      <p style="margin-bottom: 30px;">
        感谢您的购买！<br>
        管理员将在 24 小时内通过邮件发送文档访问链接给您。<br><br>
        订单号：${orderId}
      </p>
      <button class="btn btn-primary" onclick="closeModal()">关闭</button>
    </div>
  `;
  
  document.querySelector('.modal-content').innerHTML = modalContent;
  document.getElementById('purchaseModal').style.display = 'block';
}
