import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  userName: string = '';
   userEmail: string = '';  
  
  constructor() 
  {    
  } 

  ngOnInit() 
  { 
    this.userName = localStorage.getItem('userName');
    this.userEmail = localStorage.getItem('userEmail');
  } 
  
}
