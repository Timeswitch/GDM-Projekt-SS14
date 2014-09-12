define(
        "inc/SnapLoader",
        ["lib/snap.svg"],
        function() {
            
            Snap.plugin( function( Snap, Element, Paper, global ) {

                function addLoadedFrags( whichSVG, fragList, runWhenFinishedFunc ) { // This is called once all the loaded frags are complete
                  for( var count = 0; count < fragList.length; count++ ) {
                      myEl = whichSVG.append( fragList[ count ] );
                  }
                  runWhenFinishedFunc();
                }

                Paper.prototype.loadFilesDisplayOrdered = function( list, afterAllLoadedFunc, onEachElementLoadFunc ) {
                   var image, fragLoadedCount = 0, listLength = list.length, fragList = new Array(), whichSVG = this;

                    for( var count = 0; count < listLength; count++ ) {
                      (function() {
                        var whichEl = count,
                        fileName = list[ whichEl ],
                        image = Snap.load( fileName, function ( loadedFragment ) { 
                             fragLoadedCount++;
                             onEachElementLoadFunc( loadedFragment, fileName );
                             fragList[ whichEl ] = loadedFragment;
                             if( fragLoadedCount >= listLength ) {
                                addLoadedFrags( whichSVG, fragList, afterAllLoadedFunc );
                             }
                          } );  
                      })();
                   }
                };

              });
            
            return Snap;
        }
);