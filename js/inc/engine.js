
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
        this.loadScene('screens/start.htm');
    };

    this.loadScene = function(path){
        $('body').empty();
        this.loadHTML(path,'body');
    }
    
    this.loadHTML = function(path,target){
        $(target).load('html/'+path);
    }
};