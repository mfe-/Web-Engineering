import { Device } from '../model/device';
import { Injectable } from '@angular/core';

import { DEVICES } from '../resources/mock-device';
import { DeviceParserService } from './device-parser.service';

import 'rxjs/add/operator/toPromise';
import { Http } from "@angular/http";
import { ControlUnit } from "../model/controlUnit";
import { Broadcaster } from "../model/broadcaster";


@Injectable()
export class DeviceService {

    private BaseUri = "http://localhost:8081/";
    public DeviceList = new Array();

    constructor(private parserService: DeviceParserService, private httpService: Http,private broadcaster: Broadcaster) {
    }

    //TODO Sie können dieses Service benutzen, um alle REST-Funktionen für die Smart-Devices zu implementieren

    getDevices(): Promise<Device[]> {
        //TODO Lesen Sie die Geräte über die REST-Schnittstelle aus
        /*
         * Verwenden Sie das DeviceParserService um die via REST ausgelesenen Geräte umzuwandeln.
         * Das Service ist dabei bereits vollständig implementiert und kann wie unten demonstriert eingesetzt werden.
         */
        return this.httpService.get(this.BaseUri + "devices/").toPromise().then(
            (response) => {
                var devices = response.json() as Device[];
                for (let i = 0; i < devices.length; i++) {
                    devices[i] = this.parserService.parseDevice(devices[i]);
                }
                this.DeviceList = devices;
                return devices;
            });
        // Promise.resolve(DEVICES).then(devices => {
        //     for (let i = 0; i < devices.length; i++) {
        //         devices[i] = this.parserService.parseDevice(devices[i]);
        //     }
        //     return devices;
        // });
    }

    getDevice(id: string): Promise<Device> {
        return this.getDevices()
            .then(devices => devices.find(device => device.id === id));
    }
    createDevice(device: Device): Promise<Device> {
        device.id = "-1";
        device = this.parserService.parseDevice(device);
        return this.httpService.post(this.BaseUri + "device/" + device.id, device).toPromise().then(
            (bla) => {
                var d = this.parserService.parseDevice(bla.json() as Device);
                device.id = d.id;
                this.broadcaster.broadcast('MyEvent', device);
                return d;
            }
        );
    }
    updateDevice(device: Device): Promise<Device> {
        return this.httpService.put(this.BaseUri + "device/" + device.id, device).toPromise().then(
            bla => this.parserService.parseDevice(bla.json() as Device)
        );
    }
    deleteDevice(device: Device): void {
        this.httpService.delete(this.BaseUri + "device/" + device.id, device).toPromise();
        var index = this.DeviceList.indexOf(device);
        if (index > -1) {
            this.DeviceList.splice(index, 1);
        }

    }
    updateCurrent(device: Device, controlUnit: ControlUnit) {
        var http = new XMLHttpRequest();
        var url = this.BaseUri + "updateCurrent";
        var control = new ControlUnit();
        //clone object
        control.current = controlUnit.current;
        control.log = controlUnit.log;
        control.max = controlUnit.max;
        control.min = controlUnit.min;
        control.name = controlUnit.name;
        control.primary = controlUnit.primary;
        control.type = controlUnit.type;
        //because "values" causes an json parser error lets remove this shit
        control.values = null;
        var postdata = { id: device.id, control_unit: control };

        var params = encodeURIComponent(JSON.stringify(postdata));
        http.open("POST", url, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        http.onreadystatechange = () => {//Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                //alert(http.responseText);
            }
        }
        http.send(params);
    }


}
