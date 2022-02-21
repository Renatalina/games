import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm} from '@angular/forms';
import { LoginService } from './form-sign-in.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-sign-in',
  templateUrl: './form-sign-in.component.html',
  styleUrls: ['./form-sign-in.component.css']
})

export class FormSignInComponent implements OnInit{
  user:any;
  
    constructor (private loginService:LoginService, private router:Router){ }


    ngOnInit(): void {
      if(localStorage.length>0){
        this.router.navigate(['/games']);
        console.log("You are registered");
      }else{
      this.loginService
       .getUsers()
       .subscribe((responce)=>{
          this.user=responce;       
       });
      }       
    }
 
    submitForm(form: NgForm): void{

      this.user.map((elem:any)=>{
        if(elem.email===form.value.email&&elem.password===form.value.pass){          
          const user=JSON.stringify(elem);
          localStorage.setItem("user", user);
          this.router.navigate(['/games']); 
        }        
      }) 
      
    }    
}


// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { LoginService } from './form-sign-in.service';

// @Component({
//   selector: 'app-form-sign-in',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {
//   loginFormCtrl: FormGroup;

//   constructor(private LoginService: LoginService, private router: Router) {
//     this.loginFormCtrl = new FormGroup({
//       email: new FormControl('', Validators.required),
//       password: new FormControl(null, Validators.required)
//     })
//   }


//   ngOnInit(): void {

//   }

//   onLogin() {
//     if (this.loginFormCtrl.invalid)
//       return;

//     this.LoginService.loginUser(this.loginFormCtrl.value.email, this.loginFormCtrl.value.password).then((result) => {
      
//       if (result == null) {                              
//         console.log('logging in...');
//         this.router.navigate(['']);             
//       }
//       else if (result.isValid == false) {
//         console.log('login error', result);
//       }
//     });
//   }

// }