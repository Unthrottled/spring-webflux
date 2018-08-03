import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ProjectFile} from '../model/Avatar.model';
import {LocalProjectFile} from '../model/LocalProjectFile';
import {TextPayload} from '../model/TextPayload';

@Component({
    selector: 'personal-information',
    template: require('./PersonalInformation.component.htm')
})
export class PersonalInformationComponent {

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
        return this.projectFile instanceof LocalProjectFile;
    }

    updateFile(projectFile: ProjectFile): void {
        this.projectFile = projectFile;
    }

    get imageBinary(): Observable<any> {
        return this._projectFile.imageBinary();
    }

    private interests: TextPayload[] = [];

    addInterest(textPayload: TextPayload){
        this.interests.push(textPayload)
    }
}