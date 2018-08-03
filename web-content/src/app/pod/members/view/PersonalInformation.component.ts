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

    private _avatar: Avatar;

    @Output()
    private projectFileEmmiter = new EventEmitter<Avatar>();


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

    get imageBinary(): Observable<any> {
        return this._avatar.imageBinary();
    }

    private interests: TextPayload[] = [];

    addInterest(textPayload: TextPayload){
        this.interests.push(textPayload)
    }
}