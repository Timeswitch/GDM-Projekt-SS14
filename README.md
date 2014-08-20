GDM-Projekt-SS14
================

##Verwendung

Beim Aufruf durch den Browser wird durch Require.js das Init-Script geladen und ausgeführt.
Dieses Skript wiederum initialisiert die Engine und lädt anschließend den Start-Screen und `/html/screens/start.htm`

In dieser Datei kann die eigentliche Anwendung frei implementiert werden.
Hierfür stehen einige Hilfs-Klassen wie z.B. `inc/Controller` zur verfügung.

Es sollte beachtet werden, dass lediglich der Inhalt des `<body>` Tags der `.htm` Datei geladen werden.

Um eigene CSS bzw. JavaScript Inhalte einzubetten sollten ein spezieller `<input>` Tag eingefügt werden.

```html

<input type="hidden" content="text/javascript" value="test" />

```

Die Pfadangabe ist hierbei relativ zu `/js` bzw. `/css`.

Die angeforderten JavaScript Dateien werden mit Require.js geladen.
Sollten Module definiert sein, werden diese dem Callback als Parameter übergeben.

###Beispiel
`/html/test.htm`
```html
<!doctype html>
<html>
    <body>
        <input type="hidden" content="text/javascript" value="js/inc/Beispiel.js" />
    </body>
</html>
```

`/js/inc/Beispiel.js`
```javascript
define(
        function(require){
            function Beispiel(test){
                this.test = test;
                this.test2 = function(){
                    console..log(this.test);
                };
            }
            
            return Beispiel;
        }

);
```

`Aufruf`
```javascript
funtion callback(Beispiel){
    var beispiel = new Beispiel("hallo");
    beispiel.test2(); //Gibt "hallo" auf der Konsole aus.
}

engine.loadHTML('/html/test.htm','body',callback);
```

Wenn ein angefordertes Objekt beim Aufruf von `Objekt.isController()` `true` zurück
gibt (z.B. wenn es von `inc/Controller` erbt), wird eine Instanz des Objektes
mit einer Referenz auf die aktuelle Engine Instanz und dem Ziel-Container als Paramter erstellt, 
anschließend wird `Objekt.init()` aufgerufen.


##Inhalte manuell laden

Mit `Engine.loadScene()` bzw. mit `Engine.loadHTML()` können HTML Inhalte, sowie JavaScript und CSS Dateien nachgeladen werden.

`Engine.loadScene()` ersätzt den inhalt von `<body>`, während mit `Engine.loadHTML()` ein Tag als Ziel ausgewählt werden kann.
Beiden Methoden kann ein Callback übergeben werden.

