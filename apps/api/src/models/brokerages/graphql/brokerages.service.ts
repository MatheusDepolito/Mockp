import { Injectable } from '@nestjs/common';
import {
  FindManyBrokerageArgs,
  FindUniqueBrokerageArgs,
} from './dtos/find.args';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateBrokerageInput } from './dtos/create-brokerage.input';
import { UpdateBrokerageInput } from './dtos/update-brokerage.input';

@Injectable()
export class BrokeragesService {
  constructor(private readonly prisma: PrismaService) {}
  async create({
    description,
    displayName,
    brokerageManagerId,
    managerName,
  }: CreateBrokerageInput) {
    return this.prisma.brokerage.create({
      data: {
        description,
        displayName,
        BrokerageManagers: {
          create: {
            displayName: managerName,
            uid: brokerageManagerId,
          },
        },
      },
    });
  }

  findAll(args: FindManyBrokerageArgs) {
    return this.prisma.brokerage.findMany(args);
  }

  findOne(args: FindUniqueBrokerageArgs) {
    return this.prisma.brokerage.findUnique(args);
  }

  update(updateBrokerageInput: UpdateBrokerageInput) {
    const { id, ...data } = updateBrokerageInput;
    return this.prisma.brokerage.update({
      where: { id },
      data: data,
    });
  }

  remove(args: FindUniqueBrokerageArgs) {
    return this.prisma.brokerage.delete(args);
  }
}
