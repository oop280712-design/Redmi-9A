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

    document.getElementById('pojav-username-display').textContent = email;
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
    document.getElementById('ninja-executor').style.display = 'none';
    document.getElementById('runtime-modal').style.display = 'none';
    
    const mcScreen = document.getElementById('minecraft-running-screen');
    if (mcScreen) mcScreen.remove();
}

function openApp(appId) {
    hideAllApps();
    const target = document.getElementById(`app-${appId}`);
    if (target) target.style.display = 'flex';
}

function openPojavSettings() {
    hideAllApps();
    document.getElementById('app-pojav-settings').style.display = 'flex';
}

function openSubSetting(subId) {
    hideAllApps();
    const target = document.getElementById(`sub-setting-${subId}`);
    if (target) {
        target.style.display = 'flex';
    } else {
        alert(`เปิดหน้าตั้งค่า: ${subId}`);
    }
}

function openRuntimeManager() {
    document.getElementById('runtime-modal').style.display = 'flex';
}

function goHome() {
    hideAllApps();
}

// จำลองการกด PLAY แยกตามเวอร์ชันที่เลือก (โหลดโปรไฟล์ -> หน้าจอดำรอนิดนึง -> เข้าเกม Java)
function launchMinecraftJava() {
    const selectedVersion = document.getElementById('profile-version-select').value;
    hideAllApps();
    const screen = document.getElementById('vmos-screen');

    const mcContainer = document.createElement('div');
    mcContainer.id = 'minecraft-running-screen';
    mcContainer.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; background:#000; z-index:100; display:flex; flex-direction:column; justify-content:center; align-items:center; color:#fff; font-family:monospace;';
    
    mcContainer.innerHTML = `
        <div id="mc-status-text" style="font-size:13px; color:#aaa; text-align:center; padding:0 20px;">
            ▶ Loading Profile: ${selectedVersion}...
        </div>
    `;
    screen.appendChild(mcContainer);

    setTimeout(() => {
        document.getElementById('mc-status-text').innerHTML = `
            <div style="font-size: 24px; margin-bottom: 10px;">⏳</div>
            Initializing Java Runtime & Libraries for ${selectedVersion}...
        `;
    }, 1500);

    setTimeout(() => {
        document.getElementById('mc-status-text').innerHTML = ``;
        mcContainer.style.background = '#050505';
    }, 3000);

    setTimeout(() => {
        mcContainer.style.background = '#2c1e14';
        mcContainer.innerHTML = `
            <div style="position:absolute; top:10px; left:10px; font-size:10px; color:#888;">Minecraft* Java Edition (${selectedVersion})</div>
            <div style="font-size:26px; font-weight:bold; letter-spacing:3px; color:#fff; text-shadow: 2px 2px #000; margin-bottom:25px;">MINECRAFT JAVA</div>
            <div style="display:flex; flex-direction:column; gap:8px; width:190px;">
                <button style="background:#555; color:#fff; border:2px solid #000; padding:8px; font-weight:bold; cursor:pointer;" onclick="alert('เข้าสู่หน้า Singleplayer สำเร็จ')">Singleplayer</button>
                <button style="background:#555; color:#fff; border:2px solid #000; padding:8px; font-weight:bold; cursor:pointer;" onclick="alert('เข้าสู่หน้า Multiplayer สำเร็จ')">Multiplayer</button>
                <button style="background:#555; color:#fff; border:2px solid #000; padding:8px; font-weight:bold; cursor:pointer;" onclick="goHome()">Quit Game</button>
            </div>
            <div style="position:absolute; bottom:10px; font-size:9px; color:#aaa;">PojavLauncher Mobile Cloud</div>
        `;
    }, 5000);
}

function enterRobloxGame() {
    alert("🎮 กำลังโหลดเข้าสู่แมพ Roblox...");
    document.getElementById('ninja-executor').style.display = 'block';
}

function toggleNinjaMenu() {
    const body = document.getElementById('ninja-body');
    if (body.style.display === 'none') {
        body.style.display = 'block';
    } else {
        body.style.display = 'none';
    }
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
