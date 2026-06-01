import { Injectable } from '@nestjs/common';
import { FindManyInquiryArgs, FindUniqueInquiryArgs } from './dtos/find.args';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateInquiryInput } from './dtos/create-inquiry.input';
import { UpdateInquiryInput } from './dtos/update-inquiry.input';
import { generateSixDigitNumber } from 'src/common/util';
import { InquiryStatus } from 'src/common/prisma/client';

@Injectable()
export class InquiriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    customerId,
    endTime,
    propertyId,
    startTime,
    contactNotes,
    phoneNumber,
    listPriceAtInquiry,
    totalPrice,
    agentAssignment,
  }: CreateInquiryInput) {
    const customer = await this.prisma.customer.findUnique({
      where: { uid: customerId },
    });

    if (!customer?.uid) {
      await this.prisma.customer.create({
        data: { uid: customerId },
      });
    }

    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      throw new Error('Property not found.');
    }

    const passcode = generateSixDigitNumber().toString();

    return this.prisma.$transaction(async (tx) => {
      const inquiry = await tx.inquiry.create({
        data: {
          endTime: new Date(endTime),
          startTime: new Date(startTime),
          contactNotes,
          customerId,
          phoneNumber,
          passcode,
          propertyId,
          listPriceAtInquiry,
          totalPrice,
          status: InquiryStatus.INTERESTED,
          ...(agentAssignment
            ? { AgentAssignment: { create: agentAssignment } }
            : null),
        },
      });

      await tx.inquiryTimeline.create({
        data: { inquiryId: inquiry.id, status: InquiryStatus.INTERESTED },
      });

      return inquiry;
    });
  }

  findAll(args: FindManyInquiryArgs) {
    return this.prisma.inquiry.findMany(args);
  }

  findOne(args: FindUniqueInquiryArgs) {
    return this.prisma.inquiry.findUnique(args);
  }

  update(updateInquiryInput: UpdateInquiryInput) {
    const { id, ...data } = updateInquiryInput;
    return this.prisma.inquiry.update({
      where: { id },
      data,
    });
  }

  remove(args: FindUniqueInquiryArgs) {
    return this.prisma.inquiry.delete(args);
  }
}
