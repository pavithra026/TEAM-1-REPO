import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
 
@Component({
  selector: 'app-assgin-cargo',
  templateUrl: './assgin-cargo.component.html',
  styleUrls: ['./assgin-cargo.component.scss']
})
export class AssginCargoComponent {
  //todo: complete missing code..
  showError:boolean=false;
  errorMessage:any;
  cargList:any=[];
  statusModel: any={};
  showMessage: any;
  responseMessage: any
 
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private authService: AuthService) { }
 
  getAssginCargo(driverId:any) {
    this.cargList=[]
    this.httpService.getAssignOrders(driverId).subscribe((data: any) => {
      this.cargList = data;
    }, (error: any) => {
      this.showError = true;
      this.errorMessage = 'Error fetching cargo data';
    });
  }
  assignDriver(driverId: number, cargoId: number): void {
    this.httpService.assignDriver(driverId, cargoId).subscribe((response: any) => {
      this.showMessage = 'Driver assigned successfully!';
    }, (error: any) => {
      this.showError = true;
      this.errorMessage = error.message;
    });
  }
  addStatus(value: any): void {
    this.httpService.updateCargoStatus(value.cargoId, value.newStatus).subscribe((response: any) => {
      this.showMessage = 'Cargo status updated successfully!';
    }, (error: any) => {
      this.showError = true;
      this.errorMessage = 'Failed to update cargo status.';
    });
  }
}
 