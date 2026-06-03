import { exState, wsScore, findQ } from '../engine/state.js';
import { checkAnswer } from '../engine/check.js';
import { renderAccordion, renderQuestion, fmtAnswer, renderMath } from '../engine/render.js';
import grade5Taluppfattning from '../data/grade5/taluppfattning.js';

const LS_KEY = 'matematik_exstate';

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
    Object.assign(exState, saved);
  } catch (_) {}
}

function saveState() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(exState));
  } catch (_) {}
}

// Grade worksheets registry — add more grades here as data is created
const GRADE_WORKSHEETS = {
  5: [...grade5Taluppfattning]
};

let WORKSHEETS = [];

// ── Topic progress ────────────────────────────────────────────────────────────
function updateTopicProgress() {
  if (WORKSHEETS.length === 0) return;
  const total = WORKSHEETS.reduce((s, ws) => s + ws.questions.length, 0);
  const done  = WORKSHEETS.reduce((s, ws) =>
    s + ws.questions.filter(q => exState[q.id]?.correct === true).length, 0);
  const el = document.getElementById('tag-done');
  if (!el) return;
  if (done > 0) {
    el.textContent = done + ' klara';
    el.style.display = '';
  } else {
    el.style.display = 'none';
  }
}

// ── Home screen ───────────────────────────────────────────────────────────────
function updateHomeProgress() {
  const ws5   = GRADE_WORKSHEETS[5] || [];
  const total = ws5.reduce((s, ws) => s + ws.questions.length, 0);
  const done  = ws5.reduce((s, ws) =>
    s + ws.questions.filter(q => exState[q.id]?.correct === true).length, 0);
  const el = document.getElementById('home-grade5-status');
  if (el) el.textContent = done > 0 ? `${done}/${total} klara` : `${total} uppgifter`;
}

// ── Grade selection ───────────────────────────────────────────────────────────
function selectGrade(grade) {
  WORKSHEETS = GRADE_WORKSHEETS[grade] || [];

  document.getElementById('home-view').style.display = 'none';
  const gradeView = document.getElementById('grade-view');
  gradeView.style.display = '';
  gradeView.classList.add('sidebar-open');
  document.querySelector('.sidebar').classList.add('visible');

  document.querySelectorAll('.nav-grade').forEach(g => g.classList.remove('open'));
  document.getElementById('grade' + grade)?.classList.add('open');

  document.getElementById('breadcrumb-grade').textContent = grade;
  document.getElementById('page-kicker').textContent = 'Årskurs ' + grade;
  document.getElementById('stat-grade').textContent = 'Åk ' + grade;
  const orn = document.getElementById('ornament-num');
  if (orn) orn.textContent = grade;

  const panel = document.getElementById('exercise-panel');
  if (!panel) return;

  if (WORKSHEETS.length === 0) {
    panel.innerHTML = `<div class="ex-coming-soon">Uppgifter för Årskurs ${grade} kommer snart.</div>`;
    document.getElementById('stat-uppgifter').textContent = '0';
    document.getElementById('tag-uppgifter').textContent  = '0 uppgifter';
    document.getElementById('panel-badge').textContent    = '0 uppgifter';
    const tagDone = document.getElementById('tag-done');
    if (tagDone) tagDone.style.display = 'none';
    return;
  }

  panel.innerHTML = WORKSHEETS.map(ws => renderAccordion(ws)).join('');

  const total = WORKSHEETS.reduce((s, ws) => s + ws.questions.length, 0);
  document.getElementById('stat-uppgifter').textContent = total;
  document.getElementById('tag-uppgifter').textContent  = total + ' uppgifter';
  document.getElementById('panel-badge').textContent    = total + ' uppgifter';

  toggleWs('ab1');
  updateTopicProgress();
}

function goHome() {
  document.getElementById('grade-view').style.display = 'none';
  document.getElementById('grade-view').classList.remove('sidebar-open');
  document.querySelector('.sidebar').classList.remove('visible');
  document.getElementById('home-view').style.display = '';
  updateHomeProgress();
}

// ── Sidebar navigation ────────────────────────────────────────────────────────
function toggleGrade(id) {
  const el = document.getElementById(id);
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.nav-grade').forEach(g => g.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
}

function selectItem(el) {
  document.querySelectorAll('.nav-subitem').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
}

function selectTopic(card) {
  document.querySelectorAll('.topic-card').forEach(c => c.classList.remove('active'));
  card.classList.add('active');
  const name = card.querySelector('.topic-card-name').textContent;
  document.querySelector('.module-panel-title').textContent = name;
  document.querySelector('.stat-card.accent .stat-card-sub').textContent =
    name.length > 22 ? name.slice(0, 22) + '…' : name;
  document.querySelectorAll('.meta-tag.active-tag').forEach(t => {
    t.classList.remove('active-tag');
    t.textContent = '0 uppgifter';
  });
  const tags = card.querySelectorAll('.meta-tag');
  if (tags.length === 1) {
    const span = document.createElement('span');
    span.className = 'meta-tag active-tag';
    span.textContent = 'Aktivt';
    card.querySelector('.topic-card-meta').prepend(span);
  } else {
    tags[0].classList.add('active-tag');
    tags[0].textContent = 'Aktivt';
  }

  // Scroll to exercises, accounting for sticky topbar
  const panel = document.querySelector('.module-panel');
  if (panel) {
    const topbarH = document.querySelector('.topbar')?.offsetHeight || 68;
    const top = panel.getBoundingClientRect().top + window.scrollY - topbarH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

// ── Exercise accordion ────────────────────────────────────────────────────────
function toggleWs(wsId) {
  const acc  = document.getElementById('ws-' + wsId);
  const body = document.getElementById('wsbody-' + wsId);
  const isOpen = acc.classList.contains('open');
  if (isOpen) {
    body.style.maxHeight = body.scrollHeight + 'px';
    requestAnimationFrame(() => { body.style.maxHeight = '0'; });
    acc.classList.remove('open');
  } else {
    acc.classList.add('open');
    body.style.maxHeight = body.scrollHeight + 'px';
    setTimeout(() => { if (acc.classList.contains('open')) body.style.maxHeight = 'none'; }, 420);
  }
}

// ── Card re-render ────────────────────────────────────────────────────────────
function updateCard(q, ws) {
  const card = document.getElementById('excard-' + q.id);
  if (!card) return;

  // Re-render in place so render logic stays in one place (render.js)
  const temp = document.createElement('div');
  temp.innerHTML = renderQuestion(q);
  card.replaceWith(temp.firstElementChild);

  // Update accordion progress bar and score
  const { done, total } = wsScore(ws);
  const fill  = document.getElementById('pfill-' + ws.id);
  const score = document.getElementById('pscore-' + ws.id);
  if (fill)  fill.style.width = `${(done / total) * 100}%`;
  if (score) { score.textContent = `${done}/${total}`; score.className = `ws-acc-score${done === total ? ' done' : ''}`; }

  // Keep accordion body height correct while animating open
  const body = document.getElementById('wsbody-' + ws.id);
  const acc  = document.getElementById('ws-' + ws.id);
  if (acc?.classList.contains('open') && body?.style.maxHeight !== 'none') {
    body.style.maxHeight = body.scrollHeight + 'px';
  }

  updateTopicProgress();
}

// ── Exercise interactions ─────────────────────────────────────────────────────
function selectChoice(qId, val) {
  const result = findQ(WORKSHEETS, qId);
  if (!result || exState[qId]?.locked) return;
  const { q, ws } = result;
  const isCorrect   = checkAnswer(val, q.a);
  const prevAttempts = exState[qId]?.attempts || 0;
  const attempts    = isCorrect ? prevAttempts : prevAttempts + 1;
  const revealed    = !isCorrect && attempts >= 3;
  const locked      = isCorrect || revealed;
  exState[qId] = { value: val, correct: isCorrect ? true : false, locked, attempts, revealed };
  updateCard(q, ws);
  saveState();
}

function checkQ(qId) {
  const result = findQ(WORKSHEETS, qId);
  if (!result) return;
  const s = exState[qId];
  if (s?.locked || s?.revealed) return;
  const { q, ws } = result;
  const inp = document.getElementById('exinp-' + qId);
  const val = inp?.value.trim();
  if (!val) return;
  const correct      = checkAnswer(val, q.a);
  const prevAttempts = s?.attempts || 0;
  const attempts     = correct ? prevAttempts : prevAttempts + 1;
  const locked       = correct || attempts >= 3;
  exState[qId] = { value: val, correct: correct ? true : false, locked, attempts, revealed: false };
  updateCard(q, ws);
  saveState();
}

function revealQ(qId) {
  const result = findQ(WORKSHEETS, qId);
  if (!result) return;
  const { q, ws } = result;
  const prev = exState[qId] || {};
  exState[qId] = { value: prev.value || '', correct: null, locked: true, attempts: prev.attempts || 3, revealed: true };
  updateCard(q, ws);
  saveState();
}

function retryQ(qId) {
  const result = findQ(WORKSHEETS, qId);
  if (!result) return;
  const { q, ws } = result;
  exState[qId] = { value: '', correct: null, locked: false, attempts: 0, revealed: false };
  updateCard(q, ws);
  saveState();
  setTimeout(() => { document.getElementById('exinp-' + qId)?.focus(); }, 50);
}

function clearFb(qId) {
  const s = exState[qId];
  if (s?.correct != null) {
    exState[qId] = { value: '', correct: null, locked: false, attempts: s.attempts || 0, revealed: false };
    const inp  = document.getElementById('exinp-' + qId);
    const card = document.getElementById('excard-' + qId);
    inp?.classList.remove('ok', 'err');
    card?.classList.remove('ok', 'err');
  }
}

// ── Init ──────────────────────────────────────────────────────────────────────
function init() {
  loadState();
  updateHomeProgress();
}

window.App = { selectGrade, goHome, toggleGrade, selectItem, selectTopic, toggleWs, selectChoice, checkQ, revealQ, retryQ, clearFb };

init();
