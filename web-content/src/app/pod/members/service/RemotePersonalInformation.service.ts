import {Injectable} from "@angular/core";
import {BackendAPIService} from "../../../services/BackendAPI.service";
import {WindowRef} from "../../../util/window";
import {RemoteAvatar} from "../model/RemoteAvatar";
import {Identifier} from "../model/Identifier.model";
import {Observable} from "rxjs/Observable";
import {PersonalInformation} from '../model/PersonalInformation';

@Injectable()
export class RemotePersonalInformationService {

    constructor(private backendAPISevice: BackendAPIService) {
    }

    public fetchRemotePersonalInformation(fileId: string): Observable<PersonalInformation> {
        return Observable.empty<PersonalInformation>();
    }

}