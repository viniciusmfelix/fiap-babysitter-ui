import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  itens: MenuItem[];

  ngOnInit() {
    this.itens = [
      {
        label: 'Ações',
        icon: 'pi pi-fw pi-cog',
      },
      {
        label: 'Execuções',
        icon: 'pi pi-fw pi-refresh',
      },
    ];
  }

}
