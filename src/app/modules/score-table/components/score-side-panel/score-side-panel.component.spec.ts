import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreSidePanelComponent } from './score-side-panel.component';

describe('ScoreSidePanelComponent', () => {
  let component: ScoreSidePanelComponent;
  let fixture: ComponentFixture<ScoreSidePanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreSidePanelComponent]
    });
    fixture = TestBed.createComponent(ScoreSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
