import {Component, OnInit} from "@angular/core";
import {Avatar} from "./model/Avatar.model";
import {ProjectFileService} from "./service/ProjectFileService";

@Component({
    selector: 'project-file-component',
    template: require('./PodMembers.component.htm')
})
export class PodMembersComponent implements OnInit {
    ngOnInit(): void {
        this.projectFileService.ngOnInit();
    }

    constructor(private projectFileService: ProjectFileService){}

    get projectFiles(): Iterable<Avatar> {
        return this.projectFileService.projectFiles;
    }

    addFile(): void {
        this.projectFileService.addProject();
    }
}