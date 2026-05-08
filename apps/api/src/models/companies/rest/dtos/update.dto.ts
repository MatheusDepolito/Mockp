import { PartialType } from '@nestjs/swagger';
import { CreateCompany } from './create.dto';
import { Company } from 'src/common/prisma/client';

export class UpdateCompany extends PartialType(CreateCompany) {
  id: Company['id'];
}
