import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Carousel } from 'bootstrap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent{
  ngOnInit() {
    // Initialize all carousels
    const carouselElements = document.querySelectorAll('.carousel');
    carouselElements.forEach(carouselElement => {
      new Carousel(carouselElement);
    });
    

  }
}
