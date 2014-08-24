require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-2.1.1.min'
    }
});

require([
            "inc/Engine"
        ],
	function(Engine){ 
            
            var application = new Engine();
            application.init();
    
});