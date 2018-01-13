import { Component } from '@angular/core';

@Component({
  selector: 'app-404-page',
  templateUrl: './404.page.html',
  styleUrls: ['./404.page.scss']
})
export class NotFundPage {
  error: number = 404;
}
