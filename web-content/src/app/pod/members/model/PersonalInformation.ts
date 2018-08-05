import {TextPayload} from './TextPayload';

export class PersonalInformation {
    interests: TextPayload[] = [];
    email: string = '';
    firstName: string = '';
    lastName: string = '';
    phoneNumber: string = '';

    addInterest(interest: TextPayload): void {
        this.interests.push(interest)
    }
}

