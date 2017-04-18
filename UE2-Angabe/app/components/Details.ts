import { Component, Inject } from "@angular/core";
import { DeviceService } from "../services/device.service";
import { IUserService } from "../contracts/IUserService";
import { Device } from "../model/device";
import { ActivatedRoute, Router } from "@angular/router";
import { ControlUnit } from "../model/controlUnit";
import { ControlType } from "../model/controlType";

@Component({ moduleId: module.id, selector: 'Details', templateUrl: 'Details.html' })
export class Details {
    protected _DeviceService: DeviceService;
    protected _IUserService: IUserService;
    protected _Router: ActivatedRoute;
    public constructor(private route: ActivatedRoute, deviceService: DeviceService, @Inject('IUserService') userservice: IUserService) {
        //set an empty device so the binding won't complains when we got no device data
        this.Device = new Device();
        this.Device.id = "";
        this.Device.description = "";
        var controlUnit = new ControlUnit();
        controlUnit.name = "";
        controlUnit.current = 0;
        controlUnit.type = 2;
        controlUnit.primary = false;
        controlUnit.values = [""];
        controlUnit.min = 0;
        controlUnit.max = 0;
        this.Device.control_units = [controlUnit];
        //end of workaround
        this._IUserService = userservice;
        this._DeviceService = deviceService;
        this._Router = route;
        this._Router.params.subscribe(this.GetDevice.bind(this));
    }
    public GetDevice(params: any): void {
        var id: string = <string>params['id'];
        console.log(id);
        this._DeviceService.getDevice(id).then(d => this.Device = d);
    }
    public SetContinuous(controlUnit: ControlUnit, value: number): void {
        controlUnit.current = value;
    }
    public SetEnum(controlUnit: ControlUnit, value: number): void {
        //controlUnit.current = <number>(<any>value);
        controlUnit.current = value;
    }
    public Setboolean(controlUnit: ControlUnit, value: boolean): void {
        controlUnit.current = value == true ? 1 : 0;
    }
    public GenerateLog(log: string, controlUnit: ControlUnit, value: number): string {
        if (log == undefined) {
            log = "";
        }
        //6.3.2017 10:01:30: 20 -> 25
        var date = new Date();
        log = log + "\n" + date.getDay() + "." + date.getMonth() + "." + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getMilliseconds() + " " + controlUnit.current + " -> " + value;
        return log;
    }

    public Device: Device = new Device();
}