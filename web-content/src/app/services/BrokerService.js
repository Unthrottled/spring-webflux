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
Object.defineProperty(exports, "__esModule", { value: true });
// Declare oboe as a Variable
var core_1 = require("@angular/core");
var BrokerService = /** @class */ (function () {
    function BrokerService() {
        this.listen();
    }
    BrokerService.prototype.listen = function () {
        console.log("registering message broker");
        var config = {
            'url': './api/pod/members',
            'method': "GET",
            'body': '',
            'cached': false,
            'withCredentials': true
        };
        this.oboeService = oboe(config);
        // The '!' will only consume complete json objects
        this.oboeService.node('!', function (thing) {
            console.log("new broker message", thing);
        });
    };
    BrokerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], BrokerService);
    return BrokerService;
}());
exports.BrokerService = BrokerService;
//# sourceMappingURL=BrokerService.js.map