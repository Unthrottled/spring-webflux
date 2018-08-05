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
var LocalPodMember_service_1 = require("./LocalPodMember.service");
var ImageUpload_service_1 = require("./ImageUpload.service");
var RemotePodMember_service_1 = require("./RemotePodMember.service");
var RemotePodMember_1 = require("../model/RemotePodMember");
var LocalPodMember_1 = require("../model/LocalPodMember");
var EventDispatch_service_1 = require("./EventDispatch.service");
var PodMemberService = /** @class */ (function () {
    function PodMemberService(localPodMemberService, remotePodMemberService, eventDispatchService, imageUploadService) {
        this.localPodMemberService = localPodMemberService;
        this.remotePodMemberService = remotePodMemberService;
        this.eventDispatchService = eventDispatchService;
        this.imageUploadService = imageUploadService;
        this.podMemberMap = new Map();
        this.podMembersIterator = [];
    }
    PodMemberService.prototype.ngOnInit = function () {
        // this.remotePodMemberService.fetchAllRemoteProjects()
        //     .subscribe(remoteFile=> {
        //         this.addPodMemberToList(remoteFile);
        //     }, error=> {
        //         console.log(error);
        //     })
    };
    Object.defineProperty(PodMemberService.prototype, "podMembers", {
        get: function () {
            return this.podMembersIterator;
        },
        enumerable: true,
        configurable: true
    });
    PodMemberService.prototype.addPodMember = function () {
        var podMember = this.localPodMemberService.createLocalPodMember();
        this.addPodMemberToList(podMember);
        var action = {
            type: 'POD_MEMBER_CREATED',
            payload: {
                identifier: podMember.getIdentifier()
            },
            error: false,
        };
        return this.eventDispatchService.dispatchAction(action)
            .map(function (it) { return podMember; });
    };
    PodMemberService.prototype.addPodMemberToList = function (podMember) {
        this.podMembersIterator.push(podMember);
    };
    PodMemberService.prototype.removePodMember = function (podMember) {
        if (podMember instanceof RemotePodMember_1.RemotePodMember) {
            // let self = this;
            // this.remotePodMemberService.removeProject(<RemotePodMember>podMember)
            //     .filter(b=>b)
            //     .subscribe(result=>{
            //         self.removePodMemberFromList(podMember);
            //     }, error=>{
            //         console.log(error)
            // });
        }
        else if (podMember instanceof LocalPodMember_1.LocalPodMember) {
            this.removePodMemberFromList(podMember);
        }
    };
    PodMemberService.prototype.removePodMemberFromList = function (podMemberToRemove) {
        console.log(podMemberToRemove);
        this.podMembersIterator = this.podMembersIterator.filter(function (it) { return it.getIdentifier() !== podMemberToRemove.getIdentifier(); });
    };
    PodMemberService.prototype.uploadAvatar = function (avatar) {
        // this.imageUploadService.uploadImage(avatar.selectedFile)
        //     .subscribe(remoteIdentifier=> )
        // .map(imageId=>this.remotePodMemberService.fetchRemoteProject(imageId))
        // .subscribe(remoteProject=> {
        //     // this.removePodMemberFromList(avatar);
        //     this.podMemberMap.set(remoteProject.getIdentifier(), remoteProject);
        // });
    };
    PodMemberService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [LocalPodMember_service_1.LocalPodMemberService,
            RemotePodMember_service_1.RemotePodMemberService,
            EventDispatch_service_1.EventDispatchService,
            ImageUpload_service_1.ImageUploadService])
    ], PodMemberService);
    return PodMemberService;
}());
exports.PodMemberService = PodMemberService;
//# sourceMappingURL=PodMember.service.js.map