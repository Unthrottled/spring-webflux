import {NgModule} from "@angular/core";
import {RemoteProjectFileService} from "./service/RemoteProjectFile.service";
import {ProjectFileChooseComponent} from "./choose/ProjectFileChoose.component";
import {ProjectFileListComponent} from "./list/ProjectFileList.component";
import {ProjectFileViewComponent} from "./view/ProjectFileView.component";
import {ProjectFilesComponent} from "./ProjectFiles.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {ProjectFileManipulationComponent} from "./manipulation/ProjectFileManipulation.component";
import {ProjectFileService} from "./service/ProjectFileService";
import {PodMemberComponent} from "./view/PodMember.component";
import {LocalProjectFileService} from "./service/LocalProjectFile.service";
import {ImageUploadService} from "./service/ImageUpload.service";
import {ProfileImageComponent} from './view/ProfileImage.component';
import {PersonalInformationComponent} from './view/PersonalInformation.component';

@NgModule({
        imports: [
            BrowserModule,
            FormsModule,
            HttpClientModule,
            BrowserAnimationsModule,

        ],
        exports: [
            ProjectFileChooseComponent,
            ProjectFileListComponent,
            ProjectFileViewComponent,
            PodMemberComponent,
            ProjectFilesComponent,
            ProjectFileManipulationComponent

        ],
        declarations:[
            ProjectFileChooseComponent,
            ProjectFileListComponent,
            ProjectFileViewComponent,
            PodMemberComponent,
            ProjectFilesComponent,
            ProjectFileManipulationComponent,
            ProfileImageComponent,
            PersonalInformationComponent
        ],
        bootstrap: [],
        providers: [RemoteProjectFileService,
            ProjectFileService,
            LocalProjectFileService,
            ImageUploadService
        ],
        schemas: []
})
export class ProjectFileModule {

}