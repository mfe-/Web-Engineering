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
  /* TODO
   Passen Sie die Höhe des Temperaturstandes entsprechend dem aktuellen Wert an.
   Beachten Sie weiters, dass auch die Beschriftung des Thermometers (max, min Temperatur) angepasst werden soll.
   */
   var svg = $(id).svg({loadURL:src});
   var labelmin = svg.getElementById('tspan3817');
   var labelmax = svg.getElementById('tspan3817-6');
   laelmin.text(min);
   labelmax.text(max);
   svg.title(values+'°');

   var x1 = svg.getElementById('rect69').attr('x');
   var y1 = svg.getElementById('rect69').attr('y');

   var x2 = svg.getElementById('rect59').attr('x');
   var y2 = svg.getElementById('rect59').attr('y');

   //todo animation svgY height   
}


function drawBulb(id, src, min, max, current, values) 
{
  if(values==true)
  {
     var svg = $(id).svg({loadURL:src});
     $(svg).animate({'svgFill':'yellow'},1000); //maybe not correct path element will be needet
  }
}

function drawCam(id, src, min, max, current, values) {
  /* TODO
    Verändern Sie die Darstellung der Webcam entsprechend den Vorgaben aus der Angabe.
    Dabei soll jedoch nicht nur einfach die Farbe der Elemente verändert werden, sondern es soll eine Kopie der zu verändernden Elemente erstellt
     und anschließend die aktuellen durch die angepassten Kopien ersetzt werden.
   */
}

function drawShutter(id, src, min, max, current, values) 
{

  var svg = $(id).svg({loadURL:src});
  var tile4 = svg.getElementById('path4559-2-5');
  var tile3 = svg.getElementById('path4559-2-6');
  var tile2 = svg.getElementById('path4559-2');
  if(value==0) //open
  {
    $(tile4).animate({'svgFill':'none'},1000);
    $(tile3).animate({'svgFill':'none'},1000);
    $(tile2).animate({'svgFill':'none'},1000);
  }
  else if(value==1) //half
  {
    $(tile4).animate({'svgFill':'none'},1000);
    $(tile3).animate({'svgFill':'none'},1000);
  }
}
