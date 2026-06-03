import { exState, wsScore } from './state.js';
import { checkAnswer } from './check.js';

export function renderMath(text) {
  return text.replace(/(\d+)\/(\d+)/g, (_, n, d) =>
    `<span class="frac"><span class="num">${n}</span><span class="den">${d}</span></span>`
  );
}

export function fmtAnswer(a) {
  if (a.includes('/')) {
    const [n, d] = a.split('/');
    return `<span class="frac"><span class="num">${n}</span><span class="den">${d}</span></span>`;
  }
  return a.replace('.', ',');
}

export function renderQuestion(q) {
  const s = exState[q.id];
  const locked = s?.locked || false;
  const cardCls = s?.correct === true ? 'ok' : s?.correct === false ? 'err' : '';

  let inputHtml;
  if (q.choices) {
    inputHtml = `<div class="ex-choices" id="exc-${q.id}">${
      q.choices.map(c => {
        let cls = '';
        if (locked) {
          cls = checkAnswer(c.replace(',', '.'), q.a) ? 'ok' : (s?.value === c ? 'err' : '');
        } else if (s?.value === c) cls = 'selected';
        return `<button class="ex-choice ${cls}" ${locked ? 'disabled' : ''}
          onclick="App.selectChoice('${q.id}','${c.replace(/'/g, "\\'")}')">
          ${renderMath(c)}
        </button>`;
      }).join('')
    }</div>`;
  } else {
    const val = s?.value || '';
    const iCls = s?.correct === true ? 'ok' : s?.correct === false ? 'err' : '';
    inputHtml = `<div class="ex-input-row">
      <input class="ex-input ${iCls}" id="exinp-${q.id}" type="text"
        value="${val}" ${locked ? 'readonly' : ''}
        placeholder="Svar"
        onkeydown="if(event.key==='Enter') App.checkQ('${q.id}')"
        oninput="App.clearFb('${q.id}')">
      ${!locked
        ? `<button class="ex-check-btn" onclick="App.checkQ('${q.id}')">Kontrollera</button>`
        : `<button class="ex-retry-btn" onclick="App.retryQ('${q.id}')">Försök igen</button>`}
    </div>`;
  }

  let fb = '';
  if (s?.correct === true)  fb = `<div class="ex-feedback ok">Rätt</div>`;
  if (s?.correct === false) fb = `<div class="ex-feedback err">Rätt svar: ${fmtAnswer(q.a)}</div>`;
  if (q.hint && !locked)   fb += `<div class="ex-hint">${q.hint}</div>`;

  return `<div class="ex-qcard ${cardCls}" id="excard-${q.id}">
    <div class="ex-qtext">${renderMath(q.t)}</div>
    ${inputHtml}${fb}
  </div>`;
}

export function renderAccordion(ws) {
  const { done, total } = wsScore(ws);
  const pct = total > 0 ? (done / total) * 100 : 0;

  const groups = [], seen = new Set();
  for (const q of ws.questions) {
    if (!seen.has(q.g)) { seen.add(q.g); groups.push(q.g); }
  }

  let qs = '';
  for (const g of groups) {
    if (g) qs += `<div class="ex-group-lbl">${g}</div>`;
    ws.questions.filter(q => q.g === g).forEach(q => { qs += renderQuestion(q); });
  }

  return `
    <div class="ws-accordion" id="ws-${ws.id}">
      <button class="ws-acc-header" onclick="App.toggleWs('${ws.id}')">
        <div class="ws-acc-left">
          <span class="ws-acc-num">${ws.label}</span>
          <span class="ws-acc-name">${ws.title}</span>
        </div>
        <div class="ws-acc-right">
          <div class="ws-prog-mini">
            <div class="ws-prog-mini-fill" id="pfill-${ws.id}" style="width:${pct}%"></div>
          </div>
          <span class="ws-acc-score${done === total && total > 0 ? ' done' : ''}" id="pscore-${ws.id}">${done}/${total}</span>
          <span class="ws-acc-chevron"></span>
        </div>
      </button>
      <div class="ws-acc-body" id="wsbody-${ws.id}">
        <div class="ws-acc-inner">${qs}</div>
      </div>
    </div>`;
}
