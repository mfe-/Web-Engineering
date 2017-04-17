import { Component, Inject } from "@angular/core";
import { DeviceService } from "../services/device.service";
import { Device } from "../model/device";
import { IUserService } from "../contracts/IUserService";

@Component({ moduleId: module.id, selector: 'Overview', templateUrl: 'Overview.html' })
export class Overview {
    protected _DeviceService: DeviceService;
    protected _IUserService: IUserService;
    public constructor(deviceService: DeviceService, @Inject('IUserService') userservice: IUserService) {
        this._IUserService = userservice;
        this._DeviceService = deviceService;
        this.DeviceList = new Array();
        this._DeviceService.getDevices().then(devicelist => this.DeviceList = devicelist);
    }

    public DeviceList: Array<Device>;
    public get UserService(): IUserService {
        return this._IUserService;
    }

    public remove(device: Device): void {
        var index = this.DeviceList.indexOf(device);
        if (index > -1) {
            this.DeviceList.splice(index, 1);
        }
    }
} 