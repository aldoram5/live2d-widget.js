/**
 * @description The storage of configs. Intend to unify serverJs and clientJs's config
 */

/**
 * Default settings for defaulter
 * @type {Object}
 */

const defaultConfig = {
  model: {
    jsonPath: 'https://unpkg.com/live2d-widget-model-shizuku@latest/assets/shizuku.model.json',
    jsonDir: '',
    lipsync: false,
    eyeBlink: true,
    lipsyncFunction: null,
  },
  display: {
    superSample: 2,
    width: 200,
    height: 400,
    position: 'right',
    hOffset: 0,
    vOffset: -20,
  },
  mobile: {
    show: true,
    motion: true,
  },
  name: {
    canvas: 'live2dcanvas',
    div: 'live2d-widget',
  },
  opacity:1.0,
  dev: {
    border: false
  },
  scale:1.0,
  onTouchHitArea:null
}

module.exports = defaultConfig;
