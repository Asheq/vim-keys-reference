Polymer.setPassiveTouchGestures(true)
class AppRoot extends Polymer.Element {
  static get is() { return 'app-root' }
  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
      },
    }
  }
  static get observers() {
    return [
      '_routePageChanged(routeData.page)',
    ]
  }
  _routePageChanged(page) {
    this.page = page || 'normal-mode-keys'
  }
}
window.customElements.define(AppRoot.is, AppRoot)
