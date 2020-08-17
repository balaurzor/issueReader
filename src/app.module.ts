import { NgModule } from '@angular/core';

import { AppRoutingModule } from 'app-routing.module';
import { AppComponent } from 'app.component';
import { PublicModule } from 'public/public.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootRedirectGuard } from 'common/guards/root-redirect.guard';
import { AuthInterceptor } from 'common/interceptors/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from 'common/guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { CommonUserModule } from 'common/common-user.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        CommonUserModule,
        CommonModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        PublicModule
    ],
    providers: [
        { provide: 'window', useValue: window },
        { provide: 'document', useValue: document },
        RootRedirectGuard,
        AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
