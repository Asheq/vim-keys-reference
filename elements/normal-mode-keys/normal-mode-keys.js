class NormalModeKeys extends Polymer.Element {
  static get is() { return 'normal-mode-keys' }
  static get properties() {
    return {
      selectedTab: {
        type: Number,
        value: 5
      },
      keys: {
        type: Object,
        computed: '_computeKeys(keysJson)',
      },
      showDescriptions: {
        type: Boolean,
        value: true
      },
      variationCategories: {
        type: Array,
        value: function() {
          return [{
            name: 'Basic',
            id: 'basic',
            variations: [
              'base',
              'shift',
              'g',
              'gShift',
              'control',
            ],
          }, {
            name: 'Starting with z or Z',
            id: 'z',
            variations: [
              'z',
              'zShift',
              'Z',
              'ZShift'
            ],
          }, {
            name: 'Starting with ] or [',
            id: 'square',
            variations: [
              'leftSquareBracket',
              'leftSquareBracketShift',
              'rightSquareBracket',
              'rightSquareBracketShift',
            ],
          }, {
            name: 'Starting with <C-w>',
            id: 'window',
            variations: [
              '<C-w>',
              '<C-w>Shift',
              // <C-w>g
            ]
          }, {
            name: 'Starting with q, @, or "',
            id: 'registers',
            variations: [
              'q',
              'qShift',
              '@',
              '@Shift',
              '"',
              '"Shift'
            ]
          }, {
            name: 'Starting with m, \', or `',
            id: 'marks',
            variations: [
              'm',
              'mShift',
              '\'',
              '\'Shift',
              '`',
              '`Shift',
            ]
          }, {
            name: 'Starting with d, y, c, or =',
            id: 'operator',
            variations: [
              'd',
              'y',
              'c',
              '=',
              'dShift',
              'yShift',
              'cShift',
              '=Shift',
            ]
          }]
        }
      }
    }
  }
  _getDescription(variationName, {variations, baseKey, shiftKey, controlKey}) {
    let description = variations[variationName].description

    if (description === undefined || description == '') {
      if (['d', 'y', 'c', '='].includes(variationName) && variations.base.type === 'motion') {
        description = 'operate over motion: ' + variations.base.description
      } else if (['dShift', 'yShift', 'cShift', '=Shift'].includes(variationName) && variations.shift.type === 'motion') {
        description = 'operate over motion: ' + variations.shift.description
      }
    }

    return description
  }
  _getType(variationName, {variations, baseKey, shiftKey, controlKey}) {
    let type = variations[variationName].type
    if (type === undefined || type == '') {
      if (['d', 'y', 'c', '='].includes(variationName) && variations.base.type === 'motion') {
        type = 'operation'
      } else if (['dShift', 'yShift', 'cShift', '=Shift'].includes(variationName) && variations.shift.type === 'motion') {
        type = 'operation'
      }
    }
    return type
  }
  _getDuplicates(variationName, {variations, baseKey, shiftKey, controlKey}) {
    let duplicates = variations[variationName].duplicates
    return duplicates
  }
  _getPrettyDisplay(variationName, {baseKey, shiftKey, controlKey}) {
    let prettyDisplay
    switch (variationName) {
      case 'base':
        prettyDisplay = baseKey
        break
      case 'shift':
        prettyDisplay = shiftKey
        break
      case 'g':
        prettyDisplay = 'g' + baseKey
        break
      case 'gShift':
        prettyDisplay = 'g' + shiftKey
        break
      case 'z':
        prettyDisplay = 'z' + baseKey
        break
      case 'zShift':
        prettyDisplay = 'z' + shiftKey
        break
      case 'Z':
        prettyDisplay = 'Z' + baseKey
        break
      case 'ZShift':
        prettyDisplay = 'Z' + shiftKey
        break
      case 'd':
        prettyDisplay = 'd' + baseKey
        break
      case 'dShift':
        prettyDisplay = 'd' + shiftKey
        break
      case 'y':
        prettyDisplay = 'y' + baseKey
        break
      case 'yShift':
        prettyDisplay = 'y' + shiftKey
        break
      case 'c':
        prettyDisplay = 'c' + baseKey
        break
      case 'cShift':
        prettyDisplay = 'c' + shiftKey
        break
      case '=':
        prettyDisplay = '=' + baseKey
        break
      case '=Shift':
        prettyDisplay = '=' + shiftKey
        break
      case 'leftSquareBracket':
        prettyDisplay = '[' + baseKey
        break
      case 'leftSquareBracketShift':
        prettyDisplay = '[' + shiftKey
        break
      case 'rightSquareBracket':
        prettyDisplay = ']' + baseKey
        break
      case 'rightSquareBracketShift':
        prettyDisplay = ']' + shiftKey
        break
      case 'control':
        prettyDisplay = controlKey || '<C-' + baseKey + '>'
        break
      case '<C-w>':
        prettyDisplay = '<C-w>' + baseKey
        break
      case '<C-w>Shift':
        prettyDisplay = '<C-w>' + shiftKey
        break
      case 'q':
        prettyDisplay = 'q' + baseKey
        break
      case 'qShift':
        prettyDisplay = 'q' + shiftKey
        break
      case '@':
        prettyDisplay = '@' + baseKey
        break
      case '@Shift':
        prettyDisplay = '@' + shiftKey
        break
      case '"':
        prettyDisplay = '"' + baseKey
        break
      case '"Shift':
        prettyDisplay = '"' + shiftKey
        break
      case 'm':
        prettyDisplay = 'm' + baseKey
        break
      case 'mShift':
        prettyDisplay = 'm' + shiftKey
        break
      case '\'':
        prettyDisplay = '\'' + baseKey
        break
      case '\'Shift':
        prettyDisplay = '\'' + shiftKey
        break
      case '`':
        prettyDisplay = '`' + baseKey
        break
      case '`Shift':
        prettyDisplay = '`' + shiftKey
        break
      default:
        prettyDisplay = ''
    }
    return prettyDisplay
  }
  _computeKeys(keysJson) {
    if (!keysJson) {
      return null
    }
    const self = this

    keysJson.keys.forEach(function(keyObj) {
      var variationObj = keyObj.variations
      Object.keys(variationObj).forEach(function(variation) {
        variationObj[variation].description = self._getDescription(variation, keyObj)
        variationObj[variation].prettyDisplay = self._getPrettyDisplay(variation, keyObj)
        variationObj[variation].duplicates = self._getDuplicates(variation, keyObj)
        variationObj[variation].type = self._getType(variation, keyObj)
      })
      for (const variationCategory of self.variationCategories) {
        keyObj[variationCategory.id + 'Variations'] = variationCategory.variations.map(x => variationObj[x])
      }
    })

    return keysJson.keys
  }
}

window.customElements.define(NormalModeKeys.is, NormalModeKeys)
