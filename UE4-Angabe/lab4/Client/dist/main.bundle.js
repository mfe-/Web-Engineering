webpackJsonp([0,2],{

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Definition für die Steuerungselemente eines Gerätes
 */
var ControlUnit = (function () {
    function ControlUnit() {
        /**
         * Aktueller Wert dieses ControlUnit
         * @type {number}
         */
        this.current = -1;
        /**
         * Minimaler Wert für dieses Steuerungslement (wir nur bei Kontinuierlichem Typ benötigt)
         * Legen Sie mit diesem Wert den minimalen Wert für eine Eingabe fest, um eine Falscheingabe zu verhindern
         *
         * @type {number}
         */
        this.min = -1;
        /**
         * Maximaler Wert für dieses Steuerungslement (wir nur bei Kontinuierlichem Typ benötigt)
         * Legen Sie mit diesem Wert den maximalen Wert für eine Eingabe fest, um eine Falscheingabe zu verhindern
         *
         * @type {number}
         */
        this.max = -1;
    }
    return ControlUnit;
}());
exports.ControlUnit = ControlUnit;
//# sourceMappingURL=controlUnit.js.map

/***/ }),

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Definition eines Gerätes zur Repräsentation eines existierenden Smart Devices
 */
var Device = (function () {
    function Device() {
    }
    return Device;
}());
exports.Device = Device;
//# sourceMappingURL=device.js.map

/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(53);
var access_service_1 = __webpack_require__(41);
var LoginComponent = (function () {
    function LoginComponent(router, accessService) {
        this.router = router;
        this.accessService = accessService;
        this.loginError = false;
    }
    LoginComponent.prototype.onSubmit = function (form) {
        var _this = this;
        if (!form || !form.value || !form.value["username"] || !form.value["password"]) {
            this.loginError = true;
        }
        this.accessService.doLogin(form.value["username"], form.value["password"]).then(function (successfully) {
            _this.loginError = !successfully;
            if (successfully) {
                _this.router.navigate(['overview']);
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'my-login',
            template: __webpack_require__(426)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof access_service_1.AccessService !== 'undefined' && access_service_1.AccessService) === 'function' && _b) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var access_service_1 = __webpack_require__(41);
var http_1 = __webpack_require__(110);
__webpack_require__(278);
var OptionsComponent = (function () {
    function OptionsComponent(accessService, http) {
        this.accessService = accessService;
        this.http = http;
        this.updatePasswordURL = "http://localhost:8081/updatePW";
    }
    ;
    OptionsComponent.prototype.ngOnInit = function () {
        this.updateError = false;
    };
    OptionsComponent.prototype.equalsPW = function (form) {
        if (!form || !form.value || !form.value["repeat-password"] || !form.value["new-password"]) {
            return false;
        }
        return form.value["repeat-password"] === form.value["new-password"];
    };
    OptionsComponent.prototype.onSubmit = function (form) {
        var _this = this;
        this.updateError = false;
        if (!form || !form.value || !form.value["new-password"] || !form.value["repeat-password"] || !form.value["old-password"]) {
            this.error_message = "Es wurden nicht alle benötigten Eingaben getätigt!";
            this.updateError = true;
            return;
        }
        var data = {
            old_password: form.value["old-password"],
            new_password: form.value["new-password"],
            repeat_password: form.value["repeat-password"]
        };
        this.http.post(this.updatePasswordURL, {
            old_password: form.value["old-password"],
            new_password: form.value["new-password"],
            repeat_password: form.value["repeat-password"]
        }, { headers: this.accessService.getTokenHeader() })
            .toPromise()
            .then(function (response) {
            response = response.json();
            console.log(response);
            if (response.status == 200) {
                form.reset();
                return;
            }
            switch (response["errorNum"]) {
                case 0:
                    _this.error_message = "Das alte Passwort ist nicht korrekt!";
                    _this.updateError = true;
                    break;
                case 1:
                    _this.error_message = "Passwörter stimmen nicht überein!";
                    _this.updateError = true;
                    break;
                case 2:
                    _this.error_message = "Das Passwort konnte nicht gespeichert werden!";
                    _this.updateError = true;
                    break;
            }
            return;
        });
    };
    OptionsComponent = __decorate([
        core_1.Component({
            selector: 'my-options',
            template: __webpack_require__(428)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof access_service_1.AccessService !== 'undefined' && access_service_1.AccessService) === 'function' && _a) || Object, (typeof (_b = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _b) || Object])
    ], OptionsComponent);
    return OptionsComponent;
    var _a, _b;
}());
exports.OptionsComponent = OptionsComponent;
//# sourceMappingURL=options.component.js.map

/***/ }),

/***/ 177:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var OverviewComponent = (function () {
    function OverviewComponent() {
        this.isAddDevice = false;
    }
    OverviewComponent.prototype.addDevice = function () {
        this.isAddDevice = true;
    };
    OverviewComponent.prototype.closeAddDeviceWindow = function () {
        this.isAddDevice = false;
    };
    OverviewComponent = __decorate([
        core_1.Component({
            selector: 'my-overview',
            template: __webpack_require__(430)
        }), 
        __metadata('design:paramtypes', [])
    ], OverviewComponent);
    return OverviewComponent;
}());
exports.OverviewComponent = OverviewComponent;
//# sourceMappingURL=overview.component.js.map

/***/ }),

/***/ 178:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Typen der Steuerungselemente
 */
(function (ControlType) {
    ControlType[ControlType["boolean"] = 0] = "boolean";
    ControlType[ControlType["enum"] = 1] = "enum";
    ControlType[ControlType["continuous"] = 2] = "continuous";
})(exports.ControlType || (exports.ControlType = {}));
var ControlType = exports.ControlType;
//# sourceMappingURL=controlType.js.map

/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
__webpack_require__(437);
var core_1 = __webpack_require__(0);
var device_service_1 = __webpack_require__(42);
var router_1 = __webpack_require__(53);
var controlType_1 = __webpack_require__(178);
var DeviceDetailsComponent = (function () {
    function DeviceDetailsComponent(deviceService, route) {
        this.deviceService = deviceService;
        this.route = route;
    }
    DeviceDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.deviceService.getDevice(params['id']); })
            .subscribe(function (device) { return _this.device = device; });
    };
    DeviceDetailsComponent.prototype.isEnum = function (controlUnit) {
        return controlUnit.type === controlType_1.ControlType.enum;
    };
    DeviceDetailsComponent.prototype.isContinuous = function (controlUnit) {
        return controlUnit.type === controlType_1.ControlType.continuous;
    };
    DeviceDetailsComponent.prototype.isBoolean = function (controlUnit) {
        return controlUnit.type === controlType_1.ControlType.boolean;
    };
    DeviceDetailsComponent = __decorate([
        core_1.Component({
            selector: 'my-device-detail',
            template: __webpack_require__(423)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof device_service_1.DeviceService !== 'undefined' && device_service_1.DeviceService) === 'function' && _a) || Object, (typeof (_b = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _b) || Object])
    ], DeviceDetailsComponent);
    return DeviceDetailsComponent;
    var _a, _b;
}());
exports.DeviceDetailsComponent = DeviceDetailsComponent;
//# sourceMappingURL=device-details.component.js.map

/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var controlType_1 = __webpack_require__(178);
var DeviceParserService = (function () {
    function DeviceParserService() {
        this.function_map = [{ id: "Heizkörperthermostat", value: drawThermometer }, {
                id: "Beleuchtung",
                value: drawBulb
            }, { id: "Webcam", value: drawCam }, { id: "Überwachungskamera", value: drawCam }, { id: "Rollladen", value: drawShutter }];
        this.update_map = [{ id: "Heizkörperthermostat", value: updateThermometer }, {
                id: "Beleuchtung",
                value: updateBulb
            }, { id: "Webcam", value: updateCam }, { id: "Überwachungskamera", value: updateCam }, {
                id: "Rollladen",
                value: updateShutter
            }];
    }
    DeviceParserService.prototype.parseDevice = function (dev) {
        var draw = this.function_map.filter(function (x) { return x.id === dev.type; })[0];
        var update = this.update_map.filter(function (x) { return x.id === dev.type; })[0];
        if (draw != null) {
            dev.draw_image = draw.value;
        }
        else if (dev.image != null) {
            dev.draw_image = addImage;
        }
        if (update != null) {
            dev.update_image = update.value;
        }
        for (var _i = 0, _a = dev.control_units; _i < _a.length; _i++) {
            var controlUnit = _a[_i];
            switch (controlUnit.type.toString()) {
                case "continuous":
                    controlUnit.type = controlType_1.ControlType.continuous;
                    break;
                case "enum":
                    controlUnit.type = controlType_1.ControlType.enum;
                    break;
                case "boolean":
                    controlUnit.type = controlType_1.ControlType.boolean;
                    break;
            }
        }
        return dev;
    };
    DeviceParserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DeviceParserService);
    return DeviceParserService;
}());
exports.DeviceParserService = DeviceParserService;
//# sourceMappingURL=device-parser.service.js.map

/***/ }),

/***/ 293:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 293;


/***/ }),

/***/ 294:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var platform_browser_dynamic_1 = __webpack_require__(379);
var app_module_1 = __webpack_require__(409);
var environment_1 = __webpack_require__(418);
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 408:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(53);
var overview_component_1 = __webpack_require__(177);
var login_component_1 = __webpack_require__(175);
var options_component_1 = __webpack_require__(176);
var device_details_component_1 = __webpack_require__(275);
var access_service_1 = __webpack_require__(41);
var routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'overview', component: overview_component_1.OverviewComponent, canActivate: [access_service_1.AccessService] },
    { path: 'options', component: options_component_1.OptionsComponent, canActivate: [access_service_1.AccessService] },
    { path: 'details/:id', component: device_details_component_1.DeviceDetailsComponent, canActivate: [access_service_1.AccessService] },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ 409:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var platform_browser_1 = __webpack_require__(114);
var forms_1 = __webpack_require__(370);
var http_1 = __webpack_require__(110);
var app_routing_module_1 = __webpack_require__(408);
var ng2_charts_1 = __webpack_require__(420);
var common_1 = __webpack_require__(45);
var app_component_1 = __webpack_require__(410);
var login_component_1 = __webpack_require__(175);
var sidebar_component_1 = __webpack_require__(417);
var devices_component_1 = __webpack_require__(413);
var navigation_component_1 = __webpack_require__(415);
var overview_component_1 = __webpack_require__(177);
var options_component_1 = __webpack_require__(176);
var device_service_1 = __webpack_require__(42);
var device_parser_service_1 = __webpack_require__(276);
var access_service_1 = __webpack_require__(41);
var device_details_component_1 = __webpack_require__(275);
var continuous_device_details_component_1 = __webpack_require__(412);
var enum_device_details_component_1 = __webpack_require__(414);
var boolean_device_details_component_1 = __webpack_require__(411);
var overlay_component_1 = __webpack_require__(416);
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_module_1.AppRoutingModule,
                ng2_charts_1.ChartsModule,
            ],
            declarations: [
                app_component_1.AppComponent,
                sidebar_component_1.SidebarComponent,
                boolean_device_details_component_1.BooleanDeviceDetailsComponent,
                continuous_device_details_component_1.ContinuousDeviceDetailsComponent,
                enum_device_details_component_1.EnumDeviceDetailsComponent,
                devices_component_1.DevicesComponent,
                device_details_component_1.DeviceDetailsComponent,
                navigation_component_1.NavigationComponent,
                overview_component_1.OverviewComponent,
                options_component_1.OptionsComponent,
                login_component_1.LoginComponent,
                overlay_component_1.OverlayComponent,
            ],
            providers: [
                { provide: core_1.LOCALE_ID, useValue: "de-at" },
                access_service_1.AccessService,
                common_1.DatePipe,
                device_service_1.DeviceService,
                device_parser_service_1.DeviceParserService,
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var http_1 = __webpack_require__(110);
var router_1 = __webpack_require__(53);
__webpack_require__(436);
__webpack_require__(435);
var AccessService = (function () {
    function AccessService(http, router) {
        this.http = http;
        this.router = router;
        this.token_name = "access-token";
        //TODO Passen Sie die URLs zu Ihrer REST-Schnittstelle, entsprechend der von Ihnen vorgenommenen Änderungen am Server, an
        this.loginURL = "http://localhost:8081/login";
        this.logoutURL = "http://localhost:8081/logout";
        this.statusURl = "http://localhost:8081/getStatus";
        this.token = null;
        this.server_start = new Date;
        this.failed_logins = 0;
    }
    ;
    /**
     * Aktivierungsfunktion für Guards
     * @returns {boolean}
     */
    AccessService.prototype.canActivate = function () {
        this.readToken();
        if (this.token != null) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    };
    /**
     * Liest Token vom LocalStorage und speichert diesen in this.token
     */
    AccessService.prototype.readToken = function () {
        var token = localStorage.getItem(this.token_name);
        if (token) {
            this.token = token;
        }
    };
    /**
     * Schreibt JWT in LocalStorage
     */
    AccessService.prototype.writeToken = function () {
        localStorage.setItem(this.token_name, this.token);
    };
    /**
     * Entfernt JWT aus LocalStorage
     */
    AccessService.prototype.removeToken = function () {
        localStorage.removeItem(this.token_name);
    };
    /**
     * Führt den Login mit den bereitgestellten Logindaten durch
     * @param username
     * @param password
     * @returns {Promise<TResult|boolean>|Promise<TResult2|boolean>|Promise<boolean>}
     */
    AccessService.prototype.doLogin = function (username, password) {
        var _this = this;
        return this.http.post(this.loginURL, { "username": username, "password": password }).toPromise().then(function (res) {
            res = res.json();
            if (res["status"] === 200) {
                _this.token = res["token"];
                _this.writeToken();
                _this.getServerStatus();
                return true;
            }
            return false;
        });
    };
    /**
     * Erzeugt einen http header, welcher den Token zur Authentifizierung enthält
     * @returns {any}
     */
    AccessService.prototype.getTokenHeader = function () {
        if (this.token == null) {
            return null;
        }
        var header = new http_1.Headers();
        header.append(this.token_name, this.token);
        return header;
    };
    /**
     * Führt einen Log-out für den eingeloggten Benutzer durch
     * @returns {Promise<TResult|boolean>|Promise<TResult2|boolean>|Promise<boolean>}
     */
    AccessService.prototype.doLogout = function () {
        var _this = this;
        return this.http.post(this.logoutURL, {}, { headers: this.getTokenHeader() }).toPromise().then(function (res) {
            res = res.json();
            if (res["status"] === 200) {
                _this.removeToken();
                return true;
            }
            return false;
        });
    };
    /**
     * Liest den Serverstatus (Startdatum, Anzahl der fehlgeschlagenen Log-ins) aus
     */
    AccessService.prototype.getServerStatus = function () {
        var _this = this;
        this.http.get(this.statusURl, { headers: this.getTokenHeader() }).toPromise().then(function (res) {
            res = res.json();
            if (res["status"] === 200) {
                _this.server_start = res["date"];
                _this.failed_logins = res["failed"];
            }
        });
    };
    AccessService.prototype.setToken = function (token) {
        this.token = token;
    };
    AccessService.prototype.getToken = function () {
        if (this.token) {
            return this.token;
        }
        return null;
    };
    AccessService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object])
    ], AccessService);
    return AccessService;
    var _a, _b;
}());
exports.AccessService = AccessService;
//# sourceMappingURL=access.service.js.map

/***/ }),

/***/ 410:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: '<router-outlet></router-outlet>'
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 411:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var device_1 = __webpack_require__(118);
var controlUnit_1 = __webpack_require__(117);
var device_service_1 = __webpack_require__(42);
var BooleanDeviceDetailsComponent = (function () {
    function BooleanDeviceDetailsComponent(deviceService) {
        this.deviceService = deviceService;
        this.doughnutChartData = [0, 0];
        this.doughnutChartLabels = ['Aus', 'An'];
        this.doughnutChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
        };
        this.doughnutChartLegend = true;
        this.doughnutChartType = 'doughnut';
    }
    BooleanDeviceDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.new_value = this.controlUnit.current == 1;
        this.deviceService.getUpdateRegister().subscribe(function (values) {
            if (values.unitId == _this.device.control_units.indexOf(_this.controlUnit) && _this.device.id == values.id) {
                _this.updateChart();
            }
        });
        this.createChart();
    };
    BooleanDeviceDetailsComponent.prototype.createChart = function () {
        var id = this.device.id;
        var unitId = this.device.control_units.indexOf(this.controlUnit);
        var num = Number(sessionStorage.getItem(id + ":" + unitId));
        if (num > 0) {
            for (var i = 0; i < num; i++) {
                var value = Number(sessionStorage.getItem(id + ":" + unitId + ":" + i + ":value"));
                this.doughnutChartData[value ? 1 : 0]++;
            }
            this.doughnutChartData = this.doughnutChartData.slice();
        }
    };
    BooleanDeviceDetailsComponent.prototype.updateChart = function () {
        var id = this.device.id;
        var unitId = this.device.control_units.indexOf(this.controlUnit);
        var num = Number(sessionStorage.getItem(id + ":" + unitId));
        if (num > 0) {
            var value = Number(sessionStorage.getItem(id + ":" + unitId + ":" + (num - 1) + ":value"));
            this.doughnutChartData[value ? 1 : 0]++;
            this.doughnutChartData = this.doughnutChartData.slice();
        }
    };
    BooleanDeviceDetailsComponent.prototype.onSubmit = function () {
        this.deviceService.updateCurrent(this.device, this.new_value ? 1 : 0, this.controlUnit);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_a = typeof device_1.Device !== 'undefined' && device_1.Device) === 'function' && _a) || Object)
    ], BooleanDeviceDetailsComponent.prototype, "device", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_b = typeof controlUnit_1.ControlUnit !== 'undefined' && controlUnit_1.ControlUnit) === 'function' && _b) || Object)
    ], BooleanDeviceDetailsComponent.prototype, "controlUnit", void 0);
    BooleanDeviceDetailsComponent = __decorate([
        core_1.Component({
            selector: 'boolean-details',
            template: __webpack_require__(421)
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof device_service_1.DeviceService !== 'undefined' && device_service_1.DeviceService) === 'function' && _c) || Object])
    ], BooleanDeviceDetailsComponent);
    return BooleanDeviceDetailsComponent;
    var _a, _b, _c;
}());
exports.BooleanDeviceDetailsComponent = BooleanDeviceDetailsComponent;
//# sourceMappingURL=boolean-device-details.component.js.map

/***/ }),

/***/ 412:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var device_1 = __webpack_require__(118);
var controlUnit_1 = __webpack_require__(117);
var device_service_1 = __webpack_require__(42);
var ContinuousDeviceDetailsComponent = (function () {
    function ContinuousDeviceDetailsComponent(deviceService) {
        this.deviceService = deviceService;
        this.lineChartData = [
            { data: [], label: 'Verlauf' }
        ];
        this.lineChartLabels = [];
        this.lineChartOptions = {
            responsive: true,
            maintainAspectRatio: false
        };
        this.lineChartColors = [
            {
                backgroundColor: 'rgba(77,83,96,0.2)',
                borderColor: 'rgba(77,83,96,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
    }
    ;
    ContinuousDeviceDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.new_value = this.controlUnit.current;
        this.deviceService.getUpdateRegister().subscribe(function (values) {
            if (values.unitId == _this.device.control_units.indexOf(_this.controlUnit) && _this.device.id == values.id) {
                _this.updateChart();
            }
        });
        this.createChart();
    };
    ContinuousDeviceDetailsComponent.prototype.onSubmit = function () {
        this.deviceService.updateCurrent(this.device, this.new_value, this.controlUnit);
    };
    ContinuousDeviceDetailsComponent.prototype.createChart = function () {
        var id = this.device.id;
        var unitId = this.device.control_units.indexOf(this.controlUnit);
        var num = Number(sessionStorage.getItem(id + ":" + unitId));
        if (num > 0) {
            for (var i = 0; i < num; i++) {
                var value = sessionStorage.getItem(id + ":" + unitId + ":" + i + ":value");
                var time = sessionStorage.getItem(id + ":" + unitId + ":" + i + ":time");
                this.lineChartData[0].data.push(value);
                this.lineChartLabels.push(time);
            }
            this.lineChartData = this.lineChartData.slice();
        }
    };
    ContinuousDeviceDetailsComponent.prototype.updateChart = function () {
        var id = this.device.id;
        var unitId = this.device.control_units.indexOf(this.controlUnit);
        var num = Number(sessionStorage.getItem(id + ":" + unitId));
        var value = sessionStorage.getItem(id + ":" + unitId + ":" + (num - 1) + ":value");
        var time = sessionStorage.getItem(id + ":" + unitId + ":" + (num - 1) + ":time");
        this.lineChartData[0].data.push(value);
        this.lineChartLabels.push(time);
        this.lineChartData = this.lineChartData.slice();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_a = typeof device_1.Device !== 'undefined' && device_1.Device) === 'function' && _a) || Object)
    ], ContinuousDeviceDetailsComponent.prototype, "device", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_b = typeof controlUnit_1.ControlUnit !== 'undefined' && controlUnit_1.ControlUnit) === 'function' && _b) || Object)
    ], ContinuousDeviceDetailsComponent.prototype, "controlUnit", void 0);
    ContinuousDeviceDetailsComponent = __decorate([
        core_1.Component({
            selector: 'continuous-details',
            template: __webpack_require__(422)
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof device_service_1.DeviceService !== 'undefined' && device_service_1.DeviceService) === 'function' && _c) || Object])
    ], ContinuousDeviceDetailsComponent);
    return ContinuousDeviceDetailsComponent;
    var _a, _b, _c;
}());
exports.ContinuousDeviceDetailsComponent = ContinuousDeviceDetailsComponent;
//# sourceMappingURL=continuous-device-details.component.js.map

/***/ }),

/***/ 413:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var device_service_1 = __webpack_require__(42);
var DevicesComponent = (function () {
    function DevicesComponent(deviceService) {
        this.deviceService = deviceService;
        this.update = true;
        this.device_num = 0;
    }
    DevicesComponent.prototype.ngOnInit = function () {
        this.update = true;
        this.listDevices();
        this.deviceService.openWebsocket();
    };
    DevicesComponent.prototype.ngAfterViewChecked = function () {
        if (this.devices != null && this.device_num != this.devices.length && this.device_num < this.devices.length) {
            this.update = true;
            this.device_num = this.devices.length;
        }
        if (this.devices != null && this.device_num > this.devices.length) {
            this.device_num = this.devices.length;
        }
        if (this.devices == null || !this.update) {
            return;
        }
        this.update = false;
        for (var _i = 0, _a = this.devices; _i < _a.length; _i++) {
            var device = _a[_i];
            if (device.draw_image == null) {
                continue;
            }
            for (var _b = 0, _c = device.control_units; _b < _c.length; _b++) {
                var control_unit = _c[_b];
                if (control_unit.primary) {
                    device.draw_image(device.id, device.image, control_unit.min, control_unit.max, control_unit.current, control_unit.values);
                }
            }
        }
    };
    DevicesComponent.prototype.listDevices = function () {
        var _this = this;
        this.deviceService.getDevices().then(function (devices) {
            _this.devices = devices;
            _this.edit = new Array(_this.devices.length);
            for (var i = 0; i < _this.devices.length; i++) {
                _this.edit[i] = { id: _this.devices[i].id, value: false };
            }
            _this.device_num = devices.length;
        });
    };
    DevicesComponent.prototype.isEdited = function (device) {
        var index = this.findStatus(device);
        if (index < 0) {
            return false;
        }
        return this.edit[index].value;
    };
    DevicesComponent.prototype.findStatus = function (device) {
        for (var i = 0; i < this.edit.length; i++) {
            if (device.id === this.edit[i].id) {
                return i;
            }
        }
        return -1;
    };
    DevicesComponent.prototype.editDevice = function (device) {
        var index = this.findStatus(device);
        if (index >= 0) {
            this.edit[index].value = true;
        }
        var device_outer = $(".device-outer[data-device-id=" + device.id + "]");
        var edit = device_outer.find(".device-edit");
        edit.hide();
        var remove = device_outer.find(".device-remove");
        remove.attr("src", "../images/ok.png");
    };
    DevicesComponent.prototype.finishEdit = function (device) {
        var _this = this;
        this.deviceService.updateDevice(device).then(function (result) {
            if (result) {
                _this.showLabel(device);
            }
            else {
                window.alert("Änderungen konnten nicht gespeichert werden.");
            }
        });
    };
    DevicesComponent.prototype.removeDevice = function (device) {
        this.deviceService.deleteDevice(device).then(function (result) {
            if (result) {
            }
            else {
                window.alert("Gerät konnte nicht gelöscht werden.");
            }
        });
    };
    DevicesComponent.prototype.showLabel = function (device) {
        var index = this.findStatus(device);
        if (index >= 0) {
            this.edit[index].value = false;
        }
        var device_outer = $(".device-outer[data-device-id=" + device.id + "]");
        var edit = device_outer.find(".device-edit");
        edit.show();
        var remove = device_outer.find(".device-remove");
        remove.attr("src", "../images/remove.png");
    };
    DevicesComponent = __decorate([
        core_1.Component({
            selector: 'my-devices',
            template: __webpack_require__(424)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof device_service_1.DeviceService !== 'undefined' && device_service_1.DeviceService) === 'function' && _a) || Object])
    ], DevicesComponent);
    return DevicesComponent;
    var _a;
}());
exports.DevicesComponent = DevicesComponent;
//# sourceMappingURL=devices.component.js.map

/***/ }),

/***/ 414:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var device_1 = __webpack_require__(118);
var controlUnit_1 = __webpack_require__(117);
var device_service_1 = __webpack_require__(42);
var EnumDeviceDetailsComponent = (function () {
    function EnumDeviceDetailsComponent(deviceService) {
        this.deviceService = deviceService;
        this.polarChartLabels = [];
        this.polarChartData = [];
        this.polarChartType = 'polarArea';
        this.polarChartOptions = {
            responsive: true,
            maintainAspectRatio: false
        };
        this.polarChartLegend = true;
    }
    ;
    EnumDeviceDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.new_value = this.controlUnit.values[this.controlUnit.current];
        this.deviceService.getUpdateRegister().subscribe(function (values) {
            if (values.unitId == _this.device.control_units.indexOf(_this.controlUnit) && _this.device.id == values.id) {
                _this.updateChart();
            }
        });
        this.createChart();
    };
    EnumDeviceDetailsComponent.prototype.updateChart = function () {
        var id = this.device.id;
        var unitId = this.device.control_units.indexOf(this.controlUnit);
        var num = Number(sessionStorage.getItem(id + ":" + unitId));
        if (num > 0) {
            var value = Number(sessionStorage.getItem(id + ":" + unitId + ":" + (num - 1) + ":value"));
            this.polarChartData[value]++;
            this.polarChartData = this.polarChartData.slice();
        }
    };
    EnumDeviceDetailsComponent.prototype.createChart = function () {
        for (var _i = 0, _a = this.controlUnit.values; _i < _a.length; _i++) {
            var val = _a[_i];
            this.polarChartLabels.push(val);
            this.polarChartData.push(0);
        }
        var id = this.device.id;
        var unitId = this.device.control_units.indexOf(this.controlUnit);
        var num = Number(sessionStorage.getItem(id + ":" + unitId));
        if (num > 0) {
            for (var i = 0; i < num; i++) {
                var value = Number(sessionStorage.getItem(id + ":" + unitId + ":" + i + ":value"));
                this.polarChartData[value]++;
            }
            this.polarChartData = this.polarChartData.slice();
        }
    };
    EnumDeviceDetailsComponent.prototype.onSubmit = function () {
        var index = this.controlUnit.values.indexOf(this.new_value);
        this.deviceService.updateCurrent(this.device, index, this.controlUnit);
    };
    EnumDeviceDetailsComponent.prototype.isSelected = function (val) {
        return val == this.new_value;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_a = typeof device_1.Device !== 'undefined' && device_1.Device) === 'function' && _a) || Object)
    ], EnumDeviceDetailsComponent.prototype, "device", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_b = typeof controlUnit_1.ControlUnit !== 'undefined' && controlUnit_1.ControlUnit) === 'function' && _b) || Object)
    ], EnumDeviceDetailsComponent.prototype, "controlUnit", void 0);
    EnumDeviceDetailsComponent = __decorate([
        core_1.Component({
            selector: 'enum-details',
            template: __webpack_require__(425)
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof device_service_1.DeviceService !== 'undefined' && device_service_1.DeviceService) === 'function' && _c) || Object])
    ], EnumDeviceDetailsComponent);
    return EnumDeviceDetailsComponent;
    var _a, _b, _c;
}());
exports.EnumDeviceDetailsComponent = EnumDeviceDetailsComponent;
//# sourceMappingURL=enum-device-details.component.js.map

/***/ }),

/***/ 415:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(53);
var options_component_1 = __webpack_require__(176);
var login_component_1 = __webpack_require__(175);
var access_service_1 = __webpack_require__(41);
var NavigationComponent = (function () {
    function NavigationComponent(router, route, accessService) {
        this.router = router;
        this.route = route;
        this.accessService = accessService;
    }
    ;
    NavigationComponent.prototype.isOptionsShown = function () {
        return !this.isOptionsite() && !this.isLoginSite();
    };
    NavigationComponent.prototype.isLogoutShown = function () {
        return !this.isLoginSite();
    };
    NavigationComponent.prototype.isOptionsite = function () {
        return this.route.component === options_component_1.OptionsComponent;
    };
    NavigationComponent.prototype.isLoginSite = function () {
        return this.route.component === login_component_1.LoginComponent;
    };
    NavigationComponent.prototype.doLogout = function () {
        var _this = this;
        console.log("doLogout");
        this.accessService.doLogout().then(function (successfully) {
            if (successfully) {
                _this.router.navigate(["/login"]);
            }
            else {
                window.alert("Sie konnten nicht abgemeldet werden.\nBitte versuchen Sie es erneut.");
            }
        });
    };
    NavigationComponent = __decorate([
        core_1.Component({
            selector: 'my-navigation',
            template: __webpack_require__(427)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _b) || Object, (typeof (_c = typeof access_service_1.AccessService !== 'undefined' && access_service_1.AccessService) === 'function' && _c) || Object])
    ], NavigationComponent);
    return NavigationComponent;
    var _a, _b, _c;
}());
exports.NavigationComponent = NavigationComponent;
//# sourceMappingURL=navigation.component.js.map

/***/ }),

/***/ 416:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var overview_component_1 = __webpack_require__(177);
var device_service_1 = __webpack_require__(42);
var device_1 = __webpack_require__(118);
var controlUnit_1 = __webpack_require__(117);
var controlType_1 = __webpack_require__(178);
var OverlayComponent = (function () {
    function OverlayComponent(deviceService) {
        this.deviceService = deviceService;
        this.overviewComponent = null;
        this.selected_type = null;
        this.controlUnitType_selected = null;
        this.addError = false;
        this.createError = false;
    }
    /**
     * Wird beim Start dieser Componente aufgerufen
     */
    OverlayComponent.prototype.ngOnInit = function () {
        this.device_types = ["Beleuchtung", "Heizkörperthermostat", "Rollladen", "Überwachungskamera", "Webcam"];
        this.controlUnit_types = ["Ein/Auschalter", "Diskrete Werte", "Kontinuierlicher Wert"];
        this.selected_type = this.device_types[0];
        this.controlUnitType_selected = this.controlUnit_types[0];
        this.getSPARQLTypes();
    };
    /**
     * Schließt das Overlay zum Hinzufügen von neuen Geräten
     */
    OverlayComponent.prototype.doClose = function () {
        if (this.overviewComponent != null) {
            this.overviewComponent.closeAddDeviceWindow();
        }
    };
    /**
     * Lies die Formulardaten ein und speichert diese über die REST-Schnittstelle
     * @param form
     */
    OverlayComponent.prototype.onSubmit = function (form) {
        var _this = this;
        this.createError = false;
        // Überprüfung ob alle Daten vorhanden
        if (!form || !form.value || !form.value["typename"] || !form.value["displayname"] || !form.value["elementname"]) {
            this.addError = true;
            return;
        }
        if (this.isEnumSelected() && (!form.value["discrete-values"]) || (form.value["discrete-values"] && form.value["discrete-values"].split(",").length == 0)) {
            this.addError = true;
            return;
        }
        var device = new device_1.Device();
        device.display_name = form.value["displayname"];
        device.type_name = form.value["typename"];
        // Fügt das dazugehörige Bild, die alternative Bildbeschreibung und die allgemeine Beschreibung zum neuen Gerät hinzu
        switch (this.selected_type) {
            case "Beleuchtung":
                device.image = "images/bulb.svg";
                device.image_alt = "Glühbirne als Indikator für Aktivierung";
                device.description = "Genauere Informationen zu diesem Beleuchtungselement";
                break;
            case "Heizkörperthermostat":
                device.image = "images/thermometer.svg";
                device.image_alt = "Thermometer zur Temperaturanzeige";
                device.description = "Genauere Informationen zu diesem Thermostat";
                break;
            case "Rollladen":
                device.image = "images/roller_shutter.svg";
                device.image_alt = "Rollladenbild als Indikator für Öffnungszustand";
                device.description = "Genauere Informationen zu diesem Rollladen";
                break;
            case "Überwachungskamera":
                device.image = "images/webcam.svg";
                device.image_alt = "Webcam als Indikator für Aktivierung";
                device.description = "Genauere Informationen zu dieser Überwachungskamera";
                break;
            case "Webcam":
                device.image = "images/webcam.svg";
                device.image_alt = "Webcam als Indikator für Aktivierung";
                device.description = "Genauere Informationen zu dieser Webcam";
                break;
            default:
                //TODO Lesen Sie die SPARQL - Informationen aus dem SessionStorage und speichern Sie die entsprechenden Informationen zum Gerät
                break;
        }
        device.type = this.selected_type;
        // Bestimmt welches Steuerungselement für dieses Gerät angezeigt werden soll
        var controlUnit = new controlUnit_1.ControlUnit();
        controlUnit.primary = true;
        switch (this.controlUnitType_selected) {
            case this.controlUnit_types[0]:
                controlUnit.type = controlType_1.ControlType.boolean;
                break;
            case this.controlUnit_types[1]:
                controlUnit.type = controlType_1.ControlType.enum;
                break;
            case this.controlUnit_types[2]:
                controlUnit.type = controlType_1.ControlType.continuous;
                break;
        }
        controlUnit.name = form.value["elementname"];
        if (this.isContinuousSelected()) {
            controlUnit.min = form.value["minimum-value"];
            controlUnit.max = form.value["maximum-value"];
            controlUnit.current = controlUnit.min;
            controlUnit.values = [""];
        }
        else {
            controlUnit.min = controlUnit.max = 0;
        }
        if (this.isBooleanSelected()) {
            controlUnit.current = 0;
            controlUnit.values = [""];
        }
        if (this.isEnumSelected()) {
            var values = form.value["discrete-values"].split(",");
            controlUnit.values = [""];
            controlUnit.values.length = 0;
            for (var i = 0; i < values.length; i++) {
                controlUnit.values.push(values[i].trim());
            }
            controlUnit.current = 0;
        }
        device.control_units = [controlUnit];
        // hinzufügen des Gerätes über die REST-Schnittstelle
        this.deviceService.createDevice(device).then(function (result) {
            if (result) {
                form.reset();
                _this.overviewComponent.closeAddDeviceWindow();
            }
            else {
                _this.createError = true;
            }
        });
    };
    OverlayComponent.prototype.getSPARQLTypes = function () {
        //TODO Lesen Sie mittels SPARQL die gewünschten Daten (wie in der Angabe beschrieben) aus und speichern Sie diese im SessionStorage
    };
    /**
     * Überprüft ob ein bestimmter Gerätetyp bereits ausgewählt ist
     * @param type zu überprüfender Typ
     * @returns {boolean}
     */
    OverlayComponent.prototype.isSelected = function (type) {
        return type == this.device_types[0];
    };
    /**
     * Überprüft ob boolean als Steuerungseinheit gewählt wurde
     * @returns {boolean}
     */
    OverlayComponent.prototype.isBooleanSelected = function () {
        return this.controlUnitType_selected === this.controlUnit_types[0];
    };
    /**
     * Überprüft ob enum als Steuerungseinheit gewählt wurde
     * @returns {boolean}
     */
    OverlayComponent.prototype.isEnumSelected = function () {
        return this.controlUnitType_selected === this.controlUnit_types[1];
    };
    /**
     * Überprüft ob continuous als Steuerungseinheit gewählt wurde
     * @returns {boolean}
     */
    OverlayComponent.prototype.isContinuousSelected = function () {
        return this.controlUnitType_selected === this.controlUnit_types[2];
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_a = typeof overview_component_1.OverviewComponent !== 'undefined' && overview_component_1.OverviewComponent) === 'function' && _a) || Object)
    ], OverlayComponent.prototype, "overviewComponent", void 0);
    OverlayComponent = __decorate([
        core_1.Component({
            selector: 'my-overlay',
            template: __webpack_require__(429)
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof device_service_1.DeviceService !== 'undefined' && device_service_1.DeviceService) === 'function' && _b) || Object])
    ], OverlayComponent);
    return OverlayComponent;
    var _a, _b;
}());
exports.OverlayComponent = OverlayComponent;
//# sourceMappingURL=overlay.component.js.map

/***/ }),

/***/ 417:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var access_service_1 = __webpack_require__(41);
var SidebarComponent = (function () {
    function SidebarComponent(accessService) {
        this.accessService = accessService;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        this.accessService.getServerStatus();
    };
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'my-sidebar',
            template: __webpack_require__(431)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof access_service_1.AccessService !== 'undefined' && access_service_1.AccessService) === 'function' && _a) || Object])
    ], SidebarComponent);
    return SidebarComponent;
    var _a;
}());
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map

/***/ }),

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.environment = {
    production: true
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var router_1 = __webpack_require__(53);
var core_1 = __webpack_require__(0);
var http_1 = __webpack_require__(110);
var access_service_1 = __webpack_require__(41);
var device_parser_service_1 = __webpack_require__(276);
__webpack_require__(278);
var common_1 = __webpack_require__(45);
var Subject_1 = __webpack_require__(43);
var DeviceService = (function () {
    function DeviceService(datePipe, activeRoute, http, parserService, accessService) {
        this.datePipe = datePipe;
        this.activeRoute = activeRoute;
        this.http = http;
        this.parserService = parserService;
        this.accessService = accessService;
        //TODO Passen Sie die URLs zu Ihrer REST-Schnittstelle, entsprechend der von Ihnen vorgenommenen Änderungen am Server, an
        this.listDevicesURL = 'https://localhost:3000/listDevices';
        this.updateDeviceURL = 'https://localhost:3000/updateDevice';
        this.deleteDeviceURL = 'https://localhost:3000/deleteDevice';
        this.createDeviceURL = 'https://localhost:3000/createDevice';
        this.connection = null;
        this.devices = null;
        this.updateRegister = new Subject_1.Subject();
    }
    /**
     * Löscht das gewünschte Gerät über die REST-Schnittstelle
     * @param device
     * @returns {Promise<TResult|boolean>|Promise<TResult2|boolean>|Promise<boolean>}
     */
    DeviceService.prototype.deleteDevice = function (device) {
        return this.http.post(this.deleteDeviceURL, { "id": device.id }, { headers: this.accessService.getTokenHeader() })
            .toPromise()
            .then(function (response) {
            response = response.json();
            if (response["status"] === 200) {
                return true;
            }
            return false;
        });
    };
    /**
     * Fügt das gewünschte Gerät über die REST-Schnittstelle hinzu
     * @param device
     * @returns {Promise<TResult|boolean>|Promise<TResult2|boolean>|Promise<boolean>}
     */
    DeviceService.prototype.createDevice = function (device) {
        return this.http.post(this.createDeviceURL, { "device": JSON.stringify(device) }, { headers: this.accessService.getTokenHeader() })
            .toPromise()
            .then(function (response) {
            response = response.json();
            if (response["status"] === 200) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    /**
     * Aktualisiert das gewünschte Gerät über die REST-Schnittstelle
     * @param device
     * @returns {Promise<TResult|boolean>|Promise<TResult2|boolean>|Promise<boolean>}
     */
    DeviceService.prototype.updateDevice = function (device) {
        return this.http.post(this.updateDeviceURL, { "device": JSON.stringify(device) }, { headers: this.accessService.getTokenHeader() })
            .toPromise()
            .then(function (response) {
            response = response.json();
            if (response["status"] === 200) {
                return true;
            }
            return false;
        });
    };
    /**
     * Aktualisiert den aktuellen Zustand eines Gerätes über die REST-Schnittstelle
     * Verwendet dafür natives JavaScript
     * @param device
     * @param new_value
     * @param controlUnit
     */
    DeviceService.prototype.updateCurrent = function (device, new_value, controlUnit) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = this.stateChanged;
        request["controlUnit"] = controlUnit;
        request.open("POST", "http://localhost:8081/updateCurrent", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.setRequestHeader("access-token", this.accessService.getToken());
        var unitId = device.control_units.indexOf(controlUnit);
        var data = "id=" + device.id + "&unitId=" + unitId + "&value=" + new_value;
        request.send(data);
    };
    /**
     * Wird bei Statusänderungen des XMLHTTPRequests aufgerufen und liest bei Abschluss die Werte aus
     * @param event
     */
    DeviceService.prototype.stateChanged = function (event) {
        var request = event.target;
        switch (request.readyState) {
            case 0:
                break; // unsent
            case 1:
                break; // opened
            case 2:
                break; // sent
            case 3:
                break; // loading
            case 4:
                if (request.status == 200) {
                    var response = JSON.parse(request.responseText);
                    if (response.status == 200) {
                        var controlUnit = request["controlUnit"];
                        controlUnit.log = response.message;
                        controlUnit.current = response.value;
                    }
                }
                break;
        }
    };
    /**
     * Öffnet einen Websocket zum Server und reagiert entsprechend auf Änderungen
     */
    DeviceService.prototype.openWebsocket = function () {
        var _this = this;
        if (this.connection != null) {
            return;
        }
        this.connection = new WebSocket("ws://localhost:8081/subscribe");
        var token = this.accessService.getToken();
        this.connection.onopen = function (event) {
            var con = event.target;
            con.send(JSON.stringify({ token: token }));
        };
        this.connection.onmessage = function (event) {
            var msg = JSON.parse(event.data);
            if (msg.method == -1 && !msg.message.includes("submitted")) {
                _this.connection.close();
                return;
            }
            // überprüfen welche der unterschiedlichen Updatemethoden verwendet wurden
            if (msg.method < 0) {
                return;
            }
            if (msg.method == 3) {
                var new_device = JSON.parse(msg.device);
                new_device = _this.parserService.parseDevice(new_device);
                _this.devices.push(new_device);
                _this.devices.slice();
                return;
            }
            // auslesen der aktualisierten Werte und speichern dieser
            var device = _this.devices.find(function (device) { return device.id === msg.deviceID; });
            switch (msg.method) {
                case 0:
                    var controlUnit = device.control_units[msg.control_unitID];
                    if (controlUnit.current != msg.value) {
                        controlUnit.current = msg.value;
                        controlUnit.log = msg.log;
                        if (controlUnit.primary && _this.activeRoute.url === "/overview") {
                            device.update_image(device.id, controlUnit.min, controlUnit.max, controlUnit.current, controlUnit.values);
                        }
                        _this.writeDeviceLog(device.id, msg.control_unitID, msg.value, msg.date);
                    }
                    break;
                case 1:
                    device.display_name = msg.value;
                    break;
                case 2:
                    _this.devices.splice(_this.devices.indexOf(device), 1);
                    break;
            }
        };
    };
    /**
     * Schreibt einen neuen Zustand eines Gerätes in den SessionStorage
     * @param id      id des Gerätes
     * @param unitId  id des Steuerungselements
     * @param value   neuer Zustand
     * @param time    Zeitpunkt der Wertänderung
     */
    DeviceService.prototype.writeDeviceLog = function (id, unitId, value, time) {
        var num = Number(sessionStorage.getItem(id + ":" + unitId));
        sessionStorage.setItem(id + ":" + unitId + ":" + num + ":value", value.toString());
        sessionStorage.setItem(id + ":" + unitId + ":" + num + ":time", this.datePipe.transform(time, "mediumTime"));
        sessionStorage.setItem(id + ":" + unitId, (num + 1) + "");
        this.updateRegister.next({ id: id, unitId: Number(unitId) });
    };
    /**
     * Liefert ein Subject zurück, welches überwacht werden kann um auf Änderungen an Gerätezuständen zu reagieren
     * @returns {Subject<{id: string, unitId: number}>}
     */
    DeviceService.prototype.getUpdateRegister = function () {
        return this.updateRegister;
    };
    /**
     * Liefert alle Geräte als Array zurück
     * @returns {Promise<any>}
     */
    DeviceService.prototype.getDevices = function () {
        var _this = this;
        return this.http.get(this.listDevicesURL, { headers: this.accessService.getTokenHeader() })
            .toPromise()
            .then(function (response) {
            var devices = response.json().message.devices;
            //parse devices from json to typescript to be usable with angular
            for (var i = 0; i < devices.length; i++) {
                devices[i] = _this.parserService.parseDevice(devices[i]);
            }
            _this.devices = devices;
            return devices;
        })
            .catch(this.handleError);
    };
    /**
     * Liefert das gewünschte Gerät zurück
     * @param id
     * @returns {Promise<Device[]>}
     */
    DeviceService.prototype.getDevice = function (id) {
        return this.getDevices()
            .then(function (devices) { return devices.find(function (device) { return device.id === id; }); });
    };
    DeviceService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    DeviceService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof common_1.DatePipe !== 'undefined' && common_1.DatePipe) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _c) || Object, (typeof (_d = typeof device_parser_service_1.DeviceParserService !== 'undefined' && device_parser_service_1.DeviceParserService) === 'function' && _d) || Object, (typeof (_e = typeof access_service_1.AccessService !== 'undefined' && access_service_1.AccessService) === 'function' && _e) || Object])
    ], DeviceService);
    return DeviceService;
    var _a, _b, _c, _d, _e;
}());
exports.DeviceService = DeviceService;
//# sourceMappingURL=device.service.js.map

/***/ }),

/***/ 421:
/***/ (function(module, exports) {

module.exports = "<div class=\"details-image-container\">\r\n    <canvas alt=\"Donatdiagramm für das Gerät\" class=\"details-image\" baseChart\r\n            [data]=\"doughnutChartData\"\r\n            [labels]=\"doughnutChartLabels\"\r\n            [chartType]=\"doughnutChartType\"\r\n            [legend]=\"doughnutChartLegend\"\r\n            [options]=\"doughnutChartOptions\">\r\n    </canvas>\r\n</div>\r\n<div class=\"details-data\">\r\n    <label class=\"accessibility\" for=\"details-log\">Letzte Werteänderungen</label>\r\n    <textarea id=\"details-log\" class=\"detail-logs\" [(ngModel)]=\"controlUnit.log\" placeholder=\"Gerätelog\" readonly rows=\"6\"></textarea>\r\n    <div class=\"details-settings\">\r\n        <h3 class=\"details-headline\">{{controlUnit.name}}</h3>\r\n\r\n        <form class=\"update-form\" method=\"post\" #updateForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\r\n\r\n            <label class=\"update-form-field\" id=\"current-value\">\r\n                <span class=\"current-value\">derzeit: {{controlUnit.current==0 ? \"Deaktiviert\" : \"Aktiviert\"}}</span>\r\n            </label>\r\n\r\n            <label class=\"accessibility\" for=\"new-value\">Bitte gewünschten Wert auswählen.</label>\r\n            <input type=\"checkbox\" id=\"new-value\" [checked]=\"new_value==0 ? null: true\" [(ngModel)]=\"new_value\"\r\n                   class=\"update-checkbox-input form-input\"\r\n                   name=\"new-value\">\r\n            <input type=\"submit\" id=\"submit-value\" class=\"update-form-field button\" name=\"submit-value\"\r\n                   value=\"Wert setzen\">\r\n        </form>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ 422:
/***/ (function(module, exports) {

module.exports = "<div class=\"details-image-container\">\r\n  <canvas alt=\"Liniendiagramm für das Gerät\" class=\"details-image\" baseChart\r\n          [datasets]=\"lineChartData\"\r\n          [labels]=\"lineChartLabels\"\r\n          [options]=\"lineChartOptions\"\r\n          [colors]=\"lineChartColors\"\r\n          [legend]=\"lineChartLegend\"\r\n          [chartType]=\"lineChartType\">\r\n  </canvas>\r\n</div>\r\n<div class=\"details-data\">\r\n  <label class=\"accessibility\" for=\"details-log\">Letzte Werteänderungen</label>\r\n  <textarea id=\"details-log\" class=\"detail-logs\" [(ngModel)]=\"controlUnit.log\" placeholder=\"Gerätelog\" readonly rows=\"6\"></textarea>\r\n  <div class=\"details-settings\">\r\n    <h3 class=\"details-headline\">{{controlUnit.name}}</h3>\r\n\r\n    <form class=\"update-form\" #updateForm=\"ngForm\" method=\"post\" (ngSubmit)=\"onSubmit()\" >\r\n\r\n      <label class=\"update-form-field\" id=\"current-value\">\r\n        <span class=\"current-value\">derzeit: {{controlUnit.current}}</span>\r\n      </label>\r\n\r\n      <label class=\"accessibility\" for=\"new-value\">Bitte gewünschten Wert eingeben.</label>\r\n      <input type=\"number\" step=\"0.01\" [min]=\"controlUnit.min\" [max]=\"controlUnit.max\" id=\"new-value\" [value]=\"new_value\" [(ngModel)]=\"new_value\"\r\n             class=\"update-form-field form-input\" name=\"new-value\" required >\r\n      <input [disabled]=\"!updateForm.form.valid\" type=\"submit\" id=\"submit-value\" class=\"update-form-field button\" name=\"submit-value\"\r\n             value=\"Wert setzen\">\r\n    </form>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 423:
/***/ (function(module, exports) {

module.exports = "<body data-decimal-separator=\",\" data-grouping-separator=\".\">\r\n<div role=\"navigation\">\r\n    <a href=\"#devicessheadline\" class=\"accessibility\">Zum Inhalt springen</a>\r\n</div>\r\n\r\n<my-navigation></my-navigation>\r\n<div class=\"main-container\">\r\n    <aside class=\"sidebar\" aria-labelledby=\"serverinfoheadline\">\r\n        <my-sidebar></my-sidebar>\r\n    </aside>\r\n    <main *ngIf=\"device\" aria-labelledby=\"deviceheadline\" class=\"details-container\">\r\n\r\n        <div [attr.data-device-id]=\"device.id\" class=\"details-headline\">\r\n            <h2 class=\"main-headline\" id=\"deviceheadline\">{{device.display_name}}</h2>\r\n        </div>\r\n        <div class=\"details-holder\" *ngFor=\"let control_unit of device.control_units\">\r\n            <div *ngFor=\"let control_unit of device.control_units\"  class=\"details-outer\">\r\n                <continuous-details *ngIf=\"isContinuous(control_unit)\" [device]=\"device\" [controlUnit]=\"control_unit\"></continuous-details>\r\n                <enum-details *ngIf=\"isEnum(control_unit)\" [device]=\"device\" [controlUnit]=\"control_unit\"></enum-details>\r\n                <boolean-details *ngIf=\"isBoolean(control_unit)\"  [device]=\"device\" [controlUnit]=\"control_unit\"></boolean-details>\r\n            </div>\r\n        </div>\r\n    </main>\r\n</div>\r\n<footer>\r\n    © 2017 BIG Smart Home\r\n</footer>\r\n</body>\r\n"

/***/ }),

/***/ 424:
/***/ (function(module, exports) {

module.exports = "<div class=\"devices\">\r\n\r\n  <div *ngFor=\"let device of devices\" class=\"device-outer\" [attr.data-device-id]=\"device.id\">\r\n    <a class=\"device\" [routerLink]=\"isEdited(device) ? null : ['/details', device.id]\"\r\n       [attr.title]=\"device.description\">\r\n      <dl class=\"device-properties\">\r\n        <dt>Anzeigename</dt>\r\n        <dd *ngIf=\"!isEdited(device)\" class=\"device-displayname\">{{device.display_name}}</dd>\r\n        <dd *ngIf=\"isEdited(device)\" class=\"device-displayname\">\r\n          <input id=\"device_displayname_input\" (keyup.enter)=\"finishEdit(device)\" [(ngModel)]=\"device.display_name\"\r\n                 value='\" + text + \"'/>\r\n        </dd>\r\n        <dt>Gerätetyp</dt>\r\n        <dd class=\"device-type\">{{device.type}}</dd>\r\n        <dt>Gerätename</dt>\r\n        <dd class=\"device-name\">{{device.type_name}}</dd>\r\n      </dl>\r\n      <div class=\"device-image-container\">\r\n        <svg width=\"100%\" height=\"100%\" class=\"device-image\"></svg>\r\n      </div>\r\n    </a>\r\n    <ul class=\"device-actions\">\r\n      <li>\r\n        <a (click)=\"editDevice(device)\">\r\n          <img class=\"device-edit\" src=\"images/edit.png\" alt=\"Gerät bearbeiten\">\r\n        </a>\r\n      </li>\r\n      <li>\r\n        <a (click)=\"isEdited(device) ? finishEdit(device): removeDevice(device)\">\r\n          <img class=\"device-remove\" src=\"images/remove.png\" alt=\"Gerät entfernen\">\r\n        </a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n\r\n</div>\r\n"

/***/ }),

/***/ 425:
/***/ (function(module, exports) {

module.exports = "<div class=\"details-image-container\">\r\n  <canvas alt=\"Polardiagramm für das Gerät\" class=\"details-image\" baseChart\r\n          [data]=\"polarChartData\"\r\n          [labels]=\"polarChartLabels\"\r\n          [chartType]=\"polarChartType\"\r\n          [legend]=\"polarChartLegend\"\r\n          [options]=\"polarChartOptions\">\r\n  </canvas>\r\n</div>\r\n<div class=\"details-data\">\r\n  <label class=\"accessibility\" for=\"details-log\">Letzte Werteänderungen</label>\r\n  <textarea id=\"details-log\" class=\"detail-logs\" [(ngModel)]=\"controlUnit.log\" placeholder=\"Gerätelog\" readonly rows=\"6\"></textarea>\r\n  <div class=\"details-settings\">\r\n    <h3 class=\"details-headline\">{{controlUnit.name}}</h3>\r\n\r\n    <form class=\"update-form\" method=\"post\" #updateForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\r\n\r\n      <label class=\"update-form-field\" id=\"current-value\">\r\n        <span class=\"current-value\">derzeit: {{controlUnit.values[controlUnit.current]}}</span>\r\n      </label>\r\n\r\n      <label class=\"accessibility\" for=\"new-value\">Bitte gewünschten Wert aus Menü auswählen.</label>\r\n      <select id=\"new-value\" class=\"update-form-field form-input\" name=\"new-value\" [(ngModel)]=\"new_value\" required>\r\n       <option [value]=\"val\" [selected]=\"isSelected(val) ? true: null\"  *ngFor=\"let val of controlUnit.values\">{{val}}</option>\r\n      </select>\r\n      <input type=\"submit\" id=\"submit-value\" class=\"update-form-field button\" name=\"submit-value\"\r\n             value=\"Wert setzen\">\r\n    </form>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 426:
/***/ (function(module, exports) {

module.exports = "<body data-decimal-separator=\",\" data-grouping-separator=\".\">\r\n\r\n<div role=\"navigation\" aria-label=\"jumplinks\">\r\n  <a href=\"#formheadline\" class=\"accessibility\">Zum Inhalt springen</a>\r\n</div>\r\n\r\n<my-navigation></my-navigation>\r\n<div class=\"main-container\">\r\n  <main aria-labelledby=\"formheadline\">\r\n    <form class=\"form\" method=\"post\" #loginForm=\"ngForm\" (ngSubmit)=\"onSubmit(loginForm)\">\r\n      <h2 id=\"formheadline\" class=\"registration-headline\">Anmelden</h2>\r\n      <div class=\"form-row\">\r\n        <label class=\"form-label\" for=\"username-input\">\r\n          Benutzername\r\n        </label>\r\n        <input type=\"text\" name=\"username\" id=\"username-input\" required class=\"form-input\" ngModel>\r\n      </div>\r\n      <div class=\"form-row\">\r\n        <label class=\"form-label\" for=\"password-input\">\r\n          Passwort\r\n        </label>\r\n        <input type=\"password\" name=\"password\" id=\"password-input\" required class=\"form-input\" minlength=\"4\"\r\n               maxlength=\"12\" ngModel>\r\n      </div>\r\n      <div *ngIf=\"loginError\" class=\"form-row form-row-center form-error\" id=\"login-error\">Benutzername oder Passwort nicht korrekt!</div>\r\n      <div class=\"form-row form-row-center\">\r\n        <input type=\"submit\" class=\"button button-submit\" value=\"Anmelden\"/>\r\n      </div>\r\n    </form>\r\n  </main>\r\n</div>\r\n<footer>\r\n  © 2017 BIG Smart Home\r\n</footer>\r\n</body>\r\n"

/***/ }),

/***/ 427:
/***/ (function(module, exports) {

module.exports = "<header aria-labelledby=\"bannerheadline\">\r\n  <!--<a [routerLink]=\"['/overview']\"><img class=\"title-image\" src=\"images/big-logo-small.png\" alt=\"BIG Bid logo\"></a>-->\r\n  <a [routerLink]=\"isLoginSite() ? ['/login'] : ['/overview']\"><img class=\"title-image\" src=\"images/big-logo-small.png\"\r\n                                                                    alt=\"BIG Bid logo\"></a>\r\n  <h1 class=\"header-title\" id=\"bannerheadline\">\r\n    BIG Smart Home\r\n  </h1>\r\n  <nav aria-labelledby=\"navigationheadline\">\r\n    <h2 class=\"accessibility\" id=\"navigationheadline\">Navigation</h2>\r\n    <ul class=\"navigation-list\">\r\n      <li class=\"nav-items\">\r\n        <ul>\r\n          <li *ngIf=\"isOptionsShown()\">\r\n            <a [routerLink]=\"['/options']\" class=\"button\" accesskey=\"2\">Optionen</a>\r\n          </li>\r\n          <li *ngIf=\"isLogoutShown()\">\r\n            <a (click)=\"doLogout()\" class=\"button\" accesskey=\"1\">Abmelden</a>\r\n          </li>\r\n        </ul>\r\n      </li>\r\n      <li class=\"overflow-icon\">\r\n        <a href=\"#\" class=\"button\" accesskey=\"1\">☰</a>\r\n      </li>\r\n    </ul>\r\n  </nav>\r\n</header>\r\n"

/***/ }),

/***/ 428:
/***/ (function(module, exports) {

module.exports = "<div role=\"navigation\" aria-label=\"jumplinks\">\r\n  <a href=\"#formheadline\" class=\"accessibility\">Zum Inhalt springen</a>\r\n</div>\r\n\r\n<my-navigation></my-navigation>\r\n<div class=\"main-container\">\r\n  <main aria-labelledby=\"formheadline\">\r\n    <form class=\"form\" method=\"post\" #optionsForm=\"ngForm\" (ngSubmit)=\"onSubmit(optionsForm)\">\r\n      <h2 id=\"formheadline\" class=\"options-headline\">Passwort ändern</h2>\r\n      <div class=\"form-row\">\r\n        <label class=\"form-label\" for=\"old-password-input\">\r\n          Altes Passwort\r\n        </label>\r\n        <input type=\"password\" name=\"old-password\" id=\"old-password-input\" required class=\"form-input\"\r\n               placeholder=\"Altes Passwort\" ngModel>\r\n      </div>\r\n      <div class=\"form-row\">\r\n        <label class=\"form-label\" for=\"new-password-input\">\r\n          Neues Passwort\r\n        </label>\r\n        <input type=\"password\" name=\"new-password\" id=\"new-password-input\" placeholder=\"Neues Passwort\" required\r\n               class=\"form-input\" minlength=\"8\"\r\n               maxlength=\"12\" pattern=\"(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}\" ngModel>\r\n      </div>\r\n      <div class=\"form-row\">\r\n        <label class=\"form-label\" for=\"repeat-password-input\">\r\n          Passwort wiederholen\r\n        </label>\r\n        <input type=\"password\" name=\"repeat-password\" id=\"repeat-password-input\"\r\n               placeholder=\"Neues Passwort wiederholen\"\r\n               required class=\"form-input\" minlength=\"8\"\r\n               maxlength=\"12\" pattern=\"(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}\" ngModel>\r\n      </div>\r\n      <div *ngIf=\"updateError\" class=\"form-row form-row-center form-error\" id=\"update-error\">{{error_message}}</div>\r\n      <div class=\"form-row form-row-center\">\r\n        <input [disabled]=\"!(equalsPW(optionsForm) && optionsForm.form.valid)\" type=\"submit\" id=\"save-changes-button\"\r\n               class=\"button button-submit\"\r\n               value=\" Änderung speichern\"/>\r\n      </div>\r\n    </form>\r\n  </main>\r\n</div>\r\n<footer>\r\n  © 2017 BIG Smart Home\r\n</footer>\r\n"

/***/ }),

/***/ 429:
/***/ (function(module, exports) {

module.exports = "<div class=\"overlay\">\r\n  <div class=\"overlay-content\">\r\n    <a (click)=\"doClose()\" class=\"overlay-exit\"><img  src=\"images/close.png\" alt=\"close overlay\" width=\"10\" height=\"10\"/></a>\r\n    <form name=\"addForm\" class=\"form overlay-form\" method=\"post\" #addForm=\"ngForm\" (ngSubmit)=\"onSubmit(addForm)\">\r\n      <h2 id=\"formheadline\" class=\"create-headline\">Gerät anlegen</h2>\r\n      <div class=\"form-row\">\r\n        <label class=\"form-label\" for=\"displayname-input\">\r\n          Anzeigename\r\n        </label>\r\n        <input type=\"text\" name=\"displayname\" id=\"displayname-input\" required class=\"form-input\" ngModel>\r\n      </div>\r\n      <div class=\"form-row\">\r\n        <label class=\"form-label\" for=\"type-input\">\r\n          Gerätetyp\r\n        </label>\r\n\r\n        <select [(ngModel)]=\"selected_type\" name=\"type-input\" class=\"form-input\" required id=\"type-input\">\r\n          <option [value]=\"val\"  *ngFor=\"let val of device_types\">{{val}}</option>\r\n        </select>\r\n      </div>\r\n      <div class=\"form-row\">\r\n        <label class=\"form-label\" for=\"typename-input\">\r\n          Typenbezeichnung\r\n        </label>\r\n        <input type=\"text\" name=\"typename\" id=\"typename-input\" required class=\"form-input\" ngModel>\r\n      </div>\r\n      <hr>\r\n      <div class=\"form-row\">\r\n        <label class=\"form-label\" >\r\n          <b>Steuerungselement</b>\r\n        </label>\r\n      </div>\r\n      <div class=\"form-row\">\r\n        <label class=\"form-label\" for=\"elementname-input\">\r\n          Bezeichnung\r\n        </label>\r\n        <input type=\"text\" name=\"elementname\" id=\"elementname-input\" required class=\"form-input\" ngModel>\r\n      </div>\r\n      <div class=\"form-row\">\r\n        <label class=\"form-label\" for=\"elementtype-input\">\r\n          Typ\r\n        </label>\r\n        <select name=\"elementtype-input\" class=\"form-input\" [(ngModel)]=\"controlUnitType_selected\" required id=\"elementtype-input\">\r\n          <option [value]=\"val\"  *ngFor=\"let val of controlUnit_types\">{{val}}</option>\r\n        </select>\r\n      </div>\r\n      <div *ngIf=\"isContinuousSelected()\" class=\"form-row\">\r\n        <label class=\"form-label\" for=\"minimum-input\">\r\n          Minimum\r\n        </label>\r\n        <input type=\"number\" name=\"minimum-value\" id=\"minimum-input\" required class=\"form-input\" ngModel>\r\n      </div>\r\n      <div *ngIf=\"isContinuousSelected()\" class=\"form-row\">\r\n        <label class=\"form-label\" for=\"maximum-input\">\r\n          Maximum\r\n        </label>\r\n        <input type=\"number\" name=\"maximum-value\" id=\"maximum-input\" required class=\"form-input\" ngModel>\r\n      </div>\r\n      <div *ngIf=\"isEnumSelected()\" class=\"form-row\">\r\n        <label class=\"form-label\" for=\"values-input\">\r\n          Mögliche Werte\r\n        </label>\r\n        <textarea name=\"discrete-values\" ngModel id=\"values-input\" required class=\"form-input\" placeholder=\"offen, halb geöffnet, geschlossen\"></textarea>\r\n      </div>\r\n      <div *ngIf=\"addError\" class=\"form-row form-row-center form-error\" id=\"add-error\">Es wurden nicht alle Angaben wie benötigt vorgenommen!</div>\r\n      <div *ngIf=\"createError\" class=\"form-row form-row-center form-error\" id=\"create-error\">Aufgrund eine Serverfehlers konnte das Geräte nicht erstellt werden!</div>\r\n      <div class=\"form-row form-row-center form-row-bottom\">\r\n        <button [disabled]=\"!addForm.form.valid\" class=\"button button-submit\">\r\n          Gerät hinzufügen\r\n        </button>\r\n      </div>\r\n    </form>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 430:
/***/ (function(module, exports) {

module.exports = "<body data-decimal-separator=\",\" data-grouping-separator=\".\">\r\n<div role=\"navigation\" aria-label=\"jumplinks\">\r\n  <a href=\"#devicesheadline\" class=\"accessibility\">Zum Inhalt springen</a>\r\n</div>\r\n\r\n<my-navigation></my-navigation>\r\n<div class=\"main-container\">\r\n  <aside class=\"sidebar\" aria-labelledby=\"serverinfoheadline\">\r\n    <my-sidebar></my-sidebar>\r\n  </aside>\r\n  <main aria-labelledby=\"devicesheadline;\">\r\n    <div class=\"headline-container\">\r\n      <h2 class=\"main-headline\" id=\"devicesheadline\">Geräte</h2>\r\n      <a (click)=\"addDevice()\"><img height=\"20\" width=\"20\" src=\"../../images/add.png\" alt=\"Gerät hinzufügen\"/></a>\r\n    </div>\r\n    <my-devices></my-devices>\r\n    <my-overlay [overviewComponent]=\"this\" [hidden]=\"isAddDevice ? null : true\"></my-overlay>\r\n  </main>\r\n</div>\r\n\r\n<footer>\r\n  © 2017 BIG Smart Home\r\n</footer>\r\n</body>\r\n"

/***/ }),

/***/ 431:
/***/ (function(module, exports) {

module.exports = "<div class=\"server-info-container\">\r\n  <h2 class=\"accessibility\" id=\"serverinfoheadline\">Serverstatus</h2>\r\n  <dl class=\"server-data properties\">\r\n    <dt class=\"accessibility\">Serverstatus:</dt>\r\n    <dd class=\"server-status\">Serverstatus:</dd>\r\n    <dt>Benutzer</dt>\r\n    <dd>\r\n      <span class=\"system-start-time\">Administrator</span>\r\n    </dd>\r\n    <dt>Systemstartzeit</dt>\r\n    <dd>\r\n      <span class=\"system-start-time\">{{accessService.server_start | date: 'shortTime'}}</span>\r\n    </dd>\r\n    <dt>Systemstartdatum</dt>\r\n    <dd>\r\n      <span class=\"system-start-datum\">{{accessService.server_start  | date: 'shortDate'}}</span>\r\n    </dd>\r\n    <dt>Fehlgeschlagene Logins</dt>\r\n    <dd>\r\n      <span class=\"failed-logins\">{{accessService.failed_logins}}</span>\r\n    </dd>\r\n  </dl>\r\n</div>\r\n"

/***/ }),

/***/ 450:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(294);


/***/ })

},[450]);
//# sourceMappingURL=main.bundle.js.map