/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const btn = document.querySelector('.sidebar-toggle');

    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const body = document.getElementsByTagName('body')[0];
      if (body.classList.contains('sidebar-open')) {
        body.classList.remove('sidebar-open', 'sidebar-collapse');

      } else {
        body.classList.add('sidebar-open', 'sidebar-collapse');
      }

    })

  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const btnReg = document.querySelector('.menu-item_register');

    btnReg.addEventListener('click', (event) => {
      event.preventDefault();
      const wnd = App.getModal('register');
      wnd.open();
    })

    const btnLog = document.querySelector('.menu-item_login');

    btnLog.addEventListener('click', (event) => {
      event.preventDefault();
      const wnd = App.getModal('login');
      wnd.open();
    })

    const btnExit = document.querySelector('.menu-item_logout');

    btnExit.addEventListener('click', (event) => {
      event.preventDefault();
      
      User.logout( (err, response) => {
        if (response.success == true) {
          User.unsetCurrent();
          App.setState('init');
        }
      });
    })
  }
}