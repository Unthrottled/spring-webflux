import {Injectable, OnInit} from '@angular/core';
import {PodMember} from '../model/PodMember.model';
import {LocalAvatar} from '../model/LocalAvatar';
import {LocalPodMemberService} from './LocalPodMember.service';
import {ImageUploadService} from './ImageUpload.service';
import {RemotePodMemberService} from './RemotePodMember.service';
import {RemotePodMember} from '../model/RemotePodMember';
import {LocalPodMember} from '../model/LocalPodMember';
import {Action} from '../model/Action.model';
import {PodMemberPayload} from '../PodMembers.component';
import {EventDispatchService} from './EventDispatch.service';
import {Observable, ReplaySubject} from 'rxjs';


@Injectable()
export class PodMemberService implements OnInit {
    private podMemberMap: Map<String, PodMember> = new Map<String, PodMember>();
    private podMembersIterator: PodMember[] = [];
    private _loadingObservable = new ReplaySubject<boolean>();

    constructor(private localPodMemberService: LocalPodMemberService,
                private remotePodMemberService: RemotePodMemberService,
                private eventDispatchService: EventDispatchService) {

    }

    ngOnInit(): void {
        this.remotePodMemberService.fetchAllRemotePodMembers()
            .subscribe(remoteFile=> {
                this.addPodMemberToList(remoteFile);
            }, error=> {
                console.warn(error);
            },  ()=>{
                this._loadingObservable.next(true);
            })
    }

    get loadingObservable(): Observable<boolean> {
        return this._loadingObservable;
    }

    get podMembers(): PodMember[] {
        return this.podMembersIterator;
    }

    addPodMember(): Observable<PodMember> {
        let podMember: PodMember = this.localPodMemberService.createLocalPodMember();
        this.addPodMemberToList(podMember);
        const action: Action<PodMemberPayload> = {
            type: 'POD_MEMBER_CREATED',
            payload: {
                identifier: podMember.getIdentifier()
            },
            error: false,
        };

        return this.eventDispatchService.dispatchPodAction<PodMemberPayload>(action)
            .map((it)=> podMember);
    }

    private addPodMemberToList(podMember: PodMember) {
        this.podMembersIterator.push(podMember);
    }

    removePodMember(podMember: PodMember): Observable<PodMember> {
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
        const action : Action<PodMemberPayload> = {
            type: 'POD_MEMBER_DELETED',
            payload: {
                identifier: podMember.getIdentifier()
            },
            error: false
        };
        return this.eventDispatchService.dispatchPodAction<PodMemberPayload>(action)
            .map((it)=> podMember);
    }

    private removePodMemberFromList(podMemberToRemove: PodMember) {
        this.podMembersIterator = this.podMembersIterator.filter(it => it.getIdentifier() !== podMemberToRemove.getIdentifier())

    }

    uploadAvatar(avatar: LocalAvatar) {
        // this.imageUploadService.uploadImage(avatar.selectedFile)
        //     .subscribe(remoteIdentifier=> )
            // .map(imageId=>this.remotePodMemberService.fetchRemotePersonalInformation(imageId))
            // .subscribe(remoteProject=> {
            //     // this.removePodMemberFromList(avatar);
            //     this.podMemberMap.set(remoteProject.getIdentifier(), remoteProject);
            // });
    }
}