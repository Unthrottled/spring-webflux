import {Avatar} from './Avatar.model';
import {Identifier} from './Identifier.model';
import {PodMember} from './PodMember.model';
import {PersonalInformation} from './PersonalInformation';

export class LocalPodMember implements PodMember {
    personalInformation: PersonalInformation = new PersonalInformation();
    avatar: Avatar;
    private _identifier: Identifier;

    constructor(id: Identifier, avatar: Avatar) {
        this._identifier = id;
        this.avatar = avatar;
    }

    getIdentifier(): string {
        return this._identifier.id;
    }

    setAvatar(avatar: Avatar): void {
        this.avatar = avatar;
    }
}