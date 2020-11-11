import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcaoComponent } from './screens/acao/acao.component';
import { ExecucaoComponent } from './screens/execucao/execucao.component';
import { MenuComponent } from './screens/menu/menu.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: 'acoes',
        component: AcaoComponent,
      },
      {
        path: 'execucoes',
        component: ExecucaoComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
