import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubShowcaseComponent } from './github-showcase.component';

describe('GithubShowcaseComponent', () => {
  let component: GithubShowcaseComponent;
  let fixture: ComponentFixture<GithubShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubShowcaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
