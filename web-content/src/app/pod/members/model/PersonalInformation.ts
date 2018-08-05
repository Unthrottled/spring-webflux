import {TextPayload} from './TextPayload';
import {Interest} from '../edit/PersonalInformationEditor.component';

export class PersonalInformation {
    interests: Interest[] = [];
    email: string = '';
    firstName: string = '';
    lastName: string = '';
    phoneNumber: string = '';

    addInterest(interest: Interest): void {
        this.interests.push(interest)
    }

    removeInterest(interest: Interest): void {
        this.interests = this.interests.filter(it => it.id !== interest.id)
    }
}

