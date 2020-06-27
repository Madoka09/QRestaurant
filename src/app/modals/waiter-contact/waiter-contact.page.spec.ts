import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WaiterContactPage } from './waiter-contact.page';

describe('WaiterContactPage', () => {
  let component: WaiterContactPage;
  let fixture: ComponentFixture<WaiterContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaiterContactPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WaiterContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
