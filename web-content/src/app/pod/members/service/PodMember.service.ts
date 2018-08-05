import {Injectable, OnInit} from "@angular/core";
import {PodMember} from "../model/PodMember.model";
import {LocalAvatar} from "../model/LocalAvatar";
import {LocalPodMemberService} from "./LocalPodMember.service";
import {ImageUploadService} from "./ImageUpload.service";
import {RemotePodMemberService} from "./RemotePodMember.service";


@Injectable()
export class PodMemberService implements OnInit {
    private podMemberMap: Map<String, PodMember> = new Map<String, PodMember>();


    constructor(private localPodMemberService: LocalPodMemberService,
                private remotePodMemberService: RemotePodMemberService,
                private imageUploadService: ImageUploadService) {

    }

    ngOnInit(): void {
        // this.remotePodMemberService.fetchAllRemoteProjects()
        //     .subscribe(remoteFile=> {
        //         this.addPodmemberToList(remoteFile);
        //     }, error=> {
        //         console.log(error);
        //     })
    }


    get podMembers(): Iterable<PodMember> {
        return this.podMemberMap.values();
    }

    addPodMember() {
        let items = this.localPodMemberService.createLocalPodMember();
        this.addPodmemberToList(items);
    }

    private addPodmemberToList(podMember: PodMember) {
        this.podMemberMap.set(podMember.getIdentifier(), podMember)
    }

    removePodMember(podMember: PodMember) {
        // if(podMember instanceof RemoteAvatar){
        //     let self = this;
        //     this.remotePodMemberService.removeProject(<RemoteAvatar>podMember)
        //         .filter(b=>b)
        //         .subscribe(result=>{
        //             self.removePodMemberFromList(podMember);
        //         }, error=>{
        //             console.log(error)
        //     });
        // } else if (podMember instanceof LocalAvatar){
        //     this.removePodMemberFromList(podMember);
        // }
    }

    private removePodMemberFromList(podMember: PodMember) {
        // this.podMemberMap.delete(podMember.getIdentifier());

    }

    uploadFile(podMember: PodMember) {
        // this.imageUploadService.uploadImage(podMember.selectedFile)
        //     .map(imageId=>this.remotePodMemberService.fetchRemoteProject(imageId))
        //     .subscribe(remoteProject=> {
        //         this.removePodMemberFromList(podMember);
        //         this.podMemberMap.set(remoteProject.getIdentifier(), remoteProject);
        //     });
    }
}