import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  itens: MenuItem[];

  ngOnInit(): void {
    this.itens = [
      {
        label: 'Ações',
        icon: 'pi pi-fw pi-cog',
        command: () => {
          this.router.navigateByUrl('/acoes');
        },
      },
      {
        label: 'Execuções',
        icon: 'pi pi-fw pi-refresh',
        command: () => {
          this.router.navigateByUrl('/execucoes');
        },
      },
    ];
  }

  constructor(private router: Router) { }

}
