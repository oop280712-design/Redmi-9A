const VIP_EMAILS = ["oop280712@gmail.com", "sawat2823@gmail.com"];

let currentPlan = {
    name: "Ultra Extreme VIP",
    specs: "24 GB RAM / 8 vCPU",
    price: "0"
};

// ตรวจสอบอีเมล VIP Real-time
document.getElementById('user-email').addEventListener('input', (e) => {
    const email = e.target.value.trim().toLowerCase();
    const msg = document.getElementById('vip-status-msg');
    const priceDisplay = document.getElementById('price-display');
    const badge = document.getElementById('nav-vip-badge');
    const emailText = document.getElementById('nav-email-text');

    if (VIP_EMAILS.includes(email)) {
        msg.textContent = "✨ ตรวจพบสิทธิ์ VIP! ใช้งานแพ็กเกจ Ultra Extreme ฟรีทันที";
        msg.style.color = "#10b981";
        priceDisplay.innerHTML = "<s>฿1,200</s> <span style='color: #10b981;'>FREE (VIP)</span>";
        badge.textContent = "VIP EXTREME";
        badge.style.background = "linear-gradient(135deg, #10b981, #059669)";
        emailText.textContent = email;
    } else {
        msg.textContent = "";
        priceDisplay.innerHTML = "฿1,200 <span>/เดือน</span>";
        badge.textContent = "Standard User";
        badge.style.background = "linear-gradient(135deg, #f59e0b, #d97706)";
        emailText.textContent = email ? email : "ยังไม่ได้เข้าสู่ระบบ";
    }
});

function selectPlan(card, name, cpu, ram, price) {
    document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    currentPlan = { name, specs: `${ram} / ${cpu}`, price };
}

function openModal() {
    document.getElementById('plan-modal').style.display = 'flex';
}

function confirmSubscription() {
    const email = document.getElementById('user-email').value.trim().toLowerCase();
    const isVip = VIP_EMAILS.includes(email);

    document.getElementById('plan-modal').style.display = 'none';
    document.getElementById('display-plan-name').textContent = currentPlan.name;

    const bootScreen = document.getElementById('boot-screen');
    const bootStatus = document.getElementById('boot-status');
    const homeScreen = document.getElementById('android-home');

    bootScreen.style.display = 'flex';
    homeScreen.style.display = 'none';

    setTimeout(() => {
        bootStatus.textContent = isVip ? "🔓 Bypassing Cloud Security & Root..." : "Allocating Hardware Resources...";
    }, 1200);

    setTimeout(() => {
        bootStatus.textContent = "Starting VMOS Android 14 Container...";
    }, 2500);

    setTimeout(() => {
        bootScreen.style.display = 'none';
        homeScreen.style.display = 'flex';
        updateClock();
    }, 4000);
}

function rebootInstance() {
    confirmSubscription();
}

function powerOff() {
    document.getElementById('android-home').style.display = 'none';
    const bootScreen = document.getElementById('boot-screen');
    bootScreen.style.display = 'flex';
    document.getElementById('boot-status').textContent = "Instance Powered Off.";
}

function updateClock() {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    document.getElementById('phone-clock').textContent = timeStr;
    document.getElementById('home-widget-time').textContent = timeStr;
}
setInterval(updateClock, 1000);

function openApp(appName) {
    document.getElementById('app-title').textContent = appName;
    document.getElementById('app-desc').textContent = `กำลังจำลองการทำงานของแอป ${appName} บนสเปก ${currentPlan.specs} อย่างเต็มรูปแบบ`;
    document.getElementById('app-modal').style.display = 'flex';
}

function closeAppModal() {
    document.getElementById('app-modal').style.display = 'none';
}

function triggerNav(action) {
    if (action === 'home') {
        document.getElementById('android-home').style.display = 'flex';
    } else if (action === 'back') {
        alert('↩️ ปุ่มย้อนกลับ (Back Triggered)');
    } else if (action === 'recent') {
        alert('📑 เปิดหน้าแอปพลิเคชันล่าสุด (Recent Apps)');
    }
}
