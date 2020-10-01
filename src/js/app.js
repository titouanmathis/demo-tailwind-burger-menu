import Base from '@studiometa/js-toolkit/abstracts/Base';
import { isDev } from './config';

/**
 * App class.
 */
class App extends Base {
  /**
   * App config.
   */
  get config() {
    return {
      name: 'App',
      log: isDev(),
    };
  }

  /**
   * Mounted hook.s
   */
  mounted() {
    this.$log('mounted');
  }
}

export default new App(document.documentElement);
