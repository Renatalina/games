import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class GamesServices{
   constructor(private http: HttpClient){ }
   
   getGames(){
       return this.http.get('http://localhost:3000/games');
   }

   getUserGames(user:any){       
       return this.http.get(`http://localhost:3000/users/${user.id}`);
   }

   updateGames(user:any){
    return this.http.patch(`http://localhost:3000/users/${user.id}`,user);
   }

}