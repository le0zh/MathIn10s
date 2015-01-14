/**
 * Created by zhuxinliang on 15/1/14.
 */


var GameOverScene = cc.Scene.extend({
    onEnter: function(){
        this._super();

        var layer = new GameOverLayer();
        this.addChild(layer);
    }
});