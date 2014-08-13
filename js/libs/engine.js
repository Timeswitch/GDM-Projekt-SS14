
//require();

//Spiel Engine
function Engine(){  
    this.init = function(){
        
        $('body').children().fadeOut({
            duration: 'slow',
            complete: function(){
                $('link[href="css/loading.css"]').remove();
            }
        });
    };
};