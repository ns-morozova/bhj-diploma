//const { response } = require("express");

/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const user = User.current();
    if(!user) {
      return;
    }

    const expList = this.element.querySelector('[name="account_id"]');
    
    const values = Array.from(expList.querySelectorAll('[value]'));

    for (const value of values) {
      expList.removeChild(value);
    }
    
    Account.list(user, (err, response) => {

      if(!err && response.success) {
        for (const acc of response.data) {

          const dubl = expList.querySelector(`[value="${acc.id}"]`);

          if (!dubl) {
            let optHtml = `<option value="${acc.id}">${acc.name}</option>`;
            expList.insertAdjacentHTML('beforeend', optHtml);

          }
        }
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if(!err && response.success) {
        const names = this.element.querySelectorAll('[name]');
          for (const name of names) {
            name.value = '';
          }

          if (data.type == 'income') {
            App.getModal('newIncome').close();
          } else {
            App.getModal('newExpense').close();
          }

          App.update();
      }
      
    });
  }
}