import {ProjectFile} from './Avatar.model';
import {PersonalInformation} from './PersonalInformation';

export interface PodMember {
    avatar: ProjectFile;
    personalInformation: PersonalInformation;
}