import { Test, TestingModule } from '@nestjs/testing';
import { UserMembersController } from './user-members.controller';

describe('UserMembersController', () => {
  let controller: UserMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMembersController],
    }).compile();

    controller = module.get<UserMembersController>(UserMembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
