(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/StickHero/Scripts/backgroundLoader.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1ba569pWT1NW4FvgybtQ/YJ', 'backgroundLoader', __filename);
// StickHero/Scripts/backgroundLoader.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {
        var randomNum = "bg" + ((Math.random() * 100 | 0) % 3 + 1);
        var randomNum = "mainBg";
        var bgSprite = this.node.getComponent(cc.Sprite);
        cc.loader.loadRes("hero/" + randomNum, cc.SpriteFrame, function (err, SpriteFrame) {
            bgSprite.spriteFrame = SpriteFrame;
        });
        cc.log(randomNum);
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=backgroundLoader.js.map
        