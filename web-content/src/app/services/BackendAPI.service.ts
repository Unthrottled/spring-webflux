import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Action} from '../pod/members/model/Action.model';
import {Interest} from '../pod/members/edit/PersonalInformationEditor.component';

@Injectable()
export class BackendAPIService {
    constructor(private httpClient: HttpClient) {
    }


    postImage(podMemberId: string, formData: FormData): Observable<string> {
        return this.httpClient.post('./api/pod/member'+ podMemberId + '/avatar', formData, {
            responseType: 'text'
        });
    }

    fetchImage(podMemberId: string): Observable<ArrayBuffer> {
        return this.httpClient.get('./api/pod/member'+ podMemberId + '/avatar' , {
            responseType: 'arraybuffer'
        });
    }

    deleteImage(podMemberId: string): Observable<boolean> {
        return this.httpClient.delete('./api/pod/member'+ podMemberId + '/avatar' , {
            responseType: 'json'
        }).map(response => (<Boolean>response === true));
    }

    //todo: should go
    fetchAllImageIds(): Observable<any> {
        return this.httpClient.get('', {
            responseType: 'json'
        })
    }

    fetchAllPodMemberIdentifiers(): Observable<string> {
        return this.httpClient.get('./api/pod/members', {
        responseType: 'text'
            }
        );
    }

    fetchAllPodMemberInterests(podMemberId: string): Observable<any> {
        return this.httpClient.get('./api/pod/member/' + podMemberId + '/interests', {
                responseType: 'json',
                observe: 'events'
    }
        ).map((response: HttpEvent<Object>) => response)
    }

    postEvent<T>(action: Action<T>): Observable<Action<T>> {
        return Observable.of(action);
    }
}