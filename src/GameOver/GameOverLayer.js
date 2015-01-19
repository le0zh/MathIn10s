/**
 * Created by zhuxinliang on 15/1/14.
 */


var GameOverLayer = cc.Layer.extend({
    ctor: function(){
        this._super();
        this.init();
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


        var lbScore = new cc.LabelTTF("Game over!!","Arial Bold",24);
        lbScore.x = winSize.width / 2;
        lbScore.y = winSize.height / 2 + 60;
        lbScore.color = cc.color(250,179,0);
        this.addChild(lbScore,10);

        var lbScore2 = new cc.LabelTTF("Your Score:"+ GLOBAL.Score,"Arial Bold",24);
        lbScore2.x = winSize.width / 2;
        lbScore2.y = winSize.height / 2 +30;
        lbScore2.color = cc.color(250,179,0);
        this.addChild(lbScore2,10);

        //重试按钮
        var retryMenu = new cc.MenuItemFont("retry", function(){
            GLOBAL.Reset();

            var scene = new GamePlayScene();
            cc.director.runScene(new cc.TransitionSlideInB(1, scene));
        });
        retryMenu.fontSize = 17;
        retryMenu.color = cc.color(250,179,0);

        //分享按钮
        var shareMenu = new cc.MenuItemFont("share", function(){
            console.log("to share.");
        });
        shareMenu.fontSize = 17;
        shareMenu.color = cc.color(250,179,0);
        shareMenu.y = -30;

        var gameOverMenus = new cc.Menu(retryMenu, shareMenu);
        gameOverMenus.x = winSize.width /2;
        gameOverMenus.y = winSize.height /2 - 10;

        this.addChild(gameOverMenus, 10);

    }
});