import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGuidePage } from './user-guide';

describe('UserguideComponent', () => {
  let component: UserGuidePage;
  let fixture: ComponentFixture<UserGuidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGuidePage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGuidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
