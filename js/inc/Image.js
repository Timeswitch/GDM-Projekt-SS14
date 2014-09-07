define(
    "inc/Image",
    [],
    function(){
        
        function Image(image){
            this.image = image;
            this.colors = Array();
        }
        
        Image.each = function(svg,func){
             var col = null;
                var i = 1;
                do{
                    col = svg.get('col-'+i);
                    if(typeof(col) !== 'undefined'){
                        
                        if(typeof(func) !== 'undefined'){
                            func.call(col,'col-'+i,col);
                        }
                        
                        
                    }else{
                        col = null;
                    }
                }
                while(col !== null);
        };
        
        return Image;
    }
);