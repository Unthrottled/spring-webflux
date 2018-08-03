import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Avatar} from "../model/Avatar.model";

@Component(
    {
        selector: 'project-file-manipulation',
        template: require('./ProjectFileManipulation.component.htm')
    }
)
export class ProjectFileManipulationComponent {
    private _projectFile: Avatar;

    @Output()
    private projectFileUpdated = new EventEmitter<Avatar>();


    @Input()
    get projectFile(): Avatar {
        return this._projectFile;
    }

    set projectFile(value: Avatar) {
        this._projectFile = value;
    }

    fileChosen(file: File): void{
        this._projectFile.setNewFile(file);
        this.projectFileUpdated.emit(this._projectFile);
    }
}