import { TestBed } from '@angular/core/testing';
import { KeyName } from './key-name';

describe('KeyName', () => {
  let service: KeyName;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyName);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
