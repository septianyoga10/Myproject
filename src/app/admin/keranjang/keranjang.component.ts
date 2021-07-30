import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { KeranjangDetailComponent } from '../keranjang-detail/keranjang-detail.component';

@Component({
  selector: 'app-keranjang',
  templateUrl: './keranjang.component.html',
  styleUrls: ['./keranjang.component.scss']
})
export class KeranjangComponent implements OnInit {
  title:any
  trolly:any=[];
  userData: any = {};
  trollys: any;
  constructor(
    public dialog: MatDialog,
    public db: AngularFirestore,
    public auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.title='Trolly';
    this.auth.user.subscribe(user=>{
      this.userData = user;
      this.getTrollys();
    });
  }
  loading: boolean | undefined;
  getTrollys()
  {
    this.loading=true;
    this.db.collection('trollys', ref=>{
      return ref.where('uid','==', this.userData.uid);
    }).valueChanges({idField : 'id'}).subscribe(res=>{
      console.log(res);
      this.trollys=res;
      this.loading=false;
    },err=>{
      this.loading=false;
    })
  }
  keranjangDetail(data:any,idx:any)
  {
    let dialog=this.dialog.open(KeranjangDetailComponent, {
      width:'400px',
      data:data
    });
    dialog.afterClosed().subscribe(res=>{
      if(res)
      {
         //jika idx=-1 (penambahan data baru) maka tambahkan data
        if(idx==-1)this.trollys.push(res);      
         //jika tidak maka perbarui data  
        else this.trollys[idx]=res; 
      }
    })
   }
  loadingDelete:any={};
  deleteKeranjang(id: any, idx: any)
  {
    var conf=confirm('Delete Item?');
    if (conf)
    {
      this.db.collection('trollys').doc(id).delete().then(res=>{
        this.trollys.splice(idx,1);
        this.loadingDelete[idx]=false;
      }).catch(err=>{
        this.loadingDelete[idx]=false;
        alert('Tidak dapat menghapus data');
      });
    }
  }
}
