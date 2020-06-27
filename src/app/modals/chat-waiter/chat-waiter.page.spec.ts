import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatWaiterPage } from './chat-waiter.page';

describe('ChatWaiterPage', () => {
  let component: ChatWaiterPage;
  let fixture: ComponentFixture<ChatWaiterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatWaiterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatWaiterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
