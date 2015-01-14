/**
 * Created by zhuxinliang on 15/1/12.
 */


var GamePlayScene = cc.Scene.extend({
    onEnter: function(){
        this._super();

        var hubLayer = new GameHubLayer();
        var gameLayer = new GameContentLayer(hubLayer);

        this.addChild(gameLayer, 0);
        this.addChild(hubLayer, 1000);
    }
});