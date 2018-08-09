// Declare oboe as a Variable
import {Injectable} from '@angular/core';


declare var oboe: any;

@Injectable()
export class BrokerService {
    private oboeService: any;
    constructor() {
        this.listen();
    }

    listen(): void {
        console.log("registering message broker")
        var config = {
            'url': './api/pod/members',
            'method': "GET",
            'body': '',
            'cached': false,
            'withCredentials': true
        }
        this.oboeService = oboe(config);
        // The '!' will only consume complete json objects
        this.oboeService.node ('!', function (thing: any) {
            console.log("new broker message", thing);
        });
    }
}