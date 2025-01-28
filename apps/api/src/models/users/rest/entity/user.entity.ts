import { User } from '@prisma/client';
import { IsDate, IsString, IsInt, IsOptional } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class UserEntity implements RestrictProperties<UserEntity, User> {
  @IsOptional()
  image: string;
  uid: string;
  @IsOptional()
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
