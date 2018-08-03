import {Component, Input} from '@angular/core';
import {Avatar} from "../model/Avatar.model";
import {ProjectFileService} from "../service/ProjectFileService";
import {Observable} from "rxjs/Observable";
import {LocalAvatar} from "../model/LocalAvatar";

@Component({
    selector: 'pod-member',
    template: require('./PodMember.component.htm')
})
export class PodMemberComponent {

    constructor(private projectFileService: ProjectFileService) {
    }

    private _avatar: Avatar;

    @Input()
    get avatar(): Avatar {
        return this._avatar;
    }

    set avatar(value: Avatar) {
        this._avatar = value;
    }

    //todo: remove dis when you can change remote projects.
    get editMode(): boolean {
        return this.avatar instanceof LocalAvatar;
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