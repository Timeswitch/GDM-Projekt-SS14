define(
        "inc/CSSManager",
        [
            "jquery"
        ],
        function($) {
            
            function CSSManager(vpu_buggyfill){
                this.vpu_buggyfill = vpu_buggyfill;
                this.css = {};
                
                this.load = function(path){
                    if(!this.css.hasOwnProperty(path)){
                        var cssTag = $('<style /></style>');
                        this.css[path] = {
                            count: 0,
                            tag: cssTag
                        };
                        $.get(path,function(response){
                            this.css[path].tag.text(response);
                        }.bind(this));
                    }
                    
                    if(this.css[path].count === 0){
                        $('head').append(this.css[path].tag);
                        this.vpu_buggyfill.refresh();
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
                        this.vpu_buggyfill.refresh();
                    }
                    
                };
                
            };
            
            return CSSManager;
            
        }
);