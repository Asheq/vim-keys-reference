class KeysTable extends Polymer.Element {
  static get is() { return 'keys-table' }
  static get properties() {
    return {
      keys: {
        type: Array
      },
      showVariations: {
        type: String
      },
      showDescriptions: {
        type: Boolean,
        value: true
      },
    }
  }
  _getVariationsOfKey(keyObj, showVariations) {
    if (keyObj && showVariations) {
      return keyObj[showVariations + 'Variations']
    }
  }
}

window.customElements.define(KeysTable.is, KeysTable)

