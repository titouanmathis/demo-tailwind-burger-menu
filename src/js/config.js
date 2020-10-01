/**
 * Test if we are on a dev environment.s
 */
export function isDev() {
  return !window.location.hostname.includes('www.');
}

export default {
  isDev,
};
