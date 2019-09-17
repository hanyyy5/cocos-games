var spriteCreator = (function (){
    var spriteFrameCache = null;
    return {
        createNewLand:function(width) {
            //create new land.
            var newLand = new cc.Node("Land");
            newLand.anchorX = 0;
            newLand.anchorY = 0;
            var sprite = newLand.addComponent(cc.Sprite);
            sprite.type = cc.Sprite.Type.SLICED;
            sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            cc.loader.loadRes("hero/land0", cc.SpriteFrame, (err, SpriteFrame) => {
                sprite.spriteFrame = SpriteFrame;
            });
            newLand.height = 300;
            newLand.width = width;

            //地面绿色块
            // var graphics   = newLand.addComponent(cc.Graphics);
            // var color      = cc.Color.GREEN;
            // var fillColor  = color.fromHEX("#226e0b");
            // graphics.roundRect(0, 280, width, 19, 5);
            // graphics.fillColor = fillColor;
            // graphics.fill();

            // //地面棕色块
            // var fillColor  = color.fromHEX("#4a1b18");
            // graphics.rect(5, 260, width-10, 20);
            // graphics.fillColor = fillColor;
            // graphics.fill();

            // //地面白色块
            // var color      = cc.Color.WHITE;
            // graphics.rect(5, 250, width-10, 10);
            // graphics.fillColor = color;
            // graphics.fill();
            
            // //底部棕色块1
            // var fillColor  = color.fromHEX("#491b18");
            // graphics.rect(5, 190, width-10, 60);
            // graphics.fillColor = fillColor;
            // graphics.fill();

            // //底部棕色块2
            // var fillColor  = color.fromHEX("#441a18");
            // graphics.rect(5, 120, width-10, 70);
            // graphics.fillColor = fillColor;
            // graphics.fill();

            // //底部棕色块3
            // var fillColor  = color.fromHEX("#351516");
            // graphics.rect(5, 0, width-10, 121);
            // graphics.fillColor = fillColor;
            // graphics.fill();

            //create red land.
            var redLand = new cc.Node("Red Land");
            redLand.anchorY = 1;
            var redSprite = redLand.addComponent(cc.Sprite);
            redSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            redLand.color = cc.Color.RED;
            redLand.parent = newLand;
            redLand.height = 10;
            redLand.width = 10;
            redLand.setPosition(newLand.width/2,newLand.height);
            if(spriteFrameCache){
                // sprite.spriteFrame = spriteFrameCache;
                redSprite.spriteFrame = spriteFrameCache;
            }else{
                cc.loader.loadRes("hero/blank", cc.SpriteFrame, (err, SpriteFrame) => {
                    // sprite.spriteFrame = SpriteFrame;
                    redSprite.spriteFrame = SpriteFrame;
                    spriteFrameCache = SpriteFrame;
                });
            }
            newLand.center = redLand;
            return newLand;
        },
        createStick : function(width){
            var stick = new cc.Node("stick");
            stick.anchorY = 0;
            stick.y = 300;
            var sprite = stick.addComponent(cc.Sprite);
            sprite.type = cc.Sprite.Type.SLICED;
            // sprite.sizeMode = cc.Sprite.SizeMode.TRIMMED;
            sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            // sprite.spriteFrame = spriteFrameCache;
            cc.loader.loadRes("hero/stick", cc.SpriteFrame, (err, SpriteFrame) => {
                sprite.spriteFrame = SpriteFrame;
            });
            stick.width = width;
            stick.height = 0;
            return stick;
        }
    };
})();
module.exports = spriteCreator;