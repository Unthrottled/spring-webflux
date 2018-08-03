import {Injectable} from "@angular/core";
import {LocalAvatar} from "../model/LocalAvatar";
import {Identifier} from "../model/Identifier.model";

@Injectable()
export class LocalProjectFileService {
    private static localProjectCount: number = 0;

    constructor(){}

    public createLocalProject(): LocalAvatar {
        return new LocalAvatar(new Identifier(++LocalProjectFileService.localProjectCount + ''));
    }

}