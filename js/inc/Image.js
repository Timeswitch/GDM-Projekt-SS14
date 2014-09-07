define(
    "inc/Image",
    [],
    function(){
        
        function Image(image){
            this.image = image;
            this.colors = Array();
        }
        
        return Image;
    }
);