import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialDesign } from '../material/material';
import { ThanksComponent } from './thanks/thanks.component';

const routes: Routes = [
  {
    path:'',
    component:PublicComponent,
    children:[
      {
      path:'home',
      component:HomeComponent
      },
      {
      path:'thanks',
      component:ThanksComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    PublicComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialDesign

  ]
})
export class PublicModule { }
