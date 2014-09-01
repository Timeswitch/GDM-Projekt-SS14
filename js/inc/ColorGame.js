define(
        "inc/ColorGame",
        ["lib/svg"],
        function(SVG){
            
            function ColorGame($canvas, $toolbar){
                this.$canvas = $canvas;
                this.$toolbar = $toolbar;
            }
            
            return ColorGame;
        });