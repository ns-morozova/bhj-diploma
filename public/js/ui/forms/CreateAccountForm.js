/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    const obj = this.getData();
    Account.create(obj, (err, response) => {
      if (!err) {
        if (response.success) {
          const names = this.element.querySelectorAll('[name]');
          for (const name of names) {
            name.value = '';
          }
          App.getModal('createAccount').close();
          App.update();
        } else {
          alert(response.error);
        }
      }
    });
  }
}