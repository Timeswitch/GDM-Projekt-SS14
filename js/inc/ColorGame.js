define(
        "inc/ColorGame",
        [
         "inc/Image",
         "inc/SnapLoader",
         "jquery",
         "lib/jquery-ui",
         "lib/jquery.ui.touch-punch",
        ],
        function(Image,Snap,$){
            function ColorGame($canvas, $toolbar, engine){
                this.$canvas = $canvas;
                this.$toolbar = $toolbar;
                this.svgCanvas = Snap($canvas.find('svg')[0]);
                this.svg = null;
                this.engine = engine;
                
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
                Snap.load('img/'+this.image.image,function(svg){
                    self.svgCanvas.append(svg);
                    self.svg = self.svgCanvas.select('svg');
                    
                    self.svg.attr({
                        width: '100%',
                        height: '100%'
                    });
                    
                    self.animate();
                });
                
                
            };
            
            ColorGame.prototype.initImage = function(){
                var self = this;
                
                Image.each(this.svg,function(index,element){
                   console.log(element);
                   var color = Snap.color(element.attr('fill'));
                   
                   var hexColor = Snap.rgb(color.r,color.g,color.b);
                   
                   var fill = {
                        name: index,
                        original: hexColor,
                        current: '#ffffff'
                    };

                    self.image.add(fill);
               });
            };
            
            ColorGame.prototype.animate = function(){
                if(this.image.colors.length === 0){
                    this.initImage();
                }
                console.log(this.image);
                
            };
            
            return ColorGame;
        });