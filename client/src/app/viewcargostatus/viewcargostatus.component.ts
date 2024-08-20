import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-viewcargostatus',
  templateUrl: './viewcargostatus.component.html',
  styleUrls: ['./viewcargostatus.component.scss']
})
export class ViewcargostatusComponent {
  cargo:any={}
  showError:any;
  errorMessage: any;
  cargoIdMd:any;
  cargoDetails:any={}
  constructor(public router:Router, public httpService:HttpService, private formBuilder: FormBuilder, private authService:AuthService) 
  {

  }
  get progressWidth() {
    switch (this.cargo.status) {
        case 'Pending':
            return '10%'; // Set 1/3 width for Pending
        case 'In_Transit':
            return '53%'; // Set 2/3 width for In Transit
        case 'Delivered':
            return '100%'; // Set full width for Delivered
        default:
            return '0%'; // Default to no progress if status is unknown
    }
}
  search()
  {
    this.showError = false;
    debugger;
    if(this.cargoIdMd!=null)
    {
      this.cargo={};
      this.httpService.getOrderStatus(this.cargoIdMd).subscribe((data: any) => {
        this.cargo=data;
        console.log(this.cargo);
      }
      , error => {
        // Handle error
        this.showError = true;
        this.errorMessage = "An error occurred while searching in. Please try again later or no record found";
        console.error('Login error:', error);
      })
      this.httpService.getCargoDetails(this.cargoIdMd).subscribe((data)=>{
        this.cargoDetails=data;
      },
      error => {
        // Handle error
        this.showError = true;
        this.errorMessage = "An error occurred while getting cargo by id. Please try again later or no record found";
        console.error('Login error:', error);
      })
    }
     
    
  }
}