import {Component, Input} from '@angular/core';
import {Avatar} from "../model/Avatar.model";
import {PodMemberService} from "../service/PodMember.service";
import {Observable} from "rxjs/Observable";
import {LocalAvatar} from "../model/LocalAvatar";
import {PersonalInformation} from '../model/PersonalInformation';

@Component({
    selector: 'pod-member',
    template: require('./PodMemberEditor.component.htm')
})
export class PodMemberComponent {

    constructor(private projectFileService: PodMemberService) {
    }

    private _personalInformation: PersonalInformation;


    get personalInformation(): PersonalInformation {
        return this._personalInformation;
    }

    set personalInformation(value: PersonalInformation) {
        this._personalInformation = value;
    }

    private _avatar: Avatar;

    @Input()
    get avatar(): Avatar {
        return this._avatar;
    }

    set avatar(value: Avatar) {
        this._avatar = value;
    }

    updateFile(projectFile: Avatar): void {
        this.avatar = projectFile;
    }

    uploadFile(): void {
        this.projectFileService.uploadFile(<LocalAvatar>this.avatar);
    }

    delete(): void {
        this.projectFileService.removeProjectFile(this.avatar);
    }

    get imageBinary(): Observable<any> {
        return this._avatar.imageBinary();
    }
}