var fs = require('fs');
const util = require('util');

fs.readFile('source-data.tsv', parse);

const binSets = {
  // Object keys are starting keys (or 'none') like z or d
  none: {
    // Object keys are various types of modifiers
    control: {},
    unmod: {},
    shift: {},
  },
};

// Parse tsv
function parse(err, data) {
  if (err) throw err;
  var lines = data.toString().split('\n');
  const commands = lines
    .filter(line => line !== '')
    .map(line => {
      const [tag, char, note, desc] = line.split('\t');
      return {
        tag,
        char,
        note,
        desc,
      };
    });
  categorizeCommands(commands);
}

function categorizeCommands(commands) {
  commands.forEach(command => {
    let { char } = command;
    char = char.replace(/^\["x\]/, ''); // ["x] always appears at beginning
    char = char.replace(/^\{count\}/, ''); // {count} always appears at beginning
    const keyChordSequence = getKeyChordSequence(char);
    console.log(keyChordSequence.join('\t'));
  });
}

function getKeyChordSequence(sequenceAsString) {
  const sequenceAsArray = [];
  while (sequenceAsString !== '') {
    while (sequenceAsString[0] === ' ') {
      sequenceAsString = sequenceAsString.slice(1);
    }

    let match = sequenceAsString.match(/^<.*>|^CTRL-.|^{.*?}/);

    let keyChord;

    if (match === null) {
      keyChord = sequenceAsString[0];
    } else {
      keyChord = match[0];
    }

    sequenceAsArray.push(keyChord);
    sequenceAsString = sequenceAsString.replace(keyChord, '');
  }
  return sequenceAsArray;
}

// function categorizeCommands(binSet, commands, startingChar) {
//   let modifier; // Will be used to decide which bin to put in
//   let baseKey; // Will be used to decide where to place in said bin

//   commands.forEach(command => {
//     let { char } = command;
//     char = char.replace('["x]', '').replace(startingChar, ''); // Remove register prefix and startingChar

//     if (char.startsWith('CTRL-')) {
//       const idx = char.indexOf('-');
//       baseKey = char.slice(idx + 1).split(' ')[0];
//       baseKey = GET_LOWER_CASE[baseKey] || baseKey;
//       modifier = 'control';
//     } else if (char.startsWith('<C-')) {
//       const idx = char.indexOf('-');
//       baseKey = char.slice(idx + 1);
//       baseKey = '<' + baseKey;
//       baseKey = GET_LOWER_CASE[baseKey] || baseKey;
//       modifier = 'control';
//     } else if (char.startsWith('<S-')) {
//       const idx = char.indexOf('-');
//       baseKey = '<' + char.slice(idx + 1);
//       baseKey = GET_LOWER_CASE[baseKey] || baseKey;
//       modifier = 'shift';
//     } else {
//       char.replace(/{.*}/g, '');

//       const angleMatch = char.match(/<.*?>/); // Check if baseKey is of form <...>
//       if (angleMatch && angleMatch.index === 0) {
//         // baseKey is of form <...>
//         baseKey = angleMatch[0];
//       } else {
//         // baseKey is a single character
//         baseKey = char[0];
//       }
//       if (GET_LOWER_CASE[baseKey]) {
//         modifier = 'shift';
//         baseKey = GET_LOWER_CASE[baseKey];
//       } else {
//         modifier = 'unmod';
//       }
//     }
//   });

//   if (modifier && baseKey) {
//     const bin = binSet[modifier];
//     if (bin[baseKey]) {
//       bin[baseKey] = {
//         multiple: true,
//         desc: 'multiple: see other bin',
//       };
//       if (!bin[baseKey].multiple) {
//         // TODO: Add the first one to the other bin
//       }

//       const binSetId = `${startingChar}-${baseKey}`
//       binSets[binSetId] = binSets[binSetId] || { control: {}, unmod: {}, shift: {} };

//       categorizeCommands(binSets[binSetId], [command], );

//       // const existingObject = bin[baseKey];
//       // let newWrapperObject;
//       // if (existingObject.multiple) {
//       //   // Already a wrapper object
//       //   existingObject.multiple.push(object);
//       //   newWrapperObject = existingObject;
//       // } else {
//       //   newWrapperObject = {};
//       //   newWrapperObject.multiple = [existingObject, object];
//       // }
//       // bin[baseKey] = newWrapperObject;
//     } else {
//       bin[baseKey] = object;
//     }
//   }
// }

// Object.keys(bins).forEach(binId => {
// console.log(`const ${binId} = `);
// console.log(util.inspect(bins[binId], false, null));
// });

// Maps a key that must be pressed with shift modifier to the base character
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

// The set of all keys that are part {char}
const chars = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '<Tab>', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?'];
