const ua = window.navigator.userAgent;

export const isIOS = /(?:iPad)|(?:iPhone)|(?:iPod)/i.test(ua);

/**
 * 当获取ios版本号
 */
const version = ua.toLowerCase().match(/cpu iphone os (.*?) like mac os/);

export const iosBigVersion = Array.isArray(version)
  ? Number(version[1].replace(/_/g, '.').split('.')[0])
  : 0;
