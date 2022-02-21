// import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { Router } from '@angular/router';
// import { AngularFirestore } from '@angular/fire/compat/firestore';


// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {
//   userLoggedIn: boolean;  

//   constructor(private afAuth: AngularFireAuth, private router : Router,  private afs: AngularFirestore) {
//     this.userLoggedIn = false;
//   }

//   loginUser(email: string, password: string): Promise<any> {
//       return this.afAuth.signInWithEmailAndPassword(email,password)
//         .then(() => {
//             console.log('Auth Service: loginUser: success');
//             //  this.router.navigate(['']);
//         })
//         .catch(error => {
//             console.log('Auth Service: login error...');
//             console.log('error code', error.code);
//             console.log('error', error);
//             if (error.code)
//                 return { isValid: false, message: error.message };
//             else
//                 return { isValid: false, message : "Login Error"}
//         });
//   }

// }

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()

export class LoginService{
    constructor(private http: HttpClient){
       
    }
    getUsers(){
     return this.http.get('http://localhost:3000/users');
    }
}