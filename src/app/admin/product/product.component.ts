import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  title:any;
  costumer:any=[];
  userData: any = {};
  costumers: any;
  constructor(
    public dialog: MatDialog,
    public db: AngularFirestore,
    public auth: AngularFireAuth
  ) { 
    
  }

  ngOnInit(): void {
    this.title='Costumers';
    this.auth.user.subscribe(user=>{
      this.userData = user;
      this.getCostumers();
    });
  }
  loading: boolean | undefined;
  getCostumers()
  {
    this.loading=true;
    this.db.collection('costumers', ref=>{
      return ref.where('uid','==', this.userData.uid);
    }).valueChanges({idField : 'id'}).subscribe(res=>{
      console.log(res);
      this.costumers=res;
      this.loading=false;
    },err=>{
      this.loading=false;
    })
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
        if(idx==-1)this.costumers.push(res);      
         //jika tidak maka perbarui data  
        else this.costumers[idx]=res; 
      }
    })
   }
   loadingDelete:any={};
  deleteProduct(id: any, idx: any)
  {
    var conf=confirm('Delete Item?');
    if (conf)
    {
      this.db.collection('costumers').doc(id).delete().then(res=>{
        this.costumers.splice(idx,1);
        this.loadingDelete[idx]=false;
      }).catch(err=>{
        this.loadingDelete[idx]=false;
        alert('Tidak dapat menghapus data');
      });
    }
  }

}
