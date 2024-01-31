/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('ошибка!');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const btnCreate = this.element.querySelector('.create-account');

    btnCreate.addEventListener('click', (event) => {
      event.preventDefault();
      const wnd = App.getModal('createAccount');
      wnd.open();
    })

    this.element.addEventListener('click', (event) => {
      event.preventDefault();
      const parent = event.target.closest('.account');
      this.onSelectAccount(parent);
    })
    
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const currUser = User.current();
    if (!currUser) {
      return;
    }
    
    Account.list(currUser, (err, response) => {
      if(!err && response) {
        if (response.success) {
          this.clear();
          this.renderItem(response.data);
        } else {
            alert('Ошибка обновления счетов!');
        }
      }
    });
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accs = this.element.querySelectorAll('.account');

    for (const acc of accs) {
      this.element.removeChild(acc);
    }

  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    const accs = this.element.querySelectorAll('.account');

    for (const acc of accs) {
      if (acc.classList.contains('active')) {
        acc.classList.remove('active');

      }
    }

    element.classList.add('active');
    App.showPage( 'transactions', { account_id: element.dataset.id });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    return `<li class="account" data-id=${item.id}>
      <a href="#">
          <span>${item.name}</span> /
          <span>${item.sum} ₽</span>
      </a>
    </li>`;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    for (let dat of data) {
      this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(dat));
    }
  }
}
