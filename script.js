const VIP_EMAILS = ["oop280712@gmail.com", "sawat2823@gmail.com"];
let loggedInUserEmail = "";

// ==========================================
// 1. ระบบยืนยันตัวตน และสิทธิ์ VIP
// ==========================================
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

    const emailEl = document.getElementById('settings-user-email');
    if (emailEl) emailEl.textContent = email;
}

function confirmSubscription() {
    const duration = document.getElementById('rental-duration').value;
    document.getElementById('plan-modal').style.display = 'none';

    const bootScreen = document.getElementById('boot-screen');
    const bootStatus = document.getElementById('boot-status');
    const homeScreen = document.getElementById('android-home');

    if (bootScreen) bootScreen.style.display = 'flex';
    if (homeScreen) homeScreen.style.display = 'none';

    setTimeout(() => { if (bootStatus) bootStatus.textContent = `Allocating 24 GB RAM for ${duration} Month(s)...`; }, 1000);
    setTimeout(() => { if (bootStatus) bootStatus.textContent = "Launching Android 14 Cloud System..."; }, 2200);

    setTimeout(() => {
        if (bootScreen) bootScreen.style.display = 'none';
        if (homeScreen) homeScreen.style.display = 'flex';
        updateClock();
    }, 3500);
}

// ==========================================
// 2. ระบบนาฬิกา และการสลับหน้าจอ (Navigation)
// ==========================================
function updateClock() {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const statusTime = document.getElementById('status-time');
    const widgetTime = document.getElementById('home-widget-time');
    if (statusTime) statusTime.textContent = timeStr;
    if (widgetTime) widgetTime.textContent = timeStr;
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

// ==========================================
// 3. ระบบจำลองการดาวน์โหลดและติดตั้งแอปสมจริง 100%
// ==========================================
function startRealisticDownload() {
    const btn = document.getElementById('dl-btn');
    btn.disabled = true;

    let progress = 0;
    let downloadedMB = 0;
    const totalMB = 45.2;

    const interval = setInterval(() => {
        progress += 10;
        downloadedMB = ((progress / 100) * totalMB).toFixed(1);
        
        if (progress <= 100) {
            btn.textContent = `กำลังโหลด ${progress}% (${downloadedMB}/${totalMB} MB)`;
        }

        if (progress >= 100) {
            clearInterval(interval);
            btn.textContent = "รอการติดตั้ง...";
            
            // แสดงหน้าต่าง Package Installer ของ Android
            setTimeout(() => {
                document.getElementById('android-install-dialog').style.display = 'flex';
            }, 600);
        }
    }, 300);
}

function cancelInstallation() {
    document.getElementById('android-install-dialog').style.display = 'none';
    const btn = document.getElementById('dl-btn');
    btn.textContent = "ดาวน์โหลด";
    btn.disabled = false;
}

function proceedInstallation() {
    document.getElementById('android-install-dialog').style.display = 'none';
    const progressDialog = document.getElementById('android-progress-dialog');
    progressDialog.style.display = 'flex';

    document.getElementById('progress-title').textContent = "กำลังติดตั้ง...";
    document.getElementById('progress-desc').textContent = "กำลังจัดสรรพื้นที่ความจำและเขียนไฟล์ APK...";

    setTimeout(() => {
        document.getElementById('progress-title').textContent = "ตรวจสอบความปลอดภัย...";
        document.getElementById('progress-desc').textContent = "Google Play Protect: ปลอดภัย ไม่พบภัยคุกคาม";
    }, 1500);

    setTimeout(() => {
        progressDialog.style.display = 'none';
        const btn = document.getElementById('dl-btn');
        btn.textContent = "เปิด";
        btn.disabled = false;
        btn.onclick = () => launchAppWithSplash("Roblox Cloud");

        // เพิ่มไอคอนลงหน้าจอหลัก Android Home
        addNewAppToHome("Roblox", "🎮");
        alert("✅ ติดตั้งแอปพลิเคชันลงใน Cloud Phone เรียบร้อยแล้ว!");
    }, 3000);
}

// ==========================================
// 4. ระบบจำลองการเปิดแอปพร้อม Splash Screen
// ==========================================
function launchAppWithSplash(appName) {
    hideAllApps();
    const activeView = document.getElementById('apk-native-view');
    const activeTitle = document.getElementById('active-apk-title');
    const domContainer = document.getElementById('apk-dom-container');

    activeTitle.textContent = appName;
    activeView.style.display = 'flex';

    // 1. จำลอง Splash Screen (หน้าโหลดแอปค้างไว้ 1.5 วินาที)
    domContainer.innerHTML = `
        <div style="height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#0f172a; color:#fff;">
            <div style="font-size:48px; margin-bottom:16px;" class="spinner"></div>
            <h3 style="font-size:16px; color:#38bdf8;">${appName}</h3>
            <p style="font-size:11px; color:#64748b; margin-top:8px;">Starting Android Runtime Engine...</p>
        </div>
    `;

    // 2. โหลดหน้า UI หลักของแอปแบบ Native Look
    setTimeout(() => {
        domContainer.innerHTML = `
            <div style="padding:16px; background:#1e293b; min-height:100%; color:#fff; font-family:sans-serif;">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding-bottom:12px; margin-bottom:16px;">
                    <h3 style="font-size:16px; color:#38bdf8;">🎮 ${appName}</h3>
                    <span style="font-size:10px; background:#10b981; color:#fff; padding:2px 8px; border-radius:10px;">FPS: 60 | RAM: 24GB</span>
                </div>
                
                <div style="background:#0f172a; padding:14px; border-radius:10px; border:1px solid #334155; margin-bottom:12px;">
                    <label style="display:block; font-size:11px; color:#94a3b8; margin-bottom:6px;">Username / Account ID:</label>
                    <input type="text" value="khow_pun6767677" style="width:100%; padding:8px; background:#020617; border:1px solid #334155; border-radius:6px; color:#fff; font-size:12px; margin-bottom:10px;">
                    <button style="width:100%; padding:10px; background:#2563eb; color:#fff; border:none; border-radius:6px; font-weight:bold; font-size:12px; cursor:pointer;" onclick="alert('✅ เข้าสู่ระบบสำเร็จ!')">เข้าสู่เซิร์ฟเวอร์</button>
                </div>
            </div>
        `;
    }, 1500);
}

function addNewAppToHome(appName, icon) {
    const grid = document.getElementById('home-app-grid');
    if (!document.getElementById(`app-icon-${appName}`)) {
        const wrapper = document.createElement('div');
        wrapper.className = 'app-icon-wrapper';
        wrapper.id = `app-icon-${appName}`;
        wrapper.onclick = () => launchAppWithSplash(appName);
        wrapper.innerHTML = `
            <div class="app-icon" style="background:#7c3aed; color:#fff;">${icon}</div>
            <span>${appName}</span>
        `;
        grid.appendChild(wrapper);
    }
}
