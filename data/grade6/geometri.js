// Pre-built SVG angle figures embedded in question text
// Vertex positioned so both lines are visible; arc marks the interior angle.
// stroke="currentColor" adapts to light/dark mode automatically.

const SVG = {
  deg30: '<svg width="180" height="130" viewBox="0 0 180 130" style="display:block;margin-top:8px">'
    + '<line x1="30" y1="110" x2="140" y2="110" stroke="currentColor" stroke-width="2"/>'
    + '<line x1="30" y1="110" x2="125" y2="55" stroke="currentColor" stroke-width="2"/>'
    + '<path d="M 68,110 A 38,38 0 0,0 63,91" stroke="currentColor" stroke-width="1.5" fill="none"/>'
    + '</svg>',

  deg60: '<svg width="180" height="130" viewBox="0 0 180 130" style="display:block;margin-top:8px">'
    + '<line x1="30" y1="110" x2="140" y2="110" stroke="currentColor" stroke-width="2"/>'
    + '<line x1="30" y1="110" x2="85" y2="15" stroke="currentColor" stroke-width="2"/>'
    + '<path d="M 68,110 A 38,38 0 0,0 49,77" stroke="currentColor" stroke-width="1.5" fill="none"/>'
    + '</svg>',

  deg90: '<svg width="180" height="130" viewBox="0 0 180 130" style="display:block;margin-top:8px">'
    + '<line x1="30" y1="110" x2="140" y2="110" stroke="currentColor" stroke-width="2"/>'
    + '<line x1="30" y1="110" x2="30" y2="5" stroke="currentColor" stroke-width="2"/>'
    + '<path d="M 45,110 L 45,95 L 30,95" stroke="currentColor" stroke-width="1.5" fill="none"/>'
    + '</svg>',

  deg120: '<svg width="180" height="130" viewBox="0 0 180 130" style="display:block;margin-top:8px">'
    + '<line x1="70" y1="110" x2="160" y2="110" stroke="currentColor" stroke-width="2"/>'
    + '<line x1="70" y1="110" x2="25" y2="32" stroke="currentColor" stroke-width="2"/>'
    + '<path d="M 108,110 A 38,38 0 0,0 51,77" stroke="currentColor" stroke-width="1.5" fill="none"/>'
    + '</svg>',

  deg150: '<svg width="180" height="130" viewBox="0 0 180 130" style="display:block;margin-top:8px">'
    + '<line x1="80" y1="110" x2="170" y2="110" stroke="currentColor" stroke-width="2"/>'
    + '<line x1="80" y1="110" x2="2" y2="65" stroke="currentColor" stroke-width="2"/>'
    + '<path d="M 118,110 A 38,38 0 0,0 47,91" stroke="currentColor" stroke-width="1.5" fill="none"/>'
    + '</svg>',

  deg40: '<svg width="180" height="130" viewBox="0 0 180 130" style="display:block;margin-top:8px">'
    + '<line x1="30" y1="110" x2="140" y2="110" stroke="currentColor" stroke-width="2"/>'
    + '<line x1="30" y1="110" x2="114" y2="39" stroke="currentColor" stroke-width="2"/>'
    + '<path d="M 68,110 A 38,38 0 0,0 59,86" stroke="currentColor" stroke-width="1.5" fill="none"/>'
    + '</svg>',

  deg110: '<svg width="180" height="130" viewBox="0 0 180 130" style="display:block;margin-top:8px">'
    + '<line x1="70" y1="110" x2="160" y2="110" stroke="currentColor" stroke-width="2"/>'
    + '<line x1="70" y1="110" x2="39" y2="25" stroke="currentColor" stroke-width="2"/>'
    + '<path d="M 108,110 A 38,38 0 0,0 57,74" stroke="currentColor" stroke-width="1.5" fill="none"/>'
    + '</svg>',
};

const worksheets = [

  {
    id:'g6ge1', label:'1', title:'Vinklar',
    questions:[

      // ── Grundfakta ────────────────────────────────────────────────────────────
      {id:'g6ge1-1', g:'Vinklar – grundfakta',
        t:'Hur många grader är en rät vinkel?',
        a:'90', choices:['45','90','180','360']},

      {id:'g6ge1-2', g:'Vinklar – grundfakta',
        t:'En spetsig vinkel är en vinkel som är ...',
        a:'mindre än 90°', choices:['exakt 90°','mindre än 90°','större än 90°','exakt 180°']},

      {id:'g6ge1-3', g:'Vinklar – grundfakta',
        t:'En trubbig vinkel är en vinkel som är ...',
        a:'större än 90°', choices:['exakt 90°','mindre än 90°','större än 90°','exakt 360°']},

      {id:'g6ge1-4', g:'Vinklar – grundfakta',
        t:'Hur många grader är vinklarna tillsammans längs en rät linje?',
        a:'180', choices:['90','180','270','360']},

      // ── Klassificera vinkeltyp ────────────────────────────────────────────────
      {id:'g6ge1-5', g:'Vilken typ av vinkel?',
        t:'Vilken typ av vinkel är detta?' + SVG.deg60,
        a:'spetsig', choices:['spetsig','rät','trubbig']},

      {id:'g6ge1-6', g:'Vilken typ av vinkel?',
        t:'Vilken typ av vinkel är detta?' + SVG.deg90,
        a:'rät', choices:['spetsig','rät','trubbig']},

      {id:'g6ge1-7', g:'Vilken typ av vinkel?',
        t:'Vilken typ av vinkel är detta?' + SVG.deg120,
        a:'trubbig', choices:['spetsig','rät','trubbig']},

      {id:'g6ge1-8', g:'Vilken typ av vinkel?',
        t:'Vilken typ av vinkel är detta?' + SVG.deg30,
        a:'spetsig', choices:['spetsig','rät','trubbig']},

      {id:'g6ge1-9', g:'Vilken typ av vinkel?',
        t:'Vilken typ av vinkel är detta?' + SVG.deg150,
        a:'trubbig', choices:['spetsig','rät','trubbig']},

      // ── Uppskatta vinkeln ─────────────────────────────────────────────────────
      {id:'g6ge1-10', g:'Hur stor är vinkeln?',
        t:'Ungefär hur stor är den markerade vinkeln?' + SVG.deg40,
        a:'40°', choices:['20°','40°','90°','130°']},

      {id:'g6ge1-11', g:'Hur stor är vinkeln?',
        t:'Ungefär hur stor är den markerade vinkeln?' + SVG.deg110,
        a:'110°', choices:['40°','80°','110°','160°']},

      // ── Beräkna vinklar ───────────────────────────────────────────────────────
      {id:'g6ge1-12', g:'Beräkna vinkeln',
        t:'Två vinklar bildar tillsammans en rät linje (180°). Den ena vinkeln är 60°. Hur stor är den andra vinkeln?',
        a:'120', hint:'180 − 60 = ?'},

      {id:'g6ge1-13', g:'Beräkna vinkeln',
        t:'I en triangel är två vinklar 50° och 70°. Hur stor är den tredje vinkeln?',
        a:'60', hint:'Vinklarna i en triangel är alltid 180° tillsammans.'},

      {id:'g6ge1-14', g:'Beräkna vinkeln',
        t:'Två vinklar bildar tillsammans en rät linje (180°). Den ena vinkeln är 115°. Hur stor är den andra?',
        a:'65', hint:'180 − 115 = ?'},

      {id:'g6ge1-15', g:'Beräkna vinkeln',
        t:'I en triangel är två vinklar 45° och 90°. Hur stor är den tredje vinkeln?',
        a:'45', hint:'45 + 90 + ? = 180'},
    ]
  },

];

export default worksheets;
