class MainController {
  constructor($rootScope) {
    this.$rootScope = $rootScope;

    this.buttons = [
      {name: 'Дані', sref: 'data'},
      {name: 'Інфографіка', sref: 'list'},
      {name: 'Карта', sref: 'map'},
      {name: 'Завантаження', sref: 'editor'}
    ];
  }
}

export default MainController;