// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HttpService } from '../../services/http.service';
// import { AuthService } from '../../services/auth.service';
// import { Observable } from 'rxjs';
 
// @Component({
//   selector: 'app-assgin-cargo',
//   templateUrl: './assgin-cargo.component.html',
//   styleUrls: ['./assgin-cargo.component.scss']
// })
// export class AssginCargoComponent implements OnInit{
//   //todo: complete missing code..
//   showError:any;
//   errorMessage:any;
//   cargList:any=[{}];
//   statusModel: any={};
//   showMessage: any;
//   responseMessage: any;
//   driverId:any;
  

 
//   constructor(private formBuilder: FormBuilder,
//     private router: Router,
//     private activateRoute:ActivatedRoute,
//     private httpService: HttpService,
//     private authService: AuthService) { }
//   ngOnInit(): void {
//    this.getAssginCargo();
//   }
 
//   getAssginCargo() {
//     this.cargList=[]
//     this.httpService.getAssignOrders(1).subscribe((data: any) => {
//       this.cargList = data;
//     }, (error: any) => {
//       this.showError = true;
//       this.errorMessage = 'Error fetching cargo data';
//     });
//   }
//   assignDriver(): void {
//     this.httpService.assignDriver(this.assignModel.driverId,this.assignModel.cargoId).subscribe((response: any) => {
//       this.showMessage = 'Driver assigned successfully!';
//     }, (error: any) => {
//       this.showError = true;
//       this.errorMessage = error.message;
//     });
//   }
//   addStatus(value: any): void {
//     this.showError = false;
//     this.httpService.updateCargoStatus(value.cargoId, value.newStatus).subscribe((response: any) => {
//       this.showMessage = 'Cargo status updated successfully!';
//     }, (error: any) => {
//       this.showError = true;
//       this.errorMessage = 'Failed to update cargo status.';
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
 
@Component({
  selector: 'app-assgin-cargo',
  templateUrl: './assgin-cargo.component.html',
  styleUrls: ['./assgin-cargo.component.scss']
})
export class AssginCargoComponent {
 
 
  showError:boolean=false;
  errorMessage:any;
  cargList:any=[];
  statusModel: any={};
  showMessage: any;
  responseMessage: any;
 
  constructor(public router:Router, public httpService:HttpService, private formBuilder: FormBuilder, private authService:AuthService)
  {
  }
  ngOnInit(): void {
   this.getAssginCargo();
   this.statusModel.newStatus=null;
  }
  getAssginCargo() {
    this.cargList=[];
    this.httpService.getAssignOrders(1).subscribe((data: any) => {
      this.cargList=data;
      console.log(this.cargList);
    }, error => {
      // Handle error
      this.showError = true;
      this.errorMessage = "An error occurred while logging in. Please try again later.";
      console.error('Login error:', error);
    });;
  }
  addStatus(value:any)
  {
    this.statusModel.cargoId=value.id
  }
  assignDriver()
  {
    if(this.statusModel.newStatus!=null)
    {
      this.showMessage = false;
      this.httpService.updateCargoStatus(this.statusModel.newStatus,this.statusModel.cargoId).subscribe((data: any) => {
        debugger;
        this.showMessage = true;
        this.responseMessage=data.message;;
        this.getAssginCargo();
      }, error => {
        // Handle error
        this.showError = true;
        this.errorMessage = "An error occurred while logging in. Please try again later.";
        console.error('Login error:', error);
      });;
    }
  }
 
 
 
}
 