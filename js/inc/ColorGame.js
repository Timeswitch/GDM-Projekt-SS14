define(
        "inc/ColorGame",
        [
            "inc/Image",
            "inc/SnapLoader",
            "jquery",
            "lib/jquery-ui",
            "lib/jquery.ui.touch-punch",
            "lib/jquery.color",
            "lib/color_mixer",
            "lib/conversions"
        ],
        function(Image, Snap, $) {
            function ColorGame($canvas, $toolbar, engine) {
                this.$canvas = $canvas;
                this.$toolbar = $toolbar;
                this.svgCanvas = Snap($canvas.find('svg')[0]);
                this.svg = null;
                this.engine = engine;
                this.colorButtons = Array();
                this.dragging = false;

                this.image = null;
            }

            ColorGame.prototype.init = function() {
                var self = this;
                
                var colors = Array(
                        $('<div class="color" style="background-color: #00ffff;"></div>'),
                        $('<div class="color" style="background-color: #ff00ff;"></div>'),
                        $('<div class="color" style="background-color: #ffff00;"></div>'),
                        $('<div class="color" style="background-color: #010101;"></div>'),
                        $('<div class="color" style="background-color: #ffffff;"></div>')
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

            ColorGame.prototype.load = function(image) {
                var self = this;

                this.image = this.engine.loadImage(image);
                Snap.load('img/' + this.image.image, function(svg) {
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

            ColorGame.prototype.initImage = function() {
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
                    
                    if(!self.dragging){
                        var info = $('#info-'+element.attr('id'));
                        if(info.length === 0){
                            $('.info').remove();
                            info = $('<div id="info-'+element.attr('id')+'" class="color info" style="position:absolute; background-color:'+self.image.colorsAssoc[element.attr('id')].original+';"></div>');

                            info.css('top', '0');
                            info.css('left', '0');
                            
                            info.mouseleave(function(event){
                                var el = document.elementFromPoint(event.pageX, event.pageY);
                                if(el === null || (el.getAttribute('id') !== element.attr('id'))){

                                        info.remove();

                                }
                            });

                            $(self.$canvas).append(info);
                        }
                                
                        
                    }
                    
                    
                    
                    element.data('stroke',element.attr('stroke'));
                    element.data('stroke-width',element.attr('stroke-width'));
                    
                    element.attr({
                            'stroke-width': '5',
                            'stroke': '#ff00ff'
                        });
                };
                
                var hover_end = function(element){

                    var info = $('#info-'+element.attr('id'));
                    var move = function(event){
                        var el = document.elementFromPoint(event.pageX, event.pageY);

                        if(el === null || ($(el).attr('id') !== info.attr('id'))){

                                info.remove();
                                
                        }
                        $(document).unbind('mousemove',move);
                    };
                    
                    $(document).mousemove(move);
                    
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

            ColorGame.prototype.animate = function() {

                var self = this;

                Image.each(this.svg, function(index, element) {

                    element.animate({
                        fill: self.image.colorsAssoc[index].current
                    }, 2000, function() {
                        self.start();
                    });

                });

            };

            ColorGame.prototype.start = function() {
                var self = this;
                
                $(this.colorButtons).each(function(index, element) {
                    element.draggable({
                        helper: 'clone', //function() {
                        //return $('<div class="color-info red"></div>');
                        //},
                        cursorAt: {
                            top: 0,
                            left: 0
                        },
                        
                        stop: function(event, ui){
                            var element = document.elementFromPoint(ui.offset.left, ui.offset.top);
                            if(element !== null && (element.tagName === 'path' || element.tagName === 'polygon')){
                                var id = element.getAttribute('id');
                                if(id.substring(0,4) === "col-"){
                                    var color = ui.helper.css('background-color');
                                
                                    self.mixColor(id,color);
                                }
                                
                            }
                            
                            self.dragging = false;
                        },
                        
                        start: function(){
                            self.dragging = true;
                            $('.info').remove();
                        }
                    });

                });
            };
            
            ColorGame.prototype.mixColor = function(id,color){
                var element = this.svg.select('#'+id);
                
                if(element != null){
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

                            target[i] = ((target[i] + mix[i]/8));
                        }

                        target[3] = ((target[3] + mix[3])/2);

                        console.log(target);

                        var result = cmyk2rgb(target);
                        result = Snap.color('rgb('+result[0]+','+result[1]+','+result[2]+')').hex;
                    }
                    
                    /*
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
                        
                        target[i] = ((target[i] + mix[i]/8));
                    }
                    
                    target[3] = ((target[3] + mix[3])/2);
                    
                    console.log(target);
                    
                    var result = cmyk2rgb(target);
                    result = Snap.color('rgb('+result[0]+','+result[1]+','+result[2]+')').hex;
                    
                   /*
                    var mix = Snap.color(color);
                    var target = Snap.color(this.image.colorsAssoc[id].current);
                    
                    var tempMix = [mix.r,mix.g,mix.b];
                    var tempTarget = [target.r,target.g,target.b];
                    for(var i=0;i<3;i++){
                        tempTarget[i] = (((tempTarget[i]+tempTarget[i]+tempMix[i])/3));
                    }
                    
                    var result = Snap.color('rgb('+tempTarget[0]+','+tempTarget[1]+','+tempTarget[2]+')').hex;
                   */
                    this.image.colorsAssoc[id].current = result;
                    this.engine.saveImage(this.image);
                    element.attr({
                        fill: result
                    });
                    
                    this.check();
                }
                
                
            };
            
            ColorGame.prototype.check = function(){
                
                if(this.image.check()){
                    alert('Passt so!');
                }
                
            };
            
            ColorGame.prototype.reset = function(){
                var self = this;
                Image.each(this.svg,function(index,element){
                    self.image.colorsAssoc[index].current = '#ffffff';
                    element.attr({
                        fill: '#ffffff'
                    });
                });
                
                this.engine.saveImage(this.image);
            };
            
            ColorGame.prototype.home = function(){
                this.engine.saveImage(this.image);
                this.engine.home();
            };

            return ColorGame;
        });