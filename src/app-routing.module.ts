import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from 'public/pages/home-page/home-page.component';
import { AuthorizePageComponent } from 'public/pages/authorize-page/authorize-page.component';
import { RootRedirectGuard } from './common/guards/root-redirect.guard';
import { AuthGuard } from './common/guards/auth.guard';

const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
    canActivate: [RootRedirectGuard]
},
{
    path: 'home',
    component: HomePageComponent,
    canActivate: [RootRedirectGuard]
},
{
    path: 'authorize',
    component: AuthorizePageComponent,
    canActivate: [AuthGuard]
},
{
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canLoad: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
