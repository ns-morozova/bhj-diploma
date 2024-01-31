/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    const obj = this.getData();

    User.register(obj, (err, response) => {
      if (err == null) {
        if (response.success) {

          const names = this.element.querySelectorAll('[name]');
          for (const name of names) {
            name.value = '';
          }

          //User.setCurrent(response.user);
          App.setState('user-logged');
          App.getModal('register').close();
        } else {
          alert(response.error);
        }
      }
    });
  }
}