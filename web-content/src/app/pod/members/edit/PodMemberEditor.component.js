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
var PodMember_service_1 = require("../service/PodMember.service");
var PodMemberEditorComponent = /** @class */ (function () {
    function PodMemberEditorComponent(projectFileService) {
        this.projectFileService = projectFileService;
    }
    Object.defineProperty(PodMemberEditorComponent.prototype, "personalInformation", {
        get: function () {
            return this._personalInformation;
        },
        set: function (value) {
            this._personalInformation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PodMemberEditorComponent.prototype, "podMember", {
        get: function () {
            return this._podMember;
        },
        set: function (value) {
            this._podMember = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PodMemberEditorComponent.prototype, "avatar", {
        get: function () {
            return this.podMember.avatar;
        },
        enumerable: true,
        configurable: true
    });
    PodMemberEditorComponent.prototype.updateAvatar = function (avatar) {
        this.podMember.setAvatar(avatar);
        console.log(avatar);
    };
    PodMemberEditorComponent.prototype.postEvent = function (action) {
        console.log(action);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], PodMemberEditorComponent.prototype, "podMember", null);
    PodMemberEditorComponent = __decorate([
        core_1.Component({
            selector: 'pod-member-editor',
            template: require('./PodMemberEditor.component.htm')
        }),
        __metadata("design:paramtypes", [PodMember_service_1.PodMemberService])
    ], PodMemberEditorComponent);
    return PodMemberEditorComponent;
}());
exports.PodMemberEditorComponent = PodMemberEditorComponent;
//# sourceMappingURL=PodMemberEditor.component.js.map