"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var RemoteProjectFile_service_1 = require("./service/RemoteProjectFile.service");
var AvatarChoose_component_1 = require("./choose/AvatarChoose.component");
var PodMemberList_component_1 = require("./list/PodMemberList.component");
var AvatarView_component_1 = require("./view/AvatarView.component");
var PodMembers_component_1 = require("./PodMembers.component");
var animations_1 = require("@angular/platform-browser/animations");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var ProjectFileManipulation_component_1 = require("./manipulation/ProjectFileManipulation.component");
var ProjectFileService_1 = require("./service/ProjectFileService");
var PodMember_component_1 = require("./view/PodMember.component");
var LocalProjectFile_service_1 = require("./service/LocalProjectFile.service");
var ImageUpload_service_1 = require("./service/ImageUpload.service");
var PersonalInformation_component_1 = require("./view/PersonalInformation.component");
var InterestList_component_1 = require("./list/InterestList.component");
var TextSubmission_component_1 = require("./manipulation/TextSubmission.component");
var MembersModule = /** @class */ (function () {
    function MembersModule() {
    }
    MembersModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                animations_1.BrowserAnimationsModule,
            ],
            exports: [
                AvatarChoose_component_1.AvatarChooseComponent,
                PodMemberList_component_1.PodMemberListComponent,
                AvatarView_component_1.AvatarViewComponent,
                PodMember_component_1.PodMemberComponent,
                PodMembers_component_1.PodMembersComponent,
                ProjectFileManipulation_component_1.ProjectFileManipulationComponent
            ],
            declarations: [
                AvatarChoose_component_1.AvatarChooseComponent,
                PodMemberList_component_1.PodMemberListComponent,
                AvatarView_component_1.AvatarViewComponent,
                PodMember_component_1.PodMemberComponent,
                PodMembers_component_1.PodMembersComponent,
                ProjectFileManipulation_component_1.ProjectFileManipulationComponent,
                PersonalInformation_component_1.PersonalInformationComponent,
                InterestList_component_1.InterestListComponent,
                TextSubmission_component_1.TextSubmissionComponent,
            ],
            bootstrap: [],
            providers: [RemoteProjectFile_service_1.RemoteProjectFileService,
                ProjectFileService_1.ProjectFileService,
                LocalProjectFile_service_1.LocalProjectFileService,
                ImageUpload_service_1.ImageUploadService
            ],
            schemas: []
        })
    ], MembersModule);
    return MembersModule;
}());
exports.MembersModule = MembersModule;
//# sourceMappingURL=Members.module.js.map