import { Test, TestingModule } from '@nestjs/testing';
import { EnrolledCourseService } from './enrolled-course.service';

describe('EnrolledCourseService', () => {
  let service: EnrolledCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnrolledCourseService],
    }).compile();

    service = module.get<EnrolledCourseService>(EnrolledCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
