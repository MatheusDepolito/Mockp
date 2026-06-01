import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InquiryTimelinesService } from './inquiry-timelines.service';
import { InquiryTimeline } from './entity/inquiry-timeline.entity';
import {
  FindManyInquiryTimelineArgs,
  FindUniqueInquiryTimelineArgs,
} from './dtos/find.args';
import { CreateInquiryTimelineInput } from './dtos/create-inquiry-timeline.input';
import { UpdateInquiryTimelineInput } from './dtos/update-inquiry-timeline.input';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { GetUserType } from 'src/common/types';
import { checkRowLevelPermission } from 'src/common/auth/util';

@Resolver(() => InquiryTimeline)
export class InquiryTimelinesResolver {
  constructor(
    private readonly inquiryTimelinesService: InquiryTimelinesService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated('admin', 'brokerageManager')
  @Mutation(() => InquiryTimeline)
  async createInquiryTimeline(
    @Args('createInquiryTimelineInput')
    { inquiryId, status }: CreateInquiryTimelineInput,
    @GetUser() user: GetUserType,
  ) {
    const booking = await this.prisma.inquiry.findUnique({
      where: { id: inquiryId },
      select: {
        Property: {
          select: {
            Brokerage: {
              select: { BrokerageManagers: { select: { uid: true } } },
            },
          },
        },
      },
    });
    checkRowLevelPermission(
      user,
      booking.Property.Brokerage.BrokerageManagers.map(
        (manager) => manager.uid,
      ),
    );

    const [updatedInquiry, bookingTimeline] = await this.prisma.$transaction([
      this.prisma.inquiry.update({
        data: { status: status },
        where: { id: inquiryId },
      }),
      this.prisma.inquiryTimeline.create({
        data: { inquiryId, managerId: user.uid, status },
      }),
    ]);
    return bookingTimeline;
  }

  @Query(() => [InquiryTimeline], { name: 'bookingTimelines' })
  findAll(@Args() args: FindManyInquiryTimelineArgs) {
    return this.inquiryTimelinesService.findAll(args);
  }

  @Query(() => InquiryTimeline, { name: 'bookingTimeline' })
  findOne(@Args() args: FindUniqueInquiryTimelineArgs) {
    return this.inquiryTimelinesService.findOne(args);
  }

  @AllowAuthenticated('admin')
  @Mutation(() => InquiryTimeline)
  async updateInquiryTimeline(
    @Args('updateInquiryTimelineInput') args: UpdateInquiryTimelineInput,
  ) {
    return this.inquiryTimelinesService.update(args);
  }

  @AllowAuthenticated('admin')
  @Mutation(() => InquiryTimeline)
  async removeInquiryTimeline(@Args() args: FindUniqueInquiryTimelineArgs) {
    return this.inquiryTimelinesService.remove(args);
  }
}
