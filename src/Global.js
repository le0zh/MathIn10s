/**
 * Created by zhuxinliang on 15/1/14.
 */

//namespace
var GLOBAL =  GLOBAL || {};

//得分
GLOBAL.Score = 0;

//时间
GLOBAL.Time = 11;

//是否暂停中
GLOBAL.Pause = false;

GLOBAL.Reset = function(){
    GLOBAL.Time = 11;
    GLOBAL.Score = 0;
}