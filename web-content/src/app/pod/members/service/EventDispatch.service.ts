import {Injectable} from '@angular/core';
import {Action} from '../model/Action.model';
import {BackendAPIService} from '../../../services/BackendAPI.service';
import {Observable} from 'rxjs';

@Injectable()
export class EventDispatchService {

    constructor(private backendAPI: BackendAPIService) {
    }

    public dispatchAction<T>(action: Action<T>): Observable<Action<T>> {
        console.log(action);
        return this.backendAPI.postEvent(action);
    }

}