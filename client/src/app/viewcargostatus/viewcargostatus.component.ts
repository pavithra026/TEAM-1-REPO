import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
 
@Component({
  selector: 'app-viewcargostatus',
  templateUrl: './viewcargostatus.component.html',
  styleUrls: ['./viewcargostatus.component.scss']
})
export class ViewcargostatusComponent{
 
  cargo:any={};
  showError:any;
  errorMessage: any;
  cargoIdMd:any;
 
  constructor(public router:Router,  
              private formBuilder: FormBuilder,
              private authService:AuthService,
              public httpService:HttpService,
              )
  {
  }
  ngOnInit(): void {
  }
  search()
  {
    debugger;
      if (!this.cargoIdMd) {
        this.showError = true;
        this.errorMessage = "Please enter a valid Cargo ID";
      } else {
        this.httpService.getOrderStatus(this.cargoIdMd).subscribe((data: any) => {
          this.cargoIdMd=data;
          console.log(data);
        }, error => {
          this.showError = true;
          this.errorMessage = "An error occurred while searching in. Please try again later or no record found";
          console.error('Login error:', error);
        });;
      }
    }
    }
 
 
 
 
 
   
  //todo: complete missing code..
 
 
 