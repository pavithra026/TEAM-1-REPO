
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
 
@Component({
  selector: 'app-assgin-cargo',
  templateUrl: './assgin-cargo.component.html',
  styleUrls: ['./assgin-cargo.component.css']
})
export class AssginCargoComponent {
 
 
  showError:boolean=false;
  errorMessage:any;
  cargList:any=[];
  statusModel: any={};
  showMessage: any;
  responseMessage: any;
  driverId: any = null;
  userId: number | null = null;
  paginatedCargoList: any = []; // This will hold the items for the current page
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 3; // Number of items per page
 
  constructor(public router:Router, public httpService:HttpService, private formBuilder: FormBuilder, private authService:AuthService)
  {
  }
  ngOnInit(): void {
    const userIdString = this.authService.getId; // Retrieve the user ID as a string
    this.userId = userIdString ? parseInt(userIdString, 10) : null; // Retrieve the user ID
    if (this.userId) {
      this.getDriverIdByUserId(this.userId); // Retrieve the driver ID
    }
   this.statusModel.newStatus=null;
   this.getAssginCargo()
  }
  getDriverIdByUserId(userId: number): void {
    this.httpService.getDriverIdByUserId(userId).subscribe(
      (id: number) => {
        this.driverId = id; // Set the driver ID
        console.log('Driver ID from my method:', this.driverId);
        this.getAssginCargo()
      },
      (error) => {
        // this.showError = true;
        // this.errorMessage = 'Error fetching driver ID';
      }
    );
  }
  getAssginCargo() {
    this.cargList=[];
    console.log("Before passing driver id:", this.driverId)
    this.httpService.getAssignOrders(this.driverId).subscribe((data: any) => {
      this.cargList=data;
      this.updatePaginatedCargoList(); // Update the paginated list

      console.log(this.cargList);
    }, error => {
      // Handle error
      // this.showError = true;
      this.errorMessage = "An error occurred while logging in. Please try again later.";
      console.error('Login error:', error);
    });;
  }

  
  updatePaginatedCargoList() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCargoList = this.cargList.slice(startIndex, endIndex);
  }
 
  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedCargoList();
  }
 
  get totalPages(): number {
    return Math.ceil(this.cargList.length / this.itemsPerPage);
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
 