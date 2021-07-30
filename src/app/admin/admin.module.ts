import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialDesign } from '../material/material';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HaircareComponent } from './haircare/haircare.component';
import { FormsModule } from '@angular/forms';
import { HaircareDetailComponent } from './haircare-detail/haircare-detail.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { feedbackDetailComponent } from './feedback-detail/feedback-detail.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { KeranjangComponent } from './keranjang/keranjang.component';
import { KeranjangDetailComponent } from './keranjang-detail/keranjang-detail.component';


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
          path:'haircare',
          component:HaircareComponent
        },
        {
          path:'keranjang',
          component:KeranjangComponent
        },
        {
          path:'feedback',
          component:FeedbackComponent
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
    ProductDetailComponent,
    HaircareComponent,
    HaircareDetailComponent,
    FeedbackComponent,
    feedbackDetailComponent,
    FileUploaderComponent,
    KeranjangComponent,
    KeranjangDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialDesign,
    FormsModule
  ]
})
export class AdminModule { }
