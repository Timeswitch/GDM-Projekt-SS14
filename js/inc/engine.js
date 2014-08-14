
//require();

//Spiel Engine
function Engine(){
    
    this.init = function(){
        var self = this;
        
        $('body').children().fadeOut({
            duration: 'slow',
            complete: function(){
                $('link[href="css/loading.css"]').remove();
                self.initUI();
            }
        });
    };
    
    this.initUI = function(){
        $('body').append('Geladen, wow!');
    };
};