define(
        "inc/SyncLock",
        [],
        function(){
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
