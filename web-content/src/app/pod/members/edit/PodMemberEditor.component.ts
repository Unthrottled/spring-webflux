import {Component, Input} from '@angular/core';
import {Avatar} from '../model/Avatar.model';
import {PodMemberService} from '../service/PodMember.service';
import {PersonalInformation} from '../model/PersonalInformation';
import {PodMember} from '../model/PodMember.model';
import {Action} from '../model/Action.model';
import {LocalAvatar} from '../model/LocalAvatar';
import {ImageUploadService} from '../service/ImageUpload.service';
import {EventDispatchService} from '../service/EventDispatch.service';

@Component({
    selector: 'pod-member-editor',
    template: require('./PodMemberEditor.component.htm')
})
export class PodMemberEditorComponent {

    constructor(private projectFileService: PodMemberService,
                private eventDispatchService: EventDispatchService,
                private imageUploadService: ImageUploadService) {
    }

    private _personalInformation: PersonalInformation;


    get personalInformation(): PersonalInformation {
        return this._personalInformation;
    }

    set personalInformation(value: PersonalInformation) {
        this._personalInformation = value;
    }

    private _podMember: PodMember;

    @Input()
    get podMember(): PodMember {
        return this._podMember;
    }

    set podMember(value: PodMember) {
        this._podMember = value;
    }

    get avatar(): Avatar {
        return this.podMember.avatar;
    }

    updateAvatar(avatar: LocalAvatar): void {
        this.podMember.setAvatar(avatar);
        this.imageUploadService.uploadImage(avatar.selectedFile)
            .subscribe(remoteIdentifier => {
                const uploadedAvatarAction: Action<AvatarPayload> = {
                    type: "AVATAR_UPLOADED",
                    payload: {
                        identifier: remoteIdentifier
                    },
                    error: false
                }
                this.postEvent(uploadedAvatarAction)
            }, error =>{
                // should probably try again
                console.warn(error)
            } );
    }

    postEvent<T>(action: Action<T>): void{
        this.eventDispatchService.dispatchAction(action)
            .subscribe((it)=>{}, (err)=>{})
    }
}

interface AvatarPayload {
    identifier: string;
}