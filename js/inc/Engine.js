
define(
        "inc/Engine",
        [],
        function() {

            //Spiel Engine
            function Engine() {

                this.initLevel = 0;

                this.init = function() {
                    var self = this;

                    switch (this.initLevel) {
                        case 0:
                            this.initLevel++;
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
                    }

                };

                this.loadScene = function(path, callback) {
                    $('body').empty();
                    this.loadHTML(path, 'body', callback);
                }

                this.loadHTML = function(path, target, callback) {

                    $(target).load('html/' + path, function() {

                        var requirements = [];

                        $(this).find('req').each(function() {
                            requirements.push({
                                src: $(this).attr('src'),
                                type: $(this).attr('type')
                            });
                        });

                        var req = [];
                        for (var i = 0; i < requirements.length; i++) {
                            if (requirements[i].type == 'text/javascript') {
                                req.push(requirements[i].src);
                            } else if (requirements[i].type == 'text/css') {
                                console.log('TO-DO CSS Loader');
                            }

                        }

                        require(req, function() {
                            if (callback != 'undefined') {
                                callback();
                            }
                        });


                    });
                }
            }

            return Engine;
        }
);

