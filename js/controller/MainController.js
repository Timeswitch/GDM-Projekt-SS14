define(
        "controller/MainController",
        ["inc/Controller",
            "jquery", ],
        function(Controller, $, ColorGame) {
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
                        })
                        schaukel.select("#g3028").transform(schaukel.select("#g3028").transform() + "s0.55t-200,100");
                    }

                    console.log(fileName, ' fragment loaded');
                }

                function onAllLoaded() {
                    var firstRun = localStorage.getItem('firstrun');
                    if(typeof(firstRun) === 'undefined' || firstRun === null){
                        firstRun = true;
                    }
                    
                    if(firstRun === true){
                        
                        console.log(firstRun);
                        firstRun = false;
                        localStorage.setItem('firstrun',false);
                        for (var i = 1; i < 6; i++) {
                            sandkasten.select("#fill" + i.toString()).animate({fill: "#fff"}, 9000, mina.linear);
                        }

                        for (var i = 1; i < 5; i++) {
                            tor.select("#tor" + i.toString()).animate({fill: "#fff"}, 9000, mina.linear);
                        }

                        for (var i = 1; i < 15; i++) {
                            rutsche.select("#rutsche" + i.toString()).animate({fill: "#fff"}, 9000, mina.linear);
                        }

                        for (var i = 1; i < 18; i++) {
                            schaukel.select("#schaukel" + i.toString()).animate({fill: "#fff"}, 9000, mina.linear);
                        }
                    }else{
                        sandkasten.click(function(){self.engine.loadScene('screens/MixGame.htm',function(){},{image: 'sandkasten.svg'})});
                        tor.click(function(){self.engine.loadScene('screens/MixGame.htm',function(){},{image: 'tor.svg'})});
                        rutsche.click(function(){self.engine.loadScene('screens/MixGame.htm',function(){},{image: 'rutsche.svg'})});
                        schaukel.click(function(){self.engine.loadScene('screens/MixGame.htm',function(){},{image: 'schaukel.svg'})});
                    }
                    
                    
                    

                }

                var s = Snap("#canvas");
                var flaeche, rutsche, tor, sandkasten, schaukel;
                var myLoadList = ["img/flaeche.svg", "img/rutsche.svg", "img/tor.svg", "img/sandkasten.svg", "img/schaukel.svg"];
                var myDisplayList = {"img/flaeche.svg": "flaeche", "img/rutsche.svg": "rutsche", "img/tor.svg": "tor", "img/sandkasten.svg": "sandkasten", "img/schaukel.svg": "schaukel"};
                
                s.loadFilesDisplayOrdered( myLoadList, onAllLoaded, onEachLoaded );
            };

            return MainController;
        }
);