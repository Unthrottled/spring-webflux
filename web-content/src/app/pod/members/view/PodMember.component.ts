import {Component, Input} from '@angular/core';
import {PodMember} from "../model/PodMember.model";
import {PodMemberService} from "../service/PodMember.service";
import {Observable} from "rxjs/Observable";
import {LocalPodMember} from "../model/LocalPodMember";
import {PersonalInformation} from '../model/PersonalInformation';
import {Avatar} from '../model/Avatar.model';

@Component({
    selector: 'pod-member',
    template: require('./PodMember.component.htm')
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

    private _podMember: PodMember;

    @Input()
    get podMember(): PodMember {
        return this._podMember;
    }

    set podMember(value: PodMember) {
        this._podMember = value;
    }

    //todo: remove dis when you can change remote projects.
    get editMode(): boolean {
        return this.podMember instanceof LocalPodMember;
    }

    podMemberUpdated(projectFile: PodMember): void {
        this.podMember = projectFile;
    }

    get avatar(): Avatar {
        return this.podMember.avatar;
    }

    uploadFile(): void {
        this.projectFileService.uploadFile(<LocalPodMember>this.podMember);
    }

    delete(): void {
        this.projectFileService.removePodMember(this.podMember);
    }

    get imageBinary(): Observable<any> {
        return this._podMember.avatar.imageBinary();
    }
}