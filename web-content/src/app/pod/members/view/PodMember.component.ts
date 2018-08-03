import {Component, Input} from '@angular/core';
import {ProjectFile} from "../model/Avatar.model";
import {ProjectFileService} from "../service/ProjectFileService";
import {Observable} from "rxjs/Observable";
import {LocalProjectFile} from "../model/LocalProjectFile";

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
        return this.projectFile instanceof LocalProjectFile;
    }

    updateFile(projectFile: ProjectFile): void {
        this.projectFile = projectFile;
    }

    uploadFile(): void {
        this.projectFileService.uploadFile(<LocalProjectFile>this.projectFile);
    }

    delete(): void {
        this.projectFileService.removeProjectFile(this.projectFile);
    }

    get imageBinary(): Observable<any> {
        return this._projectFile.imageBinary();
    }
}