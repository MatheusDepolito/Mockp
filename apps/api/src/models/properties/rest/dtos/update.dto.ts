import { PartialType } from '@nestjs/swagger';
import { CreateProperty } from './create.dto';
import { Property } from 'src/common/prisma/client';

export class UpdateProperty extends PartialType(CreateProperty) {
  id: Property['id'];
}
