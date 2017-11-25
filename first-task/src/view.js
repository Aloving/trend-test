import { EventEmitter, createElement } from './helpers';

/**
 * View - Базовый класс вью
 */
class View extends EventEmitter {
  constructor() {
    super();

    // Кнопки взаимодействяи
    this.pushBtn = document.getElementById('pushBtn');
    this.pullBtn = document.getElementById('pullBtn');

    // Поля для заполнения данных для ввода
    this.pushAmountInput = document.getElementById('pushAmountInput');
    this.pullAmountInput = document.getElementById('pullAmountInput');

    // Боксы для отображения
    this.clientBox = document.getElementById('clientBox');
    this.pullBox = document.getElementById('pullBox');
    this.affectedBox = document.getElementById('affectedBox');

    // DOM элементы id шников, "Теги"
    this.tags = [];

    // Саб классы к тегам
    this.tagSubClasses = [
      'is-light',
      'is-primary',
      'is-link',
      'is-info',
      'is-success',
      'is-warning',
      'is-danger',
    ];

    this.pushBtnDisabledToggle = this.pushBtnDisabledToggle.bind(this);
    this.on('newOperation', this.pushBtnDisabledToggle);
    this.initListeners();
  }


  /**
   * initListeners - Метод для иницилизации слушателей
   */
  initListeners() {
    this.pushBtn.addEventListener('click', () => this.emit('pushIDs', this.pushAmount.call(this)));
    this.pullBtn.addEventListener('click', () => this.emit('pullIDs', this.pullAmount.call(this)));
  }

  /**
   * pushAmount - Получение количества для пуша айдишников
   *
   * @return {Number}
   */
  pushAmount() {
    return this.pushAmountInput.value;
  }

  /**
   * pullAmount - Получение количества для пула айдишников
   *
   * @return {Number}
   */
  pullAmount() {
    return this.pullAmountInput.value;
  }


  /**
   * pushIDs - Запушить айдишники (добавил в основной бокс)
   *
   * @param  {String[]} arr
   */
  pushIDs(arr) {
    const idELements = this.generateIDElements(arr);
    const fragment = View.appendToFragment(document.createDocumentFragment(), idELements);

    this.clientBox.appendChild(fragment);
    this.tags = this.tags.concat(idELements);

    this.emit('newOperation', true);
  }


  /**
   * @static appendToFragment - Вспомогательный метод добавления DOM элементов
   * к фрагменту
   *
   * @param  {DocumentFragment}   fragment Фрагмент
   * @param  {DOMNode[]}          elems    Дом элементы
   * @returns {DocumentFragment}
   */
  static appendToFragment(fragment, elems) {
    elems.forEach((el) => {
      fragment.appendChild(el);
    });

    return fragment;
  }


  /**
   * generateIDElements - Генерация дом элементов на основе массива
   *
   * @param  {String[]}   arr Исходный массив айдишников
   * @return {DOMNode[]}
   */
  generateIDElements(arr) {
    const ids = arr.map((id) => {
      const subTagClass = this.generateSubTagClass();
      return createElement('div', { className: `tag ${subTagClass}`, id }, id);
    });

    return ids;
  }

  /**
   * pullIds - "Спуливание" айтемов с основного бокса
   *
   * @param  {Object}   data             Объект с данными
   * @param  {String[]} data.pullIDs     Новое состояние запуленных айдишников
   * @param  {String[]} data.pushIDs     Новое состояние запушенных айдишников
   * @param  {String[]} data.notFound    Айдишники которые не были найдены в состоянии
   * @fires this#setPullItems
   * @fires this#setNotFoundItems
   * @fires this#emit
   */
  pullIds(data) {
    this.setPullItems(data.pullIDs);
    this.setNotFoundItems(data.notFound);
    this.emit('newOperation', !!data.pushIDs.length);
  }


  /**
   * setPullItems - Метод вставляет запуленные айтемы в "Запушенные ID"
   *
   * @param  {String[]} arr Исходный массив
   */
  setPullItems(arr) {
    const idElems = this.tags.filter(tag => arr.indexOf(tag.id) !== -1);
    const fragment = View.appendToFragment(document.createDocumentFragment(), idElems);

    this.pullBox.appendChild(fragment);
  }


  /**
   * setNotFoundItems - Метод вставляет id которые не были найдены
   *
   * @param  {String[]} arr Исходый массив с не найденными id
   */
  setNotFoundItems(arr) {
    const idElems = this.generateIDElements(arr);
    const fragment = View.appendToFragment(document.createDocumentFragment(), idElems);

    this.affectedBox.appendChild(fragment);
  }


  /**
   * generateSubTagClass - Генерация дополнительного стиль класса к тега
   *
   * @return {String}
   */
  generateSubTagClass() {
    const randomNum = parseInt(Math.random() * this.tagSubClasses.length, 10);
    return this.tagSubClasses[randomNum];
  }

  /**
   * pushBtnDisabledToggle - Переключение состояни пуш кнопки
   *
   * @param  {Boolean} condition Флаг для манипуляции над кнопкной
   */
  pushBtnDisabledToggle(condition) {
    if (condition) {
      return this.pullBtn.removeAttribute('disabled');
    }

    return this.pullBtn.setAttribute('disabled', '');
  }
}

export default View;
