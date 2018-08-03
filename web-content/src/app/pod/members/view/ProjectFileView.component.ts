import {Component, Input} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Avatar} from "../model/Avatar.model";

@Component({
    selector: 'project-file-view',
    template: require('./ProjectFileView.component.htm')
})
export class ProjectFileViewComponent {

    constructor() {
    }

    private _avatar: Avatar;

    @Input()
    get avatar(): Avatar {
        return this._avatar;
    }

    set avatar(value: Avatar) {
        this._avatar = value;
    }

    get imageBinary(): Observable<any> {
        return this._avatar.imageBinary();
    }

}