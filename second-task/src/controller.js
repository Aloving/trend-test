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
    this.view.on('search', this.onSearch);

    /**
     * Последний поисковый запрос
     *
     * @type {?String}
     */
    this.lastRequest = null;
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
