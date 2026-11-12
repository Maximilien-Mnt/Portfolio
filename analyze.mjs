import fs from 'fs';
const s = fs.readFileSync('src/content/projects/pulse.mdx', 'utf8');
const lines = s.split('\n');
const l = lines[15];
console.log('LENGTH:', l.length);

// Show each character with a bracket-depth marker
let depth = 0;
let out = '';
for (let i = 0; i < l.length; i++) {
  const c = l[i];
  if (c === '{') { depth++; out += '['; }
  else if (c === '}') { depth--; out += '}'; }
  else if (c === '\n') { out += '<NL>'; }
  else out += c;
}
console.log('RESERVED:', JSON.stringify(out));
console.log('DEPTH AT END:', depth);
console.log('TOTAL LEN:', l.length);
console.log('--- raw chars ---');
for (let i = 0; i < l.length; i++) {
  const c = l[i];
  const code = c.charCodeAt(0);
  const kind = c === '\n' ? 'NL' : (c === '{' ? 'OB' : (c === '}' ? 'CB' : c));
  console.log(i, kind, code);
}
