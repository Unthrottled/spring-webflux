import {Injectable, OnInit} from "@angular/core";
import {PodMember} from "../model/PodMember.model";
import {LocalAvatar} from "../model/LocalAvatar";
import {LocalPodMemberService} from "./LocalPodMember.service";
import {ImageUploadService} from "./ImageUpload.service";
import {RemotePodMemberService} from "./RemotePodMember.service";
import {RemotePodMember} from '../model/RemotePodMember';
import {LocalPodMember} from '../model/LocalPodMember';


@Injectable()
export class PodMemberService implements OnInit {
    private podMemberMap: Map<String, PodMember> = new Map<String, PodMember>();
    private podMembersIterator: PodMember[] = [];

    constructor(private localPodMemberService: LocalPodMemberService,
                private remotePodMemberService: RemotePodMemberService,
                private imageUploadService: ImageUploadService) {

    }

    ngOnInit(): void {
        // this.remotePodMemberService.fetchAllRemoteProjects()
        //     .subscribe(remoteFile=> {
        //         this.addPodMemberToList(remoteFile);
        //     }, error=> {
        //         console.log(error);
        //     })
    }


    get podMembers(): PodMember[] {
        return this.podMembersIterator;
    }

    addPodMember() {
        let items = this.localPodMemberService.createLocalPodMember();
        this.addPodMemberToList(items);
    }

    private addPodMemberToList(podMember: PodMember) {
        this.podMembersIterator.push(podMember);
    }

    removePodMember(podMember: PodMember) {
        if(podMember instanceof RemotePodMember){
            // let self = this;
            // this.remotePodMemberService.removeProject(<RemotePodMember>podMember)
            //     .filter(b=>b)
            //     .subscribe(result=>{
            //         self.removePodMemberFromList(podMember);
            //     }, error=>{
            //         console.log(error)
            // });
        } else if (podMember instanceof LocalPodMember){
            this.removePodMemberFromList(podMember);
        }
    }

    private removePodMemberFromList(podMemberToRemove: PodMember) {
        console.log(podMemberToRemove)
        this.podMembersIterator = this.podMembersIterator.filter(it => it.getIdentifier() !== podMemberToRemove.getIdentifier())

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