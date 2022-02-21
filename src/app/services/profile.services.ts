import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()

export class ProfileService{

    constructor(private http: HttpClient){
       
    }
    getUser(){
     return this.http.get('http://localhost:3000/users');
    }

    updateUser(user:any){ 
      return this.http.patch(`http://localhost:3000/users/${user.id}`, user);           
    }
}