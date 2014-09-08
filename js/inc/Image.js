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
                    col = svg.select('#col-'+i);
                    if(typeof(col) !== 'undefined' && col !== null){
                        
                        if(typeof(func) !== 'undefined'){
                            func.call(col,'col-'+i,col);
                        }
                        
                        i++;
                    }else{
                        col = null;
                    }
                }
                while(col !== null);
        };
        
        return Image;
    }
);