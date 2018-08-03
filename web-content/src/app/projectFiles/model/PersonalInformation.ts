import {TextPayload} from './TextPayload';

export interface PersonalInformation {
    interests: TextPayload[];
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}