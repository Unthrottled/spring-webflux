import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Avatar} from '../model/Avatar.model';
import {LocalAvatar} from '../model/LocalAvatar';

@Component({
    selector: 'avatar-editor',
    template: require('./AvatarEditor.component.htm')
})
export class ProfileImageComponent {

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

    updateFile(projectFile: Avatar): void {
        this.avatar = projectFile;
    }

    get imageBinary(): Observable<any> {
        return this._avatar.imageBinary();
    }
}