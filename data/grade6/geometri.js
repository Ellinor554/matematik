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

  deg55: '<svg width="180" height="130" viewBox="0 0 180 130" style="display:block;margin-top:8px">'
    + '<line x1="30" y1="110" x2="140" y2="110" stroke="currentColor" stroke-width="2"/>'
    + '<line x1="30" y1="110" x2="87" y2="28" stroke="currentColor" stroke-width="2"/>'
    + '<path d="M 68,110 A 38,38 0 0,0 52,79" stroke="currentColor" stroke-width="1.5" fill="none"/>'
    + '</svg>',

  deg75: '<svg width="180" height="130" viewBox="0 0 180 130" style="display:block;margin-top:8px">'
    + '<line x1="30" y1="110" x2="140" y2="110" stroke="currentColor" stroke-width="2"/>'
    + '<line x1="30" y1="110" x2="56" y2="13" stroke="currentColor" stroke-width="2"/>'
    + '<path d="M 68,110 A 38,38 0 0,0 40,73" stroke="currentColor" stroke-width="1.5" fill="none"/>'
    + '</svg>',

  deg100: '<svg width="180" height="130" viewBox="0 0 180 130" style="display:block;margin-top:8px">'
    + '<line x1="70" y1="110" x2="160" y2="110" stroke="currentColor" stroke-width="2"/>'
    + '<line x1="70" y1="110" x2="53" y2="12" stroke="currentColor" stroke-width="2"/>'
    + '<path d="M 108,110 A 38,38 0 0,0 63,73" stroke="currentColor" stroke-width="1.5" fill="none"/>'
    + '</svg>',

  deg165: '<svg width="180" height="130" viewBox="0 0 180 130" style="display:block;margin-top:8px">'
    + '<line x1="90" y1="110" x2="175" y2="110" stroke="currentColor" stroke-width="2"/>'
    + '<line x1="90" y1="110" x2="8" y2="88" stroke="currentColor" stroke-width="2"/>'
    + '<path d="M 128,110 A 38,38 0 0,0 53,100" stroke="currentColor" stroke-width="1.5" fill="none"/>'
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


  // ── 2. Vinklar (II) ──────────────────────────────────────────────────────────
  {
    id:'g6ge2', label:'2', title:'Vinklar (II)',
    questions:[
      {id:'g6ge2-1',  g:'Namnge vinkeltypen', t:'Hur kallas en vinkel som är 65°?',  a:'spetsig',  choices:['spetsig','rät','trubbig']},
      {id:'g6ge2-2',  g:'Namnge vinkeltypen', t:'Hur kallas en vinkel som är 155°?', a:'trubbig',  choices:['spetsig','rät','trubbig']},
      {id:'g6ge2-3',  g:'Namnge vinkeltypen', t:'Hur kallas en vinkel som är 90°?',  a:'rät',      choices:['spetsig','rät','trubbig']},
      {id:'g6ge2-4',  g:'Namnge vinkeltypen', t:'Hur kallas en vinkel som är 18°?',  a:'spetsig',  choices:['spetsig','rät','trubbig']},
      {id:'g6ge2-5',  g:'Namnge vinkeltypen', t:'Hur kallas en vinkel som är 102°?', a:'trubbig',  choices:['spetsig','rät','trubbig']},
      {id:'g6ge2-6',  g:'Namnge vinkeltypen', t:'Hur kallas en vinkel som är 89°?',  a:'spetsig',  choices:['spetsig','rät','trubbig']},
      {id:'g6ge2-7',  g:'Vilken typ av vinkel?', t:'Vilken typ av vinkel är detta?' + SVG.deg55,  a:'spetsig', choices:['spetsig','rät','trubbig']},
      {id:'g6ge2-8',  g:'Vilken typ av vinkel?', t:'Vilken typ av vinkel är detta?' + SVG.deg100, a:'trubbig', choices:['spetsig','rät','trubbig']},
      {id:'g6ge2-9',  g:'Vilken typ av vinkel?', t:'Vilken typ av vinkel är detta?' + SVG.deg75,  a:'spetsig', choices:['spetsig','rät','trubbig']},
      {id:'g6ge2-10', g:'Vilken typ av vinkel?', t:'Vilken typ av vinkel är detta?' + SVG.deg165, a:'trubbig', choices:['spetsig','rät','trubbig']},
      {id:'g6ge2-11', g:'Hur stor är vinkeln?', t:'Ungefär hur stor är den markerade vinkeln?' + SVG.deg55,  a:'55°',  choices:['25°','55°','90°','120°']},
      {id:'g6ge2-12', g:'Hur stor är vinkeln?', t:'Ungefär hur stor är den markerade vinkeln?' + SVG.deg75,  a:'75°',  choices:['30°','75°','90°','120°']},
      {id:'g6ge2-13', g:'Hur stor är vinkeln?', t:'Ungefär hur stor är den markerade vinkeln?' + SVG.deg100, a:'100°', choices:['80°','100°','120°','160°']},
      {id:'g6ge2-14', g:'Hur stor är vinkeln?', t:'Ungefär hur stor är den markerade vinkeln?' + SVG.deg165, a:'165°', choices:['90°','120°','150°','165°']},
      {id:'g6ge2-15', g:'Supplementvinklar (180°)', t:'Två vinklar bildar en rät linje. Den ena är 48°. Hur stor är den andra?',                        a:'132', hint:'180 − 48 = ?'},
      {id:'g6ge2-16', g:'Supplementvinklar (180°)', t:'Två vinklar bildar en rät linje. Den ena är 73°. Hur stor är den andra?',                        a:'107', hint:'180 − 73 = ?'},
      {id:'g6ge2-17', g:'Supplementvinklar (180°)', t:'Tre vinklar längs en rät linje är 55°, 80° och ___. Hur stor är den tredje?',                    a:'45',  hint:'55 + 80 + ? = 180'},
      {id:'g6ge2-18', g:'Supplementvinklar (180°)', t:'Två vinklar bildar en rät linje. Den ena är 136°. Hur stor är den andra?',                       a:'44',  hint:'180 − 136 = ?'},
      {id:'g6ge2-19', g:'Helvarv (360°)', t:'En hel varv är 360°. En vinkel tar upp 85°. Hur stor är resten av varvet?',                                a:'275', hint:'360 − 85 = ?'},
      {id:'g6ge2-20', g:'Helvarv (360°)', t:'Fyra vinklar delar upp ett helt varv: 90°, 90°, 60° och ___. Hur stor är den fjärde?',                     a:'120', hint:'90 + 90 + 60 + ? = 360'},
    ]
  },

  // ── 3. Vinkelsumman i en triangel ────────────────────────────────────────────
  {
    id:'g6ge3', label:'3', title:'Vinkelsumman i en triangel',
    questions:[
      {id:'g6ge3-1',  g:'Vinkelsumman',              t:'Hur stor är vinkelsumman i en triangel?',                                                                             a:'180°', choices:['90°','180°','270°','360°']},
      {id:'g6ge3-2',  g:'Vinkelsumman',              t:'En triangels tre vinklar adderade ger alltid ...?',                                                                    a:'180°', choices:['90°','180°','270°','360°']},
      {id:'g6ge3-3',  g:'Beräkna den tredje vinkeln', t:'En triangels två vinklar är 55° och 75°. Hur stor är den tredje?',                                                   a:'50',   hint:'55 + 75 + ? = 180'},
      {id:'g6ge3-4',  g:'Beräkna den tredje vinkeln', t:'En triangels två vinklar är 40° och 65°. Hur stor är den tredje?',                                                   a:'75',   hint:'40 + 65 + ? = 180'},
      {id:'g6ge3-5',  g:'Beräkna den tredje vinkeln', t:'En triangels två vinklar är 30° och 90°. Hur stor är den tredje?',                                                   a:'60',   hint:'30 + 90 + ? = 180'},
      {id:'g6ge3-6',  g:'Beräkna den tredje vinkeln', t:'En triangels två vinklar är 80° och 60°. Hur stor är den tredje?',                                                   a:'40',   hint:'80 + 60 + ? = 180'},
      {id:'g6ge3-7',  g:'Beräkna den tredje vinkeln', t:'En triangels två vinklar är 35° och 110°. Hur stor är den tredje?',                                                  a:'35',   hint:'35 + 110 + ? = 180'},
      {id:'g6ge3-8',  g:'Beräkna den tredje vinkeln', t:'En triangels två vinklar är 25° och 130°. Hur stor är den tredje?',                                                  a:'25',   hint:'25 + 130 + ? = 180'},
      {id:'g6ge3-9',  g:'Beräkna den tredje vinkeln', t:'En triangels två vinklar är 62° och 58°. Hur stor är den tredje?',                                                   a:'60',   hint:'62 + 58 + ? = 180'},
      {id:'g6ge3-10', g:'Beräkna den tredje vinkeln', t:'En triangels två vinklar är 47° och 93°. Hur stor är den tredje?',                                                   a:'40',   hint:'47 + 93 + ? = 180'},
      {id:'g6ge3-11', g:'Liksidig triangel',          t:'En liksidig triangel har tre lika stora vinklar. Hur stor är varje vinkel?',                                          a:'60',   hint:'180 ÷ 3 = ?'},
      {id:'g6ge3-12', g:'Likbent triangel',           t:'En likbent triangel har två lika vinklar på 65°. Hur stor är den tredje vinkeln?',                                   a:'50',   hint:'65 + 65 + ? = 180'},
      {id:'g6ge3-13', g:'Likbent triangel',           t:'En likbent triangel har toppvinkeln 40°. Hur stora är de två likadana basvinklarna?',                                a:'70',   hint:'(180 − 40) ÷ 2 = ?'},
      {id:'g6ge3-14', g:'Rätvinklig triangel',        t:'En rätvinklig triangel har alltid en 90°-vinkel. En av de övriga är 38°. Hur stor är den tredje?',                   a:'52',   hint:'90 + 38 + ? = 180'},
      {id:'g6ge3-15', g:'Rätvinklig triangel',        t:'En rätvinklig triangel har vinklarna 90°, 55° och ___. Hur stor är den tredje vinkeln?',                             a:'35',   hint:'90 + 55 + ? = 180'},
    ]
  },

  // ── 4. Längdenheter (I) ───────────────────────────────────────────────────────
  {
    id:'g6ge4', label:'4', title:'Längdenheter (I)',
    questions:[
      {id:'g6ge4-1',  g:'Omvandla', t:'5 dm = ___ cm',        a:'50'},
      {id:'g6ge4-2',  g:'Omvandla', t:'46 cm = ___ dm',       a:'4.6'},
      {id:'g6ge4-3',  g:'Omvandla', t:'8,4 dm = ___ cm',      a:'84'},
      {id:'g6ge4-4',  g:'Omvandla', t:'2,3 m = ___ dm',       a:'23'},
      {id:'g6ge4-5',  g:'Omvandla', t:'180 cm = ___ m',       a:'1.8'},
      {id:'g6ge4-6',  g:'Omvandla', t:'0,6 m = ___ cm',       a:'60'},
      {id:'g6ge4-7',  g:'Omvandla', t:'3 700 mm = ___ m',     a:'3.7'},
      {id:'g6ge4-8',  g:'Omvandla', t:'45 cm = ___ mm',       a:'450'},
      {id:'g6ge4-9',  g:'Omvandla', t:'630 mm = ___ cm',      a:'63'},
      {id:'g6ge4-10', g:'Omvandla', t:'0,8 dm = ___ mm',      a:'80'},
      {id:'g6ge4-11', g:'Omvandla', t:'500 mm = ___ dm',      a:'5'},
      {id:'g6ge4-12', g:'Omvandla', t:'3,8 km = ___ m',       a:'3800'},
      {id:'g6ge4-13', g:'Omvandla', t:'5 400 m = ___ km',     a:'5.4'},
      {id:'g6ge4-14', g:'Omvandla', t:'0,75 km = ___ m',      a:'750'},
      {id:'g6ge4-15', g:'Omvandla', t:'3,2 mil = ___ km',     a:'32'},
      {id:'g6ge4-16', g:'Omvandla', t:'48 km = ___ mil',      a:'4.8'},
      {id:'g6ge4-17', g:'Omvandla', t:'26 dm = ___ m',        a:'2.6'},
      {id:'g6ge4-18', g:'Omvandla', t:'0,9 m = ___ mm',       a:'900'},
      {id:'g6ge4-19', g:'Omvandla', t:'28 mm = ___ cm',       a:'2.8'},
      {id:'g6ge4-20', g:'Omvandla', t:'5,6 m = ___ cm',       a:'560'},
    ]
  },

  // ── 5. Längdenheter (II) ──────────────────────────────────────────────────────
  {
    id:'g6ge5', label:'5', title:'Längdenheter (II)',
    questions:[
      {id:'g6ge5-1',  g:'Textuppgift', t:'Den längsta masken som hittats mätte 480 cm. Skriv längden i meter.',                                      a:'4.8'},
      {id:'g6ge5-2',  g:'Textuppgift', t:'Mellan Malmö och Lund är det 1,8 mil. Hur många kilometer är det?',                                        a:'18'},
      {id:'g6ge5-3',  g:'Textuppgift', t:'Ett kylskåp är 1 750 mm högt. Skriv höjden i meter.',                                                      a:'1.75'},
      {id:'g6ge5-4',  g:'Textuppgift', t:'En bokhylla är 80 cm bred. Skriv bredden i decimeter.',                                                    a:'8'},
      {id:'g6ge5-5',  g:'Textuppgift', t:'En motionsbana är 4,3 km lång. Hur många meter är det?',                                                   a:'4300'},
      {id:'g6ge5-6',  g:'Textuppgift', t:'En orm är ungefär 380 mm lång. Skriv längden i centimeter.',                                               a:'38'},
      {id:'g6ge5-7',  g:'Textuppgift', t:'En bergstopp ligger 3,6 km över havet. Hur många meter är det?',                                           a:'3600'},
      {id:'g6ge5-8',  g:'Textuppgift', t:'Afrikanska lejonhanar är i genomsnitt 2,45 m långa. Hur många centimeter är det?',                         a:'245'},
      {id:'g6ge5-9',  g:'Textuppgift', t:'Donau i Europa är 2 860 km lång. Hur många mil är det?',                                                   a:'286'},
      {id:'g6ge5-10', g:'Textuppgift', t:'Den längsta nagel någon odlat mätte 9,3 m. Hur många decimeter är det?',                                   a:'93'},
      {id:'g6ge5-11', g:'Textuppgift', t:'I Umeå faller det varje år ungefär 580 mm snö. Skriv det i meter.',                                        a:'0.58'},
      {id:'g6ge5-12', g:'Textuppgift', t:'En triathlonlöpning är ungefär 10 km. Hur många meter är det?',                                            a:'10000'},
      {id:'g6ge5-13', g:'Textuppgift', t:'En soffa är 87,5 cm hög. Skriv höjden i millimeter.',                                                      a:'875'},
      {id:'g6ge5-14', g:'Textuppgift', t:'På en ritning stod att ett rum var 3 600 mm långt. Skriv längden i centimeter.',                           a:'360'},
      {id:'g6ge5-15', g:'Textuppgift', t:'Det högsta trädet i Sverige är 49,5 m högt. Hur många decimeter är det?',                                  a:'495'},
    ]
  },

  // ── 6. Längdenheter (III) ─────────────────────────────────────────────────────
  {
    id:'g6ge6', label:'6', title:'Längdenheter (III)',
    questions:[
      {id:'g6ge6-1',  g:'Omvandla', t:'9 dm = ___ m',          a:'0.9'},
      {id:'g6ge6-2',  g:'Omvandla', t:'48 dm = ___ m',         a:'4.8'},
      {id:'g6ge6-3',  g:'Omvandla', t:'130 cm = ___ m',        a:'1.3'},
      {id:'g6ge6-4',  g:'Omvandla', t:'7 cm = ___ m',          a:'0.07'},
      {id:'g6ge6-5',  g:'Omvandla', t:'500 mm = ___ m',        a:'0.5'},
      {id:'g6ge6-6',  g:'Omvandla', t:'1 050 mm = ___ m',      a:'1.05'},
      {id:'g6ge6-7',  g:'Omvandla', t:'2 m 30 cm = ___ m',     a:'2.3'},
      {id:'g6ge6-8',  g:'Omvandla', t:'1,8 m = ___ dm',        a:'18'},
      {id:'g6ge6-9',  g:'Omvandla', t:'3,6 m = ___ cm',        a:'360'},
      {id:'g6ge6-10', g:'Omvandla', t:'0,4 m = ___ dm',        a:'4'},
      {id:'g6ge6-11', g:'Omvandla', t:'2,3 m = ___ mm',        a:'2300'},
      {id:'g6ge6-12', g:'Omvandla', t:'7 dm = ___ cm',         a:'70'},
      {id:'g6ge6-13', g:'Omvandla', t:'8,5 dm = ___ cm',       a:'85'},
      {id:'g6ge6-14', g:'Omvandla', t:'5 dm = ___ mm',         a:'500'},
      {id:'g6ge6-15', g:'Omvandla', t:'3,8 cm = ___ mm',       a:'38'},
      {id:'g6ge6-16', g:'Omvandla', t:'0,4 cm = ___ mm',       a:'4'},
      {id:'g6ge6-17', g:'Omvandla', t:'80 mm = ___ cm',        a:'8'},
      {id:'g6ge6-18', g:'Omvandla', t:'95 mm = ___ cm',        a:'9.5'},
      {id:'g6ge6-19', g:'Omvandla', t:'6 km = ___ m',          a:'6000'},
      {id:'g6ge6-20', g:'Omvandla', t:'350 m = ___ km',        a:'0.35'},
      {id:'g6ge6-21', g:'Omvandla', t:'14 km = ___ mil',       a:'1.4'},
      {id:'g6ge6-22', g:'Omvandla', t:'3,5 mil = ___ km',      a:'35'},
      {id:'g6ge6-23', g:'Omvandla', t:'4 mil = ___ m',         a:'40000'},
      {id:'g6ge6-24', g:'Omvandla', t:'16 km = ___ m',         a:'16000'},
    ]
  },

  // ── 7. Omkrets ────────────────────────────────────────────────────────────────
  {
    id:'g6ge7', label:'7', title:'Omkrets',
    questions:[
      {id:'g6ge7-1',  g:'Beräkna omkretsen – triangel',              t:'En triangel har sidorna 5,4 cm, 3,8 cm och 4,8 cm. Vad är omkretsen?',                              a:'14',    hint:'Addera alla sidor.'},
      {id:'g6ge7-2',  g:'Beräkna omkretsen – triangel',              t:'En triangel har sidorna 6,2 cm, 4,9 cm och 3,5 cm. Vad är omkretsen?',                              a:'14.6'},
      {id:'g6ge7-3',  g:'Beräkna omkretsen – triangel',              t:'En liksidig triangel har sidan 4,8 cm. Vad är omkretsen?',                                          a:'14.4',  hint:'Tre lika långa sidor.'},
      {id:'g6ge7-4',  g:'Beräkna omkretsen – rektangel',             t:'En rektangel är 7,5 cm lång och 2,8 cm bred. Vad är omkretsen?',                                    a:'20.6',  hint:'O = 2 · (l + b)'},
      {id:'g6ge7-5',  g:'Beräkna omkretsen – rektangel',             t:'En rektangel är 8,4 cm lång och 3,6 cm bred. Vad är omkretsen?',                                    a:'24'},
      {id:'g6ge7-6',  g:'Beräkna omkretsen – kvadrat',               t:'En kvadrat har sidan 5,5 cm. Vad är omkretsen?',                                                    a:'22',    hint:'O = 4 · s'},
      {id:'g6ge7-7',  g:'Beräkna cirkelns omkrets (π ≈ 3,14)',       t:'En cirkel har diametern 5 cm. Vad är omkretsen? Skriv svaret i tiondels centimeter.',                a:'15.7',  hint:'O = π · d'},
      {id:'g6ge7-8',  g:'Beräkna cirkelns omkrets (π ≈ 3,14)',       t:'En cirkel har diametern 10 cm. Vad är omkretsen?',                                                  a:'31.4',  hint:'O = π · d'},
      {id:'g6ge7-9',  g:'Beräkna cirkelns omkrets (π ≈ 3,14)',       t:'En cirkel har radien 4 cm. Vad är omkretsen? Skriv svaret i tiondels centimeter.',                  a:'25.1',  hint:'Diameter = 2 · radien, sedan O = π · d'},
      {id:'g6ge7-10', g:'Hitta diametern',                           t:'En cirkels omkrets är 62,8 cm. Hur lång är diametern? (π ≈ 3,14)',                                  a:'20',    hint:'d = O ÷ π'},
      {id:'g6ge7-11', g:'Hitta diametern',                           t:'En cirkels omkrets är 28,26 cm. Hur lång är diametern? (π ≈ 3,14)',                                 a:'9',     hint:'d = O ÷ π'},
      {id:'g6ge7-12', g:'Halvcirkelns omkrets',                      t:'En halvcirkel har diametern 8 cm. Hur lång är hela omkretsen? (π ≈ 3,14, avrunda till hela cm)',    a:'21',    hint:'Halvcirkelns båge + diametern'},
    ]
  },

  // ── 8. Omkrets och area (I) ───────────────────────────────────────────────────
  {
    id:'g6ge8', label:'8', title:'Omkrets och area (I)',
    questions:[
      {id:'g6ge8-1',  g:'Rektangel – omkrets', t:'En rektangel har längden 6 cm och bredden 4 cm. Vad är omkretsen?',           a:'20',   hint:'O = 2 · (l + b)'},
      {id:'g6ge8-2',  g:'Rektangel – area',    t:'En rektangel har längden 6 cm och bredden 4 cm. Vad är arean?',               a:'24',   hint:'A = l · b'},
      {id:'g6ge8-3',  g:'Rektangel – omkrets', t:'En rektangel har längden 9 cm och bredden 2,5 cm. Vad är omkretsen?',         a:'23',   hint:'O = 2 · (l + b)'},
      {id:'g6ge8-4',  g:'Rektangel – area',    t:'En rektangel har längden 9 cm och bredden 2,5 cm. Vad är arean?',             a:'22.5', hint:'A = l · b'},
      {id:'g6ge8-5',  g:'Triangel – area',     t:'En triangel har basen 6 cm och höjden 4 cm. Vad är arean?',                   a:'12',   hint:'A = (b · h) ÷ 2'},
      {id:'g6ge8-6',  g:'Triangel – area',     t:'En triangel har basen 8 cm och höjden 5 cm. Vad är arean?',                   a:'20',   hint:'A = (b · h) ÷ 2'},
      {id:'g6ge8-7',  g:'Triangel – area',     t:'En triangel har basen 5 cm och höjden 3,6 cm. Vad är arean?',                 a:'9',    hint:'A = (b · h) ÷ 2'},
      {id:'g6ge8-8',  g:'Triangel – area',     t:'En triangel har basen 9 cm och höjden 6 cm. Vad är arean?',                   a:'27',   hint:'A = (b · h) ÷ 2'},
      {id:'g6ge8-9',  g:'Parallellogram – area', t:'En parallellogram har basen 7 cm och höjden 4 cm. Vad är arean?',           a:'28',   hint:'A = b · h'},
      {id:'g6ge8-10', g:'Parallellogram – area', t:'En parallellogram har basen 10 cm och höjden 3,5 cm. Vad är arean?',        a:'35',   hint:'A = b · h'},
    ]
  },

  // ── 9. Omkrets och area (II) ──────────────────────────────────────────────────
  {
    id:'g6ge9', label:'9', title:'Omkrets och area (II)',
    questions:[
      {id:'g6ge9-1',  g:'Kvadrat – omkrets',       t:'En kvadrat har sidan 5 cm. Vad är omkretsen?',                                            a:'20',   hint:'O = 4 · s'},
      {id:'g6ge9-2',  g:'Kvadrat – area',           t:'En kvadrat har sidan 5 cm. Vad är arean?',                                               a:'25',   hint:'A = s · s'},
      {id:'g6ge9-3',  g:'Triangel – omkrets',       t:'En triangel har sidorna 7,2 cm, 5,4 cm och 8,6 cm. Vad är omkretsen?',                   a:'21.2'},
      {id:'g6ge9-4',  g:'Triangel – area',          t:'En triangel har basen 7,2 cm och höjden 4,0 cm. Vad är arean?',                         a:'14.4', hint:'A = (b · h) ÷ 2'},
      {id:'g6ge9-5',  g:'Parallellogram – omkrets', t:'En parallellogram har sidorna 5,5 cm och 7,0 cm. Vad är omkretsen?',                     a:'25',   hint:'O = 2 · (a + b)'},
      {id:'g6ge9-6',  g:'Parallellogram – area',    t:'En parallellogram har basen 7,0 cm och höjden 4,5 cm. Vad är arean?',                   a:'31.5', hint:'A = b · h'},
      {id:'g6ge9-7',  g:'Triangel – area',          t:'En triangel har basen 6 cm och höjden 5 cm. Vad är arean?',                              a:'15',   hint:'A = (b · h) ÷ 2'},
      {id:'g6ge9-8',  g:'Triangel – area',          t:'En triangel har basen 8 cm och höjden 3 cm. Vad är arean?',                              a:'12',   hint:'A = (b · h) ÷ 2'},
      {id:'g6ge9-9',  g:'Vilken formel?',            t:'Vilken formel används för att beräkna arean av en triangel?',                            a:'b · h ÷ 2', choices:['b · h','b · h ÷ 2','(b + h) · 2','b + h + h']},
      {id:'g6ge9-10', g:'Vilken formel?',            t:'Vilken formel används för att beräkna arean av en parallellogram?',                      a:'b · h', choices:['b · h','b · h ÷ 2','b · b','(b + h) · 2']},
    ]
  },

  // ── 10. Omkrets och area (III) ────────────────────────────────────────────────
  {
    id:'g6ge10', label:'10', title:'Omkrets och area (III)',
    questions:[
      {id:'g6ge10-1',  g:'Rektangel – omkrets',      t:'En rektangel har längden 8 cm och bredden 3 cm. Vad är omkretsen?',                                                          a:'22',   hint:'O = 2 · (l + b)'},
      {id:'g6ge10-2',  g:'Rektangel – area',          t:'En rektangel har längden 8 cm och bredden 3 cm. Vad är arean?',                                                              a:'24',   hint:'A = l · b'},
      {id:'g6ge10-3',  g:'Triangel – omkrets',        t:'En triangel har sidorna 6,0 cm, 5,0 cm och 7,0 cm. Vad är omkretsen?',                                                      a:'18'},
      {id:'g6ge10-4',  g:'Triangel – area',           t:'En triangel har basen 6,0 cm och höjden 5,0 cm. Vad är arean?',                                                             a:'15',   hint:'A = (b · h) ÷ 2'},
      {id:'g6ge10-5',  g:'Känna igen figuren',        t:'En figur har fyra sidor. De motstående sidorna är lika långa och parallella, men vinklarna är inte räta. Vad heter den?',  a:'parallellogram', choices:['rektangel','kvadrat','parallellogram','triangel']},
      {id:'g6ge10-6',  g:'Parallellogram – area',     t:'En parallellogram har basen 9 cm och höjden 4 cm. Vad är arean?',                                                          a:'36',   hint:'A = b · h'},
      {id:'g6ge10-7',  g:'Sammansatt figur – area',   t:'En L-formad figur bildas av en 10 × 8 cm rektangel där ett hörn på 4 × 3 cm tagits bort. Vad är figurens area?',          a:'68',   hint:'Hela rektangeln: 10 · 8 = 80. Det borttagna hörnet: 4 · 3 = 12. Area = 80 − 12.'},
      {id:'g6ge10-8',  g:'Sammansatt figur – omkrets', t:'Samma L-formade figur (10 × 8 cm, hörn 4 × 3 cm borttaget). Vad är figurens omkrets?',                                   a:'36',   hint:'Räkna alla sidor runt figuren: 10 + 8 + 6 + 3 + 4 + 5 = ?'},
      {id:'g6ge10-9',  g:'Hitta sidan',               t:'En kvadrat har arean 64 cm². Hur lång är varje sida?',                                                                      a:'8',    hint:'s · s = 64 → s = ?'},
      {id:'g6ge10-10', g:'Hitta sidan',               t:'En rektangel har arean 48 cm² och bredden 6 cm. Hur lång är längden?',                                                      a:'8',    hint:'l = A ÷ b'},
    ]
  },

  // ── 11. Volym ─────────────────────────────────────────────────────────────────
  {
    id:'g6ge11', label:'11', title:'Volym',
    questions:[
      {id:'g6ge11-1',  g:'Volymformel',      t:'Vilken formel används för att beräkna volymen av ett rätblock?',                                                                  a:'l · b · h', choices:['l · b','l + b + h','l · b · h','2 · (l + b + h)']},
      {id:'g6ge11-2',  g:'Beräkna volymen', t:'En låda är 8 cm lång, 5 cm bred och 3 cm hög. Vad är volymen?',                                                                   a:'120',  hint:'V = l · b · h'},
      {id:'g6ge11-3',  g:'Beräkna volymen', t:'Ett rätblock är 9 cm långt, 4 cm brett och 6 cm högt. Vad är volymen?',                                                           a:'216',  hint:'V = l · b · h'},
      {id:'g6ge11-4',  g:'Beräkna volymen', t:'Ett rätblock är 12 cm långt, 5 cm brett och 4 cm högt. Vad är volymen?',                                                          a:'240',  hint:'V = l · b · h'},
      {id:'g6ge11-5',  g:'Kub – volym',     t:'En kub har sidan 4 cm. Vad är volymen?',                                                                                          a:'64',   hint:'V = s · s · s'},
      {id:'g6ge11-6',  g:'Kub – volym',     t:'En kub har sidan 6 cm. Vad är volymen?',                                                                                          a:'216',  hint:'V = s · s · s'},
      {id:'g6ge11-7',  g:'Kub – volym',     t:'En kub har sidan 2 cm. Vad är volymen?',                                                                                          a:'8',    hint:'V = s · s · s'},
      {id:'g6ge11-8',  g:'Volym i liter',   t:'Ett akvarium är 5 dm långt, 3 dm brett och 4 dm högt. Hur många liter rymmer det? (1 dm³ = 1 liter)',                            a:'60',   hint:'V = l · b · h, och 1 dm³ = 1 liter'},
      {id:'g6ge11-9',  g:'Volym i liter',   t:'En sandlåda är 2 dm lång, 2 dm bred och 0,5 dm djup. Hur många liter sand ryms det?',                                            a:'2',    hint:'V = 2 · 2 · 0,5'},
      {id:'g6ge11-10', g:'Räkna kuber',     t:'En figur är byggd av 1 cm³-kuber. Det finns 4 kuber på längden, 3 på bredden och 2 lager högt. Hur stor är volymen?',            a:'24',   hint:'4 · 3 · 2 = ?'},
      {id:'g6ge11-11', g:'Räkna kuber',     t:'En figur är byggd av 1 cm³-kuber. Det finns 5 kuber på längden, 4 på bredden och 3 lager högt. Hur stor är volymen?',            a:'60',   hint:'5 · 4 · 3 = ?'},
      {id:'g6ge11-12', g:'Hitta en sida',   t:'Ett rätblock har volymen 90 cm³, längden 9 cm och bredden 5 cm. Hur hög är det?',                                                a:'2',    hint:'h = V ÷ (l · b)'},
    ]
  },

];

export default worksheets;
