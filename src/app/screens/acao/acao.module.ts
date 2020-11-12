import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { AcaoComponent } from './acao.component';

import { AcaoService } from './service/acao.service';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AcaoComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    ToastModule,
  ],
  exports: [
    AcaoComponent,
  ],
  providers: [
    AcaoService,
    MessageService
  ],
})
export class AcaoModule { }
