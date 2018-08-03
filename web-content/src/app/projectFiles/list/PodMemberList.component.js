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
var PodMemberListComponent = /** @class */ (function () {
    function PodMemberListComponent() {
        this._projectFiles = [];
    }
    Object.defineProperty(PodMemberListComponent.prototype, "projectFiles", {
        get: function () {
            return this._projectFiles;
        },
        set: function (value) {
            this._projectFiles = value;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], PodMemberListComponent.prototype, "projectFiles", null);
    PodMemberListComponent = __decorate([
        core_1.Component({
            selector: 'project-file-list',
            template: require('./PodMemberList.component.htm')
        })
    ], PodMemberListComponent);
    return PodMemberListComponent;
}());
exports.PodMemberListComponent = PodMemberListComponent;
//# sourceMappingURL=PodMemberList.component.js.map