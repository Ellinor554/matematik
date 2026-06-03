import { exState, wsScore, findQ } from '../engine/state.js';
import { checkAnswer } from '../engine/check.js';
import { renderAccordion, renderQuestion, fmtAnswer, renderMath } from '../engine/render.js';
import grade5Taluppfattning from '../data/grade5/taluppfattning.js';

// ── Active worksheets for the current view ────────────────────────────────────
const WORKSHEETS = [...grade5Taluppfattning];

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

// ── Exercise interactions ─────────────────────────────────────────────────────
function selectChoice(qId, val) {
  const result = findQ(WORKSHEETS, qId);
  if (!result || exState[qId]?.locked) return;
  const { q, ws } = result;
  exState[qId] = { value: val, correct: checkAnswer(val, q.a), locked: true };
  updateCard(q, ws);
}

function checkQ(qId) {
  const result = findQ(WORKSHEETS, qId);
  if (!result) return;
  const { q, ws } = result;
  const inp = document.getElementById('exinp-' + qId);
  const val = inp?.value.trim();
  if (!val) return;
  const correct = checkAnswer(val, q.a);
  exState[qId] = { value: val, correct, locked: correct };
  updateCard(q, ws);
}

function retryQ(qId) {
  const result = findQ(WORKSHEETS, qId);
  if (!result) return;
  const { q, ws } = result;
  exState[qId] = { value: '', correct: null, locked: false };
  updateCard(q, ws);
  setTimeout(() => { document.getElementById('exinp-' + qId)?.focus(); }, 50);
}

function clearFb(qId) {
  if (exState[qId]?.correct != null) {
    exState[qId] = { value: '', correct: null, locked: false };
    const inp  = document.getElementById('exinp-' + qId);
    const card = document.getElementById('excard-' + qId);
    inp?.classList.remove('ok', 'err');
    card?.classList.remove('ok', 'err');
  }
}

function updateCard(q, ws) {
  const card = document.getElementById('excard-' + q.id);
  if (!card) return;
  const s = exState[q.id];

  card.classList.remove('ok', 'err');
  if (s.correct === true)  card.classList.add('ok');
  if (s.correct === false) card.classList.add('err');

  if (q.choices) {
    const container = document.getElementById('exc-' + q.id);
    if (container) {
      container.innerHTML = q.choices.map(c => {
        let cls = '';
        if (s.locked) {
          cls = checkAnswer(c.replace(',', '.'), q.a) ? 'ok' : (s.value === c ? 'err' : '');
        } else if (s.value === c) cls = 'selected';
        return `<button class="ex-choice ${cls}" ${s.locked ? 'disabled' : ''}
          onclick="App.selectChoice('${q.id}','${c.replace(/'/g, "\\'")}')">
          ${renderMath(c)}
        </button>`;
      }).join('');
    }
  } else {
    const inp = document.getElementById('exinp-' + q.id);
    if (inp) {
      inp.classList.remove('ok', 'err');
      if (s.correct === true)  inp.classList.add('ok');
      if (s.correct === false) inp.classList.add('err');
      if (s.locked) inp.setAttribute('readonly', ''); else inp.removeAttribute('readonly');
      const btn = inp.nextElementSibling;
      if (btn) {
        if (!s.locked) {
          btn.className = 'ex-check-btn';
          btn.textContent = 'Kontrollera';
          btn.onclick = () => checkQ(q.id);
        } else {
          btn.className = 'ex-retry-btn';
          btn.textContent = 'Försök igen';
          btn.onclick = () => retryQ(q.id);
        }
      }
    }
  }

  card.querySelector('.ex-feedback')?.remove();
  card.querySelector('.ex-hint')?.remove();
  if (s.correct === true)  card.insertAdjacentHTML('beforeend', `<div class="ex-feedback ok">Rätt</div>`);
  if (s.correct === false) card.insertAdjacentHTML('beforeend', `<div class="ex-feedback err">Rätt svar: ${fmtAnswer(q.a)}</div>`);
  if (q.hint && !s.locked) card.insertAdjacentHTML('beforeend', `<div class="ex-hint">${q.hint}</div>`);

  // Update accordion score
  const { done, total } = wsScore(ws);
  const fill  = document.getElementById('pfill-' + ws.id);
  const score = document.getElementById('pscore-' + ws.id);
  if (fill)  fill.style.width = `${(done / total) * 100}%`;
  if (score) { score.textContent = `${done}/${total}`; score.className = `ws-acc-score${done === total ? ' done' : ''}`; }

  // Keep accordion body height correct while open
  const body = document.getElementById('wsbody-' + ws.id);
  const acc  = document.getElementById('ws-' + ws.id);
  if (acc?.classList.contains('open') && body?.style.maxHeight !== 'none') {
    body.style.maxHeight = body.scrollHeight + 'px';
  }
}

// ── Init ──────────────────────────────────────────────────────────────────────
function init() {
  const panel = document.getElementById('exercise-panel');
  if (!panel) return;
  panel.innerHTML = WORKSHEETS.map(ws => renderAccordion(ws)).join('');

  const total = WORKSHEETS.reduce((s, ws) => s + ws.questions.length, 0);
  document.getElementById('stat-uppgifter').textContent = total;
  document.getElementById('tag-uppgifter').textContent  = total + ' uppgifter';
  document.getElementById('panel-badge').textContent    = total + ' uppgifter';

  toggleWs('ab1');
}

// ── Expose to HTML onclick handlers ──────────────────────────────────────────
window.App = { toggleGrade, selectItem, selectTopic, toggleWs, selectChoice, checkQ, retryQ, clearFb };

init();
