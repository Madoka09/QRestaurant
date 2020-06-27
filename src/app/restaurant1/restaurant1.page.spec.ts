import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Restaurant1Page } from './restaurant1.page';

describe('Restaurant1Page', () => {
  let component: Restaurant1Page;
  let fixture: ComponentFixture<Restaurant1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Restaurant1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Restaurant1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
