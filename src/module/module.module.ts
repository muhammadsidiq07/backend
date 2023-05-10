import { Module } from '@nestjs/common';
import { RolesService } from 'src/users/roles/roles.service';
import { RolesController } from 'src/users/roles/roles.controller';
import { UsersService } from 'src/users/users/users.service';
import { UsersController } from 'src/users/users/users.controller';
import { UserRolesService } from 'src/users/user-roles/user-roles.service';
import { UserRolesController } from 'src/users/user-roles/user-roles.controller';
import { UserBonusPointsService } from 'src/users/user-bonus-points/user-bonus-points.service';
import { UserBonusPointsController } from 'src/users/user-bonus-points/user-bonus-points.controller';
import UserPasswordService from 'src/users/user-password/user-password.service';
import { UserPasswordController } from 'src/users/user-password/user-password.controller';
import { UserMembersService } from 'src/users/user-members/user-members.service';
import { UserMembersController } from 'src/users/user-members/user-members.controller';
import { UserProfilesService } from 'src/users/user-profiles/user-profiles.service';
import { UserProfilesController } from 'src/users/user-profiles/user-profiles.controller';
import { Roles } from 'output/entities/Roles';
import { Members } from 'output/entities/Members';
import { Users } from 'output/entities/Users';
import { Address } from 'output/entities/Address';
import { UserRoles } from 'output/entities/UserRoles';
import { UserBonusPoints } from 'output/entities/UserBonusPoints';
import { UserPassword } from 'output/entities/UserPassword';
import { UserMembers } from 'output/entities/UserMembers';
import { UserProfiles } from 'output/entities/UserProfiles';
import { UserController } from 'src/users/user/user.controller';
import { UserService } from 'src/users/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalGuard } from 'src/auth/local.strategy';
import { JwtGuard } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Roles,
      Members,
      Users,
      Address,
      UserRoles,
      UserBonusPoints,
      UserPassword,
      UserMembers,
      UserProfiles,
    ]),
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '2d' },
    }),
  ],
  controllers: [
    RolesController,
    UsersController,
    UserRolesController,
    UserBonusPointsController,
    UserPasswordController,
    UserMembersController,
    UserProfilesController,
    UserController,
  ],
  providers: [
    RolesService,
    UsersService,
    UserRolesService,
    UserBonusPointsService,
    UserPasswordService,
    UserMembersService,
    UserProfilesService,
    UserService,
    LocalGuard,
    JwtGuard,
  ],
  exports: [UserService],
})
export class ModuleModule {}
