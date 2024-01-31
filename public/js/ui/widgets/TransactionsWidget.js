/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('ошибка!');
    }
    this.element = element;
    this.registerEvents();

  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const btnInc = this.element.querySelector('.create-income-button');

    btnInc.addEventListener('click', (event) => {
      event.preventDefault();
      const wnd = App.getModal('newIncome');
      wnd.open();
    })


    const btnExp = this.element.querySelector('.create-expense-button');

    btnExp.addEventListener('click', (event) => {
      event.preventDefault();
      const wnd = App.getModal('newExpense');
      wnd.open();
    })

  }
}
