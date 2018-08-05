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
var RemoteAvatar_1 = require("../model/RemoteAvatar");
var LocalProjectFile_service_1 = require("./LocalProjectFile.service");
var ImageUpload_service_1 = require("./ImageUpload.service");
var RemoteProjectFile_service_1 = require("./RemoteProjectFile.service");
var PodMemberService = /** @class */ (function () {
    function PodMemberService(localProjectFileService, remoteProjectFileService, imageUploadService) {
        this.localProjectFileService = localProjectFileService;
        this.remoteProjectFileService = remoteProjectFileService;
        this.imageUploadService = imageUploadService;
        this.projectFileMap = new Map();
    }
    PodMemberService.prototype.ngOnInit = function () {
        var _this = this;
        this.remoteProjectFileService.fetchAllRemoteProjects()
            .subscribe(function (remoteFile) {
            _this.addProjectToList(remoteFile);
        }, function (error) {
            console.log(error);
        });
    };
    Object.defineProperty(PodMemberService.prototype, "projectFiles", {
        get: function () {
            return this.projectFileMap.values();
        },
        enumerable: true,
        configurable: true
    });
    PodMemberService.prototype.addPodMember = function () {
        var items = this.localProjectFileService.createLocalProject();
        this.addProjectToList(items);
    };
    PodMemberService.prototype.addProjectToList = function (project) {
        this.projectFileMap.set(project.getIdentifier(), project);
    };
    PodMemberService.prototype.removeProjectFile = function (projectFile) {
        if (projectFile instanceof RemoteAvatar_1.RemoteAvatar) {
            var self_1 = this;
            this.remoteProjectFileService.removeProject(projectFile)
                .filter(function (b) { return b; })
                .subscribe(function (result) {
                self_1.removeProjectFileFromList(projectFile);
            }, function (error) {
                console.log(error);
            });
        }
        else if (projectFile instanceof LocalAvatar_1.LocalAvatar) {
            this.removeProjectFileFromList(projectFile);
        }
    };
    PodMemberService.prototype.removeProjectFileFromList = function (projectFile) {
        this.projectFileMap.delete(projectFile.getIdentifier());
    };
    PodMemberService.prototype.uploadFile = function (projectFile) {
        var _this = this;
        this.imageUploadService.uploadImage(projectFile.selectedFile)
            .map(function (imageId) { return _this.remoteProjectFileService.fetchRemoteProject(imageId); })
            .subscribe(function (remoteProject) {
            _this.removeProjectFileFromList(projectFile);
            _this.projectFileMap.set(remoteProject.getIdentifier(), remoteProject);
        });
    };
    PodMemberService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [LocalProjectFile_service_1.LocalProjectFileService,
            RemoteProjectFile_service_1.RemoteProjectFileService,
            ImageUpload_service_1.ImageUploadService])
    ], PodMemberService);
    return PodMemberService;
}());
exports.PodMemberService = PodMemberService;
//# sourceMappingURL=PodMember.service.js.map