cc.Class({
    extends: cc.Component,
    properties: {
       startBtn:{
           default:null,
           type:cc.Node
       }
    },  
    onLoad: function () {
        cc.director.preloadScene("MainGameScene");
        var scaleTo = cc.scaleTo(0.8,0.9);
        var reverse = cc.scaleTo(0.8,1);
        var seq = cc.sequence(scaleTo,reverse);
        var repeat = cc.repeatForever(seq);
        this.startBtn.runAction(repeat);
        this.startBtn.on("touchstart",function(){
             cc.director.loadScene("MainGameScene");
        });

    },
});
