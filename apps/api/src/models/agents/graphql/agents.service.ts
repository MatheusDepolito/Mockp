import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { FindManyAgentArgs, FindUniqueAgentArgs } from './dtos/find.args';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateAgentInput } from './dtos/create-agent.input';
import { UpdateAgentInput } from './dtos/update-agent.input';

@Injectable()
export class AgentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createWithAccount(
    createAgentInput: CreateAgentInput & { brokerageId: number },
  ) {
    const { email, displayName, licenseID, image, brokerageId } =
      createAgentInput;

    const existingUser = await this.prisma.credentials.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists with this email.');
    }

    const uid = uuid();
    const temporaryPassword = randomBytes(9).toString('base64url').slice(0, 12);
    const passwordHash = bcrypt.hashSync(
      temporaryPassword,
      bcrypt.genSaltSync(),
    );

    const user = await this.prisma.user.create({
      data: {
        uid,
        name: displayName,
        image,
        Credentials: {
          create: {
            email,
            passwordHash,
          },
        },
        AuthProvider: {
          create: {
            type: 'CREDENTIALS',
          },
        },
        Agent: {
          create: {
            displayName,
            licenseID,
            image,
            brokerageId,
          },
        },
      },
      include: {
        Agent: true,
      },
    });

    if (!user.Agent) {
      throw new BadRequestException('Failed to create agent.');
    }

    return {
      agent: user.Agent,
      email,
      temporaryPassword,
    };
  }

  findAll(args: FindManyAgentArgs) {
    return this.prisma.agent.findMany(args);
  }

  findOne(args: FindUniqueAgentArgs) {
    return this.prisma.agent.findUnique(args);
  }

  update(updateAgentInput: UpdateAgentInput) {
    const { uid, ...data } = updateAgentInput;
    return this.prisma.agent.update({
      where: { uid },
      data: data,
    });
  }

  remove(args: FindUniqueAgentArgs) {
    return this.prisma.agent.delete(args);
  }

  async validAgent(uid: string) {
    const agent = await this.prisma.agent.findUnique({
      where: { uid: uid },
    });
    if (!agent) {
      throw new BadRequestException('You are not an agent.');
    }
    return agent;
  }
}
