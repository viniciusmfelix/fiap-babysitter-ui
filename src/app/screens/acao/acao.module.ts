import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AcaoComponent } from './acao.component';

import { AcaoService } from './service/acao.service';

@NgModule({
  declarations: [
    AcaoComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    AcaoComponent,
  ],
  providers: [
    AcaoService,
  ],
})
export class AcaoModule { }
