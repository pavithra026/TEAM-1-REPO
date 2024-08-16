import { Injectable, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
 
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private router: Router) {}
 
  handleError(error: any): void {
    console.error('An error occurred:', error);
    // Navigate to the error page
    this.router.navigate(['/error']);
  }
}