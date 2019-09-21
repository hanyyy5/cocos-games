(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/startGame.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '92f70vJO/xKkLELGXcFP+Np', 'startGame', __filename);
// Script/startGame.js

"use strict";

cc.Class({
    extends: cc.Component,
    properties: {
        startBtn: {
            default: null,
            type: cc.Node
        }
    },
    onLoad: function onLoad() {
        cc.director.preloadScene("main");
        var scaleTo = cc.scaleTo(0.8, 0.9);
        var reverse = cc.scaleTo(0.8, 1);
        var seq = cc.sequence(scaleTo, reverse);
        var repeat = cc.repeatForever(seq);
        this.startBtn.runAction(repeat);
        this.startBtn.on("touchstart", function () {
            cc.director.loadScene("main");
        });
    }
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
        //# sourceMappingURL=startGame.js.map
        