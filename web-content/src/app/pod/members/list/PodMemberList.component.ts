import {Component, Input} from "@angular/core";
import {Avatar} from "../model/Avatar.model";

@Component({
    selector: 'project-file-list',
    template: require('./PodMemberList.component.htm')
})
export class PodMemberListComponent {
    private _projectFiles: Avatar[] = [];

    @Input()
    get projectFiles(): Avatar[] {
        return this._projectFiles;
    }

    set projectFiles(value: Avatar[]) {
        this._projectFiles = value;
    }
}