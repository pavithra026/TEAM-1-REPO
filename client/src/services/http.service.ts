import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService  {
  public serverName = environment.apiUrl;

  constructor(private http: HttpClient,private authService:AuthService) { }

  getOrderStatus(cargoId: any): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.get(`${this.serverName}/api/order-status/${cargoId}`,{headers:headers});
  }

  // getOrderStatus(cargoId:any):Observable<any> {
  //   const authToken = this.authService.getToken();
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Content-Type', 'application/json');
  //   headers = headers.set('Authorization', `Bearer ${authToken}`)
  //   return this.http.get(this.serverName+`/api/state/`,{headers:headers});
  // }
 

  updateCargoStatus(newStatus: any, cargoId: any): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.put(`${this.serverName}/api/update-cargo-status/${cargoId}`, { status: newStatus },{headers:headers});
  }

  assignDriver(driverId: any, cargoId: any): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.post(`${this.serverName}/api/assign-driver`, { driverId, cargoId },{headers:headers});
  }

  getAssignOrders(driverId: any): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.get(`${this.serverName}/api/assign-orders/${driverId}`,{headers:headers});
  }

  getCargo(): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.get(`${this.serverName}/api/cargo`,{headers:headers});
  }

  getDrivers(): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.get(`${this.serverName}/api/drivers`,{headers:headers});
  }

  // addCargo(details: any): Observable<any> {
  //   const authToken = this.authService.getToken();
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Content-Type', 'application/json');
  //   headers = headers.set('Authorization', `Bearer ${authToken}`)
  //   return this.http.post(`${this.serverName}/add-cargo`, details,{headers:headers});
  // }

  addCargo(details: any): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${this.serverName}/api/business/cargo`, details, { headers: headers });
}


  registerUser(details:any):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.serverName+'/api/register',details,{headers:headers});
  }


 Login(details:any):Observable<any> {
   
   let headers = new HttpHeaders();
   headers = headers.set('Content-Type', 'application/json');
   return this.http.post(this.serverName+'/api/login',details,{headers:headers});
 }
}