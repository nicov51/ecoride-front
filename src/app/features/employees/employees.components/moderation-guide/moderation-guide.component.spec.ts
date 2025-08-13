import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerationGuideComponent } from './moderation-guide.component';

describe('ModerationGuideComponent', () => {
  let component: ModerationGuideComponent;
  let fixture: ComponentFixture<ModerationGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModerationGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModerationGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
