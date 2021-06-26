import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  mode: string='side';

  menu=[
    {
      name:'Dashboard',
      icon:'dashboard',
      url:'/admin/dashboard'
    },
    {
      group:'Menu Cukur',
      children:[
        {
          name:'Costumers',
          icon:'perm_identity',
          url:'/admin/product'
        },
        {
          name:'Hair Care',
          icon:'add_shopping_cart',
          url:'/public/home'
        },
      ]
    }
  ];
}