import { Component, Inject, AfterViewChecked } from "@angular/core";
import { DeviceService } from "../services/device.service";
import { Device } from "../model/device";
import { IUserService } from "../contracts/IUserService";

@Component({ moduleId: module.id, selector: 'Overview', templateUrl: 'Overview.html' })
export class Overview implements AfterViewChecked{
    protected _DeviceService: DeviceService;
    protected _IUserService: IUserService;
    private initImages:boolean=false;

    public constructor(deviceService: DeviceService, @Inject('IUserService') userservice: IUserService) {
        this._IUserService = userservice;
        this._DeviceService = deviceService;
        this.DeviceList = new Array();
        this._DeviceService.getDevices().then(this.SetDeviceList.bind(this));
        
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
    public SetDeviceList(devicelist:Device[]) : void
    {
        this.DeviceList = devicelist;
        console.log("this list");
       
    }

    public ngAfterViewChecked():void
    {
        console.log("Init Overview.ts");
        if(!this.initImages)
        {
            if(this.DeviceList.length>0)
            {
                this.initImages=true;
            }
            this.DeviceList.forEach((device,index)=>{
                
            // (id, src, min, max, current, values)
             device.draw_image(device.id,"../../"+device.image,device.control_units[0].min,device.control_units[0].max,
             device.control_units[0].current,device.control_units[0].values);
        });
        }  
    }
} 