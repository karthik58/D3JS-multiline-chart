import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatMenuModule, MatSidenavModule } from '@angular/material';

import { AppComponent } from './app.component';

import { MultilinechartComponent } from './multilinechart/multilinechart.component';

const appRoutes: Routes = [

    { path: 'multilinechart', component: MultilinechartComponent },
    { path: '',
        redirectTo: '/multilinechart',
        pathMatch: 'full'
    },
    { path: '**', component: MultilinechartComponent },
];

@NgModule({
    declarations: [
        AppComponent,
     
        MultilinechartComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        MatMenuModule,
        MatSidenavModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
