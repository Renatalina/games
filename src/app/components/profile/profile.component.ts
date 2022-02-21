import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { ProfileService } from '../../services/profile.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;
  id:any;
  Username:any='';
  Age:any='';
  Email:any='';
  done: boolean=false;
  
  constructor(private profileService:ProfileService, private router:Router) {
    let userLocalStorage:any=localStorage.getItem("user");

    if(userLocalStorage){      
       this.id=JSON.parse(userLocalStorage).id;        
    }else{
     this.id=0;    
    } 
   }

  fillForm(){
    this.Age=this.user.age;
    this.Email=this.user.email;
    this.Username=this.user.username;   
  } 

  ngOnInit():void {
    this.profileService
    .getUser()
    .subscribe((responce)=>{        
         const userArray:any=responce;

         for (let key in userArray){           
          if(userArray[key].id===this.id){
            this.user=userArray[key];
            this.fillForm();         
          }
         }
    })  

  }

  submitForm(form:NgForm){
    this.user.age=form.value.age;
    this.user.username=form.value.username;
    this.user.id=200;   

    const updateUserInfo=JSON.stringify(this.user);
    localStorage.setItem("user", updateUserInfo);

    // this.profileService.updateUser(this.user)
    // .subscribe((response)=>{
    //   this.user=response,this.done=true;
    //   console.log(response);
    // });
    this.profileService.updateUser(this.user)
    .subscribe();

    this.router.navigate(['/games']); 
  } 

}
