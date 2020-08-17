import { NgModule } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IssuesPageComponent } from './pages/issues-page/issues-page.component';
import { RouterModule } from '@angular/router';
import { USER_ROUTES } from './user.routes';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { IssueComponent } from './components/issue/issue.component';

@NgModule({
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        RouterModule.forChild(USER_ROUTES),
        MatCardModule,
        MatButtonModule,
    ],
    declarations: [ IssuesPageComponent, IssueComponent ],
    providers: [],
    exports: [],
})
export class UserModule { }
