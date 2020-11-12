import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'primeng/toast';

import { MenuModule } from './screens/menu/menu.module';
import { AcaoModule } from './screens/acao/acao.module';
import { ExecucaoModule } from './screens/execucao/execucao.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastModule,
    MenuModule,
    AcaoModule,
    ExecucaoModule,
    AppRoutingModule,
  ],
  providers: [NgbTooltipConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
