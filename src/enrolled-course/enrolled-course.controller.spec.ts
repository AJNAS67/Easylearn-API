import { Test, TestingModule } from '@nestjs/testing';
import { EnrolledCourseController } from './enrolled-course.controller';

describe('EnrolledCourseController', () => {
  let controller: EnrolledCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnrolledCourseController],
    }).compile();

    controller = module.get<EnrolledCourseController>(EnrolledCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
