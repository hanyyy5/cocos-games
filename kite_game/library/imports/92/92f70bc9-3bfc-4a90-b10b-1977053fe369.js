"use strict";
cc._RF.push(module, '92f70vJO/xKkLELGXcFP+Np', 'startGame');
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