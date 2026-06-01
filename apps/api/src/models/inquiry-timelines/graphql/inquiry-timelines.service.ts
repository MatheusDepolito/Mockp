import { Injectable } from '@nestjs/common';
import {
  FindManyInquiryTimelineArgs,
  FindUniqueInquiryTimelineArgs,
} from './dtos/find.args';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateInquiryTimelineInput } from './dtos/create-inquiry-timeline.input';
import { UpdateInquiryTimelineInput } from './dtos/update-inquiry-timeline.input';

@Injectable()
export class InquiryTimelinesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createInquiryTimelineInput: CreateInquiryTimelineInput) {
    return this.prisma.inquiryTimeline.create({
      data: createInquiryTimelineInput,
    });
  }

  findAll(args: FindManyInquiryTimelineArgs) {
    return this.prisma.inquiryTimeline.findMany(args);
  }

  findOne(args: FindUniqueInquiryTimelineArgs) {
    return this.prisma.inquiryTimeline.findUnique(args);
  }

  update(updateInquiryTimelineInput: UpdateInquiryTimelineInput) {
    const { id, ...data } = updateInquiryTimelineInput;
    return this.prisma.inquiryTimeline.update({
      where: { id },
      data: data,
    });
  }

  remove(args: FindUniqueInquiryTimelineArgs) {
    return this.prisma.inquiryTimeline.delete(args);
  }
}
