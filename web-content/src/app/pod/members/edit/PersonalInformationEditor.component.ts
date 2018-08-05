import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PersonalInformation} from '../model/PersonalInformation';
import {TextPayload} from '../model/TextPayload';

@Component({
    selector: 'personal-information-editor',
    template: require('./PersonalInformationEditor.component.htm')
})
export class PersonalInformationEditorComponent {

    @Output()
    private personalInformationEmmiter = new EventEmitter<PersonalInformation>();
    private interests: TextPayload[] = [];

    constructor() {
    }

    private _personalInformation: PersonalInformation;

    @Input()
    get personalInformation(): PersonalInformation {
        return this._personalInformation;
    }

    set personalInformation(value: PersonalInformation) {
        this._personalInformation = value;
    }

    //todo: remove dis when you can change remote projects.
    get editMode(): boolean {
        return this.personalInformation instanceof LocalPersonalInformation;
    }

    updateFile(personalInformation: PersonalInformation): void {
        this.personalInformation = personalInformation;
    }

    addInterest(textPayload: TextPayload) {
        this.interests.push(textPayload)
    }
}