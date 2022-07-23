import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ven-card',
  templateUrl: './ven-card.component.html',
  styleUrls: ['./ven-card.component.css']
})
export class VenCardComponent implements OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit(): void {
  }

}
