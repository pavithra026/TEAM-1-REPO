import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss']
})

export class ShipmentsComponent{
    showError:boolean=false;
    errorMessage:any;
    cargList:any=[];
    assignModel: any={};
    driverList:any=[]
    showMessage: any;
    responseMessage: any;
    showMessageBox:boolean=false;
    paginatedCargoList: any = []; // Paginated list of cargo items
    currentPage: number = 1; // Current page number
    itemsPerPage: number = 6; // Number of items per page
  
    searchQuery: string = ''; // Search query
    selectedStatus: string = ''; // Selected status for sorting
  
    constructor(public router:Router, public httpService:HttpService, private formBuilder: FormBuilder, private authService:AuthService) 
    {

    }
  ngOnInit(): void {
     this.getCargo();
     this.getDrivers();
     this.assignModel.driverId=null;
    }
  
  getCargo() {
      this.cargList=[];
      this.httpService.getCargo().subscribe((data: any) => {
        this.cargList=data;
        // this.updateFilteredCargoList(); // Update filtered list after fetching data
        this.updatePaginatedCargoList(); // Update the paginated list after fetching data
        console.log(this.cargList);
      }, error => {
        // Handle error
        this.showError = true;
        this.errorMessage = "An error occurred while logging in. Please try again later.";
        console.error('Login error:', error);
      });;
    }
  getDrivers() {
      this.driverList=[];
      this.httpService.getDrivers().subscribe((data: any) => {
        this.driverList=data;
        console.log(this.driverList);
      }, error => {
        // Handle error
        this.showError = true;
        this.errorMessage = "An error occurred while logging in. Please try again later.";
        console.error('Login error:', error);
      });;
    }
    
    updatePaginatedCargoList() {
      let filteredCargo = this.cargList;
      
      if (this.searchQuery) {
        filteredCargo = filteredCargo.filter((cargo: any) =>
          cargo.content.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          cargo.id.toString().includes(this.searchQuery)
        );
      }
      
      if (this.selectedStatus) {
        filteredCargo = filteredCargo.filter((cargo: any) =>
          cargo.status === this.selectedStatus
        );
      }
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedCargoList = filteredCargo.slice(startIndex, endIndex);
    }
    
    goToPage(page: number) {
      this.currentPage = page;
      this.updatePaginatedCargoList();
    }
   
    get totalPages(): number {
      return Math.ceil(this.cargList.length / this.itemsPerPage);
    }
  
  addDriver(value:any)
    {
      this.assignModel.cargoId=value.id
    }
    assignDriver()
    {
      if(this.assignModel.driverId!=null)
      {
        this.showMessage = false;
        this.responseMessage = ''; 
        this.httpService.assignDriver(this.assignModel.driverId,this.assignModel.cargoId).subscribe((data: any) => {
          debugger;
          this.showMessage = true;
          this.responseMessage=data.message;
          const cargo = this.cargList.find((c: { id: any; }) => c.id === this.assignModel.cargoId);
          if (cargo) {
            cargo.assigned = true;
          }
        }, error => {
          // Handle error
          this.showError = true;
          this.errorMessage = "An error occurred while logging in. Please try again later.";
          console.error('Login error:', error);
        });;
      }
    }
}