import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  userData: any = {};
  constructor(
    public dialogRef:MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public db: AngularFirestore,
    public auth: AngularFireAuth

  ) { }

  ngOnInit(): void {
    this.auth.user.subscribe((res: any)=>{
      this.userData = res;
    })
  }
  loading: boolean | undefined;
  saveData()
  {
    this.loading=true; 
    if(this.data.id == undefined)
    {
      //simpan ke fiirebase
      let doc = new Date().getTime().toString();
      this.data.uid = this.userData.uid;
      this.db.collection('costumers').doc(doc).set(this.data).then(res=>{
        this.dialogRef.close(this.data);
        this.loading=false;
      }).catch(er=>{
        console.log(er);
        this.loading=false;
        alert("Tidak dapat menyimpan data")
      })
    }else{
      this.db.collection('costumers').doc(this.data.id).update(this.data).then(res=>{
        this.dialogRef.close(this.data);
        this.loading=false;
      }).catch(er=>{
        console.log(er);
        this.loading=false;
        alert("Tidak dapat mengupdate data")
    })
  }
 }
}
