import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileJson: string = null;
  profile: any;

  constructor(public auth: AuthService) {} 

  ngOnInit() {    
    this.auth.userProfile$.subscribe(
      profile => this.profileJson = JSON.stringify(profile, null, 2)
    );  
    var jObj = JSON.parse(this.profileJson);
    if (jObj)
    {        
      let key = 'Item 1';
      localStorage.setItem(key, jObj.name);   
    }
  }
}
