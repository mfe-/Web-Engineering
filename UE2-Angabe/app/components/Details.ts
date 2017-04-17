import { Component, Inject } from "@angular/core";
import { DeviceService } from "../services/device.service";
import { IUserService } from "../contracts/IUserService";
import { Device } from "../model/device";
import { ActivatedRoute, Router } from "@angular/router";

@Component({ moduleId: module.id, selector: 'Details', templateUrl: 'Details.html' })
export class Details {
    protected _DeviceService: DeviceService;
    protected _IUserService: IUserService;
    protected _Router: ActivatedRoute;
    public constructor(private route: ActivatedRoute, deviceService: DeviceService, @Inject('IUserService') userservice: IUserService) {
        this.Device = null;
        this._IUserService = userservice;
        this._DeviceService = deviceService;
        this._Router = route;
        this._Router.params.subscribe(this.GetDevice.bind(this));
    }
    public GetDevice(params: any): void {
        var id: string = <string>params['id'];
        console.log(id);
        this._DeviceService.getDevice(id).then(this.SetDevice.bind(this));
    }
    private SetDevice(d: Device): void {
        this.Device = d;
        console.log(d);
    }
    public Device: Device = new Device();
}