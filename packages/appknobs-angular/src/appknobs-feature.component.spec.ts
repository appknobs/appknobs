import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppknobsFeatureComponent } from './appknobs-feature.component';

describe('AppknobsFeatureComponent', () => {
  let component: AppknobsFeatureComponent;
  let fixture: ComponentFixture<AppknobsFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppknobsFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppknobsFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
