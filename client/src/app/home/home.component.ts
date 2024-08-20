import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Carousel } from 'bootstrap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent{
    // Initialize all carousels
    
    
  customerCount: number = 4930;
  parcelCount: number = 8970;
  warehouseCount: number = 229;

  private customerStartCount = 4930;
  private customerEndCount = 9780;
  private parcelStartCount = 8970;
  private parcelEndCount = 22690;
  private warehouseStartCount = 229;
  private warehouseEndCount = 789;
  private duration = 10000; // Duration of the animation in milliseconds

  ngOnInit(): void {
    this.animateCount(this.customerStartCount, this.customerEndCount, 'customerCount');
    this.animateCount(this.parcelStartCount, this.parcelEndCount, 'parcelCount');
    this.animateCount(this.warehouseStartCount, this.warehouseEndCount, 'warehouseCount');
    const carouselElements = document.querySelectorAll('.carousel');
    carouselElements.forEach(carouselElement => {
      new Carousel(carouselElement);
    });
  }

  private animateCount(start: number, end: number, property: 'customerCount' | 'parcelCount' | 'warehouseCount'): void {
    let startTime: number | null = null;
    const element = this[property];

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const count = Math.floor(start + (end - start) * (progress / this.duration));

      this[property] = count;

      if (progress < this.duration) {
        requestAnimationFrame(updateCount);
      } else {
        this[property] = end;
      }
    };

    requestAnimationFrame(updateCount);
  }
  }
  

