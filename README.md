GDM-Projekt-SS14
================

##Anwendung

Im Require.js Callback von main.js

```Javascript

var game = new Engine();
            
game.init(function(){
    alert("success!");
});

```

`Engine.init()` wird hier ein Callback übergeben um einen Alert auszugeben, wenn alle grundlegenden Daten geladen wurden.
Standardmäßig wird von von `Engine.init()` `/html/screens/start.htm` geladen.

##Screens und weitere HTML Dateien

Mit `Engine.loadScene()` bzw. mit `Engine.loadHTML()` können HTML Inhalte, sowie JavaScript und CSS Dateien nachgeladen werden.

`Engine.loadScene()` ersätzt den inhalt von `<body>`, während mit `Engine.loadHTML()` ein Tag ausgewählt werden kann.
Beiden Methoden kann ein Callback übergeben werden.

JavaScript und CSS Dateien zum nachladen können in den .htm Dateien unter /html mithilfe eines speziellen Tags eingetragen werden:

```html

<input type="hidden" content="text/javascript" value="test" />

```

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
        ["require"],
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

`/js/main.js`
```javascript
game.init(function(){
    funtion callback(Beispiel){
        var beispiel = new Beispiel("hallo");
        beispiel.test2(); //Gibt "hallo" auf der Konsole aus.
    }

    game.loadHTML('/html/test.htm','body',callback);
});
```
