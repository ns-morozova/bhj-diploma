/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */
  static URL = '/account';
  static get(id = '', callback){
    createRequest({
      url: this.URL + '/' + id.toString(),
      method: 'GET',
      callback: (err, response) => {
        callback(err, response);
      }
    })
  }

  // static create(data, callback) {
  //   createRequest({
  //     url: '/create' + this.URL,
  //     method: 'PUT',
  //     data,
  //     callback: (err, response) => {
  //       callback(err, response);
  //     }
  //   })
  // }
}
