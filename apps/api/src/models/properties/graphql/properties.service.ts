import { Injectable } from '@nestjs/common';
import { FindManyPropertyArgs, FindUniquePropertyArgs } from './dtos/find.args';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreatePropertyInput } from './dtos/create-property.input';
import { UpdatePropertyInput } from './dtos/update-property.input';
import { CreatePropertyFeatureInputWithoutPropertyId } from 'src/models/property-features/graphql/dtos/create-property-feature.input';
import { Prisma } from 'src/common/prisma/client';

@Injectable()
export class PropertiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    Address,
    brokerageId,
    responsibleAgentId,
    description,
    displayName,
    images,
    propertyType,
    purpose,
    listPrice,
    PropertyFeatures,
  }: CreatePropertyInput & {
    brokerageId?: number;
    responsibleAgentId: string;
  }) {
    if (PropertyFeatures.some((feature) => feature.quantity > 50)) {
      throw new Error(
        'PropertyFeature quantity cannot be more than 50 for any feature type.',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const createdProperty = await tx.property.create({
        data: {
          Address: { create: Address },
          brokerageId,
          responsibleAgentId,
          description,
          displayName,
          images,
          propertyType,
          purpose,
          listPrice,
          PropertyFeatures: {
            createMany: {
              data: this.mapFeatures(PropertyFeatures),
            },
          },
        },
        include: { PropertyFeatures: true },
      });

      return createdProperty;
    });
  }

  findAll(args: FindManyPropertyArgs) {
    return this.prisma.property.findMany(args);
  }

  findOne(args: FindUniquePropertyArgs) {
    return this.prisma.property.findUnique(args);
  }

  update(updatePropertyInput: UpdatePropertyInput) {
    const { id, Address, PropertyFeatures, ...data } = updatePropertyInput;
    return this.prisma.property.update({
      where: { id },
      data,
    });
  }

  remove(args: FindUniquePropertyArgs) {
    return this.prisma.property.delete(args);
  }

  private mapFeatures(
    features: CreatePropertyFeatureInputWithoutPropertyId[],
  ): Prisma.PropertyFeatureCreateManyPropertyInput[] {
    return features.map(({ displayName, quantity, type }) => ({
      displayName,
      quantity,
      type,
    }));
  }
}
