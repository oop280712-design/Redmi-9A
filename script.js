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

// 📦 ระบบใช้ JSZip แกะไฟล์ APK ของจริงและดึงทรัพยากร Layout ออกมาแสดงผล
async function processRealApkFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const statusEl = document.getElementById('extraction-status');
    statusEl.style.display = 'block';
    statusEl.textContent = `Reading APK binary: ${file.name} (${(file.size / (1024*1024)).toFixed(2)} MB)...`;

    try {
        const zip = new JSZip();
        const zipContent = await zip.loadAsync(file);

        statusEl.textContent = "Extracting AndroidManifest.xml & Layout XML files...";

        // ค้นหาไฟล์ Layout XML ภายใน APK
        let layoutFiles = Object.keys(zipContent.files).filter(filename => filename.startsWith("res/layout/"));
        let manifestFile = zipContent.file("AndroidManifest.xml");

        setTimeout(() => {
            statusEl.style.display = 'none';
            const appName = file.name.replace('.apk', '');
            
            const container = document.getElementById('extracted-apps-container');
            container.innerHTML = `
                <div style="background:#1e293b; border-radius:10px; padding:12px; display:flex; align-items:center; justify-content:space-between;">
                    <div>
                        <h4 style="font-size:13px; color:#fff;">${appName}</h4>
                        <p style="font-size:10px; color:#38bdf8;">Layouts Found: ${layoutFiles.length} files</p>
                    </div>
                    <button class="confirm-btn" style="width:auto; padding:6px 12px; font-size:11px;" onclick="renderRealApkDom('${appName}', ${JSON.stringify(layoutFiles)})">เปิดดูทรัพยากร</button>
                </div>
            `;
            alert(`✅ ดึงทรัพยากรจากไฟล์ ${file.name} สำเร็จ! พบไฟล์ Layout ทั้งหมด ${layoutFiles.length} ไฟล์`);
        }, 1500);

    } catch (error) {
        statusEl.textContent = "เกิดข้อผิดพลาดในการอ่านโครงสร้าง APK";
        console.error(error);
        alert("ไม่สามารถอ่านไฟล์ APK นี้ได้ ไฟล์อาจถูกเข้ารหัสหรือเสียหาย");
    }
}

// เรนเดอร์โครงสร้างทรัพยากรที่ดึงมาลงใน Cloud Phone
function renderRealApkDom(appName, layoutFiles) {
    hideAllApps();
    document.getElementById('active-apk-title').textContent = appName;
    document.getElementById('apk-native-view').style.display = 'flex';

    const domContainer = document.getElementById('apk-dom-container');
    domContainer.innerHTML = `
        <div style="padding: 20px; font-family: sans-serif; color: #333;">
            <h2 style="color: #2563eb; margin-bottom: 10px;">📦 ${appName}</h2>
            <p style="font-size: 12px; color: #64748b; margin-bottom: 15px;">รายชื่อไฟล์โครงสร้าง Layout XML และทรัพยากรที่สกัดจาก APK จริง:</p>
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #cbd5e1; max-height: 350px; overflow-y: auto;">
                <ul style="font-size: 11px; color: #1e293b; padding-left: 18px;">
                    ${layoutFiles.length > 0 ? layoutFiles.map(path => `<li style="margin-bottom:6px; font-family:monospace;">${path}</li>`).join('') : '<li>ไม่พบโฟลเดอร์ res/layout โดยตรง แต่สกัดแพ็กเกจระบบสำเร็จ</li>'}
                </ul>
            </div>
        </div>
    `;
}

// ระบบดาวน์โหลดและติดตั้ง APK จำลองแบบสมจริง
function startRealisticDownload() {
    const btn = document.getElementById('dl-btn');
    btn.textContent = "กำลังดาวน์โหลด 0%";
    btn.disabled = true;

    let progress = 0;
    const interval = setInterval(() => {
        progress += 25;
        if (progress <= 100) {
            btn.textContent = `กำลังดาวน์โหลด ${progress}%`;
        }
        if (progress >= 100) {
            clearInterval(interval);
            btn.textContent = "ติดตั้งแล้ว";
            setTimeout(() => {
                document.getElementById('android-install-dialog').style.display = 'flex';
            }, 400);
        }
    }, 3500);
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
    document.getElementById('progress-desc').textContent = "กำลังเขียนไฟล์ระบบ APK ลงหน่วยความจำ Flash...";

    setTimeout(() => {
        document.getElementById('progress-title').textContent = "กำลังสแกนความปลอดภัย...";
        document.getElementById('progress-desc').textContent = "Google Play Protect ตรวจสอบแล้ว ปลอดภัย 100%";
    }, 1500);

    setTimeout(() => {
        progressDialog.style.display = 'none';
        hideAllApps();
        document.getElementById('apk-native-view').style.display = 'flex';
        document.getElementById('active-apk-title').textContent = "Installed Application";
        document.getElementById('apk-dom-container').innerHTML = `
            <div style="padding: 20px; text-align: center;">
                <h2 style="color: #10b981; margin-bottom: 10px;">✅ ติดตั้งแอปสำเร็จ</h2>
                <p style="font-size: 12px; color: #64748b;">แอปพลิเคชันถูกรันผ่าน Cloud Engine พร้อมใช้งานเรียบร้อยแล้ว</p>
            </div>
        `;
    }, 2800);
}
