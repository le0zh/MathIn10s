/**
 * Created by zhuxinliang on 15/1/12.
 */


var GameContentLayer = cc.Layer.extend({
    _result : 0,
    _answer: 0,
    _resultLabel : null,

    _leftNumber : 0,
    _rightNumber: 0,
    _operator: 1, //1,2,3,4: +,-,X,/

    _leftNumberLabel: null,
    _rightNumberLabel: null,
    _operatorLabel: null,

    _maxNumber: 10,//算式中最大的运算数

    _hubLayer :null,

    ctor: function (hubLayer) {
        this._super();
        this.init();

        this._hubLayer = hubLayer;

        return true;
    },

    init: function(){
        var winSize = cc.director.getWinSize();

        this._resultLabel = new cc.LabelTTF("--", "Arial", 40);
        this._resultLabel.setFontFillColor(cc.color.BLUE);
        this._resultLabel.attr({
            x: winSize.width / 2,
            y: winSize.height - 200
        });
        this.addChild(this._resultLabel,10);

        //背景图片
        var bgSpirit = new cc.Sprite(res.play_background_jpg);
        bgSpirit.attr({
            x: winSize.width / 2,
            y: winSize.height / 2
        });
        this.addChild(bgSpirit,0);

        this._leftNumberLabel = new cc.LabelTTF("1", "Arial", 40);
        this._leftNumberLabel.setFontFillColor(cc.color.BLUE);
        this._leftNumberLabel.attr({
            x: winSize.width / 2 - 50,
            y: winSize.height - 150
        });
        this.addChild(this._leftNumberLabel,10);

        this._rightNumberLabel = new cc.LabelTTF("1", "Arial", 40);
        this._rightNumberLabel.setFontFillColor(cc.color.BLUE);
        this._rightNumberLabel.attr({
            x: winSize.width / 2 + 50,
            y: winSize.height - 150
        });
        this.addChild(this._rightNumberLabel,10);

        this._operatorLabel = new cc.LabelTTF("+", "Arial", 40);
        this._operatorLabel.setFontFillColor(cc.color.BLUE);
        this._operatorLabel.attr({
            x: winSize.width / 2,
            y: winSize.height - 150
        });
        this.addChild(this._operatorLabel,10);

        this.generateQuestion();

        //暂停
        var pauseMenuItem = new cc.MenuItemFont("pause", function(){
            console.log("pause");
        }, this);
        pauseMenuItem.setFontSize(20);
        pauseMenuItem.setColor(cc.color.BLACK);

        //后退删除一位
        var backSpaceMenuItem = new cc.MenuItemFont("backspace",function(){
            if(this._result != 0) {
                this._result = Math.floor(this._result / 10);
                this.updateResultDisplay();
            }
        },this);
        backSpaceMenuItem.setFontSize(20);
        backSpaceMenuItem.setColor(cc.color.RED);
        backSpaceMenuItem.attr({
            x:100,
            y:0
        });

        //全部清除
        var clearMenuItem = new cc.MenuItemFont("clear",function(){
            this._result = 0;
            this.updateResultDisplay();
        },this);
        clearMenuItem.setFontSize(20);
        clearMenuItem.setColor(cc.color.RED);
        clearMenuItem.attr({
            x:180,
            y:0
        });

        //返回主菜单
        var returnMenuItem = new cc.MenuItemFont("back", function(){
            var scene = new MenuScene();
            cc.director.runScene(new cc.TransitionFade(1.2, scene));
        }, this);
        returnMenuItem.setFontSize(20);
        returnMenuItem.setColor(cc.color.BLACK);
        returnMenuItem.attr({
            x:240,
            y:0
        });

        var menu2 = new cc.Menu(pauseMenuItem, backSpaceMenuItem, clearMenuItem, returnMenuItem);
        menu2.attr({
            x: 40,
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

        //开启倒计时
        this.schedule(this.updateTime, 1);

        return true;
    },

    controllerPadFactory: function (number) {
        var numberItem = new cc.MenuItemFont(number+'', function(){
            this._result = this._result*10 + number;
            this.updateResultDisplay();
            //if(this._result === 12){
            if(this._result === this._answer){
                //重新出题
                //this._result = 0;
                this.updateResultDisplay(true);
                this.generateQuestion();
            }

        },this);
        numberItem.setFontSize(32);
        numberItem.setColor(cc.color.BLACK);
        return numberItem;
    },

    updateResultDisplay: function(isCorrect){

        this._resultLabel.setString(this._result);

        if(isCorrect){
            //this._resultLabel.runAction(cc.sequence(
            //    cc.scaleTo(0.3, 2, 2),
            //    cc.scaleTo(0.3, 1, 1)
            //));

            this._result = 0;
            this._resultLabel.setString(this._result);

            GLOBAL.Score +=10;
            this._hubLayer.updateScoreDisplay();

            //this._resultLabel.scale = 1;
            //this._resultLabel.runAction(cc.fadeOut(0.5));
            //this._resultLabel.runAction(cc.scaleTo(0.6,0.5,0.5));
        }
    },

    generateQuestion: function(){
        this._leftNumber = Math.ceil(Math.random() * this._maxNumber);
        this._rightNumber = Math.ceil(Math.random() * this._maxNumber);

        this._operator = Math.ceil(Math.random() * 3); //暂时不做除法
        console.log(this._operator);

        if(this._operator === 2){ //对于减法，确保结果为正数
            if(this._leftNumber < this._rightNumber){
                var tmp = this._rightNumber;
                this._rightNumber = this._leftNumber;
                this._leftNumber = tmp;
            }
        }

        switch(this._operator){
            case 1:
                this._answer = this._leftNumber + this._rightNumber;
                break;
            case 2:
                this._answer = this._leftNumber - this._rightNumber;
                break;
            case 3:
                this._answer = this._leftNumber * this._rightNumber;
                break;
            case 4:
                this._answer = this._leftNumber / this._rightNumber;
                break;
        }

        console.log("answer: " + this._answer);

        this.updateQuestionDisplay();
    },

    updateQuestionDisplay: function(){
        this._leftNumberLabel.setString(this._leftNumber);
        var operator ='';
        switch(this._operator){
            case 1:
                operator ='+';
                break;
            case 2:
                operator ='-';
                break;
            case 3:
                operator ='x';
                break;
            case 4:
                operator ='/';
                break;
        }
        this._operatorLabel.setString(operator);
        this._rightNumberLabel.setString(this._rightNumber);


        //this._result = 0;
        //this.updateResultDisplay();
        //this._resultLabel.setString(this._result);
        //this._resultLabel.scale = 0.5;
        //this._resultLabel.runAction(cc.scaleTo(0.6,1,1));

        this._leftNumberLabel.scale = 0.5;
        this._leftNumberLabel.runAction(cc.scaleTo(0.6,1,1));

        this._rightNumberLabel.scale = 0.5;
        this._rightNumberLabel.runAction(cc.scaleTo(0.6,1,1));

        this._operatorLabel.scale = 0.5;
        this._operatorLabel.runAction(cc.scaleTo(0.6,1,1));
    },

    updateTime: function(){
        GLOBAL.Time--;
        if(GLOBAL.Time <= 0){
            GLOBAL.Time = 0;
            cc.director.getScheduler().pauseTarget(this);

            var scene = new GameOverScene();
            cc.director.runScene(new cc.TransitionFade(1.2, scene));

        }

        this._hubLayer.updateTimeDisplay();
    }


});