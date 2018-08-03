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
var LocalAvatar_1 = require("../model/LocalAvatar");
var PersonalInformationComponent = /** @class */ (function () {
    function PersonalInformationComponent() {
        this.projectFileEmmiter = new core_1.EventEmitter();
        this.interests = [];
    }
    Object.defineProperty(PersonalInformationComponent.prototype, "projectFile", {
        get: function () {
            return this._projectFile;
        },
        set: function (value) {
            this._projectFile = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PersonalInformationComponent.prototype, "editMode", {
        //todo: remove dis when you can change remote projects.
        get: function () {
            return this.projectFile instanceof LocalAvatar_1.LocalAvatar;
        },
        enumerable: true,
        configurable: true
    });
    PersonalInformationComponent.prototype.updateFile = function (projectFile) {
        this.projectFile = projectFile;
    };
    Object.defineProperty(PersonalInformationComponent.prototype, "imageBinary", {
        get: function () {
            return this._projectFile.imageBinary();
        },
        enumerable: true,
        configurable: true
    });
    PersonalInformationComponent.prototype.addInterest = function (textPayload) {
        this.interests.push(textPayload);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], PersonalInformationComponent.prototype, "projectFileEmmiter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], PersonalInformationComponent.prototype, "projectFile", null);
    PersonalInformationComponent = __decorate([
        core_1.Component({
            selector: 'personal-information',
            template: require('./PersonalInformation.component.htm')
        }),
        __metadata("design:paramtypes", [])
    ], PersonalInformationComponent);
    return PersonalInformationComponent;
}());
exports.PersonalInformationComponent = PersonalInformationComponent;
//# sourceMappingURL=PersonalInformation.component.js.map