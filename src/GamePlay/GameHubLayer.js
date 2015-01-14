/**
 * Created by zhuxinliang on 15/1/12.
 */


var GameHubLayer = cc.Layer.extend({
    _scoreLabel: null,
    _timeLabel: null,

    ctor: function () {
        this._super();
        this.init();
        return true;
    },

    init: function(){
        var winSize = cc.director.getWinSize();

        var time = new cc.LabelTTF("Time: ", "Arial", 12);
        time.setFontFillColor(cc.color.BLACK);
        time.attr({
            x: 50,
            y: winSize.height - 20
        });
        this.addChild(time);

        this._timeLabel = new cc.LabelTTF("10", "Arial", 12);
        this._timeLabel.setFontFillColor(cc.color.BLACK);
        this._timeLabel.attr({
            x: 90,
            y: winSize.height - 20
        });
        this.addChild(this._timeLabel);

        var score = new cc.LabelTTF("Score: ", "Arial", 12);
        score.setFontFillColor(cc.color.BLACK);
        score.attr({
            x: winSize.width -100,
            y: winSize.height - 20
        });
        this.addChild(score);

        this._scoreLabel = new cc.LabelTTF("0", "Arial", 24);
        this._scoreLabel.color = cc.color(250,179,0);
        //this._scoreLabel.setFontFillColor(cc.color.GREEN);
        this._scoreLabel.attr({
            x: winSize.width  -50,
            y: winSize.height - 20
        });
        this.addChild(this._scoreLabel);

        return true;
    },

    //更新分数的显示
    updateScoreDisplay: function(){
        this._scoreLabel.setString(GLOBAL.Score);
        this._scoreLabel.scale = 0.5;
        this._scoreLabel.runAction(cc.scaleTo(0.6,1,1));
    },

    updateTimeDisplay: function(){
        this._timeLabel.setString(GLOBAL.Time);
        this._timeLabel.scale = 0.5;
        this._timeLabel.runAction(cc.scaleTo(0.6,1,1));
    }
});