/**
 * Created by zhuxinliang on 15/1/11.
 */

var HubLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
        return true;
    },

    init: function(){
        var winSize = cc.director.getWinSize();

        var time = new cc.LabelTTF("Time: 10", "Arial", 12);
        time.setFontFillColor(cc.color.BLACK);
        time.attr({
            x: 50,
            y: winSize.height - 20
        });
        this.addChild(time);

        var score = new cc.LabelTTF("Score: 100", "Arial", 12);
        score.setFontFillColor(cc.color.BLACK);
        score.attr({
            x: winSize.width -50,
            y: winSize.height - 20
        });
        this.addChild(score);

        return true;
    }
});

var GameLayer = cc.Layer.extend({
    _result : 0,

    ctor: function () {
        this._super();
        this.init();

        return true;
    },

    init: function(){
        var winSize = cc.director.getWinSize();

        //背景图片
        var bgSpirit = new cc.Sprite(res.play_background_jpg);
        bgSpirit.attr({
            x: winSize.width / 2,
            y: winSize.height / 2
        });
        this.addChild(bgSpirit,0);

        //暂停
        var pauseMenuItem = new cc.MenuItemFont("pause", function(){
            console.log("pause");
        }, this);
        pauseMenuItem.setFontSize(20);
        pauseMenuItem.setColor(cc.color.BLACK);

        //返回主菜单
        var returnMenuItem = new cc.MenuItemFont("back", function(){
            console.log("back");
            cc.LoaderScene.preload(g_resources, function () {
                cc.director.runScene(new MenuScene());
            }, this);
        }, this);
        returnMenuItem.setFontSize(20);
        returnMenuItem.setColor(cc.color.BLACK);

        returnMenuItem.attr({
            x:100,
            y:0
        });

        var menu2 = new cc.Menu(pauseMenuItem, returnMenuItem);
        menu2.attr({
            x: winSize.width /2 - 50,
            y: 200
        });
        this.addChild(menu2,10);

        //控制面板
        var controlPadMenu = new cc.Menu();
        for(var i =0; i< 10; i++){
            var item = this.controllerPadFactory(i);
            console.log(Math.floor(i/3));
            item.attr({
                x:winSize.width / 4 -10 + (i%3)*70,
                y:80 - Math.floor((i/3))*40
            });
            controlPadMenu.addChild(item);
        }

        controlPadMenu.attr({
            x: 20,
            y: 80
        });
        this.addChild(controlPadMenu,20);

        return true;
    },

    controllerPadFactory: function (number) {
        var numberItem = new cc.MenuItemFont(number+'', function(){
            console.log(number+" clicked");
        },this);
        numberItem.setFontSize(32);
        numberItem.setColor(cc.color.BLACK);
        return numberItem;
    }

});

var GamePlayScene = cc.Scene.extend({
   onEnter: function(){
       this._super();
       var gameLayer = new GameLayer();
       var hubLayer = new HubLayer();

       this.addChild(gameLayer,0);
       this.addChild(hubLayer,1);
   }
});