import { PartialType } from '@nestjs/swagger';
import { CreatePropertyFeature } from './create.dto';
import { PropertyFeature } from 'src/common/prisma/client';

export class UpdatePropertyFeature extends PartialType(CreatePropertyFeature) {
  id: PropertyFeature['id'];
}
