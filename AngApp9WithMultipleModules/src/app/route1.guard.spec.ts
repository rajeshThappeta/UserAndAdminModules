import { TestBed } from '@angular/core/testing';

import { Route1Guard } from './route1.guard';

describe('Route1Guard', () => {
  let guard: Route1Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Route1Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
