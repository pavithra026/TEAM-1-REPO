import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class Navbar{
    IsLoggin:any=false;
    roleName!: string | null;
    username!:string|null;
    constructor(private authService: AuthService, private router:Router)
    {
        
      debugger;
      this.IsLoggin=authService.getLoginStatus;
      this.roleName=authService.getRole;
    //   this.username=this.authService.getUsername;
    //   console.log(this.username)
      if(this.IsLoggin==false)
      {
        this.router.navigateByUrl('/login'); 
      
      }
    }
    
    logout()
  {
    this.authService.logout();
    window.location.reload();
  }
  
}