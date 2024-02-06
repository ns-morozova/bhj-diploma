/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('ошибка!');
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const remAcc = this.element.querySelector('.remove-account');

    remAcc.addEventListener('click', (event) => {
      event.preventDefault();
      this.removeAccount();
    })

    const content = this.element.querySelector('.content');

    content.addEventListener('click', (event) => {
      event.preventDefault();
      const parent = event.target.closest('.transaction__remove');

      if(!parent) {
        return;
      } else {
        this.removeTransaction(parent.dataset.id);
      }

    })

  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    if (!this.lastOptions) {
      return;
    }
    if (confirm('Вы действительно хотите удалить счёт?')) {
      Account.remove({id: this.lastOptions.account_id}, (err, response) => {
        if(!err && response.success) {
          this.clear();
          App.updateWidgets();
          App.updateForms();
        }
        
      });
    }
  }


  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    if (confirm('Вы действительно хотите удалить эту транзакцию?')) {
      Transaction.remove({id}, (err, response) => {
        if(!err && response.success) {
          App.update();
        } else {
          alert('ошибка!');
        }
      });
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    if(!options) {
      return;
    }
    this.lastOptions = options;
    Account.get(options.account_id, (err, response) => {
      if(!err && response.success) {
        this.renderTitle(response.data.name);
        Transaction.list(options, (err, response) => {
          if(!err && response.success) {
            this.renderTransactions(response.data);
          } else {
            this.renderTransactions(new Array);
          }
        });
      }
    })
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions(new Array);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    const title = this.element.querySelector('.content-title');
    title.textContent = name;

  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    let dat = new Date(Date.parse(date));

    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric'
      };

      return dat.toLocaleString('ru', options);

  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    let textHtml = `<div class="transaction ${item.type=='income' ? 'transaction_income' : 'transaction_expense'} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          <!-- дата -->
          <div class="transaction__date">${this.formatDate(item.created_at)}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
      <!--  сумма -->
          ${item.sum} <span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <!-- в data-id нужно поместить id -->
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
      </div>
    </div>`;

    return textHtml;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){     //data = arr[]
    const content = this.element.querySelector('.content'); 
    const trans = Array.from(content.querySelectorAll('.transaction'));

    for (let tran of trans) {
      content.removeChild(tran);
    }
    
    for (let item of data) {
      const dubl = content.querySelector(`[data-id="${item.id}"]`);

      if(!dubl) {
        let textHtml = this.getTransactionHTML(item);
        content.insertAdjacentHTML('beforeend', textHtml);
      }
    }
  }
}