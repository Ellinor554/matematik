export function parseVal(s) {
  s = String(s).trim().replace(',', '.');
  if (s.includes('/')) {
    const [n, d] = s.split('/').map(Number);
    if (isNaN(n) || isNaN(d) || d === 0) return NaN;
    return n / d;
  }
  return parseFloat(s);
}

export function checkAnswer(input, correct) {
  const s = String(input).trim().replace(',', '.').toLowerCase();
  const c = String(correct).trim().replace(',', '.').toLowerCase();
  if (s === c) return true;
  const iv = parseVal(s);
  const cv = parseVal(c);
  if (isNaN(iv) || isNaN(cv)) return false;
  return Math.abs(iv - cv) < 0.00001;
}
