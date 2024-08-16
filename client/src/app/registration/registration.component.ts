import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  itemForm!: FormGroup;
  formModel: any = { role: null, email: '', password: '', username: '' };
  showMessage: boolean = false;
  responseMessage: any;
  showError:boolean=false;
  errorMessage:any;

  constructor(public router:Router, private httpService:HttpService, private formBuilder: FormBuilder) { 
    
    this.itemForm = this.formBuilder.group({
      email: [this.formModel.email,[ Validators.required, Validators.email]],
      password: [this.formModel.password,[ Validators.required]],
      role: [this.formModel.userType,[ Validators.required]],
      username: [this.formModel.username,[ Validators.required]],
  });
}

ngOnInit(): void {
}

onRegister()
{
  if(this.itemForm.valid)
  {this.showError=false;
    this.showMessage=false;
    this.httpService.registerUser(this.itemForm.value).subscribe(data=>{
      this.showMessage=true;
      this.responseMessage='Welcome '+data.name +" you are successfully registered";
      this.itemForm.reset();
      
    },error=>{
      this.showError=true;
      this.errorMessage=error.error})
  }
  else{
    this.itemForm.markAllAsTouched();
  }
}
}
