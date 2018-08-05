import {Injectable, OnInit} from "@angular/core";
import {Avatar} from "../model/Avatar.model";
import {LocalAvatar} from "../model/LocalAvatar";
import {RemoteAvatar} from "../model/RemoteAvatar";
import {LocalProjectFileService} from "./LocalProjectFile.service";
import {ImageUploadService} from "./ImageUpload.service";
import {RemoteProjectFileService} from "./RemoteProjectFile.service";


@Injectable()
export class PodMemberService implements OnInit {
    private projectFileMap: Map<String, Avatar> = new Map<String, Avatar>();


    constructor(private localProjectFileService: LocalProjectFileService,
                private remoteProjectFileService: RemoteProjectFileService,
                private imageUploadService: ImageUploadService) {

    }

    ngOnInit(): void {
        this.remoteProjectFileService.fetchAllRemoteProjects()
            .subscribe(remoteFile=> {
                this.addProjectToList(remoteFile);
            }, error=> {
                console.log(error);
            })
    }


    get projectFiles(): Iterable<Avatar> {
        return this.projectFileMap.values();
    }

    addPodMember() {
        let items = this.localProjectFileService.createLocalProject();
        this.addProjectToList(items);
    }

    private addProjectToList(project: Avatar) {
        this.projectFileMap.set(project.getIdentifier(), project)
    }

    removeProjectFile(projectFile: Avatar) {
        if(projectFile instanceof RemoteAvatar){
            let self = this;
            this.remoteProjectFileService.removeProject(<RemoteAvatar>projectFile)
                .filter(b=>b)
                .subscribe(result=>{
                    self.removeProjectFileFromList(projectFile);
                }, error=>{
                    console.log(error)
            });
        } else if (projectFile instanceof LocalAvatar){
            this.removeProjectFileFromList(projectFile);
        }
    }

    private removeProjectFileFromList(projectFile: Avatar) {
        this.projectFileMap.delete(projectFile.getIdentifier());

    }

    uploadFile(projectFile: LocalAvatar) {
        this.imageUploadService.uploadImage(projectFile.selectedFile)
            .map(imageId=>this.remoteProjectFileService.fetchRemoteProject(imageId))
            .subscribe(remoteProject=> {
                this.removeProjectFileFromList(projectFile);
                this.projectFileMap.set(remoteProject.getIdentifier(), remoteProject);
            });
    }
}