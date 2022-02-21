import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()

export class FriendService{

    constructor(private http: HttpClient){
       
    }

    getUser(user:any){
        return this.http.get(`http://localhost:3000/users/${user.id}`);
    }

    getFriends(user:any){ 
       return this.http.get(`http://localhost:3000/users/${user.id}`);
    }
    
    getAllFriends(){
        return this.http.get(`http://localhost:3000/all_friends`);
    }

    updateFriends(user:any){
        return this.http.patch(`http://localhost:3000/users/${user.id}`,user);
    }

}