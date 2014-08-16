
define(
        "inc/Engine",
        [],
        function() {

            //Spiel Engine
            function Engine() {

                this.initLevel = 0;
                this.initCallback = null;

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

                    $(target).load('html/' + path, function() {

                        var requirements = [];

                        $(this).find('req').each(function() {
                            requirements.push({
                                src: $(this).attr('src'),
                                type: $(this).attr('type')
                            });
                        });

                        var js = [];
                        for (var i = 0; i < requirements.length; i++) {
                            if (requirements[i].type == 'text/javascript') {
                                js.push(requirements[i].src);
                            } else if (requirements[i].type == 'text/css') {
                                console.log('TO-DO CSS Loader');
                            }

                        }

                        require(js, function() {
                            if (typeof(callback) !== 'undefined') {
                                //var args = Array.prototype.slice.call(arguments);
                                //args.unshift(js);
                                callback.apply(this,arguments);
                            }
                        });


                    });
                };
                
            }

            return Engine;
        }
);

