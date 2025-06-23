import { Component } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { RouterModule, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgClass} from '@angular/common';

import { Router } from '@angular/router';
@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [ NgClass, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatDividerModule, RouterModule, RouterOutlet , MatToolbarModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.less'
})
export class SideNavComponent 
{
  constructor( private router: Router) {}
  menulist : any[] = [
    //{name: 'Home', icon: 'home', route: 'home'}, //aka list of doors with open option
    {name: 'Roles', icon: 'group', route: 'roles'},
    {name: 'Door Rights', icon: 'room_preferences', route: 'door_rights'},
    {name: 'Logs', icon: 'history', route: 'logs'},
    //{name: 'Options', icon: 'settings', route: 'options'},
    {name: 'LogOut', icon: 'logout', route: 'login'}
  ];

}
