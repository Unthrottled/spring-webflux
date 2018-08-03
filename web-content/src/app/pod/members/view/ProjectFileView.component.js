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
var ProjectFileViewComponent = /** @class */ (function () {
    function ProjectFileViewComponent() {
    }
    Object.defineProperty(ProjectFileViewComponent.prototype, "avatar", {
        get: function () {
            return this._avatar;
        },
        set: function (value) {
            this._avatar = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectFileViewComponent.prototype, "imageBinary", {
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
    ], ProjectFileViewComponent.prototype, "avatar", null);
    ProjectFileViewComponent = __decorate([
        core_1.Component({
            selector: 'project-file-view',
            template: require('./ProjectFileView.component.htm')
        }),
        __metadata("design:paramtypes", [])
    ], ProjectFileViewComponent);
    return ProjectFileViewComponent;
}());
exports.ProjectFileViewComponent = ProjectFileViewComponent;
//# sourceMappingURL=ProjectFileView.component.js.map