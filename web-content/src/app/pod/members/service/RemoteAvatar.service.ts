import {Injectable} from "@angular/core";
import {BackendAPIService} from "../../../services/BackendAPI.service";
import {WindowRef} from "../../../util/window";
import {RemoteAvatar} from "../model/RemoteAvatar";
import {Identifier} from "../model/Identifier.model";
import {Observable} from "rxjs/Observable";

@Injectable()
export class RemoteAvatarService {

    constructor(private backendAPISevice: BackendAPIService, private windowRef: WindowRef) {
    }

    public fetchRemoteProject(fileId: string): RemoteAvatar {
        return this.backendAPISevice.fetchImage(fileId)
            .map(arrayBuffer => this.convertToImageBinary(arrayBuffer))
            .map(base64Binary => new RemoteAvatar(fileId, base64Binary))
        return new RemoteAvatar(new Identifier(fileId),
            this.backendAPISevice.fetchImage(fileId)
                .map(arrayBuffer => this.convertToImageBinary(arrayBuffer)));
    }

    public fetchAllRemoteProjects(): Observable<RemoteAvatar> {
        return this.backendAPISevice.fetchAllImageIds()
            .map((response: any[]) => response)
            .flatMap(files => Observable.from(files))
            .map(identifier => identifier._id)
            .map(id => this.fetchRemoteProject(id));
    }

    removeProject(projectToRemove: RemoteAvatar): Observable<boolean> {
        return this.backendAPISevice.deleteImage(projectToRemove.getIdentifier());
    }

    private convertToImageBinary(arrayBuffer: any): any {
        let binary = '';
        let bytes = new Uint8Array(arrayBuffer);
        let len = bytes.byteLength;
        for (let i = 0; i < len; ++i) {
            binary += String.fromCharCode(bytes[i]);
        }
        return 'data:image/png;base64,' + this.windowRef.nativeWindow.btoa(binary);
    }
}