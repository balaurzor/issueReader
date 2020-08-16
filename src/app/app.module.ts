import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicModule } from 'public/public.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        PublicModule
    ],
    providers: [
        { provide: 'window', useValue: window },
        { provide: 'document', useValue: document }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
