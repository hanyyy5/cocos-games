
cc.Class({
    extends: cc.Component,
    properties: {
        player: {
            default: null,
            type: cc.Node
        },
        bugList: {
            default: null,
            type: cc.Node
        },
        bug_1: {
            default: null,
            type: cc.Prefab
        },
        bug_2: {
            default: null,
            type: cc.Prefab
        },
        bug_3: {
            default: null,
            type: cc.Prefab
        },
        bug_4: {
            default: null,
            type: cc.Prefab
        },
        bug_5: {
            default: null,
            type: cc.Prefab
        },
        levelShow: 1,
        levelLabel: {
            default: null,
            type: cc.Label
        },
        scoreLabel: {
            default: null,
            type: cc.Label
        },
        score: 0,
        dc_duration: 140,
        timer: 0,
        timerAll: 0,
        difV: 5,
        isLeft: false,
        isLeftOld: false,
        level: "1"
    },
    //万箭齐发变成bug来袭，以下所有Arrow都是bug小怪物
    //得到新的箭头(bug)
    NewArrow: function () {
        var _self = this;
        var bugObjList = [_self.bug_1,_self.bug_2,_self.bug_3,_self.bug_4,_self.bug_5];   
        var randomNum = Math.floor( Math.random() * 5);
        var newArrow = cc.instantiate(bugObjList[randomNum]);
        this.bugList.addChild(newArrow);
        newArrow.setPosition(this.arrowPosition());
    },
    //箭头(bug)的出现位置
    arrowPosition: function () {
        var randX = Math.random() * (this.node.width - 160) - (this.node.width - 160) / 2
        var randY = -this.node.height / 2;
        return cc.v2(randX, randY);
    },
    onLoad: function () {
        var self = this;
        this.score = 0;
        //开启刚体
        cc.director.getPhysicsManager().enabled = true;
        cc.director.preloadScene("OverScene");      
        this.player.setPosition(-this.node.width / 2 + 80, this.node.height / 2 - 175);
        this.schedule(function () {
            self.levelShow = self.level;
            self.levelLabel.string = self.levelShow;
            self.score = self.timerAll;
            self.scoreLabel.string = Math.round(self.score);
            cc.sys.localStorage.setItem("score", Math.round(self.score));
        }, 1);

    },
    update: function (dt) {
        var self = this;
        self.timer += dt;
        self.timerAll += dt;
        if (self.timerAll > 10 && self.level == "1") {
            self.difV = 10;
            self.level = "2";
        }
        if (self.timerAll > 20 && self.level == "2") {
            self.difV = 20;
            self.level = "3";
        }
        if (self.timerAll > 30 && self.level == "3") {
            self.difV = 30;
            self.level = "4";
        }
        if (self.timerAll > 40 && self.level == "4") {
            self.difV = 50;
            self.level = "5";
        }
        if (self.timerAll > 50 && self.level == "5") {
            //最终时刻
            self.difV = 70;
            self.level = "万箭齐发";
        }
        if (self.timer > (self.dc_duration / (5 * self.difV))) {
            self.timer = 0;
            self.NewArrow();
        }

    },
    onDestroy() {
        
    }

});
