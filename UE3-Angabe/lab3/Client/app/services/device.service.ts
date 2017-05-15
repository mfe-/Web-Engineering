import { Device } from '../model/device';
import { Injectable } from '@angular/core';

import { DEVICES } from '../resources/mock-device';
import { DeviceParserService } from './device-parser.service';

import 'rxjs/add/operator/toPromise';
import { Http } from "@angular/http";


@Injectable()
export class DeviceService {

    private BaseUri = "http://localhost:8081/";

    constructor(private parserService: DeviceParserService, private httpService: Http) {
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
        return this.httpService.post(this.BaseUri + "devices/" + device.id, device).toPromise().then(bla => this.parserService.parseDevice(bla.json() as Device));
    }
    updateDevice(device: Device): Promise<Device> {
        return this.httpService.put(this.BaseUri + "devices/" + device.id, device).toPromise().then(bla => this.parserService.parseDevice(bla.json() as Device));
    }
    deleteDevice(device: Device): void {
        this.httpService.delete(this.BaseUri + "devices/" + device.id, device)
    }


}
