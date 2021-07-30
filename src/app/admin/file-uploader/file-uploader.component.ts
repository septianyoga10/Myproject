import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  userData: any;

  constructor(
    public dialogRef: MatDialogRef<FileUploaderComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public db: AngularFirestore,
    public auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.auth.user.subscribe((res: any) => {
      this.userData = res;
    })
  }
  selectedFile: any;
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile.type != "file/image") alert('file harus berbentu image');
      console.log(this.selectedFile);
    }
  }
  loadingUpload: boolean | undefined;
  uploadFile() {
    let input = new FormData();
    input.append('file', this.selectedFile);

    this.loadingUpload = true;
    if (this.data.id == undefined) {
      let doc = new Date().getTime().toString();
      this.data.uid = this.userData.uid;
      this.db.collection('feedbacks').doc(doc).set(this.data).then(res => {
        this.dialogRef.close(this.data);
        this.loadingUpload = false;
      }).catch(er => {
        console.log(er);
        this.loadingUpload = false;
        alert("Tidak dapat menyimpan data")
      })
    } else {
      this.db.collection('feedbacks').doc(this.data.id).update(this.data).then(res => {
        this.dialogRef.close(this.data);
        this.loadingUpload = false;
      }).catch(er => {
        console.log(er);
        this.loadingUpload = false;
        alert("Tidak dapat mengupdate data")
      })
    }
  }
}

