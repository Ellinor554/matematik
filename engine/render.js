import { exState, wsScore, wsAllFinished } from './state.js';
import { checkAnswer } from './check.js';

export function renderMath(text) {
  return text.replace(/(\d+)\/(\d+)/g, (_, n, d) =>
    `<span class="frac"><span class="num">${n}</span><span class="den">${d}</span></span>`
  );
}

export function fmtAnswer(a) {
  const mixed = a.match(/^(-?\d+)\s+(\d+)\/(\d+)$/);
  if (mixed) {
    return `${mixed[1]}&nbsp;<span class="frac"><span class="num">${mixed[2]}</span><span class="den">${mixed[3]}</span></span>`;
  }
  if (a.includes('/')) {
    const [n, d] = a.split('/');
    return `<span class="frac"><span class="num">${n}</span><span class="den">${d}</span></span>`;
  }
  return a.replace('.', ',');
}

export function renderQuestion(q) {
  const s        = exState[q.id] || {};
  const attempts = s.attempts || 0;
  const revealed = s.revealed || false;
  const locked   = s.locked   || false;
  const cardCls  = s.correct === true ? 'ok' : (s.correct === false || revealed) ? 'err' : '';

  let inputHtml;
  if (q.choices) {
    inputHtml = `<div class="ex-choices" id="exc-${q.id}">${
      q.choices.map(c => {
        const isCorrectChoice = checkAnswer(c.replace(',', '.'), q.a);
        let cls = '';
        if (s.correct === true) {
          cls = isCorrectChoice ? 'ok' : (s.value === c ? 'err' : '');
        } else if (revealed) {
          cls = isCorrectChoice ? 'ok' : '';
        } else if (s.correct === false) {
          cls = s.value === c ? 'err' : '';
        }
        const disabled = s.correct === true || revealed;
        return `<button class="ex-choice ${cls}" ${disabled ? 'disabled' : ''}
          onclick="App.selectChoice('${q.id}','${c.replace(/'/g, "\\'")}')">
          ${renderMath(c)}
        </button>`;
      }).join('')
    }</div>`;
  } else {
    const val  = s.value || '';
    const iCls = s.correct === true ? 'ok' : s.correct === false ? 'err' : '';

    let btnHtml;
    if (!locked) {
      btnHtml = `<button class="ex-check-btn" onclick="App.checkQ('${q.id}')">Kontrollera</button>`;
    } else if (s.correct === true) {
      btnHtml = `<button class="ex-retry-btn" onclick="App.retryQ('${q.id}')">Försök igen</button>`;
    } else if (!revealed) {
      btnHtml = `<button class="ex-reveal-btn" onclick="App.revealQ('${q.id}')">Visa svar</button>`;
    } else {
      btnHtml = '';
    }

    inputHtml = `<div class="ex-input-row">
      <input class="ex-input ${iCls}" id="exinp-${q.id}" type="text"
        value="${val}" ${locked ? 'readonly' : ''}
        placeholder="Svar"
        onkeydown="if(event.key==='Enter'&&!this.readOnly) App.checkQ('${q.id}')"
        oninput="App.clearFb('${q.id}')">
      ${btnHtml}
    </div>`;
  }

  let fb = '';
  if (s.correct === true) {
    fb = `<div class="ex-feedback ok">Rätt</div>`;
  } else if (revealed) {
    fb = `<div class="ex-feedback err">Rätt svar: ${fmtAnswer(q.a)}</div>`;
  } else if (s.correct === false) {
    const left = 3 - attempts;
    const leftText = left > 0 ? ` · ${left} försök kvar` : '';
    fb = `<div class="ex-feedback err">Fel svar${leftText}</div>`;
  }
  if (q.hint && !locked && !revealed) fb += `<div class="ex-hint">${q.hint}</div>`;

  return `<div class="ex-qcard ${cardCls}" id="excard-${q.id}">
    <div class="ex-qtext">${renderMath(q.t)}</div>
    ${inputHtml}${fb}
  </div>`;
}

export function renderAccordion(ws) {
  const { done, total } = wsScore(ws);
  const pct    = total > 0 ? (done / total) * 100 : 0;
  const isDone = done === total && total > 0;

  const groups = [], seen = new Set();
  for (const q of ws.questions) {
    if (!seen.has(q.g)) { seen.add(q.g); groups.push(q.g); }
  }

  let qs = '';
  for (const g of groups) {
    if (g) qs += `<div class="ex-group-lbl">${g}</div>`;
    ws.questions.filter(q => q.g === g).forEach(q => { qs += renderQuestion(q); });
  }

  const redoHtml = wsAllFinished(ws)
    ? `<div class="ws-redo-row"><button class="ws-redo-btn" onclick="App.resetWs('${ws.id}')">Gör om</button></div>`
    : '';

  return `
    <div class="ws-accordion${isDone ? ' done' : ''}" id="ws-${ws.id}">
      <button class="ws-acc-header" onclick="App.toggleWs('${ws.id}')">
        <div class="ws-acc-left">
          <span class="ws-acc-num">${ws.label}</span>
          <span class="ws-acc-name">${ws.title}</span>
        </div>
        <div class="ws-acc-right">
          <div class="ws-prog-mini">
            <div class="ws-prog-mini-fill" id="pfill-${ws.id}" style="width:${pct}%"></div>
          </div>
          <span class="ws-acc-score${isDone ? ' done' : ''}" id="pscore-${ws.id}">${isDone ? `✓ ${done}/${total}` : `${done}/${total}`}</span>
          <span class="ws-acc-chevron"></span>
        </div>
      </button>
      <div class="ws-acc-body" id="wsbody-${ws.id}">
        <div class="ws-acc-inner">${qs}${redoHtml}</div>
      </div>
    </div>`;
}
