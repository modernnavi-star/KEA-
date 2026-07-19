// ============ KEA GROUP C EXAM PREP APP ============
// Core application logic

const LS_KEY = 'kea_study_v2';
let state, quizState, postponeTimer, postponeCount = 0;

function defaultState() {
  return {
    lang: 'kn',
    theme: 'light',
    currentDay: 1,
    completedDays: {},
    topicProgress: {},
    quizScores: [],
    lastActive: new Date().toISOString(),
    postponeCount: 0,
    postponesToday: 0,
    lastPostponeDate: null,
    currentAffairsUpdated: null,
    sidebarOpen: false,
    version: APP_VERSION,
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      const d = defaultState();
      for (let k of Object.keys(d)) {
        if (!(k in s)) s[k] = d[k];
      }
      // Reset postpones if new day
      const today = new Date().toISOString().slice(0,10);
      if (s.lastPostponeDate !== today) {
        s.postponesToday = 0;
        s.lastPostponeDate = today;
      }
      return s;
    }
  } catch(e) {}
  return defaultState();
}

function saveState() {
  state.lastActive = new Date().toISOString();
  try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch(e) {}
}

function lang() { return state.lang; }
function t(knText, enText) { return lang() === 'kn' ? knText : enText; }

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
  state = loadState();
  document.documentElement.setAttribute('data-lang', state.lang);
  document.documentElement.setAttribute('data-theme', state.theme);
  initApp();
});

function initApp() {
  updateCountdown();
  updateUI();
  navigateTo('dashboard');
  document.getElementById('splashScreen').classList.add('hide');
  setTimeout(() => {
    const splash = document.getElementById('splashScreen');
    if (splash) splash.style.display = 'none';
  }, 500);
  document.getElementById('appShell').style.display = 'block';

  // Check for force learning
  checkForceLearning();

  // Periodic checks
  setInterval(updateCountdown, 60000);
  setInterval(checkForceLearning, 300000); // every 5 min

  // Load current affairs
  initCurrentAffairs();

  // Sidebar overlay for mobile
  document.addEventListener('click', handleOutsideClick);
}

// ============ SIDEBAR ============
function toggleSidebar() {
  state.sidebarOpen = !state.sidebarOpen;
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  sidebar.classList.toggle('open', state.sidebarOpen);
  if (overlay) overlay.classList.toggle('show', state.sidebarOpen);
  saveState();
}

function handleOutsideClick(e) {
  if (state.sidebarOpen && window.innerWidth < 768) {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('menuBtn');
    const overlay = document.getElementById('sidebarOverlay');
    if (!sidebar.contains(e.target) && e.target !== menuBtn && e.target !== overlay) {
      state.sidebarOpen = false;
      sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('show');
      saveState();
    }
  }
}

// ============ NAVIGATION ============
function navigateTo(view) {
  // Close sidebar on mobile
  if (window.innerWidth < 768) {
    state.sidebarOpen = false;
    document.getElementById('sidebar').classList.remove('open');
    const overlay = document.getElementById('sidebarOverlay');
    if (overlay) overlay.classList.remove('show');
  }

  // Update nav links
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const navLink = document.querySelector(`[data-nav="${view}"]`);
  if (navLink) navLink.classList.add('active');

  const main = document.getElementById('mainContent');

  switch(view) {
    case 'dashboard': renderDashboard(main); break;
    case 'studyplan': renderStudyPlan(main); break;
    case 'lessons': renderLessons(main); break;
    case 'quiz': renderQuizView(main); break;
    case 'currentaffairs': renderCurrentAffairs(main); break;
    case 'paper1': renderPaperView(main, 1); break;
    case 'paper2': renderPaperView(main, 2); break;
    default: renderDashboard(main);
  }
  main.scrollTop = 0;
  saveState();
}

// Handle hash-based navigation
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.slice(1) || 'dashboard';
  navigateTo(hash);
});

// ============ COUNTDOWN ============
function updateCountdown() {
  const now = new Date();
  const diff = EXAM_DATE - now;
  const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  const el = document.getElementById('countdownDays');
  if (el) {
    el.textContent = days;
    if (days <= 7) el.style.color = '#ff5252';
    else if (days <= 30) el.style.color = '#ffab40';
  }
}

// ============ UI UPDATES ============
function updateUI() {
  document.documentElement.setAttribute('data-lang', state.lang);
  document.documentElement.setAttribute('data-theme', state.theme);
  updateCountdown();

  // Update theme toggle icon
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) themeBtn.textContent = state.theme === 'dark' ? '☀️' : '🌓';

  // Determine current day
  const done = Object.keys(state.completedDays).length;
  state.currentDay = Math.min(done + 1, 16);
}

function toggleLang() {
  state.lang = state.lang === 'kn' ? 'en' : 'kn';
  saveState();
  updateUI();
  const hash = window.location.hash.slice(1) || 'dashboard';
  navigateTo(hash);
  showToast(t('ಭಾಷೆ ಬದಲಾಯಿಸಲಾಗಿದೆ ✅','Language changed ✅'));
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  saveState();
  updateUI();
  const hash = window.location.hash.slice(1) || 'dashboard';
  navigateTo(hash);
}

function resetProgress() {
  if (confirm(t('ಎಲ್ಲಾ ಪ್ರಗತಿ ಅಳಿಸಲು ಖಚಿತವೇ?','Are you sure you want to reset all progress?'))) {
    state = defaultState();
    state.lang = document.documentElement.getAttribute('data-lang') || 'kn';
    state.theme = document.documentElement.getAttribute('data-theme') || 'light';
    postponeCount = 0;
    saveState();
    updateUI();
    navigateTo('dashboard');
    showToast(t('ಪ್ರಗತಿ ಮರುಹೊಂದಿಸಲಾಗಿದೆ 🔄','Progress reset 🔄'));
  }
}

// ============ DASHBOARD ============
function renderDashboard(main) {
  const done = Object.keys(state.completedDays).length;
  const totalQuizzes = state.quizScores.length;
  const avg = totalQuizzes > 0 ? Math.round(state.quizScores.reduce((a,b) => a+(b.score/b.total)*100, 0) / totalQuizzes) : 0;

  // Get today's plan
  const todayPlan = studyPlan.find(d => d.day === state.currentDay);

  main.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-val">${done}/16</div><div class="stat-lbl">${t('ದಿನಗಳು ಮುಗಿದವು','Days Done')}</div></div>
      <div class="stat-card"><div class="stat-val">${totalQuizzes}</div><div class="stat-lbl">${t('ಕ್ವಿಜ್‌ಗಳು','Quizzes')}</div></div>
      <div class="stat-card"><div class="stat-val">${avg}%</div><div class="stat-lbl">${t('ಸರಾಸರಿ ಸ್ಕೋರ್','Avg Score')}</div></div>
      <div class="stat-card"><div class="stat-val" id="miniCountdown">--</div><div class="stat-lbl">${t('ಪರೀಕ್ಷೆಗೆ ದಿನಗಳು','Days to Exam')}</div></div>
    </div>

    <div class="progress-wrap">
      <div class="progress-label"><span>${t('ಒಟ್ಟಾರೆ ಪ್ರಗತಿ','Overall Progress')}</span><span>${Math.round(done/16*100)}%</span></div>
      <div class="progress-bar"><div class="progress-fill" style="width:${done/16*100}%"></div></div>
    </div>

    ${todayPlan ? `
    <div class="card card-accent">
      <h2>🎯 ${t('ಇಂದಿನ ಗಮನ - ದಿನ '+state.currentDay,'Today\'s Focus - Day '+state.currentDay)}</h2>
      <p style="font-size:1rem;font-weight:600;margin:8px 0;">${t(todayPlan.title_kn, todayPlan.title_en)}</p>
      <p style="font-size:0.82rem;color:var(--text2);">${t('ಪೇಪರ್','Paper')} ${todayPlan.paper} | ${todayPlan.topics.length} ${t('ವಿಷಯಗಳು','topics')}</p>
      <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-primary btn-lg" onclick="startTodaysLesson()">📖 ${t('ಈಗ ಕಲಿಯಿರಿ','Study Now')}</button>
        ${!state.completedDays[state.currentDay] ? `
        <button class="btn btn-success" onclick="markDayComplete(state.currentDay)">✓ ${t('ಪೂರ್ಣಗೊಳಿಸಿದೆ','Mark Done')}</button>
        ` : `<span style="color:var(--accent2);font-weight:700;">✅ ${t('ಪೂರ್ಣಗೊಂಡಿದೆ','Completed')}</span>`}
      </div>
    </div>` : (done >= 16 ? `
    <div class="card card-success">
      <h2>🎉 ${t('ಅಭಿನಂದನೆಗಳು!','Congratulations!')}</h2>
      <p>${t('ಎಲ್ಲಾ 16 ದಿನಗಳ ಅಧ್ಯಯನ ಪೂರ್ಣಗೊಂಡಿದೆ! ಪುನರಾವರ್ತನೆ ಮಾಡಿ.','All 16 days completed! Revise now.')}</p>
    </div>` : '')}

    <div class="card">
      <h2>📊 ${t('ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು','Quick Links')}</h2>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        <button class="btn btn-outline" onclick="navigateTo('studyplan')">📅 ${t('16-ದಿನ ಯೋಜನೆ','16-Day Plan')}</button>
        <button class="btn btn-outline" onclick="navigateTo('lessons')">📖 ${t('ಎಲ್ಲಾ ಪಾಠಗಳು','All Lessons')}</button>
        <button class="btn btn-outline" onclick="startFullMock()">🔥 ${t('ಪೂರ್ಣ ಮಾಕ್ ಟೆಸ್ಟ್','Full Mock Test')}</button>
        <button class="btn btn-outline" onclick="navigateTo('currentaffairs')">📰 ${t('ಪ್ರಚಲಿತ ಘಟನೆಗಳು','Current Affairs')}</button>
      </div>
    </div>
  `;

  // Update mini countdown
  setTimeout(updateCountdown, 100);
  setTimeout(() => {
    const mini = document.getElementById('miniCountdown');
    if (mini) {
      const diff = EXAM_DATE - new Date();
      mini.textContent = Math.max(0, Math.ceil(diff/(1000*60*60*24)));
    }
  }, 200);
}

// ============ STUDY PLAN VIEW ============
function renderStudyPlan(main) {
  let html = '<div class="card"><h2>📅 ' + t('16-ದಿನಗಳ ಅಧ್ಯಯನ ಯೋಜನೆ','16-Day Study Plan') + '</h2>';
  html += '<p style="color:var(--text2);font-size:0.85rem;margin-bottom:12px;">' +
    t('ದಿನಗಳು ಅನುಕ್ರಮವಾಗಿ ಅನ್‌ಲಾಕ್ ಆಗುತ್ತವೆ. ಮುಂದಿನ ದಿನಕ್ಕೆ ಹೋಗಲು ಕ್ವಿಜ್‌ನಲ್ಲಿ 60%+ ಪಡೆಯಬೇಕು.',
      'Days unlock sequentially. Score 60%+ on quiz to unlock next day.') +
    '</p>';

  html += '<p style="font-size:0.82rem;color:var(--accent);margin-bottom:12px;"><strong>' +
    t('🔒 = ಲಾಕ್ ಆಗಿದೆ | ✅ = ಪೂರ್ಣಗೊಂಡಿದೆ | 🔥 = ಇಂದಿನ ದಿನ',
      '🔒 = Locked | ✅ = Completed | 🔥 = Today') +
    '</strong></p>';

  html += '<div class="day-grid">';
  for (let d of studyPlan) {
    const done = state.completedDays[d.day];
    const today = d.day === state.currentDay;
    const locked = d.day > state.currentDay;
    let cls = '';
    if (done) cls = 'completed';
    else if (today) cls = 'today';
    else if (locked) cls = 'locked';

    html += `<div class="day-card ${cls}" onclick="${locked ? '' : `openDayLesson(${d.day})`}">
      ${done ? '<span class="day-badge">✅</span>' : today ? '<span class="day-badge">🔥</span>' : ''}
      <div class="day-num">${d.day}</div>
      <div class="day-label">${t(d.title_kn, d.title_en)}</div>
    </div>`;
  }
  html += '</div></div>';

  // Current day detail
  const plan = studyPlan.find(d => d.day === state.currentDay);
  if (plan) {
    html += `<div class="card card-accent">
      <h2>🔥 ${t('ದಿನ '+state.currentDay+': '+plan.title_kn, 'Day '+state.currentDay+': '+plan.title_en)}</h2>
      <p style="color:var(--text2);font-size:0.85rem;">${t('ಪೇಪರ್','Paper')} ${plan.paper}</p>
      <div style="margin-top:8px;">`;
    for (let tid of plan.topics) {
      const topic = allTopics[tid];
      if (topic) html += `<span style="display:inline-block;background:var(--surface2);padding:4px 10px;border-radius:12px;font-size:0.78rem;margin:2px;">${t(topic.title_kn, topic.title_en)}</span>`;
    }
    html += `</div>
      <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-primary" onclick="openDayLesson(${state.currentDay})">📖 ${t('ಪಾಠ ಓದಿ','Read Lesson')}</button>
        <button class="btn btn-success" onclick="startQuizForDay(${state.currentDay})">📝 ${t('ಕ್ವಿಜ್ ತೆಗೆದುಕೊಳ್ಳಿ','Take Quiz')}</button>
        ${!state.completedDays[state.currentDay] ? `
        <button class="btn btn-outline" onclick="markDayComplete(${state.currentDay})">✓ ${t('ಪೂರ್ಣಗೊಳಿಸಿ','Mark Complete')}</button>` : ''}
      </div>
    </div>`;
  }

  main.innerHTML = html;
}

// ============ DAY LESSON MODAL ============
function openDayLesson(day) {
  const plan = studyPlan.find(d => d.day === day);
  if (!plan || day > state.currentDay) {
    showToast(t('ಮೊದಲು ಹಿಂದಿನ ದಿನ ಪೂರ್ಣಗೊಳಿಸಿ!','Complete previous day first!'));
    return;
  }

  let html = `<button class="modal-close" onclick="closeModal()">✕</button>`;
  html += `<h2>${t('ದಿನ','Day')} ${day}: ${t(plan.title_kn, plan.title_en)}</h2>`;
  html += `<p style="color:var(--text2);font-size:0.85rem;margin-bottom:12px;">${t('ಪೇಪರ್','Paper')} ${plan.paper}</p>`;
  html += `<div class="lesson-content">`;

  for (let tid of plan.topics) {
    const topic = allTopics[tid];
    if (!topic) continue;
    html += `<h3>📌 ${t(topic.title_kn, topic.title_en)}</h3>`;
    const lesson = lang() === 'kn' ? topic.lesson_kn : topic.lesson_en;
    html += `<div style="white-space:pre-line;font-size:0.9rem;margin-bottom:16px;">${lesson}</div>`;
    html += `<hr>`;

    // Mark as read
    if (!state.topicProgress[tid]) state.topicProgress[tid] = {};
    state.topicProgress[tid].read = true;
  }
  html += `</div>`;
  html += `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">
    <button class="btn btn-primary" onclick="startQuizForDay(${day});closeModal();">📝 ${t('ಕ್ವಿಜ್ ತೆಗೆದುಕೊಳ್ಳಿ','Take Quiz')}</button>
    ${!state.completedDays[day] ? `<button class="btn btn-success" onclick="markDayComplete(${day});closeModal();">✓ ${t('ಪೂರ್ಣಗೊಳಿಸಿ','Mark Complete')}</button>` : ''}
    <button class="btn btn-ghost" onclick="closeModal()">${t('ಮುಚ್ಚಿ','Close')}</button>
  </div>`;

  showModal(html);
  saveState();
}

function startTodaysLesson() {
  closeForceModal();
  openDayLesson(state.currentDay);
}

// ============ MARK DAY COMPLETE ============
function markDayComplete(day) {
  state.completedDays[day] = true;
  postponeCount = 0;
  state.postponesToday = 0;
  saveState();
  updateUI();
  const hash = window.location.hash.slice(1) || 'dashboard';
  navigateTo(hash);
  showToast(t('🎉 ದಿನ '+day+' ಪೂರ್ಣಗೊಂಡಿದೆ!','🎉 Day '+day+' completed!'));
}

// ============ LESSONS VIEW ============
function renderLessons(main) {
  let html = '';
  for (let [sk, sg] of Object.entries(subjectGroups)) {
    html += `<div class="card">
      <h2>${t(sg.title_kn, sg.title_en)} <span style="font-size:0.75rem;color:var(--text3);">${t('ಪೇಪರ್','Paper')} ${sg.paper}</span></h2>`;
    for (let tid of sg.topics) {
      const topic = allTopics[tid];
      if (!topic) continue;
      const prog = state.topicProgress[tid];
      html += `<div class="topic-item${prog&&prog.read?' completed':''}" onclick="openTopicLesson('${tid}')">
        <span class="topic-name">${prog&&prog.read?'✅ ':'📖 '}${t(topic.title_kn, topic.title_en)}</span>
        <span class="topic-status">${prog&&prog.quizDone?((prog.quizScore||0)+'/'+(prog.quizTotal||3)):'→'}</span>
      </div>`;
    }
    html += `</div>`;
  }
  main.innerHTML = html;
}

function openTopicLesson(tid) {
  const topic = allTopics[tid];
  if (!topic) return;

  if (!state.topicProgress[tid]) state.topicProgress[tid] = {};
  state.topicProgress[tid].read = true;
  saveState();

  let html = `<button class="modal-close" onclick="closeModal()">✕</button>`;
  html += `<h2>${t(topic.title_kn, topic.title_en)}</h2>`;
  html += `<p style="color:var(--text2);font-size:0.85rem;">${t('ಪೇಪರ್','Paper')} ${topic.paper} | ${topic.subject}</p>`;
  html += `<div class="lesson-content" style="white-space:pre-line;font-size:0.9rem;margin-top:12px;">${lang()==='kn'?topic.lesson_kn:topic.lesson_en}</div>`;
  html += `<div style="margin-top:16px;display:flex;gap:8px;">
    <button class="btn btn-primary" onclick="startQuizForTopic('${tid}');closeModal();">📝 ${t('ಕ್ವಿಜ್','Quiz')}</button>
    <button class="btn btn-ghost" onclick="closeModal()">${t('ಮುಚ್ಚಿ','Close')}</button>
  </div>`;
  showModal(html);
}

// ============ PAPER VIEWS ============
function renderPaperView(main, paper) {
  const title = paper === 1 ? t('📄 ಪೇಪರ್ 1: ಸಾಮಾನ್ಯ ಜ್ಞಾನ (100 ಅಂಕಗಳು)','📄 Paper 1: General Knowledge (100 Marks)')
    : t('📄 ಪೇಪರ್ 2: ಭಾಷೆ ಮತ್ತು ಕಂಪ್ಯೂಟರ್ (100 ಅಂಕಗಳು)','📄 Paper 2: Language & Computer (100 Marks)');
  let html = `<h2 style="margin-bottom:12px;">${title}</h2>`;
  if (paper === 2) {
    html += '<p style="color:var(--text2);font-size:0.85rem;margin-bottom:12px;">' +
      t('ಸಾಮಾನ್ಯ ಕನ್ನಡ (~35%), ಸಾಮಾನ್ಯ ಇಂಗ್ಲಿಷ್ (~35%), ಕಂಪ್ಯೂಟರ್ ಜ್ಞಾನ (~30%)',
        'Kannada (~35%), English (~35%), Computer (~30%)') + '</p>';
  }
  for (let [sk, sg] of Object.entries(subjectGroups)) {
    if (sg.paper !== paper) continue;
    html += `<div class="card">
      <h2>${t(sg.title_kn, sg.title_en)}</h2>
      <p style="font-size:0.82rem;color:var(--text2);margin-bottom:8px;">${sg.topics.length} ${t('ವಿಷಯಗಳು','topics')}</p>`;
    for (let tid of sg.topics) {
      const topic = allTopics[tid];
      if (!topic) continue;
      html += `<div class="topic-item" onclick="openTopicLesson('${tid}')">
        <span class="topic-name">📖 ${t(topic.title_kn, topic.title_en)}</span></div>`;
    }
    html += `<button class="btn btn-outline mt-8" onclick="startQuizForSubject('${sk}')">📝 ${t('ಕ್ವಿಜ್','Quiz')}</button>`;
    html += `</div>`;
  }
  main.innerHTML = html;
}

// ============ QUIZ SYSTEM ============
function renderQuizView(main) {
  if (quizState) { renderQuizQuestion(main); return; }

  main.innerHTML = `
    <div class="card">
      <h2>📝 ${t('ಕ್ವಿಜ್ ಆಯ್ಕೆಮಾಡಿ','Select Quiz')}</h2>
      <p style="color:var(--text2);margin-bottom:12px;">${t('ಯಾವ ವಿಷಯದ ಕ್ವಿಜ್ ತೆಗೆದುಕೊಳ್ಳಲು ಬಯಸುತ್ತೀರಿ?','Which quiz do you want to take?')}</p>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        <button class="btn btn-primary" onclick="startQuizForDay(state.currentDay)">🎯 ${t('ಇಂದಿನ ದಿನದ ಕ್ವಿಜ್','Today\'s Quiz')}</button>
        <button class="btn btn-outline" onclick="startFullMock()">🔥 ${t('ಪೂರ್ಣ ಮಾಕ್ ಟೆಸ್ಟ್ (25 Q)','Full Mock (25 Q)')}</button>
      </div>
      <div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:6px;">
        ${Object.entries(subjectGroups).map(([sk,sg]) =>
          `<button class="btn btn-ghost btn-sm" onclick="startQuizForSubject('${sk}')">${t(sg.title_kn, sg.title_en)}</button>`
        ).join('')}
      </div>
    </div>
  `;
}

function startQuizForDay(day) {
  const plan = studyPlan.find(d => d.day === day);
  if (!plan) return;
  startQuiz(plan.topics, t('ದಿನ '+day+' ಕ್ವಿಜ್','Day '+day+' Quiz'), day);
}

function startQuizForSubject(sk) {
  const sg = subjectGroups[sk];
  if (!sg) return;
  startQuiz(sg.topics, t(sg.title_kn, sg.title_en), null);
}

function startQuizForTopic(tid) {
  startQuiz([tid], t(allTopics[tid].title_kn, allTopics[tid].title_en), null);
}

function startFullMock() {
  const allIds = Object.keys(allTopics);
  const shuffled = allIds.sort(() => Math.random() - 0.5);
  startQuiz(shuffled.slice(0, 20), t('ಪೂರ್ಣ ಮಾಕ್ ಟೆಸ್ಟ್','Full Mock Test'), null);
}

function startQuiz(topicIds, title, dayNum) {
  let questions = [];
  for (let tid of topicIds) {
    if (quizBank[tid]) {
      for (let q of quizBank[tid]) {
        questions.push({...q, topicId: tid});
      }
    }
  }
  if (questions.length === 0) {
    showToast(t('ಪ್ರಶ್ನೆಗಳು ಲಭ್ಯವಿಲ್ಲ','No questions available'));
    return;
  }
  questions = questions.sort(() => Math.random() - 0.5).slice(0, Math.min(25, questions.length));

  quizState = { title, questions, currentIdx: 0, score: 0, answers: [], topicIds, dayNum };
  navigateTo('quiz');
}

function renderQuizQuestion(main) {
  if (!quizState) { renderQuizView(main); return; }
  const qs = quizState;
  const q = qs.questions[qs.currentIdx];
  const isLast = qs.currentIdx === qs.questions.length - 1;
  const pct = qs.currentIdx / qs.questions.length * 100;
  const answered = qs.answers[qs.currentIdx] !== undefined;
  const opts = lang() === 'kn' ? q.o_kn : q.o_en;

  main.innerHTML = `
    <div class="card">
      <div class="quiz-progress"><div class="quiz-progress-bar" style="width:${pct}%"></div></div>
      <h2>📝 ${qs.title}</h2>
      <p style="font-size:0.82rem;color:var(--text2);">${t('ಪ್ರಶ್ನೆ','Question')} ${qs.currentIdx+1}/${qs.questions.length} | ${t('ಸ್ಕೋರ್','Score')}: ${qs.score}</p>
      <div class="quiz-question" style="margin-top:8px;">${lang()==='kn'?q.q_kn:q.q_en}</div>
      ${opts.map((o,i) => {
        let cls = 'quiz-option';
        if (answered) {
          if (i === q.ans) cls += ' correct';
          if (i === qs.answers[qs.currentIdx] && i !== q.ans) cls += ' wrong';
        }
        return `<button class="${cls}" onclick="answerQuestion(${i})" ${answered?'disabled':''}>${String.fromCharCode(65+i)}. ${o}</button>`;
      }).join('')}
      <div style="margin-top:12px;display:flex;gap:8px;">
        ${answered && !isLast ? `<button class="btn btn-primary" onclick="nextQuestion()">${t('ಮುಂದಿನ →','Next →')}</button>` : ''}
        ${answered && isLast ? `<button class="btn btn-success" onclick="finishQuiz()">🏆 ${t('ಫಲಿತಾಂಶ','Results')}</button>` : ''}
        <button class="btn btn-ghost" onclick="quizState=null;navigateTo('quiz');">${t('ರದ್ದು','Cancel')}</button>
      </div>
    </div>
  `;
}

function answerQuestion(idx) {
  if (!quizState || quizState.answers[quizState.currentIdx] !== undefined) return;
  const q = quizState.questions[quizState.currentIdx];
  quizState.answers[quizState.currentIdx] = idx;
  if (idx === q.ans) quizState.score++;
  saveState();
  const main = document.getElementById('mainContent');
  renderQuizQuestion(main);
}

function nextQuestion() {
  if (!quizState) return;
  quizState.currentIdx++;
  const main = document.getElementById('mainContent');
  renderQuizQuestion(main);
  main.scrollTop = 0;
}

function finishQuiz() {
  if (!quizState) return;
  const qs = quizState;
  const total = qs.questions.length;
  const score = qs.score;
  const pct = Math.round(score/total*100);
  const passed = pct >= PASS_THRESHOLD;

  // Save
  for (let tid of qs.topicIds) {
    if (!state.topicProgress[tid]) state.topicProgress[tid] = {};
    state.topicProgress[tid].quizDone = true;
    state.topicProgress[tid].quizScore = pct;
    state.topicProgress[tid].quizTotal = total;
  }
  state.quizScores.push({ date: new Date().toISOString().slice(0,10), topic: qs.title, score, total });

  // Auto-unlock next day if passed and this was a day quiz
  if (passed && qs.dayNum && qs.dayNum === state.currentDay && !state.completedDays[qs.dayNum]) {
    state.completedDays[qs.dayNum] = true;
    postponeCount = 0;
  }
  saveState();
  updateUI();

  const emoji = pct >= 80 ? '🎉' : pct >= 60 ? '👍' : pct >= 40 ? '📚' : '💪';
  const main = document.getElementById('mainContent');
  main.innerHTML = `
    <div class="card">
      <div class="quiz-result">
        <div class="quiz-result-icon">${emoji}</div>
        <div class="quiz-result-score">${score}/${total}</div>
        <div class="quiz-result-label">${pct}% — ${passed ? t('✅ ಉತ್ತೀರ್ಣ! ಮುಂದಿನ ದಿನ ಅನ್‌ಲಾಕ್!','✅ Passed! Next day unlocked!') : t('❌ ಇನ್ನೂ ಪ್ರಯತ್ನಿಸಿ (60%+ ಬೇಕು)','❌ Try again (Need 60%+)')}</div>
      </div>
      <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
        <button class="btn btn-primary" onclick="startQuizForDay(state.currentDay)">🔄 ${t('ಮರುಪ್ರಯತ್ನ','Retry')}</button>
        <button class="btn btn-outline" onclick="navigateTo('studyplan')">📅 ${t('ಯೋಜನೆ','Plan')}</button>
        <button class="btn btn-outline" onclick="quizState=null;navigateTo('quiz');">📋 ${t('ಇನ್ನೊಂದು ಕ್ವಿಜ್','Another Quiz')}</button>
      </div>
    </div>
  `;
  quizState = null;
}

// ============ CURRENT AFFAIRS VIEW ============
function renderCurrentAffairs(main) {
  const ca = getCachedCurrentAffairs();
  let html = `<div class="card">
    <h2>📰 ${t('ಪ್ರಚಲಿತ ಘಟನೆಗಳು','Current Affairs')}</h2>
    <p style="font-size:0.82rem;color:var(--text2);margin-bottom:8px;">${t('ಪ್ರಮುಖ ರಾಷ್ಟ್ರೀಯ, ರಾಜ್ಯ ಮತ್ತು ಅಂತರರಾಷ್ಟ್ರೀಯ ಸುದ್ದಿಗಳು','Key national, state & international news')}</p>
    <button class="btn btn-outline btn-sm mb-8" onclick="refreshCurrentAffairs()">🔄 ${t('ರಿಫ್ರೆಶ್ ಮಾಡಿ','Refresh')}</button>
    ${ca.lastUpdated ? `<p style="font-size:0.7rem;color:var(--text3);">${t('ಕೊನೆಯ ನವೀಕರಣ','Last updated')}: ${new Date(ca.lastUpdated).toLocaleString()}</p>` : ''}
  </div>`;

  if (ca.news && ca.news.length > 0) {
    for (let item of ca.news) {
      html += `<div class="news-card">
        <span class="news-date">${item.date||''}</span>
        <span class="news-tag ${item.tag||'national'}">${item.tag||'national'}</span>
        <div class="news-title">${lang()==='kn'&&item.title_kn ? item.title_kn : item.title_en}</div>
        <div class="news-desc">${lang()==='kn'&&item.desc_kn ? item.desc_kn : item.desc_en}</div>
      </div>`;
    }
  } else {
    html += `<div class="card empty-state">
      <div class="empty-icon">📭</div>
      <p>${t('ಪ್ರಚಲಿತ ಘಟನೆಗಳು ಲೋಡ್ ಆಗಿವೆ. ರಿಫ್ರೆಶ್ ಮಾಡಿ.','Current affairs loading. Please refresh.')}</p>
    </div>`;
  }

  // Key GK section
  html += `<div class="card mt-12">
    <h2>⭐ ${t('ಪ್ರಮುಖ GK (ಪರೀಕ್ಷೆಗೆ ಅತ್ಯಗತ್ಯ)','Key GK (Exam Essential)')}</h2>
    <div class="lesson-content" style="white-space:pre-line;">${lang()==='kn' ? allTopics.current_affairs.lesson_kn : allTopics.current_affairs.lesson_en}</div>
    <button class="btn btn-primary mt-8" onclick="openTopicLesson('current_affairs')">📖 ${t('ಪೂರ್ಣ ಪಾಠ ಓದಿ','Read Full Lesson')}</button>
  </div>`;

  main.innerHTML = html;
}

// ============ FORCE LEARNING SYSTEM ============
function checkForceLearning() {
  const today = new Date().toISOString().slice(0,10);
  if (state.lastPostponeDate !== today) {
    state.postponesToday = 0;
    state.lastPostponeDate = today;
    saveState();
  }

  // Don't check during quiz
  if (quizState) return;

  // Check if today's study is pending
  if (state.currentDay > 16) return;
  if (state.completedDays[state.currentDay]) return;

  const hour = new Date().getHours();
  // Show force modal at 9 AM, 2 PM, 7 PM, 10 PM if not completed
  const checkHours = [9, 14, 19, 22];
  if (checkHours.includes(hour) && state.postponesToday < MAX_POSTPONES) {
    showForceModal();
  }
}

function showForceModal() {
  const plan = studyPlan.find(d => d.day === state.currentDay);
  if (!plan) return;

  document.getElementById('forceModalBody').innerHTML = `
    <strong>${t('ದಿನ '+state.currentDay, 'Day '+state.currentDay)}:</strong> ${t(plan.title_kn, plan.title_en)}<br>
    <span style="color:var(--text2);">${t('ಪ್ರತಿದಿನ ಅಧ್ಯಯನ ಮಾಡುವುದು ಯಶಸ್ಸಿನ ಕೀಲಿಕೈ!','Daily study is key to success!')}</span>
  `;
  document.getElementById('postponeCount').textContent = state.postponesToday >= 2
    ? t('⚠️ ಇದು ಕೊನೆಯ ಮುಂದೂಡಿಕೆ!','⚠️ Last postpone! Study now!') : '';

  const postponeBtn = document.getElementById('forcePostponeBtn');
  if (state.postponesToday >= MAX_POSTPONES - 1) {
    postponeBtn.style.opacity = '0.5';
    postponeBtn.innerHTML = '⏰ ' + t('ಇನ್ನು ಮುಂದೂಡಲಾಗದು','Cannot postpone further');
    postponeBtn.disabled = true;
  } else {
    postponeBtn.style.opacity = '1';
    postponeBtn.innerHTML = '⏳ ' + t('ಸ್ವಲ್ಪ ಹೊತ್ತು ಮುಂದೂಡಿ','Postpone Briefly');
    postponeBtn.disabled = false;
  }

  document.getElementById('forceModalOverlay').classList.add('show');
}

function closeForceModal() {
  document.getElementById('forceModalOverlay').classList.remove('show');
}

function postponeStudy() {
  state.postponesToday++;
  state.lastPostponeDate = new Date().toISOString().slice(0,10);
  saveState();
  closeForceModal();

  const minutes = state.postponesToday === 1 ? 120 : state.postponesToday === 2 ? 60 : 30;
  showToast(t(`⏰ ${minutes} ನಿಮಿಷಗಳ ನಂತರ ಮತ್ತೆ ನೆನಪಿಸಲಾಗುವುದು`,`⏰ Will remind again in ${minutes} minutes`));

  if (postponeTimer) clearTimeout(postponeTimer);
  postponeTimer = setTimeout(() => {
    if (!state.completedDays[state.currentDay]) showForceModal();
  }, minutes * 60000);
}

// ============ MODAL ============
function showModal(html) {
  document.getElementById('modalOverlay').innerHTML = `<div class="modal">${html}</div>`;
  document.getElementById('modalOverlay').classList.add('show');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('show');
}

// Modal overlay click
document.addEventListener('click', function(e) {
  if (e.target.id === 'modalOverlay') closeModal();
  if (e.target.id === 'forceModalOverlay') {/* don't close force modal on overlay click */}
});

// ============ TOAST ============
function showToast(msg) {
  const container = document.getElementById('toastContainer');
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 2500);
}

// ============ INITIAL NAVIGATION ============
// Handle initial hash
const initHash = window.location.hash.slice(1) || 'dashboard';
setTimeout(() => navigateTo(initHash), 100);
