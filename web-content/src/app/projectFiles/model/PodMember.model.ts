import {ProjectFile} from './ProjectFile.model';
import {PersonalInformation} from './PersonalInformation';

export interface PodMember {
    avatar: ProjectFile;
    personalInformation: PersonalInformation;
}