import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'project-file-choose',
    template: require('./AvatarChoose.component.htm')
})
export class AvatarChooseComponent {

    @Output()
    private fileSelectedEmitter = new EventEmitter<File>();

    constructor() {
    }

    private _selectedFile: File;

    selectFile(event: any): void {
        this.selectedFile = event.target.files.item(0);
        this.fileSelectedEmitter.emit(this.selectedFile);
    }


    get selectedFile(): File {
        return this._selectedFile;
    }

    set selectedFile(value: File) {
        this._selectedFile = value;
    }

}