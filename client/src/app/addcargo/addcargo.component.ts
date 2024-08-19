import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-addcargo',
  templateUrl: './addcargo.component.html',
  styleUrls: ['./addcargo.component.css']
})
export class AddcargoComponent{
  itemForm: FormGroup;
  formModel:any={status:null};
  showError:boolean=false;
  errorMessage:any;
  showMessage: any;
  responseMessage: any;
  showMessageBox:boolean=false;
  minDate:any;


 
  
  constructor(public router:Router, public httpService:HttpService, private formBuilder: FormBuilder, private authService:AuthService) 
    {
      this.minDate = this.getTodayDate();
      this.itemForm = this.formBuilder.group({
        content: [this.formModel.username,[ Validators.required]],
        size: [this.formModel.password,[ Validators.required, Validators.min(1)]],
        status: [this.formModel.password,[ Validators.required]],
        pickupAddress: [this.formModel.pickupAddress, [Validators.required]],
        deliveryAddress: [this.formModel.deliveryAddress, [Validators.required]],
        estimatedDeliveryDate: [this.formModel.estimatedDeliveryDate, [Validators.required,this.dateValidator]],
        customerName: [this.formModel.customerName, [Validators.required]],
        senderName: [this.formModel.senderName, [Validators.required]]
       
    });
  }
  // getCargo() {
  //   this.cargList=[];
  //   this.httpService.getCargo().subscribe((data: any) => {
  //     this.cargList=data;
  //     // this.updateFilteredCargoList(); // Update filtered list after fetching data
  //     this.updatePaginatedCargoList(); // Update the paginated list after fetching data
  //     console.log(this.cargList);
  //   }, error => {
  //     // Handle error
  //     this.showError = true;
  //     this.errorMessage = "An error occurred while logging in. Please try again later.";
  //     console.error('Login error:', error);
  //   });;
  // }
  
  
 
  onSubmit()
  {
    if(this.itemForm.valid)
    {
      if (this.itemForm.valid) {
        this.showError = false;
    const popup = document.getElementById("submitPopup");
    popup?.classList.add("show");
    popup!.textContent = "Creating...";
        this.httpService.addCargo(this.itemForm.value).subscribe((data: any) => {
          this.itemForm.reset();
          // this.getCargo();
          popup!.textContent = "Shipment created successfully!";
        setTimeout(() => {
          popup?.classList.remove("show");
        }, 5000);
          
        }, error => {
          // Handle error
          this.showError = true;
          this.errorMessage = "An error occurred while logging in. Please try again later.";
          console.error('Login error:', error);
        });;
      } else {
        this.itemForm.markAllAsTouched();
      }
    }
    else{
      this.itemForm.markAllAsTouched();
    }
  }


  dateValidator(control: AbstractControl): ValidationErrors | null {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(control.value)) {
      return { invalidDate: true };
    }
    return null;
}

setMinDate() {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  this.minDate = today.toISOString().slice(0, 16);
}

private getTodayDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}
 
  
}