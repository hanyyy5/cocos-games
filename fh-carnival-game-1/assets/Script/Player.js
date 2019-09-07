cc.Class({
    extends: cc.Component,

    properties: {
        speed: cc.v2(0, 0),
        maxSpeed: cc.v2(500, 500),
        maxSpeedOld: cc.v2(500, 500),
        drag: 1000,
        directionX: 0,
        directionY: 0,
        tempLabel:{
            default:null,
            type:cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyPressed, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyReleased, this);
        this.collisionX = 0;
        this.collisionY = 0;
        this.prePosition = cc.v2();
        this.preStep = cc.v2();
        this.touchingNumber = 0;
        var self = this;

        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', function (event) {
                let {alpha, beta, gamma} = event;
                self.tempLabel.string = "alpha, beta, gamma" + alpha.toFixed(1) + "|" + beta.toFixed(1) + "|" + gamma.toFixed(1) ;
                var directionX = 0;
                var directionY = 0;
                var speedNumberX = 1;
                var speedNumberY = 1;
                if(gamma >= 0){
                    directionX = 1;
                }else{
                    directionX = -1;
                }

                if(beta >= 0){
                    directionY = -1;
                }else{
                    directionY = 1;
                }
                
                if(Math.abs(gamma) < 45) {
                    speedNumberX = (Math.abs(gamma)/45).toFixed(3);
                }
                if(Math.abs(beta) < 45) {
                    speedNumberY = (Math.abs(beta)/45).toFixed(3);
                }

                self.directionX = directionX;
                self.directionY = directionY;
                self.maxSpeed = cc.v2(self.maxSpeedOld.x * speedNumberX  , self.maxSpeedOld.y * speedNumberY);
                window.console.log(self.maxSpeed);
            }, false)
        };

    },

    onEnable: function () {
        cc.director.getCollisionManager().enabled = true;
    },

    onDisable: function () {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    },
    onCollisionEnter: function (other, self) {
        this.touchingNumber ++;
        var otherAabb = other.world.aabb;
        var otherPreAabb = other.world.preAabb.clone();

        var selfAabb = self.world.aabb;
        var selfPreAabb = self.world.preAabb.clone();

        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (this.speed.x < 0 && (selfPreAabb.xMax > otherPreAabb.xMax)) {
                this.node.x = otherPreAabb.xMax + selfPreAabb.width/2 - this.node.parent.x;
                this.collisionX = -1;
            }
            else if (this.speed.x > 0 && (selfPreAabb.xMin < otherPreAabb.xMin)) {
                this.node.x = otherPreAabb.xMin - selfPreAabb.width/2 - this.node.parent.x;
                this.collisionX = 1;
            }

            this.speed.x = 0;
            other.touchingX = true;
            return;
        }

        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (this.speed.y < 0 && (selfPreAabb.yMax > otherPreAabb.yMax)) {
                this.node.y = otherPreAabb.yMax + selfPreAabb.height/2 - this.node.parent.y;
                this.jumping = false;
                this.collisionY = -1;
            }
            else if (this.speed.y > 0 && (selfPreAabb.yMin < otherPreAabb.yMin)) {
                this.node.y = otherPreAabb.yMin - selfPreAabb.height/2 - this.node.parent.y;
                this.collisionY = 1;
            }
            
            this.speed.y = 0;
            other.touchingY = true;
        }    
        
    },
    
    onCollisionExit: function (other) {
        this.touchingNumber --;
        if (other.touchingX) {
            this.collisionX = 0;
            other.touchingX = false;
        }
        else if (other.touchingY) {
            other.touchingY = false;
            this.collisionY = 0;
        }
    },
    
    update: function (dt) {
        if (this.directionX === 0) {
            if (this.speed.x > 0) {
                this.speed.x -= this.drag * dt;
                if (this.speed.x <= 0) this.speed.x = 0;
            }
            else if (this.speed.x < 0) {
                this.speed.x += this.drag * dt;
                if (this.speed.x >= 0) this.speed.x = 0;
            }
        }
        else {
            this.speed.x += (this.directionX > 0 ? 1 : -1) * this.drag * dt;
            if (Math.abs(this.speed.x) > this.maxSpeed.x) {
                this.speed.x = this.speed.x > 0 ? this.maxSpeed.x : -this.maxSpeed.x;
            }
        }

        if (this.directionY === 0) {
            if (this.speed.y > 0) {
                this.speed.y -= this.drag * dt;
                if (this.speed.y <= 0) this.speed.y = 0;
            }
            else if (this.speed.y < 0) {
                this.speed.y += this.drag * dt;
                if (this.speed.y >= 0) this.speed.y = 0;
            }
        }
        else {
            this.speed.y += (this.directionY > 0 ? 1 : -1) * this.drag * dt;
            if (Math.abs(this.speed.y) > this.maxSpeed.y) {
                this.speed.y = this.speed.y > 0 ? this.maxSpeed.y : -this.maxSpeed.y;
            }
        }





        if (this.speed.x * this.collisionX > 0) {
            this.speed.x = 0;
        }
        if (this.speed.y * this.collisionY > 0) {
            this.speed.y = 0;
        }

        
        this.prePosition.x = this.node.x;
        this.prePosition.y = this.node.y;

        this.preStep.x = this.speed.x * dt;
        this.preStep.y = this.speed.y * dt;
        
        this.node.x += this.speed.x * dt;
        this.node.y += this.speed.y * dt;

        
    }
});
