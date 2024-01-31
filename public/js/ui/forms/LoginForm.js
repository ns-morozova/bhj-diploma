/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    const obj = this.getData();

    User.login(obj, (err, response) => {
      if (err == null) {
        if (response.success) {

          const names = this.element.querySelectorAll('[name]');
          for (const name of names) {
            name.value = '';
          }

          User.setCurrent(response.user);
          App.setState('user-logged');
          App.getModal('login').close();
        } else {
          alert(response.error);
        }
      }
    });

  }
}