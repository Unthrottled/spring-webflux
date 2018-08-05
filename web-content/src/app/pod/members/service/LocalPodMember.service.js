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
var core_1 = require("@angular/core");
var LocalPodMember_1 = require("../model/LocalPodMember");
var Identifier_model_1 = require("../model/Identifier.model");
var LocalPodMemberService = /** @class */ (function () {
    function LocalPodMemberService() {
    }
    LocalPodMemberService_1 = LocalPodMemberService;
    LocalPodMemberService.prototype.createLocalPodMember = function () {
        return new LocalPodMember_1.LocalPodMember(new Identifier_model_1.Identifier(++LocalPodMemberService_1.localPodMemberCount + ''));
    };
    LocalPodMemberService.localPodMemberCount = 0;
    LocalPodMemberService = LocalPodMemberService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], LocalPodMemberService);
    return LocalPodMemberService;
    var LocalPodMemberService_1;
}());
exports.LocalPodMemberService = LocalPodMemberService;
//# sourceMappingURL=LocalPodMember.service.js.map