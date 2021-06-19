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
      name:'Class',
      icon:'Home',
      url:'/admin/product'
    },
    {
      group:'Menu Cukur',
      children:[
        {
          name:'Image Gallery',
          icon:'images',
          url:'/admin/product'
        }
      ]
    }
  ];
}