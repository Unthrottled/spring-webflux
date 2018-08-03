import {Component} from '@angular/core';
import {TextPayload} from '../model/TextPayload';


@Component({
    selector: 'interest-list',
    template: require('./InterestList.component.htm'),
})
export class InterestListComponent {

    interests: TextPayload[] = [];

    intrestAdded(interest: TextPayload) {
        this.interests.push(interest);
    }
}