define(
        "inc/ColorGame",
        [
         "inc/Image",
         "lib/svg",
         "jquery",
         "lib/jquery-ui",
         "lib/jquery.ui.touch-punch",
        ],
        function(Image,SVG,$){
            
            function ColorGame($canvas, $toolbar, engine){
                this.$canvas = $canvas;
                this.$toolbar = $toolbar;
                this.engine = engine;
                this.svg = null;
                
                this.image = null;
            }
            
            ColorGame.prototype.init = function(){
                var colors = Array(
                        $('<div class="color" style="background-color: #00ffff;"></div>'),
                        $('<div class="color" style="background-color: #ffff00;"></div>'),
                        $('<div class="color" style="background-color: #ff00ff;"></div>'),
                        $('<div class="color" style="background-color: #000000;"></div>'),
                        $('<div class="color" style="background-color: #ffffff;"></div>')
                );
                
                
                
                $(colors).each(function(index,element){
                    element.draggable({
                        helper: 'clone',//function() {
                            //return $('<div class="color-info red"></div>');
                        //},
                        cursorAt: {
                            top: 0,
                            left: 0
                        }
                    });
                    
                });
        
                var colorContainer = $('<div></div>');
                colorContainer.append(colors);
                
                this.$toolbar.append(colors);
            };
            
            ColorGame.prototype.load = function(image){
                var self = this;
                
                this.image = this.engine.loadImage(image);
                
                this.$canvas.empty();
                this.svg = SVG(this.$canvas.attr('id')).size('100%','100%');
                this.svg.image('img/'+this.image.image).loaded(function(){
                    this.size('100%','100%');
                    self.animate();
                });
                
            };
            
            ColorGame.prototype.initImage = function(){
                var self = this;
                console.log(this.svg);
               Image.each(this.svg,function(index,element){
                   console.log(index);
                   var fill = {
                        original: element.attr('fill'),
                        current: '#ffffff'
                    };

                    self.image.colors[index] = fill;
               });
            };
            
            ColorGame.prototype.animate = function(){
                if(this.image.colors.length === 0){
                    this.initImage();
                }
                
                
            };
            
            return ColorGame;
        });