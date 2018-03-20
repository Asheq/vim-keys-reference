Polymer.setPassiveTouchGestures(true)
class MyApp extends Polymer.Element {
  static get is() { return 'my-app' }
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
window.customElements.define(MyApp.is, MyApp)
