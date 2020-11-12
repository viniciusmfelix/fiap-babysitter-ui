import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {TabMenuModule} from 'primeng/tabmenu';

import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TabMenuModule,
  ],
  exports: [
    MenuComponent,
  ],
})
export class MenuModule { }
