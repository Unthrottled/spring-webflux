import {Component, Input} from "@angular/core";
import {PodMember} from "../model/PodMember.model";

@Component({
    selector: 'pod-member-list',
    template: require('./PodMemberList.component.htm')
})
export class PodMemberListComponent {
    private _podMembers: PodMember[] = [];

    @Input()
    get podMembers(): PodMember[] {
        return this._podMembers;
    }

    set podMembers(value: PodMember[]) {
        console.log(value)
        this._podMembers = value;
    }
}