
define(
        "inc/Engine",
        [],
        function(){
            
            //Spiel Engine
            function Engine() {

                this.initLevel = 0;

                this.init = function() {
                    var self = this;

                    switch(this.initLevel){
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
                            this.loadScene('screens/start.htm',this.init.bind(this));
                            break;
                    }
                    
                };

                this.loadScene = function(path,callback) {
                    $('body').empty();
                    this.loadHTML(path, 'body', callback);
                }

                this.loadHTML = function(path, target, callback) {
              
                    $(target).load('html/' + path, function(){
                       
                        if(callback != 'undefined'){
                            callback();
                        }
                    });
                }
            }
            
            return Engine;
        }
);

