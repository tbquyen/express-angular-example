import { TestBed } from '@angular/core/testing';

import { QuizInfoService } from './quiz-info.service';

describe('QuizInfoService', () => {
  let service: QuizInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
