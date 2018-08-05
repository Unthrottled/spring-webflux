import {Component, Input} from '@angular/core';
import {Avatar} from "../model/Avatar.model";
import {PodMemberService} from "../service/PodMember.service";
import {Observable} from "rxjs/Observable";
import {LocalAvatar} from "../model/LocalAvatar";
import {PersonalInformation} from '../model/PersonalInformation';
import {PodMember} from '../model/PodMember.model';

@Component({
    selector: 'pod-member-editor',
    template: require('./PodMemberEditor.component.htm')
})
export class PodMemberEditorComponent {

    constructor(private projectFileService: PodMemberService) {
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

    uploadFile(): void {
        // this.projectFileService.uploadFile(<LocalAvatar>this.avatar);
    }

    updateAvatar(avatar: Avatar): void {
        this.podMember.setAvatar(avatar)
    }

    get avatar(): Avatar {
        return this.podMember.avatar;
    }

    delete(): void {
        // this.projectFileService.removeProjectFile(this.avatar);
    }
}