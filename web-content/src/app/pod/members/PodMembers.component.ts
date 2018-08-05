import {Component, OnInit} from "@angular/core";
import {Avatar} from "./model/Avatar.model";
import {PodMemberService} from "./service/PodMember.service";

@Component({
    selector: 'pod-member-component',
    template: require('./PodMembers.component.htm')
})
export class PodMembersComponent implements OnInit {
    ngOnInit(): void {
        this.podMemberService.ngOnInit();
    }

    // todo: start here!
    constructor(private podMemberService: PodMemberService){}

    get podMembers(): Iterable<Avatar> {
        return this.podMemberService.podMembers;
    }

    addNewPodMember(): void {
        this.podMemberService.addPodMember();
    }
}