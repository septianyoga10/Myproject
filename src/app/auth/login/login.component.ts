import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
user:any={};
  constructor(
    public router: Router,
    public auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }

  hide: boolean=true;

  loading: boolean | undefined;
  login()
  {
    this.loading=true;
    this.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(res=>{
      this.loading=false;
      this.router.navigate(['public/home']);
    }).catch(err=>{
      this.loading=false;
      alert('Tidak dapat login');
    });
  }
}
