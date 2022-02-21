import { Component,  EventEmitter, Output, OnInit } from '@angular/core';
import { GamesServices } from '../../services/games.services';



interface Game{
   id:number;
   title:string;
   price:number;
   type:string;
   discription:string;
} 

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  firstTime:boolean=true;
  Indie:boolean=false;
  Adventure:boolean=false;
  Active:boolean=false;
  games:any;
  user:any;
  fullGames:any;
  gamesUsers:any;
  gamesNotLibraryUser:Game[]=[];
  gamesForCheckedInput:Game[]=[];
  gamesForSlideBar:Game[]=[];
  value:0;
  invert:any;
  thumbLabel:any;
  

  constructor(private gamesServices: GamesServices) {
    let userLocalStorage:any=localStorage.getItem("user");
    if(userLocalStorage){     
      this.user= JSON.parse(userLocalStorage);     
    }
   }

  ngOnInit(): void {
    this.gamesServices    
    .getGames()
    .subscribe((response)=> {
        this.fullGames=response;
      });
    this.gamesServices
    .getUserGames(this.user)
    .subscribe((responce)=>{
      this.user=responce; 
      this.gamesUsers=this.user.library;
      this.getGamesNotLibrary();
    })    
  }

  getGamesNotLibrary(){

    this.gamesNotLibraryUser=[];
    this.fullGames.filter((elem:Game)=>{
      if(
        !this.gamesUsers.find((game:Game)=>{
            if(game.id===elem.id){
              return elem;
            }else{
              return false;
            }
       })       
      ){ this.gamesNotLibraryUser.push(elem)};
     }) 
        this.games=this.gamesNotLibraryUser;
        this.gamesForCheckedInput=this.games;
        this.gamesForSlideBar=this.games;
  }

  addGame(game:Game){

   this.user.library.push({"id":game.id});
   this.gamesServices
   .updateGames(this.user)
   .subscribe((responce)=>{
     this.user=responce;
     localStorage.setItem("user", JSON.stringify(this.user));
     this.gamesUsers=this.user.library;
     this.getGamesNotLibrary();     
   })
  }

  searchGame(value:string){

      this.games=this.gamesNotLibraryUser.filter((elem:any)=>{
        if(elem.title.toLowerCase().includes(value.toLowerCase())){
          return elem;
        }
      })
      this.gamesForCheckedInput=this.games;
  }
  
  switchOffOnValueInput(value:string, state:boolean){

    if(value==="Indie"){
     this.Indie=state;
    }else if(value==="Action"){
      this.Active=state;
    }else{
      this.Adventure=state;
    }
    this.checkChange();
  }

  checkChange(){

   if(!this.Active&&!this.Adventure&&!this.Indie){    
     this.games=this.gamesForCheckedInput;      
   }else{  
   this.games=this.gamesForCheckedInput.filter((elem:any)=>{     
            if(elem.type==="Indie"&&this.Indie){
              return elem;
            }else if(elem.type==="Action"&&this.Active){
              return elem;
            }else if(elem.type==="Adventure"&&this.Adventure){
              return elem;
            }
    })
  }
  }

  checked(value:Event){

   if((<HTMLInputElement>value.target).checked){
      this.switchOffOnValueInput((<HTMLInputElement>value.target).value,true);
   }else{
      this.switchOffOnValueInput((<HTMLInputElement>value.target).value,false);        
   }    
  }


  changeMatslider(event:any){
   
   this.games=this.gamesForSlideBar.filter((elem:Game)=>{
      if(elem.price/10<event.value){
        return elem;
      }else{
        return false;
      }
    }) 
    
    console.log(this.games);

  }

  
  
}
