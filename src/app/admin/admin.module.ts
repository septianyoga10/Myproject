import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialDesign } from '../material/material';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  {
    path:'',
      component:AdminComponent,
      children:[
        {
          path:'dashboard',
          component:DashboardComponent
        },
        {
          path:'product',
          component:ProductComponent
        },
        {
          path:'',
          pathMatch:'full',
          redirectTo:'/admin/dashboard'
        }
      ]
    }  
]

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    ProductComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialDesign
  ]
})
export class AdminModule { }
