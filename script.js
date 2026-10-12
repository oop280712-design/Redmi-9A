const VIP_EMAILS = ["oop280712@gmail.com", "sawat2823@gmail.com"];
let loggedInUserEmail = "";

function switchAuthTo(target) {
    if (target === 'login') {
        document.getElementById('auth-register-modal').style.display = 'none';
        document.getElementById('auth-login-modal').style.display = 'flex';
    } else {
        document.getElementById('auth-login-modal').style.display = 'none';
        document.getElementById('auth-register-modal').style.display = 'flex';
    }
}

function handleRegister() {
    const email = document.getElementById('reg-email').value.trim();
    const pass = document.getElementById('reg-pass').value.trim();
    if (!email || !pass) {
        alert("กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน");
        return;
    }
    alert("📝 ลงทะเบียนบัญชีสำเร็จ! กรุณาเข้าสู่ระบบ");
    switchAuthTo('login');
}

function handleLogin() {
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    if (!email) {
        alert("กรุณากรอกอีเมลเพื่อเข้าสู่ระบบ");
        return;
    }
    proceedToPlanSelection(email);
}

function handleGoogleLogin() {
    let email = prompt("🔗 จำลองหน้าต่าง Google Sign-In\nกรุณากรอกอีเมล Google ของคุณ:");
    if (!email) return;
    email = email.trim().toLowerCase();
    proceedToPlanSelection(email);
}

function proceedToPlanSelection(email) {
    loggedInUserEmail = email;
    const isVip = VIP_EMAILS.includes(email);

    document.getElementById('auth-login-modal').style.display = 'none';
    document.getElementById('auth-register-modal').style.display = 'none';
    document.getElementById('plan-modal').style.display = 'flex';

    const subText = document.getElementById('user-welcome-sub');
    const badgeText = document.getElementById('plan-badge-text');
    const priceDisplay = document.getElementById('price-display');

    if (isVip) {
        subText.textContent = `✨ ยินดีต้อนรับคุณ ${email} (ตรวจพบสิทธิ์ VIP ฟรีตลอดชีพ)`;
        badgeText.textContent = "VIP / ฟรีตลอดชีพ";
        priceDisplay.innerHTML = `<span style="color:#10b981;">FREE (VIP Verified)</span>`;
    } else {
        subText.textContent = `ยินดีต้อนรับคุณ ${email} (Standard User)`;
        badgeText.textContent = "Standard Cloud";
        priceDisplay.innerHTML = `฿1,200 <span>/เดือน</span>`;
    }

    document.getElementById('settings-user-email').textContent = email;
}

function confirmSubscription() {
    const duration = document.getElementById('rental-duration').value;
    document.getElementById('plan-modal').style.display = 'none';

    const bootScreen = document.getElementById('boot-screen');
    const bootStatus = document.getElementById('boot-status');
    const homeScreen = document.getElementById('android-home');

    bootScreen.style.display = 'flex';
    homeScreen.style.display = 'none';

    setTimeout(() => { bootStatus.textContent = `Allocating 24 GB RAM for ${duration} Month(s)...`; }, 1000);
    setTimeout(() => { bootStatus.textContent = "Launching Android 14 Cloud System..."; }, 2200);

    setTimeout(() => {
        bootScreen.style.display = 'none';
        homeScreen.style.display = 'flex';
        updateClock();
    }, 3500);
}

function updateClock() {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    document.getElementById('status-time').textContent = timeStr;
    document.getElementById('home-widget-time').textContent = timeStr;
}
setInterval(updateClock, 1000);

function hideAllApps() {
    document.querySelectorAll('.app-view').forEach(app => app.style.display = 'none');
}

function openApp(appId) {
    hideAllApps();
    const target = document.getElementById(`app-${appId}`);
    if (target) target.style.display = 'flex';
}

function goHome() {
    hideAllApps();
}

function installApp(appKey, appName) {
    const btn = document.getElementById(`btn-${appKey}`);
    btn.textContent = "กำลังติดตั้ง...";
    setTimeout(() => {
        btn.textContent = "เปิดใช้งาน";
        btn.classList.add('installed');
        alert(`ติดตั้งแอป ${appName} สำเร็จแล้ว!`);
    }, 1200);
}

function triggerNav(action) {
    if (action === 'recent') {
        alert('📑 เปิดหน้าแอปพลิเคชันล่าสุด (Recents)');
    } else {
        goHome();
    }
}
