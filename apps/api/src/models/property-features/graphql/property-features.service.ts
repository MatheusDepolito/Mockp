import { Injectable } from '@nestjs/common';
import {
  FindManyPropertyFeatureArgs,
  FindUniquePropertyFeatureArgs,
} from './dtos/find.args';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreatePropertyFeatureInput } from './dtos/create-property-feature.input';
import { UpdatePropertyFeatureInput } from './dtos/update-property-feature.input';

@Injectable()
export class PropertyFeaturesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPropertyFeatureInput: CreatePropertyFeatureInput) {
    return this.prisma.propertyFeature.create({
      data: createPropertyFeatureInput,
    });
  }

  findAll(args: FindManyPropertyFeatureArgs) {
    return this.prisma.propertyFeature.findMany(args);
  }

  findOne(args: FindUniquePropertyFeatureArgs) {
    return this.prisma.propertyFeature.findUnique(args);
  }

  update(updatePropertyFeatureInput: UpdatePropertyFeatureInput) {
    const { id, ...data } = updatePropertyFeatureInput;
    return this.prisma.propertyFeature.update({
      where: { id },
      data: data,
    });
  }

  remove(args: FindUniquePropertyFeatureArgs) {
    return this.prisma.propertyFeature.delete(args);
  }
}
