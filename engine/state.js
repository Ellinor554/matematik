export const exState = {};

export function wsScore(ws) {
  const done = ws.questions.filter(q => exState[q.id]?.correct === true).length;
  return { done, total: ws.questions.length };
}

export function findQ(worksheets, qId) {
  for (const ws of worksheets) {
    const q = ws.questions.find(q => q.id === qId);
    if (q) return { q, ws };
  }
  return null;
}
