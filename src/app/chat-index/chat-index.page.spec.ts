import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatIndexPage } from './chat-index.page';

describe('ChatIndexPage', () => {
  let component: ChatIndexPage;
  let fixture: ComponentFixture<ChatIndexPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatIndexPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
