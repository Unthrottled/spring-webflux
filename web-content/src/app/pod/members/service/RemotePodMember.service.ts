import {Injectable} from "@angular/core";
import {BackendAPIService} from "../../../services/BackendAPI.service";
import {WindowRef} from "../../../util/window";
import {RemoteAvatar} from "../model/RemoteAvatar";
import {Identifier} from "../model/Identifier.model";
import {Observable} from "rxjs/Observable";
import {PodMember} from '../model/PodMember.model';
import {RemoteAvatarService} from './RemoteAvatar.service';

@Injectable()
export class RemotePodMemberService {

    constructor(private backendAPISevice: BackendAPIService,
                private remoteAvatarService: RemoteAvatarService) {
    }

    public fetchPodMember(fileId: string): Observable<PodMember> {
        // return this.backendAPISevice.fetchImage(fileId)
        return Observable.empty();

    }

    public fetchAllRemotePodMembers(): Observable<PodMember> {
        return this.backendAPISevice.fetchAllPodMemberIdentifiers()
            .flatMap(id => this.fetchPodMember(id));
    }

    removeProject(projectToRemove: PodMember): Observable<boolean> {
        return this.backendAPISevice.deleteImage(projectToRemove.getIdentifier());
    }
}