
import { Component, OnInit } from '@angular/core';

import { HeaderComponent } from '../header/header.component';
import { LibraryGames } from '../../services/library.services';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  games:any;
  users:any;
  library:any;
  id:any;
       

  constructor(private libraryServices:LibraryGames) {
    const user:any=localStorage.getItem("user");
    if(user){
       this.id=JSON.parse(user).id;        
    }else{
     this.id=0;    
    }       
   }

  getLibrary(arrayOfLibrary:any){

    this.libraryServices
    .getGames()
    .subscribe((response)=> {
       this.library=response;  

    this.games=arrayOfLibrary.map((elem:any)=>{
            for (let key in this.library){
              if(this.library[key].id===elem.id){               
                return this.library[key];
              }              
            }
         })            

      });
  }
 
 getUser(){
    this.libraryServices
    .getUsers()
    .subscribe((response)=>{
    this.users=response;    

   for(let key in this.users){     
     if(this.users[key].id===this.id){
      this.getLibrary(this.users[key].library);      
       }    
     }  
     
    });
    
  }
  

  ngOnInit(): void {    
    this.getUser();      
  }

}
