define(
        "inc/SyncLock",
        [],
        function(){
            
            //Möglicherweise nutzlos
            function SyncLock(){
    
                this.lockCount = 0;

                this.lock = function(){
                    this.lockCount++;
                }

                this.unlock = function(){
                    if(this.lockCount > 0){
                        this.lockCount--;
                    }else{
                        throw "Warnung: Instabiler Sync!";
                    }
                }

                this.isLocked = function(){
                    return this.lockCount > 0
                }

            }
            
            return SyncLock;
        }

);
