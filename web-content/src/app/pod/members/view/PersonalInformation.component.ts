import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PersonalInformation} from '../model/PersonalInformation';
import {TextPayload} from '../model/TextPayload';

@Component({
    selector: 'personal-information',
    template: require('./PersonalInformation.component.htm')
})
export class PersonalInformationComponent {

    @Output()
    private projectFileEmmiter = new EventEmitter<PersonalInformation>();
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

    get firstName(): string {
        return this.personalInformation.firstName;
    }

    get lastName(): string {
        return this.personalInformation.lastName;
    }

    get email(): string {
        return this.personalInformation.email;
    }


    get phoneNumber(): string {
        return this.personalInformation.phoneNumber;
    }

    updateFile(projectFile: PersonalInformation): void {
        this.personalInformation = projectFile;
    }

    addInterest(textPayload: TextPayload) {
        this.interests.push(textPayload)
    }
}