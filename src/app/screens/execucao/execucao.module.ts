import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressBarModule } from 'primeng/progressbar';

import { ExecucaoComponent } from './execucao.component';
import { ExecucaoService } from './service/execucao.service';

@NgModule({
  declarations: [
    ExecucaoComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    TooltipModule,
    ProgressBarModule,
  ],
  exports: [
    ExecucaoComponent,
  ],
  providers: [
    ExecucaoService,
  ],
})
export class ExecucaoModule { }
