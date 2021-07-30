import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { HaircareDetailComponent } from '../haircare-detail/haircare-detail.component';


@Component({
  selector: 'app-haircare',
  templateUrl: './haircare.component.html',
  styleUrls: ['./haircare.component.scss']
})
export class HaircareComponent implements OnInit {
  title:any;
  hair:any=[];
  userData: any = {};
  hairs: any;

  constructor(
    public dialog: MatDialog,
    public db: AngularFirestore,
    public auth: AngularFireAuth
  ) { 

  }
  ngOnInit(): void {
    this.title='HairCare';
    this.auth.user.subscribe(user=>{
      this.userData = user;
      this.getHairs();
    });
  }
  loading: boolean | undefined;
  getHairs()
  {
    this.loading=true;
    this.db.collection('hairs', ref=>{
      return ref.where('uid','==', this.userData.uid);
    }).valueChanges({idField : 'id'}).subscribe(res=>{
      console.log(res);
      this.hairs=res;
      this.loading=false;
    },err=>{
      this.loading=false;
    })
  }
  haircareDetail(data:any,idx:any)
  {
    let dialog=this.dialog.open(HaircareDetailComponent, {
      width:'400px',
      data:data
    });
    dialog.afterClosed().subscribe(res=>{
      if(res)
      {
         //jika idx=-1 (penambahan data baru) maka tambahkan data
        if(idx==-1)this.hairs.push(res);      
         //jika tidak maka perbarui data  
        else this.hairs[idx]=res; 
      }
    })
   }
  loadingDelete:any={};
  deleteHairCare(id: any, idx: any)
  {
    var conf=confirm('Delete Item?');
    if (conf)
    {
      this.db.collection('hairs').doc(id).delete().then(res=>{
        this.hairs.splice(idx,1);
        this.loadingDelete[idx]=false;
      }).catch(err=>{
        this.loadingDelete[idx]=false;
        alert('Tidak dapat menghapus data');
      });
    }
  }
}


