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
   * sortByPlan - Сортировка по полю план
   *
   * @param  {String}  direction Флаг который указывает в каком направлении нужно отсортировать
   * @param  {Boolean} direction Флаг который говорит отсылать ли результаты массивом с id
   */
  sortByPlan(direction, onlyIds = true) {
    if (direction === 'desc') {
      return this.sortPlanByDesc(onlyIds);
    }

    if (direction === 'asc') {
      return this.sortPlanByAsc(onlyIds);
    }

    return this.state;
  }

  /**
   * sortPlanByDesc - Отсортировать по Убыванию
   *
   * @param  {type}               onlyIds Флаг который указывает нужны ли только id
   * @return {Object[]|String[]}  В зависимости от флага {onlyIds}
   */
  sortPlanByDesc(onlyIds) {
    const sorted = this.state.sort((x, y) => {
      const xVal = Model.getFloatFromPercent(x.blockPlanPercent);
      const yVal = Model.getFloatFromPercent(y.blockPlanPercent);

      return yVal - xVal;
    });

    if (onlyIds) {
      return Model.getIds(sorted);
    }

    return sorted;
  }

  /**
   * sortPlanByAsc - Отсортировать по возрастанию
   *
   * @param  {type}               onlyIds Флаг который указывает нужны ли только id
   * @return {Object[]|String[]}  В зависимости от флага {onlyIds}
   */
  sortPlanByAsc(onlyIds) {
    const sorted = this.state.sort((x, y) => {
      const xVal = Model.getFloatFromPercent(x.blockPlanPercent);
      const yVal = Model.getFloatFromPercent(y.blockPlanPercent);

      return xVal - yVal;
    });

    if (onlyIds) {
      return Model.getIds(sorted);
    }

    return sorted;
  }

  /**
   * @static getFloatFromPercent - Достать из строки float без процента
   *
   * @param  {String} val
   * @return {Number}
   */
  static getFloatFromPercent(val) {
    return parseFloat(val.match(/\d+(\.\d+)?%/)[0]);
  }

  /**
   * searchBy - Поиск по модели
   *
   * @param  {type} searchTag     Строка для поиска
   * @param  {String[]} fields    Поиск по каким полям нужно проводить
   * @param  {Boolean} onlyIds    Флаг который указывает нужны ли только ID'шники
   * @return {Object[]|String[]}  В зависимости от флага {onlyIds}
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
