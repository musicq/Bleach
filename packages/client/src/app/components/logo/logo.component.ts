import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LogoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
