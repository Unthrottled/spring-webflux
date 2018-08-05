import {Component, OnInit} from "@angular/core";
import {PodMember} from "./model/PodMember.model";
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

    get podMembers(): Iterable<PodMember> {
        return this.podMemberService.podMembers;
    }

    addNewPodMember(): void {
        this.podMemberService.addPodMember();
    }
}