import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatemovieinfoComponent } from './updatemovieinfo.component';

describe('UpdatemovieinfoComponent', () => {
  let component: UpdatemovieinfoComponent;
  let fixture: ComponentFixture<UpdatemovieinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatemovieinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatemovieinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
