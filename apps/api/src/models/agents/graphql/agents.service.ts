import { HttpStatus, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { FindManyAgentArgs, FindUniqueAgentArgs } from './dtos/find.args';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateAgentInput } from './dtos/create-agent.input';
import { RegisterSoloAgentInput } from './dtos/register-solo-agent.input';
import { UpdateAgentInput } from './dtos/update-agent.input';
import { ErrorCodes } from 'src/common/errors/error-codes';
import { appException } from 'src/common/errors/error-response';

@Injectable()
export class AgentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createWithAccount(
    createAgentInput: CreateAgentInput & { brokerageId: number },
  ) {
    const { email, displayName, licenseID, image, brokerageId } =
      createAgentInput;

    const existingUser = await this.prisma.credentials.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw appException(
        HttpStatus.BAD_REQUEST,
        ErrorCodes.UserEmailAlreadyExists,
        'User already exists with this email.',
      );
    }

    const temporaryPassword = randomBytes(9).toString('base64url').slice(0, 12);
    const passwordHash = bcrypt.hashSync(
      temporaryPassword,
      bcrypt.genSaltSync(),
    );

    const user = await this.createAgentUser({
      email,
      passwordHash,
      displayName,
      licenseID,
      image,
      brokerageId,
      verified: false,
    });

    if (!user.Agent) {
      throw appException(
        HttpStatus.BAD_REQUEST,
        ErrorCodes.AgentCreateFailed,
        'Failed to create agent.',
      );
    }

    return {
      agent: user.Agent,
      email,
      temporaryPassword,
    };
  }

  async registerSoloAgent({
    email,
    password,
    displayName,
    licenseID,
    image,
  }: RegisterSoloAgentInput) {
    const existingUser = await this.prisma.credentials.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw appException(
        HttpStatus.BAD_REQUEST,
        ErrorCodes.UserEmailAlreadyExists,
        'User already exists with this email.',
      );
    }

    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync());

    const user = await this.createAgentUser({
      email,
      passwordHash,
      displayName,
      licenseID,
      image,
      verified: false,
    });

    if (!user.Agent) {
      throw appException(
        HttpStatus.BAD_REQUEST,
        ErrorCodes.AgentCreateFailed,
        'Failed to create agent.',
      );
    }

    const token = this.jwtService.sign({ uid: user.uid }, { expiresIn: '1d' });

    return {
      token,
      user,
      agent: user.Agent,
    };
  }

  private async createAgentUser({
    email,
    passwordHash,
    displayName,
    licenseID,
    image,
    brokerageId,
    verified,
  }: {
    email: string;
    passwordHash: string;
    displayName: string;
    licenseID: string;
    image?: string;
    brokerageId?: number;
    verified: boolean;
  }) {
    const uid = uuid();

    return this.prisma.user.create({
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
            verified,
            ...(brokerageId != null ? { brokerageId } : {}),
          },
        },
      },
      include: {
        Agent: true,
        Credentials: true,
      },
    });
  }

  findAll(args: FindManyAgentArgs) {
    return this.prisma.agent.findMany(args);
  }

  findOne(args: FindUniqueAgentArgs) {
    return this.prisma.agent.findUnique(args);
  }

  update(updateAgentInput: UpdateAgentInput) {
    const { uid, email: _email, ...data } = updateAgentInput;
    return this.prisma.agent.update({
      where: { uid },
      data,
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
      throw appException(
        HttpStatus.BAD_REQUEST,
        ErrorCodes.AgentNotFound,
        'You are not an agent.',
      );
    }
    return agent;
  }
}
