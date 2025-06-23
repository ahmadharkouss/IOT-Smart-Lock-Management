import { Routes } from '@angular/router';
import { LogInComponent } from './components/login/login.component';
import {HomeDashboardComponent } from './components/home/home.dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { RolesDashboardComponent } from './components/roles/roles.dashboard.component';
import { RightsDashboardComponent } from './components/rights/rights.dashboard.component';
import { LogsDashboardComponent } from './components/logs/logs.dashboard.component';
import { OptionsDashboardComponent } from './components/options/options.dashboard.component';  
import { AuthGuard } from './guards/auth-test.guard'; 

export const routes: Routes = [
    {path : 'login', component: LogInComponent},
    
    {path : '', component: SideNavComponent, canActivate:[AuthGuard], children: [
        {path : '', component: RolesDashboardComponent}, //change it after to home
        {path: 'home', component: HomeDashboardComponent},
       {path : 'door_rights', component:  RightsDashboardComponent},
        {path : 'options', component: OptionsDashboardComponent},
        {path : 'roles', component: RolesDashboardComponent},
        {path : 'logs', component: LogsDashboardComponent},
    ]},
    { path: '**', redirectTo: '' }  // Wildcard route for a 404 page or redirect to home page
];
