// ====== DATA ======
const scholarshipsData = [
    { id: 1, title: 'منحة إيراسموس موندوس 2026', desc: 'برنامج تبادل للطلاب الدوليين مع تمويل كامل في جامعات أوروبية.', deadline: '15 سبتمبر 2026', level: 'ماجستير', country: 'أوروبا', documents: 'شهادة البكالوريوس، كشف الدرجات، السيرة الذاتية، رسالة تحفيزية، رسالتا توصية', registerUrl: 'https://erasmus-plus.ec.europa.eu/' },
    { id: 2, title: 'منحة الحكومة الصينية 2026-2027', desc: 'منحة شاملة تغطي الرسوم الدراسية والسكن والتأمين الصحي.', deadline: '30 أغسطس 2026', level: 'جميع المستويات', country: 'الصين', documents: 'الشهادة الثانوية أو الجامعية، كشف الدرجات، جواز السفر، شهادة لغة', registerUrl: 'https://www.campuschina.org/' },
    { id: 3, title: 'منحة إيراسموس موندوس 2026', desc: 'برنامج تبادل للطلاب الدوليين مع تمويل كامل في جامعات أوروبية.', deadline: '15 سبتمبر 2026', level: 'ماجستير', country: 'أوروبا', documents: 'شهادة البكالوريوس، كشف الدرجات، السيرة الذاتية، رسالة تحفيزية، رسالتا توصية', registerUrl: 'https://erasmus-plus.ec.europa.eu/' },
];

const formationsData = [
    { id: 1, title: 'تعلم البرمجة بـ Python', desc: 'دورة شاملة في لغة Python من الصفر إلى الاحتراف', date: '15 يوليو 2026', time: '20:00 - 22:00', participateUrl: 'https://coursera.org/python' },
    { id: 2, title: 'تطوير تطبيقات Android', desc: 'تعلم بناء تطبيقات أندرويد باستخدام Kotlin و Jetpack Compose', date: '20 يوليو 2026', time: '18:00 - 20:00', participateUrl: 'https://udemy.com/android' },
];

const infosData = [
    { id: 1, title: 'فتح باب التقديم لمنح الحكومة الصينية 2026-2027', desc: 'أعلنت الحكومة الصينية عن فتح باب التقديم للمنح الدراسية للعام الجامعي الجديد.' },
    { id: 2, title: 'منحة جامعة بوسطن للطلاب الدوليين', desc: 'تقدم جامعة بوسطن منحة رئاسية للطلاب الدوليين المتميزين.' },
];

// ====== NAVIGATION ======
function navigate(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + page);
    if (target) target.classList.add('active');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const navItem = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (navItem) navItem.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (page === 'scholarships') renderScholarships();
    else if (page === 'formations') renderFormations();
    else if (page === 'infos') renderInfos();
    else if (page === 'home') renderHome();
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('active');
}

// ====== SIDEBAR ======
document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebarOverlay').classList.toggle('active');
});

// ====== DARK MODE ======
let darkMode = localStorage.getItem('mnh-dark') === 'true';
function initTheme() {
    if (darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('darkModeToggle').checked = true;
        document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
    }
}
function toggleDarkMode() {
    darkMode = !darkMode;
    localStorage.setItem('mnh-dark', darkMode);
    if (darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.removeAttribute('data-theme');
        document.getElementById('themeToggle').innerHTML = '<i class="fas fa-moon"></i>';
    }
}
document.getElementById('themeToggle').addEventListener('click', toggleDarkMode);
initTheme();

// ====== TOAST ======
function showToast(msg) {
    const container = document.getElementById('toastContainer');
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    container.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transition = '0.3s'; setTimeout(() => t.remove(), 300); }, 2500);
}

// ====== RENDER CARDS ======
function scholarshipCard(s) {
    return `<div class="card">
        <div class="card-img" style="background:linear-gradient(135deg,#0d6efd,#0099ff)"><i class="fas fa-university"></i></div>
        <div class="card-body">
            <h3 class="card-title">${s.title}</h3>
            <p class="card-text">${s.desc}</p>
            <div class="card-meta">
                <span style="color:var(--danger);font-weight:700"><i class="fas fa-calendar-alt"></i> ${s.deadline}</span>
                <span><i class="fas fa-layer-group"></i> ${s.level}</span>
            </div>
            <div class="card-actions">
                <a href="${s.registerUrl}" target="_blank" class="btn btn-primary btn-sm-full"><i class="fas fa-external-link-alt"></i> سجل الآن</a>
                <a href="#" class="btn btn-outline btn-sm-full" onclick="event.preventDefault();openCriteriaModal('${s.title}')"><i class="fas fa-info-circle"></i> شروط التقديم</a>
            </div>
        </div>
    </div>`;
}

function formationCard(f) {
    return `<div class="card">
        <div class="card-img" style="background:linear-gradient(135deg,#198754,#20c997)"><i class="fas fa-laptop-code"></i></div>
        <div class="card-body">
            <h3 class="card-title">${f.title}</h3>
            <p class="card-text">${f.desc}</p>
            <div class="card-meta">
                <span><i class="fas fa-calendar-alt"></i> ${f.date}</span>
                <span><i class="fas fa-clock"></i> ${f.time}</span>
            </div>
            <div class="card-actions">
                <a href="${f.participateUrl}" target="_blank" class="btn btn-success btn-sm-full"><i class="fas fa-video"></i> شارك الآن</a>
            </div>
        </div>
    </div>`;
}

function renderHome() {
    document.getElementById('featuredScholarships').innerHTML = scholarshipsData.map(scholarshipCard).join('');
    document.getElementById('featuredNews').innerHTML = infosData.map(n => `<div class="card">
        <div class="card-img" style="background:linear-gradient(135deg,var(--info),var(--primary))"><i class="fas fa-newspaper"></i></div>
        <div class="card-body">
            <h3 class="card-title">${n.title}</h3>
            <p class="card-text">${n.desc}</p>
        </div>
    </div>`).join('');
    animateCount();
}

function animateCount() {
    const el = document.getElementById('statScholarships');
    const f = document.getElementById('statFormations');
    let sc = 0, fc = 0;
    const si = setInterval(() => { sc++; el.textContent = sc; if (sc >= scholarshipsData.length) clearInterval(si); }, 30);
    const fi = setInterval(() => { fc++; f.textContent = fc; if (fc >= formationsData.length) clearInterval(fi); }, 20);
}

// ====== SCHOLARSHIPS ======
function renderScholarships(filter = 'all') {
    const items = filter === 'all' ? scholarshipsData : scholarshipsData.filter(s => s.level === filter);
    document.getElementById('allScholarships').innerHTML = items.map(scholarshipCard).join('');
}
function filterScholarships(filter, btn) {
    document.querySelectorAll('#scholarshipFilters .filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderScholarships(filter);
    applySearch();
}
function applySearch() {
    const q = document.getElementById('scholarshipSearch').value.trim().toLowerCase();
    if (!q) return;
    const items = scholarshipsData.filter(s => s.title.includes(q) || s.desc.includes(q));
    document.getElementById('allScholarships').innerHTML = items.map(scholarshipCard).join('');
}
document.getElementById('scholarshipSearch').addEventListener('input', applySearch);

// ====== FORMATIONS ======
function renderFormations() {
    document.getElementById('allFormations').innerHTML = formationsData.map(formationCard).join('');
}
document.getElementById('formationSearch').addEventListener('input', function() {
    const q = this.value.trim().toLowerCase();
    const items = formationsData.filter(f => f.title.includes(q) || f.desc.includes(q));
    document.getElementById('allFormations').innerHTML = items.map(formationCard).join('');
});

// ====== CRITERIA MODAL ======
function openCriteriaModal(title) {
    const s = scholarshipsData.find(x => x.title === title);
    if (!s) { showToast('المعلومات غير متوفرة'); return; }
    document.getElementById('modalTitle').textContent = s.title;
    document.getElementById('modalLevel').textContent = s.level || 'غير محدد';
    document.getElementById('modalCountry').textContent = s.country || 'غير محدد';
    document.getElementById('modalDeadline').textContent = s.deadline;
    document.getElementById('modalDocuments').textContent = s.documents || 'غير محدد';
    document.getElementById('criteriaModal').classList.add('active');
}
function closeCriteriaModal() {
    document.getElementById('criteriaModal').classList.remove('active');
}

// ====== INFOS ======
function renderInfos() {
    document.getElementById('allInfos').innerHTML = infosData.map(n => `<div class="info-card">
        <h3>${n.title}</h3>
        <p>${n.desc}</p>
    </div>`).join('');
}
document.getElementById('infosSearch')?.addEventListener('input', function() {
    const q = this.value.trim().toLowerCase();
    const items = infosData.filter(n => n.title.includes(q) || n.desc.includes(q));
    document.getElementById('allInfos').innerHTML = items.map(n => `<div class="info-card">
        <h3>${n.title}</h3>
        <p>${n.desc}</p>
    </div>`).join('');
});

// ====== TOOLS TABS ======
function switchToolTab(tab, btn) {
    document.querySelectorAll('.tool-tab').forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');
    document.querySelectorAll('.tool-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('tool-' + tab).classList.add('active');
}

// ====== TOOL: CV GENERATOR ======
function addEducation() {
    const list = document.getElementById('cvEducationList');
    const div = document.createElement('div');
    div.className = 'edu-item';
    div.innerHTML = '<input type="text" placeholder="الشهادة"><input type="text" placeholder="المؤسسة"><input type="text" placeholder="السنة">';
    list.appendChild(div);
}
function addExperience() {
    const list = document.getElementById('cvExperienceList');
    const div = document.createElement('div');
    div.className = 'exp-item';
    div.innerHTML = '<input type="text" placeholder="المسمى الوظيفي"><input type="text" placeholder="الجهة"><textarea rows="2" placeholder="وصف المهام"></textarea>';
    list.appendChild(div);
}
function addCourse() {
    const list = document.getElementById('cvCoursesList');
    const div = document.createElement('div');
    div.className = 'course-item';
    div.innerHTML = '<input type="text" placeholder="اسم الدورة"><input type="text" placeholder="الجهة المانحة">';
    list.appendChild(div);
}
function generateCV() {
    const name = document.getElementById('cvName').value.trim();
    if (!name) { showToast('الرجاء إدخال الاسم الكامل'); return; }
    const email = document.getElementById('cvEmail').value.trim();
    const phone = document.getElementById('cvPhone').value.trim();
    const addr = document.getElementById('cvAddress').value.trim();
    const summary = document.getElementById('cvSummary').value.trim();
    const skills = document.getElementById('cvSkills').value.trim();
    const lang = document.getElementById('cvLanguages').value.trim();
    const eduItems = document.querySelectorAll('#cvEducationList .edu-item');
    const expItems = document.querySelectorAll('#cvExperienceList .exp-item');
    const courseItems = document.querySelectorAll('#cvCoursesList .course-item');
    let eduHtml = '', expHtml = '', courseHtml = '';
    eduItems.forEach(e => {
        const inp = e.querySelectorAll('input');
        if (inp[0]?.value) eduHtml += `<p>• ${inp[0].value} - ${inp[1]?.value || ''} (${inp[2]?.value || ''})</p>`;
    });
    expItems.forEach(e => {
        const inp = e.querySelectorAll('input, textarea');
        if (inp[0]?.value) expHtml += `<p><strong>${inp[0].value}</strong> - ${inp[1]?.value || ''}</p>${inp[2]?.value ? '<p>' + inp[2].value + '</p>' : ''}`;
    });
    courseItems.forEach(c => {
        const inp = c.querySelectorAll('input');
        if (inp[0]?.value) courseHtml += `<p>• ${inp[0].value}${inp[1]?.value ? ' - ' + inp[1].value : ''}</p>`;
    });
    const cv = `<div class="cv-header-preview"><h2>${name}</h2>
        ${email ? '<p><i class="fas fa-envelope"></i> ' + email + '</p>' : ''}
        ${phone ? '<p><i class="fas fa-phone"></i> ' + phone + '</p>' : ''}
        ${addr ? '<p><i class="fas fa-map-marker-alt"></i> ' + addr + '</p>' : ''}</div>
        ${summary ? `<div class="cv-section-preview"><h3>ملخص</h3><p>${summary}</p></div>` : ''}
        ${eduHtml ? `<div class="cv-section-preview"><h3>المؤهلات العلمية</h3>${eduHtml}</div>` : ''}
        ${courseHtml ? `<div class="cv-section-preview"><h3>الدورات والشهادات</h3>${courseHtml}</div>` : ''}
        ${expHtml ? `<div class="cv-section-preview"><h3>الخبرات المهنية</h3>${expHtml}</div>` : ''}
        ${skills ? `<div class="cv-section-preview"><h3>المهارات</h3><p>${skills.split(',').map(s => '<span style="display:inline-block;background:#e8f0fe;padding:2px 10px;border-radius:12px;margin:2px;font-size:12px">' + s.trim() + '</span>').join(' ')}</p></div>` : ''}
        ${lang ? `<div class="cv-section-preview"><h3>اللغات</h3><p>${lang}</p></div>` : ''}`;
    document.getElementById('cvPreview').innerHTML = cv;
    document.getElementById('cvResult').style.display = 'block';
    document.getElementById('cvResult').scrollIntoView({ behavior: 'smooth' });
}
function printCV() { printElement('cvPreview'); }
function downloadCV() { downloadAsPDF('cvPreview', 'السيرة_الذاتية'); }

// ====== TOOL: MOTIVATION LETTER ======
function generateMotivation() {
    const name = document.getElementById('motName').value.trim();
    if (!name) { showToast('الرجاء إدخال اسمك'); return; }
    const email = document.getElementById('motEmail').value.trim();
    const rec = document.getElementById('motRecipient').value.trim();
    if (!rec) { showToast('الرجاء إدخال الجهة المستلمة'); return; }
    const prog = document.getElementById('motProgram').value.trim();
    if (!prog) { showToast('الرجاء إدخال البرنامج'); return; }
    const skills = document.getElementById('motSkills').value.trim();
    const reason = document.getElementById('motReason').value.trim();
    const now = new Date();
    const dateStr = now.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
    const letter = `<div class="letter-header">
        <p>${dateStr}</p>
        <p>إلى السيد/السيدة المحترم/ة<br>${rec}</p>
        <p>الموضوع: طلب التقديم على ${prog}</p>
    </div>
    <p>السلام عليكم ورحمة الله وبركاته،</p>
    <p>أنا ${name}${email ? ' (' + email + ')' : ''}، أتقدم لكم بطلب التقديم على برنامج "${prog}" في ${rec}.</p>
    ${skills ? `<p>إليكم ملخصاً عن مهاراتي:<br>${skills}</p>` : ''}
    ${reason ? `<p>${reason}</p>` : ''}
    <p>أؤكد لكم حرصي الشديد على الانضمام إلى برنامجكم، واستعدادي لتقديم كل ما لدي من جهد لتحقيق أهداف البرنامج. أتمنى أن يحظى طلبي بالقبول.</p>
    <div class="letter-footer">
        <p>وتفضلوا بقبول فائق الاحترام،</p>
        <p><strong>${name}</strong></p>
    </div>`;
    document.getElementById('motPreview').innerHTML = letter;
    document.getElementById('motResult').style.display = 'block';
    document.getElementById('motResult').scrollIntoView({ behavior: 'smooth' });
}
function printMotivation() { printElement('motPreview'); }
function downloadMotivation() { downloadAsPDF('motPreview', 'رسالة_تحفيزية'); }

// ====== TOOL: GPA CALCULATOR ======
function addGPArow() {
    const tbody = document.getElementById('gpaBody');
    const tr = document.createElement('tr');
    tr.innerHTML = `<td><input type="text" class="subject-name" placeholder="المادة"></td>
        <td><input type="number" class="subject-grade" placeholder="0" min="0" step="0.1"></td>
        <td><input type="number" class="subject-credits" placeholder="1" min="0" step="0.5" value="3"></td>
        <td><button class="btn-icon-danger" onclick="removeGPArow(this)"><i class="fas fa-times"></i></button></td>`;
    tbody.appendChild(tr);
}
function removeGPArow(btn) { btn.closest('tr').remove(); }
function calculateGPA() {
    const system = parseInt(document.getElementById('gpaSystem').value);
    const rows = document.querySelectorAll('#gpaBody tr');
    let totalPoints = 0, totalCredits = 0, valid = false;
    rows.forEach(row => {
        const grade = parseFloat(row.querySelector('.subject-grade')?.value);
        const credits = parseFloat(row.querySelector('.subject-credits')?.value);
        if (!isNaN(grade) && !isNaN(credits) && credits > 0) {
            let points = 0;
            if (system === 4) {
                if (grade >= 90) points = 4.0;
                else if (grade >= 85) points = 3.7;
                else if (grade >= 80) points = 3.3;
                else if (grade >= 75) points = 3.0;
                else if (grade >= 70) points = 2.7;
                else if (grade >= 65) points = 2.3;
                else if (grade >= 60) points = 2.0;
                else if (grade >= 55) points = 1.7;
                else if (grade >= 50) points = 1.0;
                else points = 0;
            } else if (system === 5) {
                if (grade >= 90) points = 5.0;
                else if (grade >= 85) points = 4.5;
                else if (grade >= 80) points = 4.0;
                else if (grade >= 75) points = 3.5;
                else if (grade >= 70) points = 3.0;
                else if (grade >= 65) points = 2.5;
                else if (grade >= 60) points = 2.0;
                else points = 0;
            } else if (system === 100) { points = Math.min(grade, 100); }
            else if (system === 20) { points = Math.min(grade / 5, 20); }
            totalPoints += points * credits;
            totalCredits += credits;
            valid = true;
        }
    });
    if (!valid) { showToast('الرجاء إدخال المواد والدرجات'); return; }
    const gpa = totalPoints / totalCredits;
    document.getElementById('gpaValue').textContent = gpa.toFixed(2);
    document.getElementById('gpaTotalCredits').textContent = totalCredits;
    document.getElementById('gpaResult').style.display = 'block';
    document.getElementById('gpaResult').scrollIntoView({ behavior: 'smooth' });
}
function updateGPAInputs() {
    document.getElementById('gpaResult').style.display = 'none';
}

// ====== TOOL: SCHOLARSHIP LETTER ======
function generateScholarshipLetter() {
    const name = document.getElementById('slName').value.trim();
    if (!name) { showToast('الرجاء إدخال اسمك'); return; }
    const email = document.getElementById('slEmail').value.trim();
    const phone = document.getElementById('slPhone').value.trim();
    const prov = document.getElementById('slProvider').value.trim();
    if (!prov) { showToast('الرجاء إدخال الجهة المانحة'); return; }
    const sn = document.getElementById('slScholarshipName').value.trim();
    if (!sn) { showToast('الرجاء إدخال اسم المنحة'); return; }
    const level = document.getElementById('slLevel').value;
    const major = document.getElementById('slMajor').value.trim();
    const uni = document.getElementById('slUniversity').value.trim();
    const reason = document.getElementById('slReason').value.trim();
    const now = new Date();
    const dateStr = now.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
    const letter = `<div class="letter-header">
        <p>${dateStr}</p>
        <p>إلى السيد/السيدة المحترم/ة<br>${prov}</p>
        <p>الموضوع: طلب التقديم على ${sn}</p>
    </div>
    <p>السلام عليكم ورحمة الله وبركاته،</p>
    <p>أنا <strong>${name}</strong>${email ? ' (' + email + ')' : ''}، أتقدم بطلب للحصول على ${sn} التي تقدمها ${prov}.</p>
    ${level ? `<p>المستوى الدراسي: ${level}</p>` : ''}
    ${major ? `<p>التخصص: ${major}</p>` : ''}
    ${uni ? `<p>الجامعة المفضلة: ${uni}</p>` : ''}
    ${phone ? `<p>رقم الهاتف: ${phone}</p>` : ''}
    ${reason ? `<p>سبب التقديم:<br>${reason}</p>` : ''}
    <p>أرفق طيه المستندات المطلوبة، وأتقدم بجزيل الشكر على حسن النظر في طلبي.</p>
    <div class="letter-footer">
        <p>وتفضلوا بقبول فائق الاحترام،</p>
        <p><strong>${name}</strong></p>
    </div>`;
    document.getElementById('slPreview').innerHTML = letter;
    document.getElementById('slResult').style.display = 'block';
    document.getElementById('slResult').scrollIntoView({ behavior: 'smooth' });
}
function printScholarshipLetter() { printElement('slPreview'); }
function downloadScholarshipLetter() { downloadAsPDF('slPreview', 'طلب_منحة'); }

// ====== UTILITIES ======
function printElement(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const win = window.open('', '', 'width=800,height=600');
    win.document.write(`<html dir="rtl"><head><meta charset="UTF-8"><title>طباعة</title>
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap" rel="stylesheet">
        <style>body{font-family:Tajawal,sans-serif;padding:40px;line-height:1.8;color:#1a1a2e}${id === 'cvPreview' ? '.cv-header-preview{text-align:center;border-bottom:2px solid #0d6efd;padding-bottom:16px;margin-bottom:16px}.cv-header-preview h2{color:#0d6efd}.cv-section-preview h3{color:#0d6efd;border-bottom:1px solid #e2e8f0;padding-bottom:4px;margin-bottom:8px}' : ''}</style></head><body>${el.innerHTML}</body></html>`);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 500);
}

function downloadAsPDF(id, filename) {
    const el = document.getElementById(id);
    if (!el) return;
    const win = window.open('', '', 'width=800,height=600');
    win.document.write(`<html dir="rtl"><head><meta charset="UTF-8"><title>${filename}</title>
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap" rel="stylesheet">
        <style>body{font-family:Tajawal,sans-serif;padding:40px;line-height:1.8;color:#1a1a2e}${id === 'cvPreview' ? '.cv-header-preview{text-align:center;border-bottom:2px solid #0d6efd;padding-bottom:16px;margin-bottom:16px}.cv-header-preview h2{color:#0d6efd}.cv-section-preview h3{color:#0d6efd;border-bottom:1px solid #e2e8f0;padding-bottom:4px;margin-bottom:8px}' : ''}</style></head><body>${el.innerHTML}</body></html>`);
    win.document.close();
    win.focus();
    setTimeout(() => {
        win.print();
        setTimeout(() => win.close(), 1000);
    }, 500);
    showToast('تم تحميل الملف بنجاح');
}

function resetTool(tool) {
    const panel = document.getElementById('tool-' + tool);
    if (!panel) return;
    const forms = panel.querySelectorAll('input:not([type="hidden"]), textarea, select');
    forms.forEach(f => f.value = '');
    const result = panel.querySelector('.tool-result');
    if (result) result.style.display = 'none';
    if (tool === 'gpa') {
        const tbody = document.getElementById('gpaBody');
        tbody.innerHTML = `<tr>
            <td><input type="text" class="subject-name" placeholder="المادة"></td>
            <td><input type="number" class="subject-grade" placeholder="0" min="0" step="0.1"></td>
            <td><input type="number" class="subject-credits" placeholder="1" min="0" step="0.5" value="3"></td>
            <td><button class="btn-icon-danger" onclick="removeGPArow(this)"><i class="fas fa-times"></i></button></td>
        </tr>`;
    }
    showToast('تم إعادة تعيين الأداة');
}

// ====== LEGAL PAGES ======
const legalContent = {
    about: {
        title: 'حول التطبيق',
        html: `<h2>منحتي - منصتك للفرص التعليمية</h2>
        <p>منحتي هي منصة عربية متكاملة تهدف إلى مساعدة الطلاب والباحثين في العثور على المنح الدراسية المناسبة، والتكوين عن بعد، بالإضافة إلى أدوات مجانية لمساعدتهم في مسارهم التعليمي والمهني.</p>
        <h3>رؤيتنا</h3>
        <p>نحن نؤمن بأن التعليم حق للجميع، ونسعى لجعل فرص التعليم متاحة للجميع بغض النظر عن خلفياتهم المادية أو الجغرافية.</p>
        <h3>مهمتنا</h3>
        <p>تقديم معلومات دقيقة حول المنح الدراسية المتاحة، ودورات تكوينية مجانية ومدفوعة، وأدوات عملية لمساعدة الطلاب في تقديم طلباتهم بنجاح.</p>
        <h3>القيم</h3>
        <ul><li>المصداقية والشفافية في المعلومات</li><li>الجودة في المحتوى والخدمات</li><li>تكافؤ الفرص للجميع</li><li>الابتكار والتطوير المستمر</li></ul>
        <p>جميع الحقوق محفوظة &copy; 2026 منحتي.</p>`
    },
    privacy: {
        title: 'سياسة الخصوصية',
        html: `<p>آخر تحديث: يوليو 2026</p>
        <p>نحن في منحتي نلتزم بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك الشخصية.</p>
        <h2>المعلومات التي نجمعها</h2>
        <p><strong>المعلومات الشخصية:</strong> الاسم، البريد الإلكتروني، رقم الهاتف - فقط عندما تقدمها طواعية عبر نماذج التواصل أو الاشتراك.</p>
        <p><strong>معلومات الاستخدام:</strong> نستخدم Google Analytics و Google AdMob لفهم كيفية استخدامك للتطبيق وتحسين الإعلانات.</p>
        <h2>الإعلانات (AdMob)</h2>
        <p>يستخدم هذا التطبيق خدمة Google AdMob لعرض الإعلانات. قد تقوم AdMob بجمع بيانات غير شخصية لتقديم إعلانات مناسبة. يمكنك الاطلاع على سياسة خصوصية Google لمعرفة المزيد: <a href="https://policies.google.com/privacy" target="_blank">https://policies.google.com/privacy</a></p>
        <p>نحن نلتزم بسياسة المحتوى المناسب لـ AdMob ولا نعرض إعلانات خادعة أو مضللة.</p>
        <h2>كيف نستخدم معلوماتك</h2>
        <ul><li>تحسين خدماتنا وتجربة المستخدم</li><li>تقديم إعلانات مناسبة عبر AdMob</li><li>إرسال إشعارات حول المنح الجديدة (إذا اشتركت)</li><li>الرد على استفساراتك</li></ul>
        <h2>حماية البيانات</h2>
        <p>نستخدم إجراءات أمنية لحماية معلوماتك. لا نبيع أو نشارك معلوماتك الشخصية مع أطراف ثالثة لأغراض تسويقية.</p>
        <h2>ملفات تعريف الارتباط (Cookies)</h2>
        <p>نستخدم ملفات تعريف الارتباط لتحسين تجربتك. يمكنك التحكم في ذلك من خلال إعدادات المتصفح.</p>
        <h2>حقوقك</h2>
        <p>لديك الحق في الوصول إلى بياناتك أو تصحيحها أو حذفها. يمكنك الاتصال بنا في أي وقت.</p>
        <h2>التعديلات</h2>
        <p>قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي تغييرات جوهرية.</p>
        <p>للاستفسارات: <a href="mailto:minhatlive@gmail.com">minhatlive@gmail.com</a></p>`
    },
    terms: {
        title: 'شروط الاستخدام',
        html: `<p>آخر تحديث: يوليو 2026</p>
        <p>باستخدامك لتطبيق منحتي، فإنك توافق على الشروط والأحكام التالية:</p>
        <h2>قبول الشروط</h2>
        <p>باستخدامك للتطبيق، فإنك تقر بأنك قد قرأت وفهمت وتوافق على الالتزام بشروط الاستخدام هذه.</p>
        <h2>المحتوى</h2>
        <p>المعلومات المتعلقة بالمنح الدراسية هي لأغراض إعلامية فقط. نوصي بالتحقق من المعلومات عبر المصادر الرسمية. لا نضمن قبول أي طلب أو الحصول على منحة.</p>
        <h2>الملكية الفكرية</h2>
        <p>جميع المحتويات (النصوص، التصاميم، الشعارات) هي ملك لمنحتي، ولا يجوز نسخها أو إعادة نشرها دون إذن خطي.</p>
        <h2>الاستخدام المسموح</h2>
        <p>يسمح باستخدام التطبيق للأغراض الشخصية والتعليمية فقط. لا يجوز استخدام التطبيق لأي أغراض غير قانونية.</p>
        <h2>إخلاء المسؤولية</h2>
        <p>لا نتحمل مسؤولية أي أضرار قد تنجم عن استخدام التطبيق. نقدم الخدمات "كما هي" دون أي ضمانات.</p>
        <h2>التعديلات</h2>
        <p>نحتفظ بالحق في تعديل هذه الشروط في أي وقت. استمرار استخدامك للتطبيق بعد التعديل يعني موافقتك على الشروط الجديدة.</p>`
    },
    contact: {
        title: 'اتصل بنا',
        html: `<h2>تواصل معنا</h2>
        <p>نحن هنا للإجابة عن استفساراتك ومساعدتك. لا تتردد في التواصل معنا عبر أي من القنوات التالية:</p>
        <p><strong><i class="fas fa-envelope"></i> البريد الإلكتروني:</strong> <a href="mailto:minhatlive@gmail.com">minhatlive@gmail.com</a></p>
        <p><strong><i class="fas fa-map-marker-alt"></i> العنوان:</strong> منحتي - منصة الفرص التعليمية</p>
        <p>نحن نقدر ملاحظاتك واقتراحاتك. تواصل معنا وسنرد عليك في أقرب وقت ممكن.</p>
        <p>أو يمكنك استخدام نموذج الاتصال المباشر في التطبيق.</p>
        <p>شكراً لاستخدامك منحتي!</p>`
    }
};

function showLegalPage(page) {
    const content = legalContent[page];
    if (!content) return;
    document.getElementById('legalTitle').textContent = content.title;
    document.getElementById('legalContent').innerHTML = content.html;
    navigate('legal');
}

// ====== INIT ======
renderHome();
renderScholarships('all');
renderFormations('all');
