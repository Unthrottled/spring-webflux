import {Component, Input} from "@angular/core";
import {ProjectFile} from "../model/Avatar.model";

@Component({
    selector: 'project-file-list',
    template: require('./PodMemberList.component.htm')
})
export class PodMemberListComponent {
    private _projectFiles: ProjectFile[] = [];

    @Input()
    get projectFiles(): ProjectFile[] {
        return this._projectFiles;
    }

    set projectFiles(value: ProjectFile[]) {
        this._projectFiles = value;
    }
}