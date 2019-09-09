import GameModel from "../Model/GameModel";

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        grid:{
            default: null,
            type: cc.Node
        },
        gameScore: {
            default: null,
            type: cc.Label
        },
        gameCountDown: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        this.gameModel = new GameModel();
        this.gameModel.init(4);
        var gridScript = this.grid.getComponent("GridView");
        gridScript.setController(this);
        gridScript.initWithCellModels(this.gameModel.getCells());

        //倒计时初始化
        this.broadcostTimes = 600;
        this.schedule(this.doCountdownTime,1);
    },

    selectCell: function(pos){
        return this.gameModel.selectCell(pos);
    },
    cleanCmd: function(){
        this.gameModel.cleanCmd();
    },
    doCountdownTime(){
        //每秒更新显示信息
        if (this.broadcostTimes > 0 ) {
            this.broadcostTimes -= 1;
            // 更新倒计时
            this.gameCountDown.string = '倒计时：' + this.broadcostTimes + 's';
            this.countDownShow(this.broadcostTimes);
        }
    },
    countDownShow(temp){
        if(temp <= 0){
            //倒计时结束
            this.unschedule(this.doCountdownTime);
            cc.director.preloadScene("Over", function () {
                cc.sys.localStorage.setItem("score",  this.gameScore.string);
                cc.director.loadScene("Over");
            }.bind(this));
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // }, 
});
