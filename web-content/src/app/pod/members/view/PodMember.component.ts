import {Component, Input} from '@angular/core';
import {ProjectFile} from "../model/Avatar.model";
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

    private _projectFile: ProjectFile;

    @Input()
    get projectFile(): ProjectFile {
        return this._projectFile;
    }

    set projectFile(value: ProjectFile) {
        this._projectFile = value;
    }

    //todo: remove dis when you can change remote projects.
    get editMode(): boolean {
        return this.projectFile instanceof LocalAvatar;
    }

    updateFile(projectFile: ProjectFile): void {
        this.projectFile = projectFile;
    }

    uploadFile(): void {
        this.projectFileService.uploadFile(<LocalAvatar>this.projectFile);
    }

    delete(): void {
        this.projectFileService.removeProjectFile(this.projectFile);
    }

    get imageBinary(): Observable<any> {
        return this._projectFile.imageBinary();
    }
}