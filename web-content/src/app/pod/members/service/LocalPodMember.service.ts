import {Injectable} from "@angular/core";
import {LocalPodMember} from "../model/LocalPodMember";
import {Identifier} from "../model/Identifier.model";

@Injectable()
export class LocalPodMemberService {
    private static localPodMemberCount: number = 0;

    constructor(){}

    public createLocalPodMember(): LocalPodMember {
        return new LocalPodMember(new Identifier(++LocalPodMemberService.localPodMemberCount + ''));
    }

}