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
var PodMember_service_1 = require("./service/PodMember.service");
var PodMembersComponent = /** @class */ (function () {
    // todo: start here!
    function PodMembersComponent(projectFileService) {
        this.projectFileService = projectFileService;
    }
    PodMembersComponent.prototype.ngOnInit = function () {
        this.projectFileService.ngOnInit();
    };
    Object.defineProperty(PodMembersComponent.prototype, "projectFiles", {
        get: function () {
            return this.projectFileService.projectFiles;
        },
        enumerable: true,
        configurable: true
    });
    PodMembersComponent.prototype.addNewPodMember = function () {
        this.projectFileService.addPodMember();
    };
    PodMembersComponent = __decorate([
        core_1.Component({
            selector: 'project-file-component',
            template: require('./PodMembers.component.htm')
        }),
        __metadata("design:paramtypes", [PodMember_service_1.PodMemberService])
    ], PodMembersComponent);
    return PodMembersComponent;
}());
exports.PodMembersComponent = PodMembersComponent;
//# sourceMappingURL=PodMembers.component.js.map