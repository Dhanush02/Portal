import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  flag: boolean = false;
  constructor(private router: Router) {}
  // @HostListener('window:scroll', ['$event'])
  // scrollHandler(event: any) {
  //   console.log(event);
  // }
  ngOnInit(): void {}
  openNav = () => {
    this.flag = true;
  };
  closeNav = () => {
    this.flag = false;
  };
  goDown2() {
    document.getElementById('section2').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
  goDown1() {
    document.getElementById('section1').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
  goDown3() {
    document.getElementById('section3').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
  goDown4() {
    document.getElementById('section4').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
  onCustomerLogin = () => {
    console.log('function works');
    this.router.navigate(['/customer/login']);
  };
}
