import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ExecucaoComponent } from './execucao.component';
import { ExecucaoService } from './service/execucao.service';

@NgModule({
  declarations: [
    ExecucaoComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    ExecucaoComponent,
  ],
  providers: [
    ExecucaoService,
  ],
})
export class ExecucaoModule { }
