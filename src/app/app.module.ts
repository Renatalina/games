import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FormSignInComponent } from './components/form-sign-in/form-sign-in.component';

import { importType } from '@angular/compiler/src/output/output_ast';
import { environment } from 'src/environments/environment';
import { ProfileComponent } from './components/profile/profile.component';
import { LibraryComponent } from './components/library/library.component';
import { FriendsComponent } from './components/friends/friends.component';
import { GamesComponent } from './components/games/games.component';
import { HttpClientModule } from '@angular/common/http';
import { LibraryGames } from './services/library.services';
import { GamesServices } from './services/games.services';
import { LoginService } from './components/form-sign-in/form-sign-in.service';
import { ProfileService } from './services/profile.services';
import { FriendService } from './services/friends.services';
import { RouterModule } from '@angular/router';
import {MatSliderModule} from "@angular/material/slider"




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormSignInComponent,
    ProfileComponent,
    LibraryComponent,
    FriendsComponent,
    GamesComponent   

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,  
    MatSliderModule
  ],

  providers: [
    LibraryGames,
    GamesServices,
    LoginService,
    ProfileService,
    FriendService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
