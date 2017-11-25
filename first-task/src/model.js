import {
  EventEmitter,
  Difference,
} from './helpers';

/**
 * Model - Базовый класс модели
 *
 * @param  {Array} state = [] Стартовое состояние модели
 */
class Model extends EventEmitter {
  constructor(state = []) {
    super();

    this.localState = state;
  }

  get state() {
    return this.localState;
  }

  set state(state) {
    this.localState = state;
  }

  /**
   * setDifference - Вставить разницу
   * Метод ищет разницу между настоящим состоянием и входящим массивом
   * И записывает эту разницу как новое состояние
   *
   * @param  {String[]} arr Входящий массив относительно которого будет искаться разница
   * @return {Object}       data Объект с информацией о разницах
   * @return {String[]}     data.leftDiff Новое состояние которое является разницой
   * от настоящего состояния и входящего массива
   * @return {String[]}    data.affectedDiff Массив с айдишниками которые не присуствуют в состоянии
   *
   */
  setDifference(arr) {
    const leftDiff = Difference.left(this.state, arr);
    const affectedDiff = Difference.right(Difference.left(this.state, leftDiff), arr);
    this.localState = leftDiff;

    return {
      leftDiff,
      affectedDiff,
    };
  }
}

export default Model;
