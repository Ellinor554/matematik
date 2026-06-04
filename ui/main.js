import { exState, wsScore, findQ } from '../engine/state.js';
import { checkAnswer } from '../engine/check.js';
import { renderAccordion, renderQuestion, fmtAnswer, renderMath } from '../engine/render.js';
import grade5Taluppfattning from '../data/grade5/taluppfattning.js';
import grade6Taluppfattning from '../data/grade6/taluppfattning.js';

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

// ── Topic metadata ─────────────────────────────────────────────────────────────
const GRADE_TOPICS = {
  4: [
    { key: 'taluppfattning',          icon: 'N', name: 'Taluppfattning',                   desc: 'Positionssystemet, tallinjen, avrundning och mentala räknestrategier.' },
    { key: 'uppstallning',            icon: '#', name: 'Uppställning',                     desc: 'Skriftliga algoritmer för addition, subtraktion och de fyra räknesätten.' },
    { key: 'tid-statistik',           icon: 't', name: 'Tid och Statistik',                desc: 'Klockan, tidsenheter, diagram, tabeller och att tolka data.' },
    { key: 'multiplikation-division', icon: '×', name: 'Multiplikation och division',      desc: 'Multiplikation och division med hela tal, tabeller och algoritmer.' },
    { key: 'geometri',                icon: '△', name: 'Geometri',                         desc: 'Former, vinklar, symmetri, area och omkrets.' },
    { key: 'volym',                   icon: '◻', name: 'Volym',                            desc: 'Enheter för volym, mätning och omvandlingar.' },
    { key: 'vikt',                    icon: '⚖', name: 'Vikt',                             desc: 'Enheter för massa, mätning och omvandlingar.' },
  ],
  5: [
    { key: 'brak-decimalform',         icon: '%', name: 'Bråk och decimalform',             desc: 'Bråk, decimaltal, tiondels- och hundredelsform samt jämförelser.' },
    { key: 'fyra-raksesatten-decimal', icon: '±', name: 'De fyra räknesätten: Decimalform', desc: 'Addition, subtraktion, multiplikation och division med decimaltal.' },
    { key: 'tid-statistik',            icon: 't', name: 'Tid och statistik',                desc: 'Klockan, tidsenheter, diagram, tabeller och att tolka data.' },
    { key: 'uppstallning-decimal',     icon: '#', name: 'Uppställning: Decimalform',        desc: 'Skriftliga algoritmer för räkning med decimaltal.' },
    { key: 'geometri',                 icon: '△', name: 'Geometri',                         desc: 'Former, vinklar, symmetri, area och omkrets.' },
    { key: 'volym',                    icon: '◻', name: 'Volym',                            desc: 'Enheter för volym, mätning och omvandlingar.' },
    { key: 'vikt',                     icon: '⚖', name: 'Vikt',                             desc: 'Enheter för massa, mätning och omvandlingar.' },
  ],
  6: [
    { key: 'taluppfattning',  icon: 'N', name: 'Taluppfattning',   desc: 'Stora tal, positionssystemet, avrundning och tallinjen.' },
    { key: 'brak-procent',    icon: '%', name: 'Bråk och procent', desc: 'Bråk, decimaltal, procent och proportionalitet.' },
    { key: 'algebra',         icon: 'x', name: 'Algebra',          desc: 'Variabler, uttryck, ekvationer och mönster.' },
    { key: 'geometri',        icon: '△', name: 'Geometri',         desc: 'Former, vinklar, area, omkrets och koordinatsystem.' },
    { key: 'nationella-prov', icon: '★', name: 'Nationella prov',  desc: 'Övning inför nationella proven i matematik.' },
  ],
};

// ── Data registry: 'grade:topicKey' → worksheets array ────────────────────────
const TOPIC_DATA = {
  '5:brak-decimalform': grade5Taluppfattning,
  '6:taluppfattning':   grade6Taluppfattning,
};

// Flat list per grade for home screen totals
const GRADE_WORKSHEETS = {
  5: [...grade5Taluppfattning],
  6: [...grade6Taluppfattning],
};

let WORKSHEETS   = [];
let currentGrade = 0;

// ── Home screen ───────────────────────────────────────────────────────────────
function updateHomeProgress() {
  [5, 6].forEach(grade => {
    const wsList = GRADE_WORKSHEETS[grade] || [];
    const total  = wsList.reduce((s, ws) => s + ws.questions.length, 0);
    const done   = wsList.reduce((s, ws) =>
      s + ws.questions.filter(q => exState[q.id]?.correct === true).length, 0);
    const el = document.getElementById(`home-grade${grade}-status`);
    if (el) el.textContent = done > 0 ? `${done}/${total} klara` : `${total} uppgifter`;
  });
}

// ── Grade selection ───────────────────────────────────────────────────────────
function selectGrade(grade) {
  currentGrade = grade;

  document.getElementById('home-view').style.display  = 'none';
  document.getElementById('topic-view').style.display = 'none';
  const gradeView = document.getElementById('grade-view');
  gradeView.style.display = '';
  gradeView.classList.add('sidebar-open');
  document.querySelector('.sidebar').classList.add('visible');

  document.querySelectorAll('.nav-grade').forEach(g => g.classList.remove('open'));
  document.getElementById('grade' + grade)?.classList.add('open');
  document.querySelectorAll('.nav-subitem').forEach(i => i.classList.remove('active'));

  document.getElementById('breadcrumb-grade').textContent = grade;
  document.getElementById('page-kicker').textContent = 'Årskurs ' + grade;
  const orn = document.getElementById('ornament-num');
  if (orn) orn.textContent = grade;

  const topics = GRADE_TOPICS[grade] || [];
  const totalQ = topics.reduce((s, t) => {
    const ws = TOPIC_DATA[`${grade}:${t.key}`] || [];
    return s + ws.reduce((ss, w) => ss + w.questions.length, 0);
  }, 0);
  document.getElementById('stat-uppgifter').textContent  = totalQ || '—';
  document.getElementById('stat-delomraden').textContent = topics.length;

  renderTopicsGrid(grade);
}

function renderTopicsGrid(grade) {
  const topics = GRADE_TOPICS[grade] || [];
  const grid   = document.getElementById('topics-grid');
  if (!grid) return;
  grid.innerHTML = topics.map(t => {
    const ws    = TOPIC_DATA[`${grade}:${t.key}`] || [];
    const total = ws.reduce((s, w) => s + w.questions.length, 0);
    const done  = ws.reduce((s, w) =>
      s + w.questions.filter(q => exState[q.id]?.correct === true).length, 0);
    const countText = total > 0 ? `${total} uppgifter` : '0 uppgifter';
    const doneHtml  = done > 0 ? `<span class="meta-tag done-tag">${done} klara</span>` : '';
    return `<div class="topic-card" data-topic="${t.key}" onclick="App.goTopicFromCard(this)">
      <div class="topic-card-icon">${t.icon}</div>
      <div class="topic-card-name">${t.name}</div>
      <div class="topic-card-desc">${t.desc}</div>
      <div class="topic-card-meta">
        <span class="meta-tag">${countText}</span>
        ${doneHtml}
      </div>
    </div>`;
  }).join('');
}

function goHome() {
  document.getElementById('grade-view').style.display  = 'none';
  document.getElementById('grade-view').classList.remove('sidebar-open');
  document.getElementById('topic-view').style.display  = 'none';
  document.getElementById('topic-view').classList.remove('sidebar-open');
  document.querySelector('.sidebar').classList.remove('visible');
  document.getElementById('home-view').style.display = '';
  updateHomeProgress();
}

function goGrade() {
  selectGrade(currentGrade);
}

// ── Sidebar navigation ────────────────────────────────────────────────────────
function toggleGrade(id) {
  const el     = document.getElementById(id);
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.nav-grade').forEach(g => g.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
}

function selectItem(el) {
  const grade    = parseInt(el.dataset.grade, 10);
  const topicKey = el.dataset.topic;
  const topicName = el.textContent.trim();
  goTopicView(grade, topicKey, topicName);
}

function goTopicFromCard(card) {
  const topicKey  = card.dataset.topic;
  const topicName = card.querySelector('.topic-card-name').textContent.trim();
  goTopicView(currentGrade, topicKey, topicName);
}

// ── Topic view ────────────────────────────────────────────────────────────────
function goTopicView(grade, topicKey, topicName) {
  currentGrade = grade;
  WORKSHEETS   = TOPIC_DATA[`${grade}:${topicKey}`] || [];

  document.getElementById('home-view').style.display  = 'none';
  document.getElementById('grade-view').style.display = 'none';
  const topicView = document.getElementById('topic-view');
  topicView.style.display = '';
  topicView.classList.add('sidebar-open');
  document.querySelector('.sidebar').classList.add('visible');

  document.querySelectorAll('.nav-grade').forEach(g => g.classList.remove('open'));
  document.getElementById('grade' + grade)?.classList.add('open');
  document.querySelectorAll('.nav-subitem').forEach(i => i.classList.remove('active'));
  document.querySelector(`.nav-subitem[data-grade="${grade}"][data-topic="${topicKey}"]`)?.classList.add('active');

  document.getElementById('tv-grade').textContent      = grade;
  document.getElementById('tv-topic-name').textContent = topicName;
  document.getElementById('tv-kicker').textContent     = 'Årskurs ' + grade;
  document.getElementById('tv-title').textContent      = topicName;
  document.getElementById('tv-ornament').textContent   = grade;
  document.getElementById('tv-panel-title').textContent = topicName;

  const panel = document.getElementById('tv-exercise-panel');

  if (WORKSHEETS.length === 0) {
    panel.innerHTML = `<div class="ex-coming-soon">Uppgifter för ${topicName} (Årskurs ${grade}) kommer snart.</div>`;
    document.getElementById('tv-panel-badge').textContent = '0 uppgifter';
    return;
  }

  panel.innerHTML = WORKSHEETS.map(ws => renderAccordion(ws)).join('');
  const total = WORKSHEETS.reduce((s, ws) => s + ws.questions.length, 0);
  document.getElementById('tv-panel-badge').textContent = total + ' uppgifter';
  toggleWs(WORKSHEETS[0].id);
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

  const temp = document.createElement('div');
  temp.innerHTML = renderQuestion(q);
  card.replaceWith(temp.firstElementChild);

  const { done, total } = wsScore(ws);
  const isDone = done === total && total > 0;

  const fill  = document.getElementById('pfill-' + ws.id);
  const score = document.getElementById('pscore-' + ws.id);
  if (fill)  fill.style.width = `${(done / total) * 100}%`;
  if (score) {
    score.textContent = isDone ? `✓ ${done}/${total}` : `${done}/${total}`;
    score.className   = `ws-acc-score${isDone ? ' done' : ''}`;
  }

  const acc = document.getElementById('ws-' + ws.id);
  if (acc) {
    if (isDone) {
      acc.classList.add('done');
      const inner = acc.querySelector('.ws-acc-inner');
      if (inner && !inner.querySelector('.ws-redo-row')) {
        const redo = document.createElement('div');
        redo.className = 'ws-redo-row';
        redo.innerHTML = `<button class="ws-redo-btn" onclick="App.resetWs('${ws.id}')">Gör om</button>`;
        inner.appendChild(redo);
      }
    } else {
      acc.classList.remove('done');
    }
  }

  const body = document.getElementById('wsbody-' + ws.id);
  if (acc?.classList.contains('open') && body?.style.maxHeight !== 'none') {
    body.style.maxHeight = body.scrollHeight + 'px';
  }
}

// ── Reset worksheet ───────────────────────────────────────────────────────────
function resetWs(wsId) {
  const ws = WORKSHEETS.find(w => w.id === wsId);
  if (!ws) return;
  for (const q of ws.questions) {
    exState[q.id] = { value: '', correct: null, locked: false, attempts: 0, revealed: false };
  }
  saveState();
  const acc = document.getElementById('ws-' + wsId);
  if (!acc) return;
  const wasOpen = acc.classList.contains('open');
  const t = document.createElement('div');
  t.innerHTML = renderAccordion(ws);
  acc.replaceWith(t.firstElementChild);
  if (wasOpen) toggleWs(wsId);
}

// ── Exercise interactions ─────────────────────────────────────────────────────
function selectChoice(qId, val) {
  const result = findQ(WORKSHEETS, qId);
  if (!result || exState[qId]?.locked) return;
  const { q, ws } = result;
  const isCorrect    = checkAnswer(val, q.a);
  const prevAttempts = exState[qId]?.attempts || 0;
  const attempts     = isCorrect ? prevAttempts : prevAttempts + 1;
  const revealed     = !isCorrect && attempts >= 3;
  const locked       = isCorrect || revealed;
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

// ── Search ────────────────────────────────────────────────────────────────────
function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ').trim();
}

function normalize(s) {
  return s.toLowerCase()
    .replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o');
}

function openSearch() {
  document.getElementById('search-overlay').style.display = '';
  const inp = document.getElementById('search-input');
  inp.value = '';
  document.getElementById('search-results').innerHTML = '';
  inp.focus();
}

function closeSearch() {
  document.getElementById('search-overlay').style.display = 'none';
}

function doSearch(query) {
  const results = document.getElementById('search-results');
  if (!query.trim()) { results.innerHTML = ''; return; }

  const q = normalize(query.trim());
  const groups = [];

  for (const [key, wsList] of Object.entries(TOPIC_DATA)) {
    const [gradeStr, topicKey] = key.split(':');
    const grade     = parseInt(gradeStr);
    const topicMeta = (GRADE_TOPICS[grade] || []).find(t => t.key === topicKey);
    if (!topicMeta) continue;

    const topicNorm = normalize(topicMeta.name);
    const matches   = [];

    for (const ws of wsList) {
      const wsTitleNorm = normalize(ws.title);
      for (const question of ws.questions) {
        const text  = normalize(stripHtml(question.t));
        const group = normalize(question.g || '');
        if (text.includes(q) || group.includes(q) || wsTitleNorm.includes(q) || topicNorm.includes(q)) {
          matches.push(question);
        }
      }
    }

    if (matches.length > 0) {
      groups.push({ grade, topicKey, topicName: topicMeta.name, count: matches.length, samples: matches.slice(0, 3) });
    }
  }

  if (groups.length === 0) {
    results.innerHTML = '<div class="search-empty">Inga uppgifter hittades för den sökningen.</div>';
    return;
  }

  results.innerHTML = groups.map(g => {
    const samples = g.samples.map(s =>
      `<div class="search-sample">${stripHtml(s.t)}</div>`
    ).join('');
    const more = g.count > 3
      ? `<div class="search-more">+ ${g.count - 3} uppgifter till…</div>`
      : '';
    return `<div class="search-group" onclick="App.goFromSearch(${g.grade},'${g.topicKey}','${g.topicName.replace(/'/g, "\\'")}')">
      <div class="search-group-header">
        <span class="search-grade-badge">Åk ${g.grade}</span>
        <span class="search-group-topic">${g.topicName}</span>
        <span class="search-group-count">${g.count} uppgifter</span>
      </div>
      <div class="search-group-samples">${samples}${more}</div>
    </div>`;
  }).join('');
}

function goFromSearch(grade, topicKey, topicName) {
  closeSearch();
  goTopicView(grade, topicKey, topicName);
}

// ── Theme ─────────────────────────────────────────────────────────────────────
function toggleDark() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('matematik_theme', isDark ? 'dark' : 'light');
}

// ── Init ──────────────────────────────────────────────────────────────────────
function init() {
  if (localStorage.getItem('matematik_theme') === 'dark') {
    document.body.classList.add('dark');
  }
  loadState();
  updateHomeProgress();
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSearch();
  });
}

window.App = {
  selectGrade, goHome, goGrade,
  toggleGrade, selectItem,
  goTopicFromCard, goTopicView,
  toggleWs, selectChoice, checkQ, revealQ, retryQ, clearFb, resetWs,
  toggleDark,
  openSearch, closeSearch, doSearch, goFromSearch
};

init();
