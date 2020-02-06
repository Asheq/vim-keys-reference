var fs = require('fs');
const util = require('util');

fs.readFile('source-data.tsv', parse);

// Bins
control = {};
base = {};
shift = {};

// Parse tsv
function parse(err, data) {
  if (err) throw err;
  var lines = data.toString().split('\n');
  for (i in lines) {
    const line = lines[i];
    if (line === '') {
      continue;
    }
    const [tag, char, note, desc] = line.split('\t');
    const object = {
      tag,
      char,
      note,
      desc,
    };
    let bin;
    let key;
    if (char.startsWith('CTRL-')) {
      const idx = char.indexOf('-');
      key = char.slice(idx + 1).split(' ')[0];
      key = GET_LOWER_CASE[key] || key;
      bin = control;
    } else if (char.startsWith('<C-')) {
      const idx = char.indexOf('-');
      key = char.slice(idx + 1);
      key = '<' + key;
      key = GET_LOWER_CASE[key] || key;
      bin = control;
    } else if (char.startsWith('<S-')) {
      const idx = char.indexOf('-');
      key = char.slice(idx + 1);
      key = '<' + key;
      key = GET_LOWER_CASE[key] || key;
      bin = shift;
    } else {
      key = char.replace('["x]', ''); // Remove register prefix
      key = key.replace(/{.*?}/g, ''); // Remove {...} anywhere in key (TODO: too strong?)
      const match = key.match(/<.*?>/); // Check if key is of form <...>
      if (match && match.index === 0 ) {
        // Key is of form <...>
        key = match[0];
      } else {
        // Key is a single character
        key = key[0];
      }
      if (GET_LOWER_CASE[key]) {
        bin = shift;
        key = GET_LOWER_CASE[key];
      } else {
        bin = base;
      }
    }

    if (bin && key) {
      if (bin[key]) {
        const existingObject = bin[key];

        let newWrapperObject;
        if (existingObject.multiple) {
          // Already a wrapper object
          existingObject.multiple.push(object);
          newWrapperObject = existingObject;
        } else {
          newWrapperObject = {};
          newWrapperObject.multiple = [existingObject, object];
        }

        bin[key] = newWrapperObject;
      } else {
        bin[key] = object;
      }
    }
  }

  console.log('const base = ');
  console.log(util.inspect(base, false, null));
  console.log('const shift = ');
  console.log(util.inspect(shift, false, null));
  console.log('const control = ');
  console.log(util.inspect(control, false, null));
}

const GET_LOWER_CASE = {
  A: 'a',
  B: 'b',
  C: 'c',
  D: 'd',
  E: 'e',
  F: 'f',
  G: 'g',
  H: 'h',
  I: 'i',
  J: 'j',
  K: 'k',
  L: 'l',
  M: 'm',
  N: 'n',
  O: 'o',
  P: 'p',
  Q: 'q',
  R: 'r',
  S: 's',
  T: 't',
  U: 'u',
  V: 'v',
  W: 'w',
  X: 'x',
  Y: 'y',
  Z: 'z',
  '~': '`',
  '!': '1',
  '@': '2',
  '#': '3',
  $: '4',
  '%': '5',
  '^': '6',
  '&': '7',
  '*': '8',
  '(': '9',
  ')': '0',
  _: '-',
  '+': '=',
  '{': '[',
  '}': ']',
  '|': '\\',
  ':': ';',
  '"': "'",
  '<': ',',
  '>': '.',
  '?': '/',
  '<S-Down>': '<Down>',
  '<S-Left>': '<Left>',
  '<S-LeftMouse>': '<LeftMouse>',
  '<S-Right>': '<Right>',
  '<S-RightMouse>': '<RightMouse>',
  '<S-Up>': '<Up>',
  '<S-ScrollWheelDown>': '<ScrollWheelDown>',
  '<S-ScrollWheelLeft>': '<ScrollWheelLeft>',
  '<S-ScrollWheelRight>': '<ScrollWheelRight>',
  '<S-ScrollWheelUp>': '<ScrollWheelUp>',
};
