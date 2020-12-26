# Updated readme:

This is a fork of the original live2d-widget.js. This fork updates the library to work with the newest version of live2D.

### Core changes

- Works with the newest version of live2D.
- Widget has more functions to allow the user to start motions.
- User can define their own callback to respond to hit area clicks.
- User can inspect the model's expressions, motions, etc. with the added utility functions.
- Widget adapts to the specified div now instead of forcing it to a corner
- Disabled the chat module.
- Lipsync can be used now. You just need to specify a function that accepts the deltatime between updates as parameters and that returns the value used on the mouth parameter(you specify which parameter is used on the live2d editor)
- Auto blink works as well.(Same as with lipsync you specify which parameters are used for this with the live2d editor on your model)

## How to use it

### Adding your model to your site

Simply import the script `L2Dwidget.min.js` and the `live2dcubismcore.min.js`(this one can be found on the [Live2D SDK for web](https://www.live2d.com/en/download/cubism-sdk/download-web/) package) on your html file.
```
<script type="text/javascript" charset="utf8" async="" src="/live2dcubismcore.min.js"></script>
<script type="text/javascript" charset="utf8" async="" src="/L2Dwidget.min.js"></script>
```

Call the init function with a configuration object as a parameter on any script tag:
```
L2Dwidget.init({
   model: { jsonPath: '../resources/model/mymodel.model3.json' }, 
   scale:2.0,
   opacity:1.0

})
```
This will create a div containing a canvas using webgl to show the model on the right side of the screen. However you can specify to use a div in particular by giving said div the default id `live2d-widget` and putting a canvas element with the id `live2dcanvas`. These ids can be changed by specifying them on the configuration object.

These are all the configuration options available, trying to use almost the same config options as the original live2D widget:

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [userConfig] | <code>Object</code> |  | User's custom config 用户自定义设置 |
| [userConfig.model.jsonPath] | <code>String</code> | <code>&#x27;&#x27;</code> | Path to Live2D model's main json eg. `https://test.com/miku.model3.json` model主文件路径 |
| [userConfig.model.jsonDir] | <code>String</code> | <code>&#x27;&#x27;</code> | Folder containing the model's json files |
| [userConfig.model.eyeBlink] | <code>Boolean</code> | <code>true</code> | Wheter to allow eyeblink or not |
| [userConfig.model.lipsync] | <code>Boolean</code> | <code>false</code> | Wheter to allow lipsync or not |
| [userConfig.model.lipsyncFunction] | <code>String</code> | <code>null</code> | Lipsync function, the function will receive the deltatime between updates and         must return a value(depends on your model's config but it's usually just between 0 and 1) |
| [userConfig.scale] | <code>Number</code> | <code>1</code> | Scale between the model and the canvas 模型与canvas的缩放 |
| [userConfig.display.superSample] | <code>Number</code> | <code>2</code> | rate for super sampling rate 超采样等级 |
| [userConfig.display.width] | <code>Number</code> | <code>150</code> | Width to the canvas which shows the model canvas的长度 |
| [userConfig.display.height] | <code>Number</code> | <code>300</code> | Height to the canvas which shows the model canvas的高度 |
| [userConfig.display.position] | <code>String</code> | <code>&#x27;right&#x27;</code> | Left of right side to show 显示位置：左或右 |
| [userConfig.display.hOffset] | <code>Number</code> | <code>0</code> | Horizontal offset of the canvas canvas水平偏移 |
| [userConfig.display.vOffset] | <code>Number</code> | <code>-20</code> | Vertical offset of the canvas canvas垂直偏移 |
| [userConfig.mobile.show] | <code>Boolean</code> | <code>true</code> | Whether to show on mobile device 是否在移动设备上显示 |
| [userConfig.mobile.scale] | <code>Number</code> | <code>0.5</code> | Scale on mobile device 移动设备上的缩放 |
| [userConfig.name.canvas] | <code>String</code> | <code>&#x27;live2dcanvas&#x27;</code> | ID name of the canvas canvas元素的ID |
| [userConfig.name.div] | <code>String</code> | <code>&#x27;live2d-widget&#x27;</code> | ID name of the div div元素的ID |
| [userConfig.opacity] | <code>Number</code> | <code>1.0</code> | opacity 透明度 |
| [userConfig.onTouchHitArea] | <code>function</code> | <code>null</code> | callback for on touch model on a hitarea, the callback contains         the hit area name and the X and Y coordinates |

### Doing more with the model

There are several functions added that allow you to modify's the model animations or capture a frame of it(like a take a photo sort of function).

<a name="L2Dwidget+captureFrame"></a>

#### l2Dwidget.captureFrame(callback) ⇒ <code>null</code>
Capture current frame to png file [captureFrame](captureFrame)


| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | The callback function which will receive the current frame |

<a name="L2Dwidget+downloadFrame"></a>

#### l2Dwidget.downloadFrame() ⇒ <code>null</code>
Download current frame [L2Dwidget.captureFrame](L2Dwidget.captureFrame)

<a name="L2Dwidget+printParameters"></a>

### l2Dwidget.printParameters() ⇒ <code>null</code>
Useful for knowing which parameters your model has.

<a name="L2Dwidget+printExpressions"></a>

#### l2Dwidget.printExpressions() ⇒ <code>null</code>
Useful for debugging sometimes.he loaded model.

<a name="L2Dwidget+startRandomExpression"></a>

#### l2Dwidget.startRandomExpression() ⇒ <code>null</code>
Starts a random expression on the loaded model.

**Kind**: instance method of [<code>L2Dwidget</code>](#L2Dwidget)
<a name="L2Dwidget+startExpression"></a>

#### l2Dwidget.startExpression(expressionId) ⇒ <code>null</code>
Starts the specified expression by it's id.

| Param | Type |
| --- | --- |
| expressionId | <code>String</code> |

<a name="L2Dwidget+getParameterIds"></a>

#### l2Dwidget.getParameterIds() ⇒ <code>Array</code>
returns a list containing the ids of all the parameters the loaded model has

<a name="L2Dwidget+setParameterValueById"></a>

#### l2Dwidget.setParameterValueById(parameterId, value) ⇒ <code>null</code>
Sets a parameter's value by it's id

| Param | Type | Description |
| --- | --- | --- |
| parameterId | <code>CubismId</code> | the parameter's id |
| value | <code>Number</code> | the value to set |

<a name="L2Dwidget+setParameterValueByName"></a>

#### l2Dwidget.setParameterValueByName(name, value) ⇒ <code>null</code>
Sets an specific parameter to an specific value.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the parameter's name |
| value | <code>Number</code> | the value to set |

## Build your own

If you want to develop/build your own version of this library, first you'll need to clone/download this repository.

```
git clone git@github.com:aldoram5/live2d-widget.js.git
```

Then run 

```
git submodule init
```

to grab the live2d framework dependency.

After that you need to download the [Core SDK](https://www.live2d.com/en/download/cubism-sdk/download-web/) from the official site yourself and paste only the contents of the Core/ folder inside the Core folder here.

After all that then just install the dependencies with `npm install`.

When building a release version(minified js) use `npm run-script build:prod`. If you're developing and testing is easier to run `npm run-script build:dev` which will keep automatically building the library for you and won't minify it so it's easier to debug.



# Original readme:


[![npm][npm]][npm-url]
[![deps][deps]][deps-url]
[![devdeps][devdeps]][devdeps-url]

[![downloads][downloads]][downloads-url]
[![downloads-month][downloads-month]][downloads-month-url]

[![GitHub stars][GitHub stars]][GitHub stars-url]
[![GitHub forks][GitHub forks]][GitHub forks-url]
[![GitHub issues][GitHub issues]][GitHub issues-url]

[![Commitizen friendly][Commitizen friendly]][Commitizen friendly-url]
[![PRs Welcome][PRs Welcome]][PRs Welcome-url]
[![license][license]][license-url]

[![Backers on Open Collective](https://opencollective.com/live2d-widgetjs/backers/badge.svg)](#backers)
 [![Sponsors on Open Collective](https://opencollective.com/live2d-widgetjs/sponsors/badge.svg)](#sponsors) 

# live2d-widget.js

Add the Sseexxyyy live2d to your webpages! Seperated from [hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d).

Demo: [Still working, but you can have a look~](https://l2dwidget.js.org/dev.html)

Docs(including APIs): [Click me!](https://l2dwidget.js.org)

Online generator: [TBD.](javascript:void(0);)


## Useage

### Hexo

Please visit [hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d) for the hexo plugin.

### Webpages

#### File on your server

Download the [latest release](https://github.com/xiazeyu/live2d-widget.js/releases),

and then copy and extract the `lib` folder to your website.

Use [online generator](javascript:void(0);) **(recommended)** to generate codes.

<details><summary>However, if you want to do it manually, follow the instruction below:</summary><br>

import the js:

```html

<script src = "( your script path here )"></script>

```

Then call the function along with your config.

```js
L2Dwidget.init({
  'config1': 'value1',
  'config2': 'value2',
});
```

</details>

### Bookmark (any pages)

TBD.

https://www.cnblogs.com/pcyy/p/5655542.html


## Settings

See the [document](https://xiazeyu.github.io/live2d-widget.js/docs/class/src/index.js~L2Dwidget.html#instance-method-init).

<details><summary>Current supported models:</summary><br>

  - `chitose`
  - `Epsilon2.1`
  - `Gantzert_Felixander`
  - `haru01`
  - `haru02`
  - `haruto`
  - `hibiki`
  - `hijiki`
  - `izumi`
  - `koharu`
  - `miku`
  - `nico`
  - `ni-j`
  - `nipsilon`
  - `nito`
  - `shizuku`
  - `tororo`
  - `tsumiki`
  - `Unitychan`
  - `wanko`
  - `z16`

</details>

## Custom model

1. Create a `live2d_models` folder at your blog's root directory.

2. Create a folder by the name of your model.

3. Copy your model to this folder.

**Attention! The path of the model's json must be  `/live2d_models/{name}/{name}.model.json`**

<details><summary>An Example:</summary><br>

Your model is named `mymiku`.

Then, create a folder at  `/` (Which should exists `_config.yml` 、`sources` 、 `themes` ) named `mymiku`.

Copy your model to `/live2d_models/mymiku/`.

Up to now, there should be `mymiku.model.json` in the directory of `/live2d_models/mymiku/`.

</details>

<br>~The problem was once releated to [(#22)](https://github.com/EYHN/hexo-helper-live2d/issues/22).~

<br>

See [WEBPACK VISUALIZER](https://l2dwidget.js.org/stats.html)

Enjoy!:beer:

> This is my first hexo plugin, star :star: and watch :eyeglasses:, pull request is also welcomed.

Github: [https://github.com/EYHN/hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d)

issues: [https://github.com/EYHN/hexo-helper-live2d/issues](https://github.com/EYHN/hexo-helper-live2d/issues)


## Contribute

**Please pay enough attention to this document if you want to commit your changes or submit issues.**

[CONTRIBUTING](./CONTRIBUTING.md)

## Releated projects

- [Cubism SDK WebGL 2.1](http://sites.cybernoids.jp/cubism-sdk2_e/webgl2-1)

- [live2d-widget.js](https://github.com/xiazeyu/live2d-widget.js)

- [hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d)

- [pixi-live2d](https://github.com/avgjs/pixi-live2d)

- [CubismJsComponents](https://github.com/Live2D/CubismJsComponents)



## About me

[![Author][author]][author-url]

[![Author QQ][author-qq]][author-qq-url]

[![Author Email][author-email]][author-email-url]


[![Collaborator 0][collaborator0]][collaborator0-url]

[![Collaborator 0 QQ][collaborator0-qq]][collaborator0-qq-url]

[![Collaborator 0 Email][collaborator0-email]][collaborator0-email-url]


## Imported

[![current-device][current-device]][current-device-url]

## Special Thanks

- @mashirozx 
- @fghrsh
- @journey-ad
- @gwzz

<br>

Open sourced under the GPL v2.0 license.

[npm]: https://badge.fury.io/js/live2d-widget.svg?label=live2d-widget
[npm-url]: https://www.npmjs.com/package/live2d-widget

[deps]: https://img.shields.io/david/xiazeyu/live2d-widget.js.svg
[deps-url]: javascript:void(0);

[devdeps]:  https://img.shields.io/david/dev/xiazeyu/live2d-widget.js.svg
[devdeps-url]: javascript:void(0);

[license]: https://img.shields.io/github/license/xiazeyu/live2d-widget.js.svg
[license-url]: https://github.com/xiazeyu/live2d-widget.js/blob/master/LICENSE

[PRs Welcome]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[PRs Welcome-url]: http://makeapullrequest.com

[downloads]:  https://img.shields.io/npm/dt/live2d-widget.svg
[downloads-url]: https://www.npmjs.com/package/live2d-widget

[downloads-month]: https://img.shields.io/npm/dm/live2d-widget.svg
[downloads-month-url]: https://www.npmjs.com/package/live2d-widget

[Commitizen friendly]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[Commitizen friendly-url]: http://commitizen.github.io/cz-cli/

[GitHub stars]: https://img.shields.io/github/stars/xiazeyu/live2d-widget.js.svg
[GitHub stars-url]: https://github.com/xiazeyu/live2d-widget.js/stargazers

[GitHub forks]: https://img.shields.io/github/forks/xiazeyu/live2d-widget.js.svg
[GitHub forks-url]: https://github.com/xiazeyu/live2d-widget.js/network

[GitHub issues]: https://img.shields.io/github/issues/xiazeyu/live2d-widget.js.svg
[GitHub issues-url]: https://github.com/xiazeyu/live2d-widget.js/issues

[author]: https://img.shields.io/badge/author-cneyhn-green.svg
[author-url]: https://delusion.coding.me/

[author-qq]: https://img.shields.io/badge/QQ-1106996185-blue.svg
[author-qq-url]: tencent://message/?uin=1106996185&Site=Senlon.Net&Menu=yes

[author-email]: https://img.shields.io/badge/Emali%20me-cneyhn@gmail.com-green.svg
[author-email-url]: mailto:cneyhn@gmail.com

[collaborator0]: https://img.shields.io/badge/author-xiazeyu-green.svg
[collaborator0-url]: https://xiazeyu.coding.me/

[collaborator0-qq]: https://img.shields.io/badge/QQ-2320732807-blue.svg
[collaborator0-qq-url]: tencent://message/?uin=2320732807&Site=Senlon.Net&Menu=yes

[collaborator0-email]: https://img.shields.io/badge/Emali%20me-xiazeyu_2011@126.com-green.svg
[collaborator0-email-url]: mailto:xiazeyu_2011@126.com

[current-device]: https://img.shields.io/npm/v/current-device.svg?label=current-device
[current-device-url]: https://github.com/matthewhudson/current-device

## Contributors

This project exists thanks to all the people who contribute. 
<a href="https://github.com/xiazeyu/live2d-widget.js/graphs/contributors"><img src="https://opencollective.com/live2d-widgetjs/contributors.svg?width=890&button=false" /></a>


## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/live2d-widgetjs#backer)]

<a href="https://opencollective.com/live2d-widgetjs#backers" target="_blank"><img src="https://opencollective.com/live2d-widgetjs/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/live2d-widgetjs#sponsor)]

<a href="https://opencollective.com/live2d-widgetjs/sponsor/0/website" target="_blank"><img src="https://opencollective.com/live2d-widgetjs/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/live2d-widgetjs/sponsor/1/website" target="_blank"><img src="https://opencollective.com/live2d-widgetjs/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/live2d-widgetjs/sponsor/2/website" target="_blank"><img src="https://opencollective.com/live2d-widgetjs/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/live2d-widgetjs/sponsor/3/website" target="_blank"><img src="https://opencollective.com/live2d-widgetjs/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/live2d-widgetjs/sponsor/4/website" target="_blank"><img src="https://opencollective.com/live2d-widgetjs/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/live2d-widgetjs/sponsor/5/website" target="_blank"><img src="https://opencollective.com/live2d-widgetjs/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/live2d-widgetjs/sponsor/6/website" target="_blank"><img src="https://opencollective.com/live2d-widgetjs/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/live2d-widgetjs/sponsor/7/website" target="_blank"><img src="https://opencollective.com/live2d-widgetjs/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/live2d-widgetjs/sponsor/8/website" target="_blank"><img src="https://opencollective.com/live2d-widgetjs/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/live2d-widgetjs/sponsor/9/website" target="_blank"><img src="https://opencollective.com/live2d-widgetjs/sponsor/9/avatar.svg"></a>


