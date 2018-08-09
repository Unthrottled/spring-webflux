import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Action} from '../pod/members/model/Action.model';
import {PersonalInformation} from '../pod/members/model/PersonalInformation';
import { catchError, map, tap} from 'rxjs/operators';
import {BrokerService} from './BrokerService';


@Injectable()
export class BackendAPIService {
    constructor(private httpClient: HttpClient, private brokerService: BrokerService) {
    }
    private _reqOptionsArgs= { headers: new HttpHeaders().set( 'Content-Type', 'application/json' ) };
    private _reqOptionsArgsStream= { headers: new HttpHeaders().set( 'Content-Type', 'application/stream+json' ) };


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

    public handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error("aoeuaoeu", error);
            return Observable.of(result as T);
        };
    }

    fetchAllPodMemberIdentifiers(): Observable<string> {
        this.brokerService.listen()
        return this.httpClient.get<any[]>('./api/pod/members', this._reqOptionsArgsStream)
            .catch((err => {
                console.warn('aww snap', err)
                return [];
            }))
            .flatMap((it: any[])=> Observable.create(it))
            .map(it => {
                console.warn('foobar', it)
                return it.toString();
            });
    }

    fetchPersonalInformation(podMemberId: string): Observable<PersonalInformation> {
        return this.httpClient.get('./api/pod/member/' + podMemberId + '/information', {
                responseType: 'json',
            }).map((response: PersonalInformation) => response)
    }

    postPodMemberEvent<T>(action: Action<T>, podMemberIdentifier: string): Observable<Action<T>> {
        return Observable.of(action);
    }

    postEvent<T>(action: Action<T>): Observable<Action<T>> {
        return Observable.of(action);
    }
}