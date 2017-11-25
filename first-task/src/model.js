import {
  EventEmitter,
  Difference,
} from './helpers';

/**
 * Model - Базовый класс модели
 *
 * @param  {Array} pushIDs = []
 */
class Model extends EventEmitter {
  constructor(pushIDs = []) {
    super();

    /**
     * Запушенные ID'шники (сгенерированные)
     *
     * @type {String[]}
     */
    this.pushIDs = pushIDs;

    /**
     * Массив запуленных айдишников
     *
     * @type {String[]}
     */
    this.pullIDs = [];
  }

  /**
   * updateState - Обновление состояние модели
   *
   * @param  {Object} data      Информарция об объявлении где
   * @param  {String} data[key] Поле которое нужно обновить
   * @param  {any}    data[val] Значение которое нужно присвоить
   */
  updateState(data) {
    Object.keys(data).forEach((key) => {
      this[key] = data[key];
    });
  }

  /**
   * calculateDiff - Расчитать новую разницу
   *
   * @param  {String[]} arr Входящий массив относительно которого будет искаться разница
   *
   * @return {Object}       data Объект с информацией о разницах
   * @return {String[]}     data.pushIDs Новое состояние поля {this.pushIds}
   * @return {String[]}     data.pullIDs Новое состояние поля {this.pullIDs}
   * @return {String[]}     data.notFound Айдишники который не были найдены
   */
  calculateDiff(arr) {
    const pushIDs = Difference.left(this.pushIDs, arr);
    const concurrences = Difference.left(this.pushIDs, pushIDs);
    const notFound = Difference.right(concurrences, arr);
    const pullIDs = this.pullIDs.concat(concurrences);

    this.updateState({
      pullIDs,
      pushIDs,
    });

    return {
      pushIDs,
      notFound,
      pullIDs,
    };
  }
}

export default Model;
