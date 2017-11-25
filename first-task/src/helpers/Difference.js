class Difference {
  /**
   * @static left - "Левая" разница массивов, разница массива 1 к массиву 2
   *
   * @param  {String[]} arr1 Первый массив
   * @param  {String[]} arr2 Второй массив
   * @return {String[]}      Разница первого массива ко второму
   */
  static left(arr1, arr2) {
    return arr1.filter(x => arr2.indexOf(x) === -1);
  }

  /**
   * @static left - "Правая" разница массивов, разница массива 2 к массиву 1
   *
   * @param  {String[]} arr1 Первый массив
   * @param  {String[]} arr2 Второй массив
   * @return {String[]}      Разница второго массива к первому
   */
  static right(arr1, arr2) {
    return arr2.filter(x => arr1.indexOf(x) === -1);
  }

  /**
   * @static both - "Двухсторонняя" разница
   *
   * @param  {String[]} arr1 Первый массив
   * @param  {String[]} arr2 Второй массив
   * @return {String[]}      Полная разница
   */
  static both(arr1, arr2) {
    return Difference.left(arr1, arr2).concat(Difference.right(arr1, arr2));
  }
}

export default Difference;
