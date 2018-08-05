import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PersonalInformation} from '../model/PersonalInformation';
import {TextPayload} from '../model/TextPayload';
import {PodMember} from '../model/PodMember.model';
import {Action} from '../model/Action.model';

const uuid = require('uuid/v1');

export interface FieldChanged {
    value: string,
    field: string
}

@Component({
    selector: 'personal-information-editor',
    template: require('./PersonalInformationEditor.component.htm')
})
export class PersonalInformationEditorComponent {

    @Output()
    private personalInformationEmmiter = new EventEmitter<PersonalInformation>();

    @Output()
    private onAction = new EventEmitter<Action<FieldChanged>>();

    constructor() {
    }

    private _podMember: PodMember;

    get personalInformation(): PersonalInformation {
        return this.podMember.personalInformation;
    }

    @Input()
    get podMember(): PodMember {
        return this._podMember;
    }

    set podMember(value: PodMember) {
        this._podMember = value;
    }

    get firstName(): string {
        return this.personalInformation.firstName;
    }

    set firstName(value: string) {
        this.personalInformation.firstName = value;
    }

    get lastName(): string {
        return this.personalInformation.lastName;
    }

    set lastName(value: string) {
        this.personalInformation.lastName = value;
    }

    get email(): string {
        return this.personalInformation.email;
    }

    set email(value: string) {
        this.personalInformation.email = value;
    }

    get phoneNumber(): string {
        return this.personalInformation.phoneNumber;
    }

    set phoneNumber(value: string) {
        this.personalInformation.phoneNumber = value;
    }

    get interests(): Interest[] {
        return this.personalInformation.interests
    }

    addInterest(textPayload: TextPayload) {
        let interest = new Interest(uuid(), textPayload.value);
        const action: Action<any> = {
            type: 'INTEREST_CAPTURED',
            payload: {
                value: interest.value
            },
            error: false,
        };
        this.onAction.emit(action);
        this.personalInformation.addInterest(interest)
    }

    removeInterest(interest: Interest) {
        this.personalInformation.removeInterest(interest);
    }

    fieldChanged(event: FieldChanged): void {
        const action: Action<FieldChanged> = {
            type: 'PERSONAL_INFO_CAPTURED',
            payload: event,
            error: false,
        };
        this.onAction.emit(action);
    }
}

export class Interest {

    id: string;
    value: string;

    constructor(id: string, value: string) {
        this.id = id;
        this.value = value;
    }
}