define(
        "inc/DudeGame",
        [
            "inc/ColorGame",
            "inc/Image",
            "inc/SnapLoader",
            "jquery",
            "lib/jquery-ui",
            "lib/jquery.ui.touch-punch",
            "lib/jquery.color",
            "lib/color_mixer",
            "lib/conversions"
        ],
        function(ColorGame,Image, Snap, $) {
            
            function DudeGame($canvas, $toolbar, engine) {
                ColorGame.call(this,$canvas,$toolbar,engine);
            }
            
            DudeGame.prototype = Object.create(ColorGame.prototype);
            DudeGame.prototype.constructor = DudeGame;
            
            DudeGame.prototype.init = function() {
                var self = this;
                var colors = Array(
                        $('<div class="color" style="background-color: #ffffff;"></div>'),//weiß
                        $('<div class="color" style="background-color: #00ffff;"></div>'),//cyan
                        $('<div class="color" style="background-color: #ffff00;"></div>'),//gelb
                        $('<div class="color" style="background-color: #ff00ff;"></div>'),//magenta
                        $('<div class="color" style="background-color: #FFA500;"></div>'),//orange
                        $('<div class="color" style="background-color: #FF0000;"></div>'),//Rot
                        $('<div class="color" style="background-color: #00CD00;"></div>'),//grün
                        $('<div class="color" style="background-color: #A020F0;"></div>'),//purple
                        $('<div class="color" style="background-color: #0000FF;"></div>'),//blau
                        $('<div class="color" style="background-color: #010101;"></div>')//schwarz
                         
                        );

                this.colorButtons = colors;

                var colorContainer = $('<div></div>');
                colorContainer.append(colors);

                this.$toolbar.append(colors);
                
                var buttonContainer = $('<div class="command-container"></div>');
                
                var home = $('<div class="command" id="home-button"></div>');
                home.click(function(){
                    self.home();
                });
                
                var reset = $('<div class="command" id="reset-button"></div>');
                reset.click(function(){
                    self.reset();
                });
                
                buttonContainer.append(home);
                buttonContainer.append(reset);
                this.$canvas.append(buttonContainer);
                
            };
            
            DudeGame.prototype.initImage = function() {
                var self = this;
                if (this.image.colors.length === 0) {

                    Image.each(this.svg, function(index, element) {

                        var color = Snap.color(element.attr('fill'));

                        var hexColor = Snap.rgb(color.r, color.g, color.b);

                        var fill = {
                            name: index,
                            original: hexColor,
                            current: '#ffffff'
                        };

                        self.image.add(fill);
                    });
                }
                var hover_start = function(element){
                    
                    element.data('stroke',element.attr('stroke'));
                    element.data('stroke-width',element.attr('stroke-width'));
                    
                    element.attr({
                            'stroke-width': '5',
                            'stroke': '#ff00ff'
                        });
                };
                
                var hover_end = function(element){
                    
                    element.attr({
                            'stroke': element.data('stroke'),
                            'stroke-width': element.data('stroke-width')
                    });
                };
                
                Image.each(this.svg, function(index, element) {
                    element.hover(function(){
                        hover_start(element);
                    },
                    function(){
                        hover_end(element);
                    });
                    
                });
            };
            
            DudeGame.prototype.mixColor = function(id,color){
                var element = this.svg.select('#'+id);
                
                if(element !== null){
                    var targetHex = $.Color(this.image.colorsAssoc[id].current).toHexString();
                    var colorHex =  $.Color(color).toHexString();
                    
                    var result = '#ffffff';
                    console.log(colorHex + ' ' + targetHex);
                    if(colorHex === '#ffffff' || colorHex === '#010101' || targetHex === '#ffffff' || targetHex === '#010101'){
                        console.log('white');
                        var mix = $.Color(color);
                        var target = $.Color(targetHex);
                        
                        mix = Color_mixer.mix(mix,target);
                        mix = Color_mixer.mix(mix,target);

                        result = mix.toHexString();
                    }else{
                        var rgbColor = Snap.color(color);
                        rgbColor = [rgbColor.r,rgbColor.g,rgbColor.b];
                        var mix = rgb2cmyk(rgbColor);

                        rgbColor = Snap.color(this.image.colorsAssoc[id].current);
                        rgbColor = [rgbColor.r,rgbColor.g,rgbColor.b];
                        var target = rgb2cmyk(rgbColor);

                        for(var i=0; i<3; i++){
                            if(isNaN(mix[i])){
                                mix[i] = 0.0;
                            }

                            if(isNaN(target[i])){
                                target[i] = 0.0;
                            }

                            target[i] = ((target[i] + mix[i]/4));
                        }

                        target[3] = ((target[3] + mix[3])/2);

                        console.log(target);

                        var result = cmyk2rgb(target);
                        result = Snap.color('rgb('+result[0]+','+result[1]+','+result[2]+')').hex;
                    }
                    
                    this.image.colorsAssoc[id].current = result;
                    this.engine.saveImage(this.image);
                    element.attr({
                        fill: result
                    });
                    
                }
                
                
            };
            
            DudeGame.prototype.load = function() {
                var self = this;

                this.image = this.engine.loadImage('dude.svg');
                Snap.load('img/dude.svg', function(svg) {
                    self.svgCanvas.append(svg);
                    self.svg = svg.paper.select('svg');
                    
                    

                    self.svg.attr({
                        width: '100%',
                        height: '100%'
                    });

                    self.initImage();
                    self.animate();
                });


            };
            
            return DudeGame;
        });