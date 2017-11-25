import shortId from 'shortid';

class IDGenerator {
  /**
   * @static generateNewArr - Генерация нового массива айдишников
   *
   * @param  {Number} amount = 5 Требуемоем колличество
   * @return {String[]}
   */
  static generateNewArr(amount = 5) {
    const ids = [];
    for (let i = 0; i < amount; i += 1) {
      ids.push(IDGenerator.keyGenerator());
    }

    return ids;
  }

  /**
   * @static generateRandoms - Сгенерировать рандомное количество айтемов из массива
   * Ограничение по максимальному
   *
   * @param  {String[]} ids = [] Исходный массив айдишников
   * @param  {number} max = 5  Максимальное количество генерируемых айдишников
   * @return {String[]}
   */
  static generateRandoms(ids = [], max = 5) {
    if (!ids.length) {
      throw new Error('Array is empty');
    }

    const randomIds = [];
    const randomNum = Math.ceil(Math.random() * max, 10);
    for (let i = 0; i < randomNum; i += 1) {
      const randomIndex = parseInt(Math.random() * ids.length, 10);
      randomIds.push(ids[randomIndex]);
    }

    return randomIds;
  }

  /**
   * @static keyGenerator - Генерация ID
   *
   * @return {String} Сгенерированный ID
   */
  static keyGenerator() {
    return shortId.generate();
  }
}

export default IDGenerator;
