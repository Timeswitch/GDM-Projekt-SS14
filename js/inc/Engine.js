
define(
        "inc/Engine",
        [
            "jquery",
            "inc/CSSManager",
            "lib/viewport-units-buggyfill", //Danke Apple
            "inc/Image",
            "inc/Storage"
        ],
        function($,CSSManager,vpu_buggyfill,Image,Storage) {

            //Spiel Engine
            function Engine() {

                this.initLevel = 0;
                this.initCallback = null;
                
                this.vpu_buggyfill = vpu_buggyfill;
                this.cm = new CSSManager(this.vpu_buggyfill);
                this.storage = new Storage();

                this.init = function(callback) {
                    var self = this;

                    switch (this.initLevel) {
                        case 0:
                            this.initLevel++;
                            this.initCallback = callback;
                            this.vpu_buggyfill.init();
                            $('body').children().hide().fadeIn({
                                duration: 2000,
                                complete: function() {
                                    //$('link[href="css/loading.css"]').remove();
                                    self.init();
                                }
                            });
                            break;
                        case 1:
                            this.initLevel++;
                            this.loadScene('screens/start.htm', this.init.bind(this));
                            break;
                        case 2:
                            this.initLevel++
                            $('link[href="css/loading.css"]').remove();
                            if(typeof(this.initCallback) !== 'undefined' && this.initCallback !== null){
                                this.initCallback();
                            }
                            break;
                    }

                };

                this.loadScene = function(path, callback) {
                    $('body').empty();
                    this.loadHTML(path, 'body', callback);
                };

                this.loadHTML = function(path, target, callback) {
                    
                    var self = this;
                    
                    var loaded = [];
                    
                    $('body').find('input[content]').each(function() {
                        loaded.push({
                            src: $(this).attr('value'),
                            type: $(this).attr('content')
                        });
                    });
                    
                    for (var i = 0; i < loaded.length; i++) {
                        if (loaded[i].type === 'text/css') {
                            self.cm.unload('./css/'+loaded[i].src);
                        }

                    }
                    
                    $(target).load('html/' + path, function() {

                        var requirements = [];

                        $(this).find('input[content]').each(function() {
                            requirements.push({
                                src: $(this).attr('value'),
                                type: $(this).attr('content')
                            });
                        });

                        var js = [];
                        for (var i = 0; i < requirements.length; i++) {
                            if (requirements[i].type === 'text/javascript') {
                                if(requirements[i].src.indexOf(".js",requirements[i].src.length - ".js".length) !== -1){
                                    requirements[i].src = requirements[i].src.slice(0,-3);
                                }
                                js.push(requirements[i].src);
                            } else if (requirements[i].type === 'text/css') {
                                self.cm.load('./css/'+requirements[i].src);
                            }

                        }

                        require(js, function() {
                            
                            var count = arguments.length;
                            for(var i=0; i<count; i++){
                                var arg = arguments[i];

                                if(typeof(arg.prototype.isController) !== 'undefined'){
                                    if(arg.prototype.isController()){
                                        
                                        var controller = new arg(self,target);
                                        controller.init();
                                    }
                                }
                            }
                            
                            if (typeof(callback) !== 'undefined') {
                                //var args = Array.prototype.slice.call(arguments);
                                //args.unshift(js);
                                callback.apply(self,arguments);
                            }
                        });


                    });
                };
                
                this.loadImage = function(image){
                    var _image = new Image(image);
                    
                    var colors = this.storage.loadObject(image);
                    
                    if(colors !== null){
                        _image.colors = colors; 
                    }
                    
                    $(_image.colors).each(function(index,element){
                        _image.colorsAssoc[element.name] = element;
                    });
                    
                    return _image;
                };
                
                this.saveImage = function(image){
                    this.storage.saveObject(image.image,image.colors);
                };
            }
            

            return Engine;
        }
);

