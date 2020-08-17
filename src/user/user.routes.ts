import { IssuesPageComponent } from './pages/issues-page/issues-page.component';
import { AuthGuard } from 'common/guards/auth.guard';
import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [{
    path: '',
    children: [{
        path: 'issues',
        component: IssuesPageComponent,
        canActivate: [ AuthGuard ],
    }]
}];
