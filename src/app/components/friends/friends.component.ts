import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FriendService } from '../../services/friends.services';


interface Friend{
  id:number;
  nameFriend:string;
} 

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  user:any;
  id:any;
  friends:any;
  myFriends:any;
  allFriends:any;
  arrFriends:any;
  notFriedns:Friend[]=[];
  title:boolean=false;

  getUserFromLocalStorage(){
    let userLocalStorage:any=localStorage.getItem("user");
    if(userLocalStorage){      
     return JSON.parse(userLocalStorage);     
    }
  }

  getNotFriends(){  
    this.arrFriends=this.friends; 
    this.notFriedns=[];
      for (let i=0; i<this.allFriends.length;i++){
       let find=true;
          for(let j=0;j<this.myFriends.length;j++){
                  if(this.allFriends[i].nameFriend===this.myFriends[j].nameFriend){
                    find=false;
                  }
          }
          if(find){
            this.notFriedns.push(this.allFriends[i]);          
          }
     }
     this.notFriedns.map((elem:any)=>{
      return elem.btnAdd=true;        
     })
        
  }

  getAllFriends(){
  
    this.friendService.getAllFriends()
    .subscribe((response)=>{
      this.allFriends=response;
      this.getNotFriends();
    })
  }

  getMyFriends(){
     
    this.arrFriends=[];
    this.friendService.getUser(this.getUserFromLocalStorage())
    .subscribe((response)=>{
      const teamFriends:any=response;    
      this.myFriends=teamFriends.friends;
      this.myFriends.map((elem:any)=>{
        return elem.btnRemove=true;
      })

      this.getAllFriends();
      this.friends=this.myFriends;
      
      localStorage.setItem("user",JSON.stringify(this.user));
    })
  }

  constructor(private friendService: FriendService) {
    
      this.friendService.getUser(this.getUserFromLocalStorage())
      .subscribe((responce)=>{
        this.user=responce;
        localStorage.setItem("user",JSON.stringify(this.user));
      })
  }


  ngOnInit(): void {

    this.getMyFriends();      
  }
  

  removeFriend(friend:any){
     
    let index=0;
    for (let key in this.user.friends){
      if(this.user.friends[key].id===friend.id){
        this.user.friends.splice(index,1);        
      }
      index++;      
    }

    this.friendService.updateFriends(this.user)
    .subscribe((response)=>{      
      this.user=response; 
      this.getMyFriends();

       localStorage.setItem("user", JSON.stringify(this.user));          
    });
    
  }
  
  searchFriend(value:string){
    this.title=true;
       this.friends=this.notFriedns.filter((elem:any)=>{ 
        if(elem.nameFriend.toLowerCase().includes(value.toLowerCase())){
          return elem;
        }
      })  
  }

  addFriend(user:any){
    user.btnAdd=false;
    this.user.friends.push(user);
    this.friendService.updateFriends(this.user)
    .subscribe((response)=>{      
      this.user=response; 
      this.getMyFriends();

       localStorage.setItem("user", JSON.stringify(this.user));          
    });   
    this.title=false;
  }

}
