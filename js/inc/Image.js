define(
    "inc/Image",
    ["inc/SnapLoader"],
    function(Snap){
        
        function Image(image){
            this.image = image;
            this.colors = Array();
            this.colorsAssoc = Array();
        }
        
        Image.prototype.add = function addColor(color){
            this.colorsAssoc[color.name] = this.colors[this.colors.push(color)-1];
        };
        
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
        
        
            
        Image.prototype.check = function(){
            var count = this.colors.length;
            var trueCount = 0;
            for(var i=0; i<count; i++){
                var tmp = Snap.color(this.colors[i].current);
                var current = [tmp.r, tmp.g, tmp.b];
                
                tmp = Snap.color(this.colors[i].original);
                var original = [tmp.r, tmp.g, tmp.b];
                
                var q = 0;
                for(var k=0; k<3; k++){
                    q += Math.abs(current[k]-original[k]);
                }
                
                q = ((q/3)/255)*100;
                
                if(q <= 20){
                    trueCount++;
                }
                console.log(q);
            }
            
            return (trueCount == count);
        };
        
        return Image;
    }
);