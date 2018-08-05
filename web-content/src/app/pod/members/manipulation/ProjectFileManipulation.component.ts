import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Avatar} from "../model/Avatar.model";

@Component(
    {
        selector: 'project-file-manipulation',
        template: require('./ProjectFileManipulation.component.htm')
    }
)
export class ProjectFileManipulationComponent {
    private _avatar: Avatar;

    @Output()
    private avatarUpdated = new EventEmitter<Avatar>();


    @Input()
    get avatar(): Avatar {
        return this._avatar;
    }

    set avatar(value: Avatar) {
        this._avatar = value;
    }

    fileChosen(file: File): void{
        this._avatar.setNewFile(file);
        this.avatarUpdated.emit(this._avatar);
    }
}