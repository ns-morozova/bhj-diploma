/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';
    
    let fData = null;
    let param = '';

    if (options.method == 'GET') {
        if (!(options.data == undefined)) {
            for (let key in options.data) {
                param = param + (param == '' ? '' : '&') + key + '=' + options.data[key];
            }
            param = '?' + param;
        }
    } else {
        fData = new FormData();
        if (!(options.data == undefined)) {
            for (let key in options.data) {
                fData.append(key, options.data[key]);
            }
        }
    }

    try {
        xhr.open(options.method, options.url + param);
        xhr.send(fData);
        } catch (err) {
            options.callback(err);
            return;
    }
    
    xhr.addEventListener('readystatechange', () => {
        let err = null;

        if (xhr.readyState == xhr.DONE) {
            if (!(xhr.status == 200)) {
                err = new Error ('ошибка: ' + xhr.status.toString());
            }
            options.callback(err, xhr.response);
        }
    })
};