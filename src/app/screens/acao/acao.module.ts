import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputSwitchModule } from 'primeng/inputswitch';

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
    FormsModule,
    TableModule,
    TooltipModule,
    InputSwitchModule,
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
