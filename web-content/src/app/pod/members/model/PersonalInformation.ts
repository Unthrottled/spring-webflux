import {Interest} from '../edit/PersonalInformationEditor.component';
import {PodMember} from './PodMember.model';

export class PersonalInformation {
    interests: Interest[] = [];
    email: string = '';
    firstName: string = '';
    lastName: string = '';
    phoneNumber: string = '';
    podMember: PodMember;


    constructor(podMember: PodMember) {
        this.podMember = podMember;
    }

    addInterest(interest: Interest): void {
        this.interests.push(interest)
    }

    removeInterest(interest: Interest): void {
        this.interests = this.interests.filter(it => it.id !== interest.id)
    }
}

