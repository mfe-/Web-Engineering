/*jslint node: true */
/*jslint esversion: 6*/
/*jslint eqeqeq: true */

var express = require('express');
var app = express();
var fs = require("fs");
var expressWs = require('express-ws')(app);
var http = require('http');

var simulation = require('./simulation.js');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var uuid = require('uuid');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//TODO Implementieren Sie hier Ihre REST-Schnittstelle
/* Ermöglichen Sie wie in der Angabe beschrieben folgende Funktionen:
 *  Abrufen aller Geräte als Liste
 *  Hinzufügen eines neuen Gerätes
 *  Löschen eines vorhandenen Gerätes
 *  Bearbeiten eines vorhandenen Gerätes (Verändern des Gerätezustandes und Anpassen des Anzeigenamens)
 *  Log-in und Log-out des Benutzers
 *  Ändern des Passworts
 *  Abrufen des Serverstatus (Startdatum, fehlgeschlagene Log-ins).
 *
 *  BITTE BEACHTEN!
 *      Verwenden Sie dabei passende Bezeichnungen für die einzelnen Funktionen.
 *      Achten Sie bei Ihrer Implementierung auch darauf, dass der Zugriff nur nach einem erfolgreichem Log-In erlaubt sein soll.
 *      Vergessen Sie auch nicht, dass jeder Client mit aktiver Verbindung über alle Aktionen via Websocket zu informieren ist.
 *      Bei der Anlage neuer Geräte wird eine neue ID benötigt. Verwenden Sie dafür eine uuid (https://www.npmjs.com/package/uuid, Bibliothek ist bereits eingebunden).
 */

//TODO: cookies, mehrere user in config möglich->nein nur einer reicht, was ist mit unterem todo gemeint?,
// im client heißt es lesen sie aus SessionStorage aus. da steht gar nichts drin? put methode resultiert in 404

app.post("/updateCurrent", function (req, res) {
    "use strict";
    //TODO Vervollständigen Sie diese Funktion, welche den aktuellen Wert eines Gerätes ändern soll
    /*
     * Damit die Daten korrekt in die Simulation übernommen werden können, verwenden Sie bitte die nachfolgende Funktion.
     *      simulation.updatedDeviceValue(device, control_unit, Number(new_value));
     * Diese Funktion verändert gleichzeitig auch den aktuellen Wert des Gerätes, Sie müssen diese daher nur mit den korrekten Werten aufrufen.
     */
    //device value -> in device details ändern
    console.log("updateCurrent ");

    var data = null;
    try {
        //workaround for 'jsonstring:'''
        for (var name in req.body) {
            data = JSON.parse(name);
        }
    }
    catch (ex) {
        console.log("exception while parsing post data" + ex);
        res.status(500).send();
    }
    //get the device with the overgiven id
    var d = null;
    var i = -1;
    app.devices.forEach(function (element, index) {
        if (element.id == data.id) {
            d = element;
            i = index;
        }
    }, this);
    console.log("updateCurrent for device with id " + d.id);
    if (d == null) {
        res.status.send(404);
    }
    else {
        if (app.devices[i].control_units[0] !== undefined) {
            console.log("updateCurrent set current value");
            //set new value
            app.devices[i].control_units[0].current = data.control_unit.current;

            simulation.updatedDeviceValue(app.devices[i], app.devices[i].control_units[0], Number(data.control_unit.current));
            res.status(200).send();
        }
    }


    res.status(500).send();
});
// Create -> Post
// Read   -> Get
// Update -> Put
// Delete -> Delete

app.post('/login/', function (req, res, next) {
    console.log('login get Parameter:', req.body);
    if (req.body.username !== undefined && req.body.password !== undefined) {
        // console.log(req.body.password); console.log(app.users.password);
        // console.log(app.users.password == app.users.password);
        if (app.users.username == req.body.username && app.users.password == req.body.password) {

            //expires in 1h
            var token = jwt.sign({ data: req.body }, 'secret', { expiresIn: 60 * 60 });
            app.tokens.push(token);
            console.log(token);
            // var decoded = jwt.verify(token, 'secret');
            // console.log(decoded);
            res.cookie('token', token); //bringt bei ajax calls nix
            res.status(200).send(Object.assign(req.body, { token: token }));

        }
    }
    app.failedLogin += 1;
    res.status(401).send();

});
/**
 * Server Status
 */
app.get('/status/', function (req, res, next) {
    console.log(req.headers);
    res.status(200).send({ start: app.start, failedLogins: app.failedLogin });
});
/**
 * Update Password
 */
app.put('/updatePassword/', function (req, res, next) {
    console.log("updatePassword");
    if (checkToken(res, req.headers.token)) {
        if (req.body.oldpassword !== undefined && req.body.newpassword) {
            console.log(req.body);
            if (app.users.password != req.body.oldpassword) {
                res.status(403).send();
            }
            else {
                //write new pw into our config
                fs.writeFile("resources/login.config", "username:admin@mail.com\npassword:" + req.body.newpassword, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    app.users.password = req.body.newpassword;
                    console.log("The file was saved!");
                    res.status(200).send();
                });
            }
        }
    }


});
app.get('/devices/:id*?', function (req, res, next) { //*? - optionaler param

    console.log('get Parameter:', req.params.id);
    if (checkToken(res, req.headers.token)) {
        if (req.params.id) {
            var d = null;
            app.devices.forEach(function (element) {
                if (element.id == req.params.id) {
                    d = element;
                }
            }, this);
            res.status(200).send(d);
        }
        else {
            res.status(200).send(app.devices);
        }
    }


});

app.post('/device/:id*?', function (req, res, next) {

    if (checkToken(res, req.headers.token)) {
        //use xxx-url-encoded in postman
        console.log('post Parameter:', req.body.id);
        if (req.body.id) {
            req.body.id = uuid.v1();
            app.devices.push(req.body);
            res.status(201).send(req.body);
        }
        else {
            // Bad Request
            res.status(400).send();
        }
    }

});
app.delete('/device/:id', function (req, res, next) {
    console.log("app.delete");
    if (checkToken(res, req.headers.token)) {
        if (req.params.id) {
            console.log('delete Parameter:', req.params.id);
            var d = null;
            app.devices.forEach(function (element) {
                if (element.id == req.params.id) {
                    d = element;
                }
            }, this);
            console.log('Found device:', d);
            if (d == null) {
                res.status(400).send();
            }
            else {
                // console.log(app.devices.length);
                var index = app.devices.indexOf(d);
                if (index > -1) {
                    app.devices.splice(index, 1);
                    console.log('removed device:', d);
                    // console.log(app.devices.length);
                    //reset content
                    res.status(205).send();
                }
            }

        }
        else {
            // Bad Request
            res.status(400);
        }
    }

});
app.put('/device/:id*?', function (req, res, next) {
    if (checkToken(res, req.headers.token)) {
        if (req.body.id) {
            console.log('put Parameter:', req.params.id);
            var d = null;
            app.devices.forEach(function (element) {
                if (element.id == req.params.id) {
                    d = element;
                }
            }, this);
            console.log(d);
            if (d != null) {
                var index = app.devices.indexOf(d);
                if (index !== -1) {
                    app.devices[index] = req.body;
                    res.status(200).send(d);
                }
            }
            else {
                console.log("put: device with id " + req.params.id + " not found");
                res.status(500).send();
            }

        }
        else {
            res.status(400).send();
        }
    }

});


function readUser() {
    "use strict";
    //TODO Lesen Sie die Benutzerdaten aus dem login.config File ein.
    fs.readFile('resources/login.config', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        //contributes to http://stackoverflow.com/questions/23558907/convert-text-file-into-clean-json-format
        var file = data.split(/\r?\n/).reduce(function (m, i) {
            var s = i.split(':');
            m[s.shift()] = s.join(':');
            return m;
        }, {});
        app.users = file;
        console.log("users", app.users);
    });

}

function readDevices() {
    "use strict";
    //TODO Lesen Sie die Gerätedaten aus der devices.json Datei ein.
    /*
     * Damit die Simulation korrekt funktioniert, müssen Sie diese mit nachfolgender Funktion starten
     *      simulation.simulateSmartHome(devices.devices, refreshConnected);
     * Der zweite Parameter ist dabei eine callback-Funktion, welche zum Updaten aller verbundenen Clients dienen soll.
     */

    fs.readFile('resources/devices.json', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = JSON.parse(data);
        app.devices = data.devices;
        // console.log("devices", app.devices);
    });
}




function refreshConnected() {
    "use strict";
    //TODO Übermitteln Sie jedem verbundenen Client die aktuellen Gerätedaten über das Websocket
    /*
     * Jedem Client mit aktiver Verbindung zum Websocket sollen die aktuellen Daten der Geräte übermittelt werden.
     * Dabei soll jeder Client die aktuellen Werte aller Steuerungselemente von allen Geräte erhalten.
     * Stellen Sie jedoch auch sicher, dass nur Clients die eingeloggt sind entsprechende Daten erhalten.
     *
     * Bitte beachten Sie, dass diese Funktion von der Simulation genutzt wird um periodisch die simulierten Daten an alle Clients zu übertragen.
     */


}
app.get('/logout/:token*', function (req, res, next) { //*? - optionaler param

    console.log('get logout:', req.params.token);
    if (checkToken(res, req.headers.token)) {
        if (req.params.token) {
           index = app.tokens.indexOf(req.params.token);
           if (index > -1) {
                    app.tokens.splice(index, 1);
                    console.log('removed token:', req.params.token);
                    res.status(205).send();
                }
        }
        else {
            res.status(500).send();
        }
    }


});

function checkToken(res, token) {

    if (token != null && token != undefined) {
        var d = null;
        app.tokens.forEach(function (element) {
            if (element == token) {
                d = true;
            }
        }, this);
        if (d != null) {
            var decoded = jwt.verify(token, 'secret');
            //normaly we would also check the payload....
            console.log("checkToken" + decoded);
            return true;
        }
    }

    res.status(401).send();

}

var server = app.listen(8081, function () {
    "use strict";
    readUser();
    readDevices();

    var host = server.address().address;
    var port = server.address().port;
    app.start = new Date();
    app.failedLogin = 0;
    app.tokens = new Array();
    console.log("Big Smart Home Server listening at http://%s:%s", host, port);
});

