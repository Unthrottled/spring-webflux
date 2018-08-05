import {Avatar} from './Avatar.model';
import {PersonalInformation} from './PersonalInformation';

export interface PodMember {
    avatar: Avatar;
    personalInformation: PersonalInformation;
    getIdentifier(): string;
    setAvatar(avatar: Avatar): void;

}