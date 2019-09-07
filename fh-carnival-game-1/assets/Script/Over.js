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
        buttonR: {
            default: null,
            type: cc.Node
        },
        buttonB: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        var score = cc.sys.localStorage.getItem("score");
        this.scoreLabel.string = score;
        if(0<score&&score<20){
            this.scoreEarnLabel.string = 1;
        }else if(20<=score&&score<40){
            this.scoreEarnLabel.string = 2;
        }else if(40<=score&&score<60){
            this.scoreEarnLabel.string = 3;
        }else{
            this.scoreEarnLabel.string = 4;
        }
        this.buttonR.on("touchstart", function () {
            cc.director.loadScene("MainScene");
        });
        this.buttonB.on("touchstart", function () {
            window.history.go(-1);
        });
    }
});
