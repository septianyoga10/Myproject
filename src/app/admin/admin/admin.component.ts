import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  mode: string='side';

  menu=[
    {
      name:'Home',
      icon:'home',
      url:'/admin/dashboard'
    },
    {
      group:'Menus',
      children:[
        {
          name:'Costumers',
          icon:'perm_identity',
          url:'/admin/product'
        },
        {
          name:'HairCare Product',
          icon:'shopping_bag',
          url:'/admin/haircare'
        },
        {
          name:'Trolly',
          icon:'add_shopping_cart',
          url:'/admin/keranjang'
        },
        {
          name:'Review',
          icon:'question_answer',
          url:'/admin/feedback'
        },
      ]
    },
    {
      group:'Others',
      children:[
        {
          name:'Logout',
          icon:'power_settings_new',
          url:'/public/thanks'
        },
      ]
    }
  ];
}