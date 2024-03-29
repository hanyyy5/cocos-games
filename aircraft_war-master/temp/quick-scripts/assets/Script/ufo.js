(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/ufo.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1e7a0zfIuJA+Kn9DAfY5544', 'ufo', __filename);
// Script/ufo.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        xMinSpeed: { //x轴最小速度
            default: 0,
            type: cc.Integer
        },
        xMaxSpeed: { //x轴最大速度
            default: 0,
            type: cc.Integer
        },
        yMinSpeed: {
            default: 0,
            type: cc.Integer
        }, //y轴最小速度

        yMaxSpeed: { //y轴最大速度
            default: 0,
            type: cc.Integer
        },
        getUfoClip: {
            type: cc.AudioClip,
            default: null
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        cc.director.getCollisionManager().enabled = true;

        this.xSpeed = Math.random() * (this.xMaxSpeed - this.xMinSpeed) + this.xMinSpeed;
        this.ySpeed = Math.random() * (this.yMaxSpeed - this.yMinSpeed) + this.yMinSpeed;
        this.ufoGroup = this.node.parent.getComponent('ufoGroup');
    },

    //碰撞检测
    onCollisionEnter: function onCollisionEnter(other, self) {
        this.node.destroy();
        //D.game.ufoBomb();
        cc.audioEngine.playEffect(this.getUfoClip, false);
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        if (this.ufoGroup.eState != D.commonInfo.gameState.start) {
            return;
        }
        this.node.x += dt * this.xSpeed;
        this.node.y += dt * this.ySpeed;
        //出屏幕后
        if (this.node.y < -this.node.parent.height / 2) {
            this.ufoGroup.ufoDied(this.node);
        }
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
        //# sourceMappingURL=ufo.js.map
        