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
var ProjectFileService_1 = require("../service/ProjectFileService");
var LocalAvatar_1 = require("../model/LocalAvatar");
var PodMemberComponent = /** @class */ (function () {
    function PodMemberComponent(projectFileService) {
        this.projectFileService = projectFileService;
    }
    Object.defineProperty(PodMemberComponent.prototype, "personalInformation", {
        get: function () {
            return this._personalInformation;
        },
        set: function (value) {
            this._personalInformation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PodMemberComponent.prototype, "avatar", {
        get: function () {
            return this._avatar;
        },
        set: function (value) {
            this._avatar = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PodMemberComponent.prototype, "editMode", {
        //todo: remove dis when you can change remote projects.
        get: function () {
            return this.avatar instanceof LocalAvatar_1.LocalAvatar;
        },
        enumerable: true,
        configurable: true
    });
    PodMemberComponent.prototype.updateFile = function (projectFile) {
        this.avatar = projectFile;
    };
    PodMemberComponent.prototype.uploadFile = function () {
        this.projectFileService.uploadFile(this.avatar);
    };
    PodMemberComponent.prototype.delete = function () {
        this.projectFileService.removeProjectFile(this.avatar);
    };
    Object.defineProperty(PodMemberComponent.prototype, "imageBinary", {
        get: function () {
            return this._avatar.imageBinary();
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], PodMemberComponent.prototype, "avatar", null);
    PodMemberComponent = __decorate([
        core_1.Component({
            selector: 'pod-member',
            template: require('./PodMember.component.htm')
        }),
        __metadata("design:paramtypes", [ProjectFileService_1.ProjectFileService])
    ], PodMemberComponent);
    return PodMemberComponent;
}());
exports.PodMemberComponent = PodMemberComponent;
//# sourceMappingURL=PodMember.component.js.map