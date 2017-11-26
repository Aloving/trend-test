import { debounce } from './helpers';

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

    // Константы
    this.SEARCH_FIELDS = ['builderName', 'blockName'];
    this.ONLY_IDS = true;

    // this.onSearch = this.onSearch.bind(this);
    this.onSearch = debounce(this.onSearch.bind(this), 250);
    this.sortByPlan = this.sortByPlan.bind(this);

    this.view.on('search', this.onSearch);
    this.view.on('sortByPlan', this.sortByPlan);

    /**
     * Последний поисковый запрос
     *
     * @type {?String}
     */
    this.lastRequest = null;

    /**
     * Флаг указывающий на состояние сортировки поля "План" вью
     *
     * @type {?String}
     */
    this.sorted = null;
  }

  /**
   * sortByPlan - Провести сортировку по полю "План"
   *
   * @param  {type} direction В каком порядке сортировать
   * @fires  view#sort
   */
  sortByPlan(direction) {
    if (this.sorted === direction) {
      return;
    }

    const sortedModel = this.model.sortByPlan(direction);
    this.view.sort(sortedModel, direction);
    this.sorted = direction;
  }

  /**
   * onSearch - Действие при поиске
   *
   * @param  {DOMEvent} e Объект события
   * @fires  model#filter
   * @fires  model#filter
   */
  onSearch(e) {
    const inputval = e.target.value;
    if (inputval === this.lastRequest) {
      return;
    }

    const filtered = this.model.searchBy(inputval, this.SEARCH_FIELDS, this.ONLY_IDS);
    this.view.filter(filtered);
    this.lastRequest = inputval;
  }
}

export default Controller;
