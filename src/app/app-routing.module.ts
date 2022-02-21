import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSignInComponent } from './components/form-sign-in/form-sign-in.component';
import { FriendsComponent } from './components/friends/friends.component';
import { GamesComponent } from './components/games/games.component';
import { LibraryComponent } from './components/library/library.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path:'profile', component:ProfileComponent},
  {path:'library', component:LibraryComponent},
  {path:'friends', component:FriendsComponent},
  {path:'games', component:GamesComponent},
  {path:'', component:FormSignInComponent},
  {path:'login', component:FormSignInComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
