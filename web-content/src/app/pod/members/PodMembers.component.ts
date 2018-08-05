import {Component, OnInit} from "@angular/core";
import {Avatar} from "./model/Avatar.model";
import {PodMemberService} from "./service/PodMember.service";

@Component({
    selector: 'project-file-component',
    template: require('./PodMembers.component.htm')
})
export class PodMembersComponent implements OnInit {
    ngOnInit(): void {
        this.projectFileService.ngOnInit();
    }

    // todo: start here!
    constructor(private projectFileService: PodMemberService){}

    get projectFiles(): Iterable<Avatar> {
        return this.projectFileService.projectFiles;
    }

    addNewPodMember(): void {
        this.projectFileService.addPodMember();
    }
}