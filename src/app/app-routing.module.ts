import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from 'public/pages/home-page/home-page.component';
import { AuthorizePageComponent } from 'public/pages/authorize-page/authorize-page.component';

const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
},
{
    path: 'home',
    component: HomePageComponent
},
{
    path: 'authorize',
    component: AuthorizePageComponent
},
{
    path: 'issues',
    component: HomePageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
