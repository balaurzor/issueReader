import { NgModule } from '@angular/core';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthorizePageComponent } from './pages/authorize-page/authorize-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const matModules = [
    MatCardModule,
    MatInputModule,
    MatButtonModule
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ...matModules
    ],
    declarations: [ HomePageComponent, LoginFormComponent, AuthorizePageComponent ],
    providers: [],
    exports: [ HomePageComponent, AuthorizePageComponent ],
})
export class PublicModule { }
