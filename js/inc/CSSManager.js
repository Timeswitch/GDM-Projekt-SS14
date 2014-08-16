define(
        "inc/CSSManager",
        [],
        function() {
            
            function CSSManager(){
                this.css = {};
                
                this.load = function(path){
                    if(!this.css.hasOwnProperty(path)){
                        var cssTag = $('<link rel="stylesheet" type="text/css" href="'+path+'" />');
                        this.css[path] = {
                            count: 0,
                            tag: cssTag
                        };
                    }
                    
                    if(this.css[path].count === 0){
                        $('head').append(this.css[path].tag);
                    }
                    
                    this.css[path].count++;
                };
                
                this.unload = function(path){
                    if(!this.css.hasOwnProperty(path) || this.css[path].count === 0){
                        throw "Warnung: CSS wurde noch nicht hinzugefügt!"
                    }
                    
                    this.css[path].count--;
                    if(this.css[path].count === 0){
                        this.css[path].tag.remove();
                    }
                    
                };
                
            };
            
            return CSSManager;
            
        }
);