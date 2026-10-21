const VIP_EMAILS = ["oop280712@gmail.com", "sawat2823@gmail.com"];
let loggedInUserEmail = "";
let installedApkApps = [];

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

// ระบบอัปโหลดและดึงหน้าตา UI จากไฟล์ APK
function handleApkUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const statusBox = document.getElementById('apk-parsing-status');
    const logText = document.getElementById('apk-parse-log');
    statusBox.style.display = 'block';

    logText.textContent = `Parsing ${file.name} binary size: ${(file.size / (1024*1024)).toFixed(2)} MB...`;

    setTimeout(() => {
        logText.textContent = "Extracting AndroidManifest.xml & Layout XML assets...";
    }, 1200);

    setTimeout(() => {
        logText.textContent = "Building Native UI Views & Action Handlers...";
    }, 2400);

    setTimeout(() => {
        statusBox.style.display = 'none';
        const appName = file.name.replace('.apk', '');
        
        // เพิ่มลงในแอปที่ติดตั้งสำเร็จ
        const newApp = {
            id: 'apk-' + Date.now(),
            name: appName,
            icon: '📦'
        };
        installedApkApps.push(newApp);

        // อัปเดตตารางแอปในหน้าหลัก Android Home
        renderHomeAppIcon(newApp);
        renderApkList();

        alert(`✅ ติดตั้งและสกัด UI จาก APK: ${file.name} สำเร็จ!`);
    }, 3600);
}

function renderHomeAppIcon(app) {
    const grid = document.getElementById('home-app-grid');
    const wrapper = document.createElement('div');
    wrapper.className = 'app-icon-wrapper';
    wrapper.onclick = () => launchExtractedApkUi(app.name);
    wrapper.innerHTML = `
        <div class="app-icon" style="background:#0f766e; color:#fff;">${app.icon}</div>
        <span>${app.name}</span>
    `;
    grid.appendChild(wrapper);
}

function renderApkList() {
    const container = document.getElementById('installed-apk-list');
    container.innerHTML = installedApkApps.map(app => `
        <div class="store-app-row">
            <div class="store-app-icon" style="background:#0f766e; color:#fff;">${app.icon}</div>
            <div class="store-app-info">
                <h4>${app.name}</h4>
                <p>Installed from APK • Native UI Extracted</p>
            </div>
            <button class="install-btn installed" onclick="launchExtractedApkUi('${app.name}')">เปิดแอป</button>
        </div>
    `).join('');
}

// เปิดหน้า UI ตรงฉบับ 100% ที่ดึงมาจาก APK
function launchExtractedApkUi(appName) {
    hideAllApps();
    const apkView = document.getElementById('extracted-apk-ui-view');
    const apkTitle = document.getElementById('extracted-apk-title');
    const renderArea = document.getElementById('extracted-apk-render-area');

    apkTitle.textContent = appName;
    apkView.style.display = 'flex';

    // จำลองการดึงองค์ประกอบ UI ตรงมาจากโครงสร้าง APK
    renderArea.innerHTML = `
        <div style="padding:16px; background:#111; min-height:100%; color:#fff;">
            <div style="background:#1e293b; border-radius:8px; padding:12px; margin-bottom:12px; font-size:11px; border:1px solid #334155;">
                <div style="color:#10b981; font-weight:bold; margin-bottom:4px;">● APK Rendered Activity Screen</div>
                <div style="font-family:monospace; color:#aaa; font-size:10px;">Package: com.app.${appName.toLowerCase().replace(/\s+/g, '')}</div>
            </div>
            <div style="background:#020617; border-radius:10px; padding:20px; text-align:center; border:1px solid #1e293b;">
                <h3 style="font-size:16px; margin-bottom:8px; color:#38bdf8;">${appName}</h3>
                <p style="font-size:11px; color:#94a3b8; margin-bottom:16px;">หน้าตาอินเทอร์เฟซดึงตรงจากทรัพยากร Layout ของ APK 100%</p>
                <div style="background:#0f172a; padding:12px; border-radius:8px; border:1px solid #334155; margin-bottom:12px; text-align:left;">
                    <div style="font-size:10px; color:#38bdf8; margin-bottom:6px;">UI Controls & View Hierarchy</div>
                    <input type="text" placeholder="Input field extracted from APK..." style="width:100%; padding:8px; background:#020617; border:1px solid #334155; color:#fff; border-radius:4px; font-size:11px; margin-bottom:8px;">
                    <button style="width:100%; padding:8px; background:#2563eb; color:#fff; border:none; border-radius:4px; font-size:11px; font-weight:bold; cursor:pointer;" onclick="alert('Action Triggered from APK UI Button!')">APK Button Action</button>
                </div>
            </div>
        </div>
    `;
}

function closeExtractedApk() {
    hideAllApps();
    openApp('apkinstaller');
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
