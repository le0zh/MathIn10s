/**
 * Created by zhuxinliang on 15/1/11.
 */


var MenuLayer = cc.Layer.extend({
    ctor: function(){
        this._super();
        this.init();

        return true;
    },

    init: function(){
        //开始菜单
        var startMenuItem = new cc.MenuItemImage(
            res.start_n_png,
            res.start_s_png,
            this.onNewGame, this);

        var winSize = cc.director.getWinSize();
        startMenuItem.attr({
            x: 0,
            y: 0,
            anchorX:0.5,
            anchorY:0.5,
            scale:0.6
        });

        var menu = new cc.Menu(startMenuItem);
        menu.attr({
            x: winSize.width / 2,
            y: winSize.height / 2,
            anchorX: 0.5,
            anchorY: 0.5
        });

        this.addChild(menu,1);

        //var Button = new ccui.Button(res.start_n_png,res.start_s_png,"","");
        //Button.setTouchEnabled(true);
        //Button.setPressedActionEnabled(true);
        //Button.x = winSize.width / 2;
        //Button.y = winSize.height / 2;
        //Button.scale = 0.5;
        //Button.addTouchEventListener(this.onNewGame,this);
        //this.addChild(Button,10);

        //背景图片
        var bgSpirit = new cc.Sprite(res.cloud_jpg);
        bgSpirit.attr({
            x: winSize.width / 2,
            y: winSize.height / 2,
            scale: 0.5
        });
        bgSpirit.runAction(
            cc.sequence(
                cc.scaleTo(1, 1, 1)
            )
        );
        this.addChild(bgSpirit,0);

        //标题
        var title = new cc.LabelTTF("Math in 10 seconds", "Arial", 28);
        title.setFontFillColor(cc.color.BLACK);
        title.attr({
            x: winSize.width / 2,
            y: winSize.height / 2 + 150
        });
        this.addChild(title);

        return true;
    },

    onNewGame: function(){
        console.log("new game");
        GLOBAL.Reset();

        //cc.LoaderScene.preload(g_resources, function () {
        //    var scene = new GamePlayScene();
        //    cc.director.runScene(new cc.TransitionFade(1.2, scene));
        //}, this);

        var scene = new GamePlayScene();
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    }
});

var MenuScene = cc.Scene.extend({
    onEnter : function(){
        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});

