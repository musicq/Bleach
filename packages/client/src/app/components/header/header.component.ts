import { Component, Directive, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';


@Directive({
  selector: 'app-sub-header',
})
export class SubHeaderDirective {
  @HostBinding() class: string = 'app-sub-header';
}

@Directive({
  selector: 'app-main-header',
})
export class MainHeaderDirective {
  @HostBinding() class: string = 'app-main-header';
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
