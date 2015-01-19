/**
 * Created by zhuxinliang on 15/1/12.
 */

//准备->开始的层
var GetReadyLayer = cc.Layer.extend({
    _tipLabel: null,
    _shown: false,

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

        this._tipLabel = new cc.LabelTTF("Ready", "Arial", 28);
        this._tipLabel.color = cc.color.BLACK;
        this._tipLabel.x = winSize.width /2;
        this._tipLabel.y = winSize.height /2 + 50;
        this.addChild(this._tipLabel, 10);

        this.schedule(function(){
            if(!this._shown){
                this._tipLabel.setString("GO!");
                this._shown = true;
            }else{
                cc.director.getScheduler().pauseTarget(this);
                var scene = new GameScene();
                cc.director.runScene(new cc.TransitionSlideInB(1, scene));
            }
        },1.3);
    }
});


var GamePlayScene = cc.Scene.extend({
    onEnter: function(){
        this._super();

        var getReadyLayer = new GetReadyLayer();

        this.addChild(getReadyLayer, 0);
    }
});

var GameScene = cc.Scene.extend({
    onEnter: function(){
        this._super();

        var hubLayer = new GameHubLayer();
        var gameLayer = new GameContentLayer(hubLayer);

        this.addChild(gameLayer, 0);
        this.addChild(hubLayer, 1000);
    }
});