import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {PersonalInformation} from '../model/PersonalInformation';
import {TextPayload} from '../model/TextPayload';

@Component({
    selector: 'personal-information',
    template: require('./PersonalInformation.component.htm')
})
export class PersonalInformationComponent {

    constructor() {
    }

    private _personalInformation: PersonalInformation;

    @Output()
    private projectFileEmmiter = new EventEmitter<PersonalInformation>();


    @Input()
    get personalInformation(): PersonalInformation {
        return this._personalInformation;
    }

    set personalInformation(value: PersonalInformation) {
        this._personalInformation = value;
    }

    updateFile(projectFile: PersonalInformation): void {
        this.personalInformation = projectFile;
    }

    private interests: TextPayload[] = [];

    addInterest(textPayload: TextPayload){
        this.interests.push(textPayload)
    }
}