/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (element == undefined) {
      throw new Error('ошибка открытия окна');
    } else {
      this.element = element;
      this.registerEvents();
    }

  }

  /**
   * Необходимо запретить отправку формы и в момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    this.element.addEventListener ('submit', (event) => {
      event.preventDefault();
      this.submit();
    })

    this.element.addEventListener ('click', (event) => {
      event.preventDefault();
    })
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    const fData = new FormData(this.element);
    const fieldObj = {};

    for (let item of fData.entries()) {
      fieldObj[item[0]] = item[1];
    }

    // const fields = document.querySelectorAll('[name]');
    // const fieldObj = {};
    // for (const field of fields) {
    //   fieldObj[field.name] = field.value;
    // }
    return fieldObj;
  }

  onSubmit(options){

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    this.onSubmit(this.getData());

  }
}