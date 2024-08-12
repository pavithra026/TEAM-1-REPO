import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-addcargo',
  templateUrl: './addcargo.component.html',
  styleUrls: ['./addcargo.component.scss']
})
export class AddcargoComponent implements OnInit {
  itemForm!: FormGroup;
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  cargList: any[] = [];
  assignModel: any = {};
  driverList: any[] = [];
  showMessage: any;
  responseMessage: any;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.itemForm = this.formBuilder.group({
      content: ['', [Validators.required]],
      size: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getCargo();
    this.getDrivers();
  }

  getCargo() {
    this.httpService.getCargo().subscribe(
      (data: any) => this.cargList = data
      // ,
      // (error: any) => {
      //   this.showError = true;
      //   this.errorMessage = 'Error fetching cargo data';
      // }
    );
  }

  getDrivers() {
    this.httpService.getDrivers().subscribe(
      (data: any) => this.driverList = data
      // ,
      // (error: any) => {
      //   this.showError = true;
      //   this.errorMessage = 'Error fetching drivers data';
      // }
    );
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.httpService.addCargo(this.itemForm.value).subscribe(
        (response: any) => {
          this.showMessage = true;
          this.responseMessage = 'Cargo added successfully';
          this.itemForm.reset();
          // this.router.navigateByUrl('dashboard');
        },
        (error: any) => {
          this.showError = true;
          this.errorMessage = 'Error adding cargo';
        }
      );
    }
  }

  addDriver(value: any) {
    this.httpService.assignDriver(value.driverId, value.cargoId).subscribe(
      (response: any) => {
        this.showMessage = true;
        this.responseMessage = 'Driver assigned successfully';
      },
      (error: any) => {
        this.showError = true;
        this.errorMessage = 'Error assigning driver';
      }
    );
  }

  assignDriver() {
    if (this.assignModel.driverId && this.assignModel.cargoId) {
      this.addDriver(this.assignModel);
    }
  }
}