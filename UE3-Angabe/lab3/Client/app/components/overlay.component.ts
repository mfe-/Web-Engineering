import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OverviewComponent } from "./overview.component";
import { DeviceService } from "../services/device.service";
import { Device } from "../model/device";
import { ControlUnit } from "../model/controlUnit";
import { ControlType } from "../model/controlType";

@Component({
  moduleId: module.id,
  selector: 'my-overlay',
  templateUrl: '../views/overlay.component.html'
})
export class OverlayComponent implements OnInit {

  @Input()
  overviewComponent: OverviewComponent = null;

  device_types: any;
  controlUnit_types: any;
  selected_type: string = null;
  controlUnitType_selected: string = null;

  addError: boolean = false;
  createError: boolean = false;

  constructor(private deviceService: DeviceService) {
  }


  ngOnInit(): void {
    this.device_types = ["Beleuchtung", "Heizkörperthermostat", "Rollladen", "Überwachungskamera", "Webcam"]
    this.controlUnit_types = ["Ein/Auschalter", "Diskrete Werte", "Kontinuierlicher Wert"];
    this.selected_type = this.device_types[0];
    this.controlUnitType_selected = this.controlUnit_types[0];
  }

  doClose(): void {
    if (this.overviewComponent != null) {
      this.overviewComponent.closeAddDeviceWindow();
    }
  }

  /**
   * Liest die Daten des neuen Gerätes aus der Form aus und leitet diese an die REST-Schnittstelle weiter
   * @param form
   */
  onSubmit(form: NgForm): void {

    var d = new Device();
    //Object {displayname: FormControl, type-input: FormControl, typename: FormControl, elementname: FormControl, elementtype-input: FormControl}
    d.display_name = form.controls["displayname"].value;
    var controlUnit = new ControlUnit();
    //gerätetyp
    var devicetype = form.controls["type-input"].value
    controlUnit.name = "";
    controlUnit.current = 0;
    controlUnit.type = 2;
    controlUnit.primary = false;
    controlUnit.values = [""];
    controlUnit.min = 0;
    controlUnit.max = 0;
    d.id = "-1";
    d.control_units = [controlUnit];
    this.deviceService.createDevice(d);

    form.reset();
    this.overviewComponent.closeAddDeviceWindow();

    //TODO Lesen Sie Daten aus der Form aus und übertragen Sie diese an Ihre REST-Schnittstelle

  }

  isSelected(type: string): boolean {
    return type == this.device_types[0];
  }

  isBooleanSelected(): boolean {
    return this.controlUnitType_selected === this.controlUnit_types[0];
  }

  isEnumSelected(): boolean {
    return this.controlUnitType_selected === this.controlUnit_types[1];
  }

  isContinuousSelected(): boolean {
    return this.controlUnitType_selected === this.controlUnit_types[2];
  }

}
