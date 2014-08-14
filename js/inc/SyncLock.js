define(
        "inc/SyncLock",
        [],
        function(){
            
            //Möglicherweise nutzlos
            function SyncLock(){
    
                this.lockCount = 0;

                this.lock = function(){
                    if(debug){
                        console.log("lock");
                    }
                    this.lockCount++;
                }

                this.unlock = function(){
                    if(this.lockCount > 0){
                        if(debug){
                            console.log("unlock");
                        }
                        this.lockCount--;
                    }else{
                        throw "Warnung: Instabiler Sync!";
                    }
                }

                this.isLocked = function(){
                    return this.lockCount > 0;
                }

            }
            
            return SyncLock;
        }

);
