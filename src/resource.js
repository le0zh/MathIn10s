var res = {
    play_background_jpg : "res/background.jpg",
    menu_background_png : "res/stariea.png",
    start_n_png: "res/start_n.png",
    start_s_png: "res/start_s.png",
    font:{
            type:"font",
            name:"socicon",
            srcs:["res/socicon-webfont.ttf"]
    },
    number0: "res/BlueNumber_0.png",
    number1: "res/BlueNumber_1.png",
    number2: "res/BlueNumber_2.png",
    number3: "res/BlueNumber_3.png",
    number4: "res/BlueNumber_4.png",
    number5: "res/BlueNumber_5.png",
    number6: "res/BlueNumber_6.png",
    number7: "res/BlueNumber_7.png",
    number8: "res/BlueNumber_8.png",
    number9: "res/BlueNumber_9.png"

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}