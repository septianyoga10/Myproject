import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from '../product-detail/product-detail.component';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  title:any;
  cukur:any={};
  cukurs:any={};
  

  constructor(
    public dialog: MatDialog,
  ) { 
    this.title = 'Products';
  }

  ngOnInit(): void {
    console.log();
    this.title='Costumers';
    this.cukurs = {
      Nama : 'Joko',
      Model : 'Botak',
      Hari:'Rabu',
      Status:'Booked',
      Barber:'Ujang',
      Harga:'30.000'
    };
  }
  productDetail(data:any,idx:any)
  {
    let dialog=this.dialog.open(ProductDetailComponent, {
      width:'400px',
      data:data
    });
    dialog.afterClosed().subscribe(res=>{
      if(res)
      {
         //jika idx=-1 (penambahan data baru) maka tambahkan data
        if(idx==-1)this.cukurs.push(res);      
         //jika tidak maka perbarui data  
        else this.cukurs[idx]=res; 
      }
    })
   }
}
