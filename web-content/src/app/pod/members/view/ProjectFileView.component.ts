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

    private _projectFile: Avatar;

    @Input()
    get projectFile(): Avatar {
        return this._projectFile;
    }

    set projectFile(value: Avatar) {
        this._projectFile = value;
    }

    get imageBinary(): Observable<any> {
        return this._projectFile.imageBinary();
    }

}