import {CELL_WIDTH} from '../Model/ConstValue';

import AudioUtils from "../Utils/AudioUtils";
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
        bombWhite:{
            default: null,
            type: cc.Prefab
        },
        crushEffect:{
            default: null,
            type: cc.Prefab
        },
        audioUtils:{
            type: AudioUtils,
            default: null
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        this.scoreCount = 0;
    },
    playEffects: function(effectQueue){
        if(!effectQueue || effectQueue.length <= 0){
            return ;
        }
        let soundMap = {}; //某一时刻，某一种声音是否播放过的标记，防止重复播放
        effectQueue.forEach(function(cmd){
            let delayTime = cc.delayTime(cmd.playTime);
            let callFunc = cc.callFunc(function(){
                let instantEffect = null;
                let animation = null;
                if(cmd.action == "crush"){
                    instantEffect = cc.instantiate(this.crushEffect);
                    animation  = instantEffect.getComponent(cc.Animation);
                    animation.play("effect");
                    this.gainScore();
                    !soundMap["crush" + cmd.playTime] && this.audioUtils.playEliminate(cmd.step);
                    soundMap["crush" + cmd.playTime] = true;
                }
                else if(cmd.action == "rowBomb"){
                    instantEffect = cc.instantiate(this.bombWhite);
                    animation  = instantEffect.getComponent(cc.Animation);
                    animation.play("effect_line");
                    this.gainScore();
                }
                else if(cmd.action == "colBomb"){
                    instantEffect = cc.instantiate(this.bombWhite);
                    animation  = instantEffect.getComponent(cc.Animation);
                    animation.play("effect_col");
                    this.gainScore();
                }

                instantEffect.x = CELL_WIDTH * (cmd.pos.x - 0.5);
                instantEffect.y = CELL_WIDTH * (cmd.pos.y - 0.5);
                instantEffect.parent = this.node;
                animation.on("finished",function(){
                    instantEffect.destroy();
                },this);
               
            },this);
            this.node.runAction(cc.sequence(delayTime, callFunc));
        },this);
    },
    gainScore: function () {
        this.scoreCount += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = this.scoreCount;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
