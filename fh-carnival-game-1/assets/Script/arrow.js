var tmpPlayer = require("Player");
var tmpMain = require("Main");
cc.Class({
    extends: cc.Component,
    properties: {
       timer:0
    },
    
    onLoad: function () {
        var mainCanvas = cc.find("Canvas").getComponent(tmpMain);   
        //获取刚体的速度
        this.rigidbody = this.node.getComponent(cc.RigidBody);
        this.rigidbody.linearVelocity = cc.v2(0 ,7 * mainCanvas.difV);
    },

    onCollisionEnter: function (other, self) {
        cc.director.loadScene('OverScene');
    },
    update: function (dt) {
        this.timer += dt;
        if(this.timer > 30){
            this.node.destroy();
        }
    }
});
