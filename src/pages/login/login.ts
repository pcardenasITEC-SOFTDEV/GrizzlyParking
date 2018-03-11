import { SignupPage } from '../signup/signup';
import { HomePage } from './../home/home';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { Component } from '@angular/core';

import { 
  IonicPage, 
  NavController,
  Loading,
  LoadingController,
  AlertController, 
  NavParams } from 'ionic-angular';
import { User } from "../../shared/models/user";
import { 
  FormBuilder, 
  Validators, 
  FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  public loginForm: FormGroup;
  public loading: Loading;


  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder, 
    public navParams: NavParams) {
      this.loginForm = formBuilder.group({
        email: ['', 
        Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', 
        Validators.compose([Validators.minLength(6), Validators.required])]
      });
    }
 
//Begin Auth Methods
loginUser(): void {
  if (!this.loginForm.valid){
    console.log(this.loginForm.value);
  } else {
    this.authProvider.loginUser(this.loginForm.value.email, 
      this.loginForm.value.password)
    .then( authData => {
      this.loading.dismiss().then( () => {
        this.navCtrl.setRoot(HomePage);

      });
    }, error => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }
}

//navigation methods
goToSignup(): void { 
  this.navCtrl.push(SignupPage); 
}

goToResetPassword(): void { 
  this.navCtrl.push(ResetPasswordPage); 
}

  // async login(user: User) {
  //   try {
  //     const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  //     if (result) {
  //       this.navCtrl.setRoot(HomePage);
  //     }  
  //   }
  //   catch (e) {
  //     console.error(e);
  //   }
  // }
 
  // async register(user: User) {
  //   try {
  //     const result = await this.afAuth.auth.createUserWithEmailAndPassword(
  //       user.email,
  //       user.password
  //     );
  //     if (result) {
  //       this.navCtrl.setRoot(HomePage);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }
}