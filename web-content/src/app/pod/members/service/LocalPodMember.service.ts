import {Injectable} from "@angular/core";
import {LocalPodMember} from "../model/LocalPodMember";
import {Identifier} from "../model/Identifier.model";
import {LocalProjectFileService} from './LocalProjectFile.service';

@Injectable()
export class LocalPodMemberService {
    private static localPodMemberCount: number = 0;

    constructor(private localProjectFileService: LocalProjectFileService){}

    public createLocalPodMember(): LocalPodMember {
        return new LocalPodMember(new Identifier(++LocalPodMemberService.localPodMemberCount + ''),
            this.localProjectFileService.createLocalProject());
    }

}