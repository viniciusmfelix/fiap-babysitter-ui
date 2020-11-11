import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {TabMenuModule} from 'primeng/tabmenu';

import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    CommonModule,
    TabMenuModule,
  ],
  exports: [
    MenuComponent,
  ],
})
export class MenuModule { }
