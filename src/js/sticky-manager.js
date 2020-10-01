/**
 * An object containing all the methods to manage a sticky header.
 *
 * Usage in HTML:
 *
 * ```html
 * <div id="js-sticky">
 *   ...
 * </div>
 * ```
 *
 * @type {Object}
 */
const StickyManager = {
  /**
   * State of the element visibility.
   * @type {Boolean}
   */
  isVisible: false,

  /**
   * Scroll position informations.
   * @type {Object}
   */
  scroll: {
    x: window.pageXOffset,
    y: window.pageYOffset,
  },

  /**
   * Scroll direction informations.
   * @type {Object}
   */
  direction: {
    x: 'none',
    y: 'none',
  },

  /**
   * Classes to add to the sticky element when visible.
   * @type {Array}
   */
  visibleClasses: ['shadow-lg'],

  /**
   * Classes to add to the sticky element when hidden.
   * @type {Array}
   */
  hiddenClasses: ['-translate-y-full'],

  /**
   * Init the sticky behaviours.
   *
   * @return {void}
   */
  init: function init() {
    this.element = document.querySelector('#js-sticky');
    this.scrollHandler = this.scrollHandler.bind(this);
    window.addEventListener('scroll', this.scrollHandler, { passive: true });

    // Trigger the scrollHandler method on init
    this.scrollHandler();
  },

  /**
   * Update scroll and direction values on scroll.
   *
   * @return {void}
   */
  scrollHandler: function scrollHandler() {
    if (window.pageYOffset > this.scroll.y) {
      this.direction.y = 'down';
    } else if (window.pageYOffset < this.scroll.y) {
      this.direction.y = 'up';
    } else {
      this.direction.y = 'none';
    }

    if (window.pageXOffset > this.scroll.x) {
      this.direction.x = 'right';
    } else if (window.pagexOffset < this.scroll.x) {
      this.direction.x = 'left';
    } else {
      this.direction.x = 'none';
    }

    this.scroll.x = window.pageXOffset;
    this.scroll.y = window.pageYOffset;

    // Show or hide the element based on the Y scroll direction
    if ((['none', 'up'].includes(this.direction.y) || this.scroll.y < 100) && !this.isVisible) {
      this.show();
    }

    if (['down'].includes(this.direction.y) && this.scroll.y > 100 && this.isVisible) {
      this.hide();
    }
  },

  /**
   * Show the sticky element.
   *
   * @return {void}
   */
  show: function show() {
    this.visibleClasses.forEach((className) => {
      this.element.classList.add(className);
    });
    this.hiddenClasses.forEach((className) => {
      this.element.classList.remove(className);
    });
    this.isVisible = true;
  },

  /**
   * Hide the sticky element.
   *
   * @return {void}
   */
  hide: function hide() {
    this.visibleClasses.forEach((className) => {
      this.element.classList.remove(className);
    });
    this.hiddenClasses.forEach((className) => {
      this.element.classList.add(className);
    });
    this.isVisible = false;
  },
};

StickyManager.init();
