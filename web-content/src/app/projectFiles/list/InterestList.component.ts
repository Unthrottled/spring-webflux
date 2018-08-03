import {Component} from '@angular/core';


@Component({
    selector: 'interest-list',
    template: require('./InterestList.component.htm'),
})
export class InterestListComponent {

    task: string;
    tasks: any[] = [];

    onClick(){
        this.tasks.push({name: this.task});
        this.task = '';
    }
}