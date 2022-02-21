import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class LibraryGames{
   constructor(private http: HttpClient){
       
   }
   getGames(){
       return this.http.get('http://localhost:3000/games');
   }
   getUsers(){
    return this.http.get('http://localhost:3000/users');
   }
}