import { IDGenerator } from './helpers';

/**
 * Controller - Базовый класс контроллера
 *
 * @param  {instance} model Инстанс модели
 * @param  {instance} view  Инстанс вью
 */
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.pushIDs = this.pushIDs.bind(this);
    this.pullIDs = this.pullIDs.bind(this);

    this.view.on('pushIDs', this.pushIDs);
    this.view.on('pullIDs', this.pullIDs);
  }

  /**
   * pushIDs - Метод для добавления айдишников
   *
   * @param  {number}     val Необходимое количество
   * @fires view#pushIDs
   */
  pushIDs(val) {
    const amount = parseInt(val, 10);
    const newIDs = IDGenerator.generateNewArr(amount);
    const pushIDs = this.model.pushIDs.concat(newIDs);

    this.model.updateState({ pushIDs });
    this.view.pushIDs(newIDs);
  }

  /**
   * pullIDs - "Спулить айдишники" имеется ввиду вытащить
   *
   * @param  {number}     val Необходимое количество
   * @fires view#pullIds
   */
  pullIDs(val) {
    const amount = parseInt(val, 10);

    // Генериурем "Аффекты", не существующие айдишники
    const affectedIds = IDGenerator.generateNewArr(amount);
    const randomAffected = IDGenerator.generateRandoms(affectedIds, 2);

    // Генериурем рандомное число айдишников из уже существующих
    const modelPushIDs = this.model.pushIDs;
    const randomsOfModel = IDGenerator.generateRandoms(modelPushIDs, amount);

    // Складываем результаты и отдаем модели посчитать разницы
    const concated = randomAffected.concat(randomsOfModel);
    const result = this.model.calculateDiff(concated);

    // Закидываем результат во вью
    this.view.pullIds(result);
  }
}

export default Controller;
