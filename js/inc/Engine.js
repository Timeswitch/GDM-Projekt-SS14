
define(
        "inc/Engine",
        [
            "jquery",
            "inc/CSSManager"
        ],
        function($,CSSManager) {

            //Spiel Engine
            function Engine() {

                this.initLevel = 0;
                this.initCallback = null;
                
                this.cm = new CSSManager();

                this.init = function(callback) {
                    var self = this;

                    switch (this.initLevel) {
                        case 0:
                            this.initLevel++;
                            this.initCallback = callback;
                            $('body').children().fadeOut({
                                duration: 'slow',
                                complete: function() {
                                    $('link[href="css/loading.css"]').remove();
                                    self.init();
                                }
                            });
                            break;
                        case 1:
                            this.initLevel++;
                            this.loadScene('screens/start.htm', this.init.bind(this));
                            break;
                        case 2:
                            this.initLevel++;
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
                                if(requirements[i].src.indexOf(".js",requirements[i].src.length - ".js".length) !== 1){
                                    requirements[i].src = requirements[i].src.slice(0,-3);
                                }
                                js.push(requirements[i].src);
                            } else if (requirements[i].type === 'text/css') {
                                self.cm.load('./css/'+requirements[i].src);
                            }

                        }

                        require(js, function() {
                            if (typeof(callback) !== 'undefined') {
                                //var args = Array.prototype.slice.call(arguments);
                                //args.unshift(js);
                                callback.apply(self,arguments);
                            }
                        });


                    });
                };
                
            }

            return Engine;
        }
);

