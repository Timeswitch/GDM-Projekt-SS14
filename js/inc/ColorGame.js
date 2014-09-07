define(
        "inc/ColorGame",
        ["lib/svg",
         "jquery"],
        function(SVG,$){
            
            function ColorGame($canvas, $toolbar){
                this.$canvas = $canvas;
                this.$toolbar = $toolbar;
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
                    //+*element.draggable();
                });
        
                var colorContainer = $('<div></div>');
                colorContainer.append(colors);
                
                this.$toolbar.append(colors);
            };
            
            return ColorGame;
        });