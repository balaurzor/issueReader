import { NgModule } from '@angular/core';
import { GithubService } from './helpers/github.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports: [
        MatSnackBarModule
    ],
    declarations: [],
    providers: [
        GithubService
    ],
    exports: [],
})
export class CommonUserModule { }
