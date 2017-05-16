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
    if (form.valid) {
      var d = new Device();
      //Object {displayname: FormControl, type-input: FormControl, typename: FormControl, elementname: FormControl, elementtype-input: FormControl}
      //Anzeigename
      d.display_name = form.controls["displayname"].value;
      //Gerätetyp
      d.type = form.controls["type-input"].value;
      //Gerätenamen
      d.type_name = form.controls["typename"].value;
      d.id = "-1";

      if (d.type == "Webcam") {
        d.image = "images/webcam.svg";
        d.image_alt = "Webcam als Indikator für Aktivierung";
      }
      else if (d.type == "Rollladen") {
        d.image = "images/roller_shutter.svg";
        d.image_alt = "Rollladenbild als Indikator für Öffnungszustand";
      }
      else if (d.type == "Beleuchtung") {
        d.image = "images/bulb.svg";
        d.image_alt = "Glühbirne als Indikator für Aktivierung";
      }
      else if (d.type == "Heizkörperthermostat") {
        d.image = "images/thermometer.svg";
        d.image_alt = "Thermometer zur Temperaturanzeige";
      }

      var controlUnit = new ControlUnit();
      //gerätetyp
      controlUnit.name = form.controls["elementname"].value;
      controlUnit.current = 0;
      if (form.controls["elementtype-input"].value == "Diskrete Werte") {
        controlUnit.type = ControlType.enum;
        controlUnit.values = [
          "offen",
          "halb geöffnet",
          "geschlossen"
        ];
        controlUnit.current = 1;
        controlUnit.primary = true;
      }
      else if (form.controls["elementtype-input"].value == "Ein/Auschalter") {
        controlUnit.type = ControlType.boolean;
        controlUnit.primary = true;
        controlUnit.current = 0;
      }
      else if (form.controls["elementtype-input"].value == "Kontinuierlicher Wert") {
        controlUnit.type = ControlType.continuous;
        controlUnit.min = 0;
        controlUnit.max = 0;
        controlUnit.current = 1;
        controlUnit.primary = true;
      }

      d.control_units = [controlUnit];
      this.deviceService.createDevice(d);

      form.reset();
      this.overviewComponent.closeAddDeviceWindow();

      //TODO Lesen Sie Daten aus der Form aus und übertragen Sie diese an Ihre REST-Schnittstelle
    }


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
