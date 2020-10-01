/**
 * An object containing all the methods to manage a multi-level menu.
 *
 * ## Usage
 *
 * Open a menu:
 * ```
 * <button data-menu-open="js-menu">Menu</button>
 * <div id="js-menu">...</div>
 * ```
 *
 * Close a menu:
 * ```
 * <button data-menu-close="js-menu">Menu</button>
 * <div id="js-menu">...</div>
 * ```
 *
 * Toggle a menu:
 * ```
 * <button data-menu-toggle="js-menu">Menu</button>
 * <div id="js-menu">...</div>
 * ```
 *
 * Open multiple menu at once:
 * ```
 * <button data-menu-open="js-menu,js-menu-2">Menu</button>
 * <div id="js-menu">...</div>
 * <div id="js-menu-2">...</div>
 * ```
 * @type {Object}
 */
const MenuManager = {
  /**
   * The classes used for the menus open state.
   * @type {Array}
   */
  openClasses: ['shadow-lg'],

  /**
   * The classes used for the menus closed state.
   * @type {Array}
   */
  closeClasses: ['-translate-x-full'],

  /**
   * Open the given menu.
   *
   * @param  {HTMLElement} menu The menu to open
   * @return {void}
   */
  open: function open(menu) {
    this.openClasses.forEach((className) => {
      menu.classList.add(className);
    });

    this.closeClasses.forEach((className) => {
      menu.classList.remove(className);
    });
  },

  /**
   * Close the given menu.
   *
   * @param  {HTMLElement} menu The menu to close
   * @return {void}
   */
  close: function close(menu) {
    this.openClasses.forEach((className) => {
      menu.classList.remove(className);
    });

    this.closeClasses.forEach((className) => {
      menu.classList.add(className);
    });
  },

  /**
   * Toggle the given menu: open it if its closed, close it if its opened.
   *
   * @param  {HTMLElement} menu The menu to toggle
   * @return {void}
   */
  toggle: function toggle(menu) {
    this.openClasses.forEach((className) => {
      menu.classList.toggle(className);
    });

    this.closeClasses.forEach((className) => {
      menu.classList.toggle(className);
    });
  },

  /**
   * Bind the click event to the given buttons to trigger the given action.
   *
   * @param  {NodeList} btns A list of elements to open/close/toggle a menu
   * @param  {String}   type The type of action to trigger on click: open, close or toggle
   * @return {void}
   */
  bindClick: function bindClick(btns, type) {
    Array.from(btns).forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        // A single button can trigger an action on multipke menus,
        // so we get the data attribute's value and split it into
        // an array from the delimiter `,`.
        const names = btn.getAttribute(`data-menu-${type}`).split(',');
        names.forEach((name) => {
          const menu = document.querySelector(`#${name}`);

          // If no menu were found, do nothing.
          // If no trigger method found, do nothing.
          if (!menu || typeof this[type] !== 'function') {
            return;
          }

          this[type].call(this, menu);
        });
      });
    });
  },

  /**
   * Init the manager.
   * Binds the `click` event to all types of btns:
   * - toggle
   * - open
   * - close
   *
   * @return {void}
   */
  init: function init() {
    this.menuToggleBtns = document.querySelectorAll('[data-menu-toggle]');
    this.menuOpenBtns = document.querySelectorAll('[data-menu-open]');
    this.menuCloseBtns = document.querySelectorAll('[data-menu-close]');

    this.bindClick(this.menuToggleBtns, 'toggle');
    this.bindClick(this.menuOpenBtns, 'open');
    this.bindClick(this.menuCloseBtns, 'close');
  },
};

// Initialize the menu manager.
MenuManager.init();
