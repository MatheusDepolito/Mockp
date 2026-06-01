import { Injectable } from '@nestjs/common';
import {
  FindManyBrokerageManagerArgs,
  FindUniqueBrokerageManagerArgs,
} from './dtos/find.args';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateBrokerageManagerInput } from './dtos/create-brokerage-manager.input';
import { UpdateBrokerageManagerInput } from './dtos/update-brokerage-manager.input';

@Injectable()
export class BrokerageManagersService {
  constructor(private readonly prisma: PrismaService) {}
  create(createBrokerageManagerInput: CreateBrokerageManagerInput) {
    return this.prisma.brokerageManager.create({
      data: createBrokerageManagerInput,
    });
  }

  findAll(args: FindManyBrokerageManagerArgs) {
    return this.prisma.brokerageManager.findMany(args);
  }

  findOne(args: FindUniqueBrokerageManagerArgs) {
    return this.prisma.brokerageManager.findUnique(args);
  }

  update(updateBrokerageManagerInput: UpdateBrokerageManagerInput) {
    const { uid, ...data } = updateBrokerageManagerInput;
    return this.prisma.brokerageManager.update({
      where: { uid },
      data: data,
    });
  }

  remove(args: FindUniqueBrokerageManagerArgs) {
    return this.prisma.brokerageManager.delete(args);
  }
}
