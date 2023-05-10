import { Test, TestingModule } from '@nestjs/testing';
import { UserBonusPointsController } from './user-bonus-points.controller';

describe('UserBonusPointsController', () => {
  let controller: UserBonusPointsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBonusPointsController],
    }).compile();

    controller = module.get<UserBonusPointsController>(
      UserBonusPointsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
