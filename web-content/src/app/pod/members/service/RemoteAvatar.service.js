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
var BackendAPI_service_1 = require("../../../services/BackendAPI.service");
var window_1 = require("../../../util/window");
var Observable_1 = require("rxjs/Observable");
var RemoteAvatarService = /** @class */ (function () {
    function RemoteAvatarService(backendAPISevice, windowRef) {
        this.backendAPISevice = backendAPISevice;
        this.windowRef = windowRef;
    }
    RemoteAvatarService.prototype.fetchRemoteProject = function (fileId) {
        // return this.backendAPISevice.fetchImage(fileId)
        //     .map(arrayBuffer => this.convertToImageBinary(arrayBuffer))
        //     .map(base64Binary => new RemoteAvatar(fileId, base64Binary))
        // return new RemoteAvatar(new Identifier(fileId),
        //     this.backendAPISevice.fetchImage(fileId)
        //         .map(arrayBuffer => this.convertToImageBinary(arrayBuffer)));
        return Observable_1.Observable.empty();
    };
    RemoteAvatarService.prototype.fetchAllRemoteProjects = function () {
        // return this.backendAPISevice.fetchAllPodMemberIdentifiers()
        //     .map((response: any[]) => response)
        //     .flatMap(files => Observable.from(files))
        //     .map(identifier => identifier._id)
        //     .flatMap(id => this.fetchRemotePersonalInformation(id));
        return Observable_1.Observable.empty();
    };
    RemoteAvatarService.prototype.removeProject = function (projectToRemove) {
        return this.backendAPISevice.deleteImage(projectToRemove.getIdentifier());
    };
    RemoteAvatarService.prototype.convertToImageBinary = function (arrayBuffer) {
        var binary = '';
        var bytes = new Uint8Array(arrayBuffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; ++i) {
            binary += String.fromCharCode(bytes[i]);
        }
        return 'data:image/png;base64,' + this.windowRef.nativeWindow.btoa(binary);
    };
    RemoteAvatarService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [BackendAPI_service_1.BackendAPIService, window_1.WindowRef])
    ], RemoteAvatarService);
    return RemoteAvatarService;
}());
exports.RemoteAvatarService = RemoteAvatarService;
//# sourceMappingURL=RemoteAvatar.service.js.map