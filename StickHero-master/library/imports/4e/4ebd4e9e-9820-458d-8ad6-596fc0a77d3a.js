"use strict";
cc._RF.push(module, '4ebd46emCBFjYrWWW/Ap306', 'gameOver');
// StickHero/Scripts/gameOver.js

"use strict";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var fsm = require("landMaker");
cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: {
            default: null,
            type: cc.Label
        },
        scoreEarnLabel: {
            default: null,
            type: cc.Label
        },
        continueBtn: {
            default: null,
            type: cc.Node
        },
        logoutBtn: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // use this for initialization
    onLoad: function onLoad() {
        var score = cc.sys.localStorage.getItem("score");
        this.scoreLabel.string = score;
        if (0 < score && score < 20) {
            this.scoreEarnLabel.string = 1;
        } else if (20 <= score && score < 40) {
            this.scoreEarnLabel.string = 2;
        } else if (40 <= score && score < 60) {
            this.scoreEarnLabel.string = 3;
        } else {
            this.scoreEarnLabel.string = 4;
        }
        this.continueBtn.on("touchstart", function () {
            fsm.restart();
            // cc.director.preloadScene("GameoverScene", function () {
            //     cc.sys.localStorage.setItem("score",  gameDirector.getScore());
            //     cc.director.loadScene("GameoverScene");
            // }.bind(this));
        });
        this.logoutBtn.on("touchstart", function () {
            window.history.go(-1);
        });
    }

});

cc._RF.pop();