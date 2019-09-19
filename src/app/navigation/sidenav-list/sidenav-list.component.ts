import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  isAdmin: boolean = false;

  constructor(private auth: AuthService) { 
  }

  ngOnInit() {
    let loggedInName = localStorage.getItem('userName');
    if (loggedInName == 'Bob Hodges' || loggedInName == 'Debra Hodges')
    {        
      this.isAdmin = true; 
    }
    else
    {
      this.isAdmin = false;
    }
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  } 
}
