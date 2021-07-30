import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { feedbackDetailComponent } from '../feedback-detail/feedback-detail.component';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  title:any;
  feedback:any=[];
  userData: any = {};
  feedbacks: any;

  constructor(
    public dialog: MatDialog,
    public db: AngularFirestore,
    public auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.title='Review';
    this.auth.user.subscribe(user=>{
      this.userData = user;
      this.getFeedbacks();
    });
  }
  loading: boolean | undefined;
  getFeedbacks()
  {
    this.loading=true;
    this.db.collection('feedbacks', ref=>{
      return ref.where('uid','==', this.userData.uid);
    }).valueChanges({idField : 'id'}).subscribe(res=>{
      console.log(res);
      this.feedbacks=res;
      this.loading=false;
    },err=>{
      this.loading=false;
    })
  }
  feedbackDetail(data:any,idx:any)
  {
    let dialog=this.dialog.open(feedbackDetailComponent, {
      width:'400px',
      data:data
    });
    dialog.afterClosed().subscribe(res=>{
      if(res)
      {
         //jika idx=-1 (penambahan data baru) maka tambahkan data
        if(idx==-1)this.feedbacks.push(res);      
         //jika tidak maka perbarui data  
        else this.feedbacks[idx]=res; 
      }
    })
   }
  loadingDelete:any={};
  deletefeedback(id: any, idx: any)
  {
    var conf=confirm('Delete Item?');
    if (conf)
    {
      this.db.collection('feedbacks').doc(id).delete().then(res=>{
        this.feedbacks.splice(idx,1);
        this.loadingDelete[idx]=false;
      }).catch(err=>{
        this.loadingDelete[idx]=false;
        alert('Tidak dapat menghapus data');
      });
    }
  }
  uploadFile(data: any)
  {
    let dialog=this.dialog.open(FileUploaderComponent,{
      width:'400px',
      data: data
    });
    dialog.afterClosed().subscribe(res=>{
     return;
     })
  }
}
