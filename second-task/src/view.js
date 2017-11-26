import { EventEmitter, createElement } from './helpers';

/**
 * View - Базовый класс вью
 *
 * @param  {type} items = [] Стартовый стейт
 */
class View extends EventEmitter {
  constructor(state = []) {
    super();

    // DOM Элементы
    this.tableBody = document.getElementById('tableBody');
    this.search = document.getElementById('search');
    this.descBtn = document.getElementById('desc');
    this.ascBtn = document.getElementById('asc');

    this.search.addEventListener('keyup', e => this.emit('search', e));
    this.ascBtn.addEventListener('click', () => this.emit('sortByPlan', 'asc'));
    this.descBtn.addEventListener('click', () => this.emit('sortByPlan', 'desc'));

    this.tableItems = [];
    this.addItems(state);
  }

  /**
   * addItems - Добавить айтемов в таблицу
   *
   * @param  {Object[]} arr Массив с информацией по вознаграждениям
   */
  addItems(arr) {
    const fragment = document.createDocumentFragment();

    arr.forEach((item) => {
      const transformedItem = View.createTableRow(item);
      this.tableItems.push(transformedItem);
      fragment.appendChild(transformedItem);
    });

    this.tableBody.appendChild(fragment);
  }

  /**
   * createTableRow - Создать строку с шаблонизированными данными
   *
   * @param  {Object}     data Информация о вознагрождении
   * @param  {String}     data.builderName Застройщик
   * @param  {String}     data.blockName ЖК
   * @param  {String}     data.blockPlanPercent План
   * @param  {String}     data.builderAdverticement Реклама
   * @param  {String}     data.id ID
   * @returns {DOMNode}
   */
  static createTableRow({
    builderName,
    blockName,
    blockPlanPercent,
    builderAdverticement,
    id,
  }) {
    const builderElement = createElement('td', {}, builderName);
    const blockNameElement = createElement('td', {}, blockName);
    const blockPlanPercentElement = createElement('td', {}, blockPlanPercent);
    const builderAdverticementElement = createElement('td', {}, builderAdverticement);

    const row = createElement(
      'tr',
      { id },
      builderElement,
      blockNameElement,
      blockPlanPercentElement,
      builderAdverticementElement,
    );

    return row;
  }

  /**
   * sort - Отсортировать DOM элементы по массиву
   *
   * @param  {type} arr Массив с айдишниками
   */
  sort(arr, operationId) {
    const fragment = document.createDocumentFragment();

    arr.forEach((id) => {
      fragment.appendChild(this.tableItems.find(item => item.id === id && item));
    });

    this.tableBody.appendChild(fragment);
    this.toggleSortBtns(operationId);
  }

  /**
   * toggleSortBtns - Переключение состояний кнопок сортировки
   *
   * @param  {type} operationId description
   * @return {type}             description
   */
  toggleSortBtns(operationId) {
    if (operationId === 'desc') {
      this.descBtn.classList.remove('is-outlined');
      this.ascBtn.classList.add('is-outlined');
    }

    if (operationId === 'asc') {
      this.ascBtn.classList.remove('is-outlined');
      this.descBtn.classList.add('is-outlined');
    }
  }

  /**
   * filter - Фильтрация по DOM элементам
   *
   * @param  {String[]} inputArr Инпут айдишников которые нужно отображать
   */
  filter(inputArr) {
    const forHide = this.tableItems.filter(item => inputArr.indexOf(item.id) === -1);
    const forDisplay = this.tableItems.filter(item => inputArr.indexOf(item.id) !== -1);

    forHide.forEach((item) => {
      item.classList.add('display_none');
    });

    forDisplay.forEach((item) => {
      item.classList.remove('display_none');
    });
  }
}

export default View;
