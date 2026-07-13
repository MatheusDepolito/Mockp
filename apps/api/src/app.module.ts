import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { UsersModule } from './models/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminsModule } from './models/admins/admins.module';
import { CustomersModule } from './models/customers/customers.module';
import { BrokerageManagersModule } from './models/brokerage-managers/brokerage-managers.module';
import { AgentsModule } from './models/agents/agents.module';
import { BrokeragesModule } from './models/brokerages/brokerages.module';
import { PropertiesModule } from './models/properties/properties.module';
import { AddressesModule } from './models/addresses/addresses.module';
import { PropertyFeaturesModule } from './models/property-features/property-features.module';
import { InquiriesModule } from './models/inquiries/inquiries.module';
import { AgentAssignmentsModule } from './models/agent-assignments/agent-assignments.module';
import { InquiryTimelinesModule } from './models/inquiry-timelines/inquiry-timelines.module';
import { ReviewsModule } from './models/reviews/reviews.module';
import { VerificationsModule } from './models/verifications/verifications.module';
import { StripeModule } from './models/stripe/stripe.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

// todo move this to util lib
const MAX_AGE = 24 * 60 * 60;

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: MAX_AGE },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      introspection: true,
      fieldResolverEnhancers: ['guards'],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error: GraphQLError): GraphQLFormattedError => {
        const originalError = error.extensions?.originalError as
          | {
              code?: string;
              message?: string;
              response?: {
                code?: string;
                message?: string;
              };
            }
          | undefined;

        const appCode = originalError?.response?.code ?? originalError?.code;
        const fallbackMessage =
          originalError?.response?.message ??
          originalError?.message ??
          error.message;

        return {
          message: fallbackMessage,
          locations: error.locations,
          path: error.path,
          extensions: {
            ...error.extensions,
            appCode,
            fallbackMessage,
          },
        };
      },
    }),
    PrismaModule,
    UsersModule,
    AdminsModule,
    CustomersModule,
    BrokerageManagersModule,
    AgentsModule,
    BrokeragesModule,
    PropertiesModule,
    AddressesModule,
    PropertyFeaturesModule,
    InquiriesModule,
    AgentAssignmentsModule,
    InquiryTimelinesModule,
    ReviewsModule,
    VerificationsModule,
    StripeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
