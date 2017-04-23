/*
  TODO
 Implementieren Sie die folgenden Funktionen um die SVG-Grafiken der Geräte anzuzeigen und verändern.

 Hinweise zur Implementierung:
 - Verwenden Sie das SVG-Plugin für jQuery, welches bereits für Sie eingebunden ist (Referenz: http://keith-wood.name/svg.html)
 - Sie dürfen das Bild bei jedem Funktionenaufruf neu laden und Ihre Veränderungen vornehmen;
 Tipp: Durch Überschreiben der OnLoad Funktion von svg.load() können Sie die Grafik noch bevor diese zum ersten Mal angezeigt wird verändern
 - In allen bereit gestellten SVG-Grafiken sind alle für Sie relevanten Stellen mit Labels markiert.
 - Da Ihre Grafiken nur beim Laden der Übersichtsseite neu gezeichnet werden müssen, bietet es ich an die draw_image Funktionen nach dem vollständigen Laden dieser Seite auszuführen.
 Rufen Sie dazu mit draw_image(id, src, min, max, current, values) die zugrunde liegende und hier definierte Funktione auf.
 */

function drawThermometer(id, src, min, max, current, values) {
    console.log("Thermometer");
    $("div[data-device-id="+id+"] div.device-image-container div.device-image").svg(); 
    var svg = $("div[data-device-id="+id+"] div.device-image-container div.device-image").svg('get');

    svg.load(src,{onLoad: function(svgi){
      $('#text3819 tspan',svgi.root()).text(min);
      $('#text3819-3 tspan',svgi.root()).text(max);
      
    //  svgi.text(svgi.getElementById('text3819'),min);
     // svgi.text(svgi.getElementById('text3819-3'),max);
    }});
    svg.title(current+"°");
    

  /* TODO
   Passen Sie die Höhe des Temperaturstandes entsprechend dem aktuellen Wert an.
   Beachten Sie weiters, dass auch die Beschriftung des Thermometers (max, min Temperatur) angepasst werden soll.
   */
}


function drawBulb(id, src, min, max, current, values) 
{
  console.log("BULB");
  $("div[data-device-id="+id+"] div.device-image-container div.device-image").svg();
  var svg = $("div[data-device-id="+id+"] div.device-image-container div.device-image").svg('get');
  if(current==1) //true
  {
    console.log("bulb is on");
     svg.load(src,{onLoad: function(svgi){
       svgi.configure(svgi.getElementById('bulbpath'),{fill:'orange'},false)
    }});
  }
  else
  {
    console.log("bulb is off");
    svg.load(src);
  }
}

function drawCam(id, src, min, max, current, values) {
     console.log("Cam");
     $("div[data-device-id="+id+"] div.device-image-container div.device-image").svg();
     var svg = $("div[data-device-id="+id+"] div.device-image-container div.device-image").svg('get');
     svg.load(src);
  /* TODO
    Verändern Sie die Darstellung der Webcam entsprechend den Vorgaben aus der Angabe.
    Dabei soll jedoch nicht nur einfach die Farbe der Elemente verändert werden, sondern es soll eine Kopie der zu verändernden Elemente erstellt
     und anschließend die aktuellen durch die angepassten Kopien ersetzt werden.
   */
}

function drawShutter(id, src, min, max, current, values) 
{
    console.log("Shutter");
    $("div[data-device-id="+id+"] div.device-image-container div.device-image").svg();
    var svg = $("div[data-device-id="+id+"] div.device-image-container div.device-image").svg('get');
    if(current==0) //open
    {

      console.log("open");
     svg.load(src,{onLoad: function(svgi){
        svgi.configure(svgi.getElementById('path4559-2-5'),{fill:'none'},true);
        svgi.configure(svgi.getElementById('path4559-2-6'),{fill:'none'},true);
        svgi.configure(svgi.getElementById('path4559-2'),{fill:'none'},true);
        
    }});
    }
    else if(current==1) //half
    {
      console.log("half");
      svg.load(src,{onLoad: function(svgi){
         svgi.configure(svgi.getElementById('path4559-2-5'),{fill:'none'},true);
         svgi.configure(svgi.getElementById('path4559-2-6'),{fill:'none'},true);
      }});
    }
    else
        svg.load(src);
}
