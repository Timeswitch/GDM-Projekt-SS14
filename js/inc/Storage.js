define(
        "inc/Storage",
        [],
        function() {

            function Storage() {

            }

            Storage.prototype.loadObject = function(key){
                var json = localStorage.getItem(key);
                var object = null;
                
                if(typeof(json) !== 'undefined' && json !== null){
                    try{
                        object = JSON.parse(json);
                    }catch(ex){
                        console.log("Objekt konnte nicht geladen werden.")
                        location.reload();
                    }
                    
                } 
                
                return object;
            };
            
            Storage.prototype.saveObject = function(key,value){
                var json = JSON.stringify(value);
                localStorage.setItem(key,json);
            };

            return Storage;
        }
);
