/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { Live2DCubismFramework as cubismmatrix44 } from '@framework/math/cubismmatrix44';
import { Live2DCubismFramework as csmvector } from '@framework/type/csmvector';
import { Live2DCubismFramework as acubismmotion } from '@framework/motion/acubismmotion';
import Csm_csmVector = csmvector.csmVector;
import Csm_CubismMatrix44 = cubismmatrix44.CubismMatrix44;
import ACubismMotion = acubismmotion.ACubismMotion;

import { LAppModel } from './lappmodel';
import { LAppPal } from './lapppal';
import { canvas } from './live2dappdelegate';
import * as LAppDefine from './lappdefine';
import { config } from './config/configMgr';

export let s_instance: LAppLive2DManager = null;

/**
 * サンプルアプリケーションにおいてCubismModelを管理するクラス
 * モデル生成と破棄、タップイベントの処理、モデル切り替えを行う。
 */
export class LAppLive2DManager {
  /**
   * クラスのインスタンス（シングルトン）を返す。
   * インスタンスが生成されていない場合は内部でインスタンスを生成する。
   *
   * @return クラスのインスタンス
   */
  public static getInstance(): LAppLive2DManager {
    if (s_instance == null) {
      s_instance = new LAppLive2DManager();
    }

    return s_instance;
  }

  /**
   * Release the singleton instance
   */
  public static releaseInstance(): void {
    if (s_instance != null) {
      s_instance = void 0;
    }

    s_instance = null;
  }

  /**
   * Simple getter for _model
   */
  public getModel(): LAppModel {
    return this._model;
  }

  /**
   * Processing when dragging the screen
   *
   * @param x X coordinate
   * @param y Y coordinate
   */
  public onDrag(x: number, y: number): void {

      if (this._model) {
        this._model.setDragging(x, y);
      }
    
  }

  /**
   * Process taps/clicks on the model
   *
   * @param x X coordinate
   * @param y Y coordinate
   */
  public onTap(x: number, y: number): void {
    if (LAppDefine.DebugLogEnable) {
      LAppPal.printMessage(
        `[APP]tap point: {x: ${x.toFixed(2)} y: ${y.toFixed(2)}}`
      );
    }

    this._model.checkHits(x,y);
      /*
      if (this._model.hitTest(LAppDefine.HitAreaNameHead, x, y)) {
        if (LAppDefine.DebugLogEnable) {
          LAppPal.printMessage(
            `[APP]hit area: [${LAppDefine.HitAreaNameHead}]`
          );
        }
        this._model.setRandomExpression();
      } else if (this._model.hitTest(LAppDefine.HitAreaNameBody, x, y)) {
        if (LAppDefine.DebugLogEnable) {
          LAppPal.printMessage(
            `[APP]hit area: [${LAppDefine.HitAreaNameBody}]`
          );
        }
        this._model
          .startRandomMotion(
            LAppDefine.MotionGroupTapBody,
            LAppDefine.PriorityNormal,
            this._finishedMotion
          );
      }*/
    
  }

  /**
   * 画面を更新するときの処理
   * モデルの更新処理及び描画処理を行う
   */
  public onUpdate(): void {
    let projection: Csm_CubismMatrix44 = new Csm_CubismMatrix44();

    const { width, height } = canvas;

    projection.scale(config.scale, config.scale * width / height);

    if (this._viewMatrix != null) {
      projection.multiplyByMatrix(this._viewMatrix);
    }

    const saveProjection: Csm_CubismMatrix44 = projection.clone();

    this._model.update();
    this._model.draw(projection);

  }

  /**
   * Simple method to load the model
   */
  public loadModelScene(): void {

    this._model.loadAssetsForModelAtPath(config.model.jsonPath);
  }

  /**
   * コンストラクタ
   */
  constructor() {
    this._viewMatrix = new Csm_CubismMatrix44();
    this._model = new LAppModel();
    this.loadModelScene();
  }

  _viewMatrix: Csm_CubismMatrix44; // モデル描画に用いるview行列
  _model: LAppModel; // We'll only process one model at a time
  _finishedMotion = (self: ACubismMotion): void => {
    LAppPal.printMessage('Motion Finished:');
    
  };
}
