import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Avatar} from '../model/Avatar.model';
import {LocalAvatar} from '../model/LocalAvatar';
import {TextPayload} from '../model/TextPayload';

@Component({
    selector: 'personal-information',
    template: require('./PersonalInformation.component.htm')
})
export class PersonalInformationComponent {

    constructor() {
    }

    private _projectFile: Avatar;

    @Output()
    private projectFileEmmiter = new EventEmitter<Avatar>();


    @Input()
    get projectFile(): Avatar {
        return this._projectFile;
    }

    set projectFile(value: Avatar) {
        this._projectFile = value;
    }

    //todo: remove dis when you can change remote projects.
    get editMode(): boolean {
        return this.projectFile instanceof LocalAvatar;
    }

    updateFile(projectFile: Avatar): void {
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