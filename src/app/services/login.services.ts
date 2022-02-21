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