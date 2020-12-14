// Created by xiazeyu.

////////////////////////////////////
// Celebrate for the 4.0 version! //
////////////////////////////////////

/**
 * @description The entry point of live2d-widget.
 */


'use strict';

import device from 'current-device';

import { canvas, Live2DAppDelegate } from './live2dappdelegate';
import { config, configApplyer } from './config/configMgr';
import { EventEmitter } from './utils/EventEmitter';
import { LAppLive2DManager } from './lapplive2dmanager';

if (process.env.NODE_ENV === 'development') {
  console.log('--- --- --- --- ---\nLive2Dwidget: Hi there! You are in DEV MODE now.\n--- --- --- --- ---');
}
/**
 * The main entry point, which is ... nothing
 */

class L2Dwidget extends EventEmitter {

  constructor() {
    super();
    this.config = config;
  }

  /**
   * API Changes to V4
   * Removed:
   * 
   * Params:
   * 
   * @param {Boolean}  [userConfig.dev.border = false] 
   * 
   * No longer needed. We now take the div the user passes regardless of it's position on the 
   * document, including styles.
   * 
   * @param {Boolean}  [userConfig.dialog.enable = false]
   * 
   * Disabled dialogue for now. User can define their UI for that so it adapts their needs.
   * If people really wants this added back there may be some way to tweak this but not now.
   * 
   * @param {Boolean}  [userConfig.dialog.hitokoto = false]
   * 
   * No idea what the hitokoto api was so disabling it now.
   * 
   * Functions:
   * 
   * @function captureFrame
   * 
   * @function downloadFrame
   * 
   * Download is dependent on capture and since for some reason capture doesn't 
   * work for some reason(we only get a blank image) I removed them for now.
   * 
   * 
   * Added:
   * Callbacks and default callbacks for events:
   * 
   * 
   */

  /**
   * The init function
   * @param {Object}   [userConfig] User's custom config 用户自定义设置
   * @param {String}   [userConfig.model.jsonPath = ''] Path to Live2D model's main json eg. `https://test.com/miku.model3.json` model主文件路径
   * @param {String}   [userConfig.model.jsonDir = ''] Folder containing the model's json files
   * @param {Number}   [userConfig.scale = 1] Scale between the model and the canvas 模型与canvas的缩放
   * @param {Number}   [userConfig.display.superSample = 2] rate for super sampling rate 超采样等级
   * @param {Number}   [userConfig.display.width = 150] Width to the canvas which shows the model canvas的长度
   * @param {Number}   [userConfig.display.height = 300] Height to the canvas which shows the model canvas的高度
   * @param {String}   [userConfig.display.position = 'right'] Left of right side to show 显示位置：左或右
   * @param {Number}   [userConfig.display.hOffset = 0] Horizontal offset of the canvas canvas水平偏移
   * @param {Number}   [userConfig.display.vOffset = -20] Vertical offset of the canvas canvas垂直偏移
   * @param {Boolean}  [userConfig.mobile.show = true] Whether to show on mobile device 是否在移动设备上显示
   * @param {Number}   [userConfig.mobile.scale = 0.5] Scale on mobile device 移动设备上的缩放
   * @param {String}   [userConfig.name.canvas = 'live2dcanvas'] ID name of the canvas canvas元素的ID
   * @param {String}   [userConfig.name.div = 'live2d-widget'] ID name of the div div元素的ID
   * @param {Number}   [userConfig.opacity = 1.0] opacity 透明度
   * @param {Function}   [userConfig.onTouchHead = null] callback for on touch model head event
   * @param {Function}   [userConfig.onTouchBody = null] callback for on touch model body event
   * @param {Function}   [userConfig.onTouch = null] callback for on touch model body event
   * @return {null}
   */

  init(userConfig = {}) {
    configApplyer(userConfig);
    this.emit('config', this.config);
    if ((!config.mobile.show) && (device.mobile())) {
      return;
    }

    if (Live2DAppDelegate.getInstance().initialize(userConfig) == false) {
      return;
    }

    Live2DAppDelegate.getInstance().run();

  }

  /**
   * Capture current frame to png file {@link captureFrame}
   * @param  {Function} callback The callback function which will receive the current frame
   * @return {null}
   */

  captureFrame(callback) {
    if(canvas !=null){
      callback(canvas.toDataURL('image/png'))
    }

  }

  /**
   * download current frame {@link L2Dwidget.captureFrame}
   * @return {null}
   */

  downloadFrame() {
    this.captureFrame(
      function (e) {
        let link = document.createElement('a');
        document.body.appendChild(link);
        link.setAttribute('type', 'hidden');
        link.href = e;
        link.download = 'live2d.png';
        link.click();
      }
    );
  }

  printParameters(){
    LAppLive2DManager.getInstance().getModel().printParameters();
  }

  hitTest(hitAreaName,x,y){
    return LAppLive2DManager.getInstance().getModel().hitTest(hitAreaName,x,y);
  }

  startRandomExpression(){
    LAppLive2DManager.getInstance().getModel().setRandomExpression();
  }

  startRandomMotion(group,priority,onfinishedMotionHandler){
    LAppLive2DManager.getInstance().getModel().startRandomMotion(group,priority,onfinishedMotionHandler);
  }

  startExpression(expressionId){
    LAppLive2DManager.getInstance().getModel().setExpression(expressionId);
  }

  startMotion(group,number,priority,onfinishedMotionHandler){
    LAppLive2DManager.getInstance().getModel().startMotion(group,number,priority,onfinishedMotionHandler);
  }

  getParameterIds(){
    return LAppLive2DManager.getInstance().getModel().getParameterIds();
  }

  setParameterValueById(parameterId, value){
    return LAppLive2DManager.getInstance().getModel().setParameterValueById(parameterId,value);
    //return this.getModel().setParameterValueById(parameterId,value);
  }

};

let _ = new L2Dwidget();

export {
  _ as L2Dwidget,
}
