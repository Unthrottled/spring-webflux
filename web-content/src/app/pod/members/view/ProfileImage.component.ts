import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ProjectFile} from '../model/Avatar.model';
import {LocalAvatar} from '../model/LocalAvatar';

@Component({
    selector: 'profile-image',
    template: require('./ProfileImage.component.htm')
})
export class ProfileImageComponent {

    constructor() {
    }

    private _projectFile: ProjectFile;

    @Output()
    private projectFileEmmiter = new EventEmitter<ProjectFile>();


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

    get imageBinary(): Observable<any> {
        return this._projectFile.imageBinary();
    }
}