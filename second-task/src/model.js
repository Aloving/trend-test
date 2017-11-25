import { EventEmitter } from './helpers';

/**
 * Model - Базовый класс модели
 */
class Model extends EventEmitter {
  constructor(state = []) {
    super();

    this.state = state;
  }

  /**
   * searchBy - Поиск по модели
   *
   * @param  {type} searchTag     Строка для поиска
   * @param  {String[]} fields    Поиск по каким полям нужно проводить
   * @param  {Boolean} onlyIds    Флаг который указывает нужны ли только ID'шники
   * @return {Array}
   */
  searchBy(searchTag, fields, onlyIds) {
    if (!searchTag.trim().length) {
      return Model.getIds(this.state);
    }

    const found = fields.reduce((result, current) => {
      this.state.forEach((item) => {
        if (result.indexOf(item) !== -1) {
          return;
        }

        if (RegExp(searchTag, 'i').test(item[current])) {
          result.push(item);
        }
      });

      return result;
    }, []);

    if (onlyIds) {
      return Model.getIds(found);
    }

    return found;
  }


  /**
   * @static getIds - Получить массив айдишников из массива объектов
   *
   * @param  {Object[]} arr Массив с объектами
   * @return {String[]}
   */
  static getIds(arr) {
    return arr.map(item => item.id);
  }
}

export default Model;
