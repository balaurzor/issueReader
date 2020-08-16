import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { GithubService } from './helpers/github.service';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { AuthorizePageComponent } from './pages/authorize-page/authorize-page.component';

const matModules = [
    MatCardModule,
    MatInputModule,
    MatButtonModule
];

@NgModule({
    imports: [
        ...matModules,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserModule
    ],
    declarations: [ HomePageComponent, LoginFormComponent, AuthorizePageComponent ],
    providers: [ GithubService ],
    exports: [ HomePageComponent, AuthorizePageComponent ],
})
export class PublicModule { }
