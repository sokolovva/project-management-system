import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjectForUserComponent } from './list-project-for-user.component';

describe('ListProjectForUserComponent', () => {
  let component: ListProjectForUserComponent;
  let fixture: ComponentFixture<ListProjectForUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProjectForUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProjectForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
