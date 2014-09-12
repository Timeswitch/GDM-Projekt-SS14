define(
        "controller/MainController",
        ["inc/Controller",
            "jquery",
            "inc/Image"
        ],
        function(Controller, $, Image) {
            function MainController(engine, target) {
                Controller.call(this, engine, target);
            }

            MainController.prototype = Object.create(Controller.prototype);
            MainController.prototype.constructor = MainController;

            MainController.prototype.init = function() {
                var self = this;

                function onEachLoaded(frag, fileName) {
                    if (myDisplayList[ fileName ] == "flaeche") {
                        flaeche = frag.select("svg");
                        flaeche.attr({
                            width: "100%",
                            height: "100%"
                        })
                    }
                    if (myDisplayList[ fileName ] == "rutsche") {
                        rutsche = frag.select("svg");
                        rutsche.attr({
                            width: "100%",
                            height: "100%"
                        })
                        rutsche.select("#g3004").transform("s0.6t-420,350");
                    }
                    if (myDisplayList[ fileName ] == "tor") {
                        tor = frag.select("svg");
                        tor.attr({
                            width: "100%",
                            height: "100%"
                        });
                        tor.select("#Ebene_2").transform("s0.38t410,210");
                    }
                    if (myDisplayList[ fileName ] == "sandkasten") {
                        sandkasten = frag.select("svg");
                        sandkasten.attr({
                            width: "100%",
                            height: "100%"
                        });
                        sandkasten.select("#gruppeSandkasten").transform("s0.8,t600,500");
                    }
                    if (myDisplayList[ fileName ] == "schaukel") {
                        schaukel = frag.select("svg");
                        schaukel.attr({
                            width: "100%",
                            height: "100%"
                        });
                        schaukel.select("#g3028").transform(schaukel.select("#g3028").transform() + "s0.55t-200,100");
                    }
                    if (myDisplayList[ fileName ] == "ball") {
                        ball = frag.select("svg");
                        ball.attr({
                            width: "100%",
                            height: "100%"
                        });
                        console.log(ball);
                    }

                    console.log(fileName, ' fragment loaded');
                }

                function enableClick(){
                    sandkasten.click(function() {
                            self.engine.loadScene('screens/MixGame.htm', function() {
                            }, {image: 'sandkasten.svg'})
                        });
                        tor.click(function() {
                            self.engine.loadScene('screens/MixGame.htm', function() {
                            }, {image: 'tor.svg'})
                        });
                        rutsche.click(function() {
                            self.engine.loadScene('screens/MixGame.htm', function() {
                            }, {image: 'rutsche.svg'})
                        });
                        schaukel.click(function() {
                            self.engine.loadScene('screens/MixGame.htm', function() {
                            }, {image: 'schaukel.svg'})
                        });
                }
                
                function finished(){
                    enableClick();
                }
                
                function onAllLoaded() {
                    var firstRun = localStorage.getItem('firstrun');
                    if (typeof (firstRun) === 'undefined' || firstRun === null) {
                        firstRun = true;
                    }

                    if (firstRun === true) {

                        console.log(firstRun);
                        firstRun = false;
                        localStorage.setItem('firstrun', false);
                        for (var i = 1; i < 6; i++) {
                            sandkasten.select("#col-" + i.toString()).animate({fill: "#fff"}, 9000, mina.linear);
                        }

                        for (var i = 1; i < 5; i++) {
                            tor.select("#col-" + i.toString()).animate({fill: "#fff"}, 9000, mina.linear);
                        }

                        for (var i = 1; i < 15; i++) {
                            rutsche.select("#col-" + i.toString()).animate({fill: "#fff"}, 9000, mina.linear);
                        }

                        for (var i = 1; i < 17; i++) {
                            schaukel.select("#col-" + i.toString()).animate({fill: "#fff"}, 9000, mina.linear);
                        }
                        
                        schaukel.select("#col-17").animate({fill: "#fff"}, 9000, function(){
                            finished();
                        });
                        
                    } else {
                        
                        var img = self.engine.loadImage('sandkasten.svg');
                        Image.each(sandkasten,function(index,element){
                            var fill = '#ffffff';
                            if(img.colors.length > 0){
                                fill = img.colorsAssoc[index].current;
                            }

                            element.attr({
                                'fill': fill
                            });
                        });
                        
                        img = self.engine.loadImage('tor.svg');
                        Image.each(tor,function(index,element){
                            var fill = '#ffffff';
                            if(img.colors.length > 0){
                                fill = img.colorsAssoc[index].current;
                            }

                            element.attr({
                                'fill': fill
                            });
                        });
                        
                        img = self.engine.loadImage('schaukel.svg');
                        Image.each(schaukel,function(index,element){
                            var fill = '#ffffff';
                            if(img.colors.length > 0){
                                fill = img.colorsAssoc[index].current;
                            }

                            element.attr({
                                'fill': fill
                            });
                        });
                        
                        img = self.engine.loadImage('rutsche.svg');
                        Image.each(rutsche,function(index,element){
                            var fill = '#ffffff';
                            if(img.colors.length > 0){
                                fill = img.colorsAssoc[index].current;
                            }

                            element.attr({
                                'fill': fill
                            });
                        });
                        
                        enableClick();
                        
                    }




                }

                var s = Snap("#canvas");
                var flaeche, rutsche, tor, sandkasten, schaukel, ball;
                var myLoadList = ["img/flaeche.svg", "img/rutsche.svg", "img/tor.svg", "img/sandkasten.svg", "img/schaukel.svg", "img/Ball.svg"];
                var myDisplayList = {"img/flaeche.svg": "flaeche", "img/rutsche.svg": "rutsche", "img/tor.svg": "tor", "img/sandkasten.svg": "sandkasten", "img/schaukel.svg": "schaukel", "img/Ball.svg": "ball"};

                s.loadFilesDisplayOrdered(myLoadList, onAllLoaded, onEachLoaded);
            };

            return MainController;
        }
);