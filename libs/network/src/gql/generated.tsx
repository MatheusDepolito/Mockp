import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
};

export type Address = {
  __typename?: 'Address';
  address: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  garage?: Maybe<Property>;
  id: Scalars['Float']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  propertyId?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type AddressOrderByWithRelationInput = {
  Property?: InputMaybe<PropertyOrderByWithRelationInput>;
  address?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lat?: InputMaybe<SortOrder>;
  lng?: InputMaybe<SortOrder>;
  propertyId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AddressRelationFilter = {
  is?: InputMaybe<AddressWhereInput>;
  isNot?: InputMaybe<AddressWhereInput>;
};

export enum AddressScalarFieldEnum {
  Address = 'address',
  CreatedAt = 'createdAt',
  Id = 'id',
  Lat = 'lat',
  Lng = 'lng',
  PropertyId = 'propertyId',
  UpdatedAt = 'updatedAt',
}

export type AddressWhereInput = {
  AND?: InputMaybe<Array<AddressWhereInput>>;
  NOT?: InputMaybe<Array<AddressWhereInput>>;
  OR?: InputMaybe<Array<AddressWhereInput>>;
  Property?: InputMaybe<PropertyRelationFilter>;
  address?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  lat?: InputMaybe<FloatFilter>;
  lng?: InputMaybe<FloatFilter>;
  propertyId?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AddressWhereUniqueInput = {
  id: Scalars['Float']['input'];
};

export type Admin = {
  __typename?: 'Admin';
  createdAt: Scalars['DateTime']['output'];
  uid: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  verifications: Array<Verification>;
  verificationsCount: Scalars['Float']['output'];
};

export type AdminOrderByWithRelationInput = {
  User?: InputMaybe<UserOrderByWithRelationInput>;
  Verifications?: InputMaybe<VerificationOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  uid?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AdminRelationFilter = {
  is?: InputMaybe<AdminWhereInput>;
  isNot?: InputMaybe<AdminWhereInput>;
};

export enum AdminScalarFieldEnum {
  CreatedAt = 'createdAt',
  Uid = 'uid',
  UpdatedAt = 'updatedAt',
}

export type AdminWhereInput = {
  AND?: InputMaybe<Array<AdminWhereInput>>;
  NOT?: InputMaybe<Array<AdminWhereInput>>;
  OR?: InputMaybe<Array<AdminWhereInput>>;
  User?: InputMaybe<UserRelationFilter>;
  Verifications?: InputMaybe<VerificationListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  uid?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AdminWhereUniqueInput = {
  uid: Scalars['String']['input'];
};

export type Agent = {
  __typename?: 'Agent';
  brokerageId?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  licenseID: Scalars['String']['output'];
  uid: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AgentAssignment = {
  __typename?: 'AgentAssignment';
  assignedAgent?: Maybe<Agent>;
  assignedAgentId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  inquiryId: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  visitLat?: Maybe<Scalars['Float']['output']>;
  visitLng?: Maybe<Scalars['Float']['output']>;
};

export type AgentAssignmentListRelationFilter = {
  every?: InputMaybe<AgentAssignmentWhereInput>;
  none?: InputMaybe<AgentAssignmentWhereInput>;
  some?: InputMaybe<AgentAssignmentWhereInput>;
};

export type AgentAssignmentOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type AgentAssignmentOrderByWithRelationInput = {
  AssignedAgent?: InputMaybe<AgentOrderByWithRelationInput>;
  Inquiry?: InputMaybe<InquiryOrderByWithRelationInput>;
  assignedAgentId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  inquiryId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  visitLat?: InputMaybe<SortOrder>;
  visitLng?: InputMaybe<SortOrder>;
};

export type AgentAssignmentRelationFilter = {
  is?: InputMaybe<AgentAssignmentWhereInput>;
  isNot?: InputMaybe<AgentAssignmentWhereInput>;
};

export enum AgentAssignmentScalarFieldEnum {
  AssignedAgentId = 'assignedAgentId',
  CreatedAt = 'createdAt',
  InquiryId = 'inquiryId',
  UpdatedAt = 'updatedAt',
  VisitLat = 'visitLat',
  VisitLng = 'visitLng',
}

export type AgentAssignmentWhereInput = {
  AND?: InputMaybe<Array<AgentAssignmentWhereInput>>;
  AssignedAgent?: InputMaybe<AgentRelationFilter>;
  Inquiry?: InputMaybe<InquiryRelationFilter>;
  NOT?: InputMaybe<Array<AgentAssignmentWhereInput>>;
  OR?: InputMaybe<Array<AgentAssignmentWhereInput>>;
  assignedAgentId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  inquiryId?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  visitLat?: InputMaybe<FloatFilter>;
  visitLng?: InputMaybe<FloatFilter>;
};

export type AgentAssignmentWhereUniqueInput = {
  inquiryId: Scalars['Float']['input'];
};

export type AgentListRelationFilter = {
  every?: InputMaybe<AgentWhereInput>;
  none?: InputMaybe<AgentWhereInput>;
  some?: InputMaybe<AgentWhereInput>;
};

export type AgentOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type AgentOrderByWithRelationInput = {
  AgentAssignments?: InputMaybe<AgentAssignmentOrderByRelationAggregateInput>;
  Brokerage?: InputMaybe<BrokerageOrderByWithRelationInput>;
  InquiryTimeline?: InputMaybe<InquiryTimelineOrderByRelationAggregateInput>;
  ResponsibleProperties?: InputMaybe<PropertyOrderByRelationAggregateInput>;
  User?: InputMaybe<UserOrderByWithRelationInput>;
  brokerageId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  displayName?: InputMaybe<SortOrder>;
  image?: InputMaybe<SortOrder>;
  licenseID?: InputMaybe<SortOrder>;
  uid?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AgentRelationFilter = {
  is?: InputMaybe<AgentWhereInput>;
  isNot?: InputMaybe<AgentWhereInput>;
};

export enum AgentScalarFieldEnum {
  BrokerageId = 'brokerageId',
  CreatedAt = 'createdAt',
  DisplayName = 'displayName',
  Image = 'image',
  LicenseId = 'licenseID',
  Uid = 'uid',
  UpdatedAt = 'updatedAt',
}

export type AgentWhereInput = {
  AND?: InputMaybe<Array<AgentWhereInput>>;
  AgentAssignments?: InputMaybe<AgentAssignmentListRelationFilter>;
  Brokerage?: InputMaybe<BrokerageRelationFilter>;
  InquiryTimeline?: InputMaybe<InquiryTimelineListRelationFilter>;
  NOT?: InputMaybe<Array<AgentWhereInput>>;
  OR?: InputMaybe<Array<AgentWhereInput>>;
  ResponsibleProperties?: InputMaybe<PropertyListRelationFilter>;
  User?: InputMaybe<UserRelationFilter>;
  brokerageId?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  displayName?: InputMaybe<StringFilter>;
  image?: InputMaybe<StringFilter>;
  licenseID?: InputMaybe<StringFilter>;
  uid?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AgentWhereUniqueInput = {
  uid: Scalars['String']['input'];
};

export type AggregateCountOutput = {
  __typename?: 'AggregateCountOutput';
  count: Scalars['Float']['output'];
};

export type AuthProvider = {
  __typename?: 'AuthProvider';
  type: AuthProviderType;
  uid: Scalars['String']['output'];
};

export enum AuthProviderType {
  Credentials = 'CREDENTIALS',
  Google = 'GOOGLE',
}

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Brokerage = {
  __typename?: 'Brokerage';
  brokerageManagers: Array<BrokerageManager>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  properties: Array<Property>;
  updatedAt: Scalars['DateTime']['output'];
};

export type BrokerageManager = {
  __typename?: 'BrokerageManager';
  brokerageId: Scalars['Float']['output'];
  company?: Maybe<Brokerage>;
  createdAt: Scalars['DateTime']['output'];
  displayName?: Maybe<Scalars['String']['output']>;
  uid: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type BrokerageManagerListRelationFilter = {
  every?: InputMaybe<BrokerageManagerWhereInput>;
  none?: InputMaybe<BrokerageManagerWhereInput>;
  some?: InputMaybe<BrokerageManagerWhereInput>;
};

export type BrokerageManagerOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type BrokerageManagerOrderByWithRelationInput = {
  Brokerage?: InputMaybe<BrokerageOrderByWithRelationInput>;
  InquiryTimeline?: InputMaybe<InquiryTimelineOrderByRelationAggregateInput>;
  User?: InputMaybe<UserOrderByWithRelationInput>;
  brokerageId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  displayName?: InputMaybe<SortOrder>;
  uid?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type BrokerageManagerRelationFilter = {
  is?: InputMaybe<BrokerageManagerWhereInput>;
  isNot?: InputMaybe<BrokerageManagerWhereInput>;
};

export enum BrokerageManagerScalarFieldEnum {
  BrokerageId = 'brokerageId',
  CreatedAt = 'createdAt',
  DisplayName = 'displayName',
  Uid = 'uid',
  UpdatedAt = 'updatedAt',
}

export type BrokerageManagerWhereInput = {
  AND?: InputMaybe<Array<BrokerageManagerWhereInput>>;
  Brokerage?: InputMaybe<BrokerageRelationFilter>;
  InquiryTimeline?: InputMaybe<InquiryTimelineListRelationFilter>;
  NOT?: InputMaybe<Array<BrokerageManagerWhereInput>>;
  OR?: InputMaybe<Array<BrokerageManagerWhereInput>>;
  User?: InputMaybe<UserRelationFilter>;
  brokerageId?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  displayName?: InputMaybe<StringFilter>;
  uid?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type BrokerageManagerWhereUniqueInput = {
  uid: Scalars['String']['input'];
};

export type BrokerageOrderByWithRelationInput = {
  Agents?: InputMaybe<AgentOrderByRelationAggregateInput>;
  BrokerageManagers?: InputMaybe<BrokerageManagerOrderByRelationAggregateInput>;
  Properties?: InputMaybe<PropertyOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  displayName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type BrokerageRelationFilter = {
  is?: InputMaybe<BrokerageWhereInput>;
  isNot?: InputMaybe<BrokerageWhereInput>;
};

export enum BrokerageScalarFieldEnum {
  CreatedAt = 'createdAt',
  Description = 'description',
  DisplayName = 'displayName',
  Id = 'id',
  UpdatedAt = 'updatedAt',
}

export type BrokerageWhereInput = {
  AND?: InputMaybe<Array<BrokerageWhereInput>>;
  Agents?: InputMaybe<AgentListRelationFilter>;
  BrokerageManagers?: InputMaybe<BrokerageManagerListRelationFilter>;
  NOT?: InputMaybe<Array<BrokerageWhereInput>>;
  OR?: InputMaybe<Array<BrokerageWhereInput>>;
  Properties?: InputMaybe<PropertyListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  displayName?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type BrokerageWhereUniqueInput = {
  id: Scalars['Float']['input'];
};

export type CreateAddressInput = {
  address: Scalars['String']['input'];
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
  propertyId?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateAddressInputWithoutPropertyId = {
  address: Scalars['String']['input'];
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
};

export type CreateAdminInput = {
  uid: Scalars['String']['input'];
};

export type CreateAgentAssignmentInput = {
  assignedAgentId?: InputMaybe<Scalars['String']['input']>;
  inquiryId: Scalars['Float']['input'];
  visitLat?: InputMaybe<Scalars['Float']['input']>;
  visitLng?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateAgentAssignmentInputWithoutInquiryId = {
  assignedAgentId?: InputMaybe<Scalars['String']['input']>;
  visitLat?: InputMaybe<Scalars['Float']['input']>;
  visitLng?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateAgentInput = {
  displayName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  licenseID: Scalars['String']['input'];
};

export type CreateAgentPayload = {
  __typename?: 'CreateAgentPayload';
  agent: Agent;
  email: Scalars['String']['output'];
  temporaryPassword: Scalars['String']['output'];
};

export type CreateBrokerageInput = {
  brokerageManagerId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  managerName?: InputMaybe<Scalars['String']['input']>;
};

export type CreateBrokerageManagerInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  uid: Scalars['String']['input'];
};

export type CreateCustomerInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  uid: Scalars['String']['input'];
};

export type CreateInquiryInput = {
  agentAssignment?: InputMaybe<CreateAgentAssignmentInputWithoutInquiryId>;
  contactNotes: Scalars['String']['input'];
  customerId: Scalars['String']['input'];
  endTime: Scalars['DateTime']['input'];
  listPriceAtInquiry?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  propertyId: Scalars['Float']['input'];
  startTime: Scalars['DateTime']['input'];
  totalPrice?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateInquiryTimelineInput = {
  inquiryId: Scalars['Float']['input'];
  status: InquiryStatus;
};

export type CreatePropertyFeatureInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  propertyId: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
  type: PropertyFeatureType;
};

export type CreatePropertyFeatureInputWithoutPropertyId = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  quantity: Scalars['Float']['input'];
  type: PropertyFeatureType;
};

export type CreatePropertyInput = {
  Address: CreateAddressInputWithoutPropertyId;
  PropertyFeatures: Array<CreatePropertyFeatureInputWithoutPropertyId>;
  brokerageId?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  images: Array<Scalars['String']['input']>;
  listPrice?: InputMaybe<Scalars['Float']['input']>;
  propertyType: PropertyType;
  purpose: PropertyPurpose;
  responsibleAgentId: Scalars['String']['input'];
};

export type CreateReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  customerId: Scalars['String']['input'];
  propertyId: Scalars['Float']['input'];
  rating: Scalars['Float']['input'];
};

export type CreateVerificationInput = {
  propertyId: Scalars['Float']['input'];
  verified: Scalars['Boolean']['input'];
};

export type Customer = {
  __typename?: 'Customer';
  bookings: Array<Inquiry>;
  createdAt: Scalars['DateTime']['output'];
  displayName?: Maybe<Scalars['String']['output']>;
  uid: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type CustomerOrderByWithRelationInput = {
  Inquiries?: InputMaybe<InquiryOrderByRelationAggregateInput>;
  Reviews?: InputMaybe<ReviewOrderByRelationAggregateInput>;
  User?: InputMaybe<UserOrderByWithRelationInput>;
  createdAt?: InputMaybe<SortOrder>;
  displayName?: InputMaybe<SortOrder>;
  uid?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CustomerRelationFilter = {
  is?: InputMaybe<CustomerWhereInput>;
  isNot?: InputMaybe<CustomerWhereInput>;
};

export enum CustomerScalarFieldEnum {
  CreatedAt = 'createdAt',
  DisplayName = 'displayName',
  Uid = 'uid',
  UpdatedAt = 'updatedAt',
}

export type CustomerWhereInput = {
  AND?: InputMaybe<Array<CustomerWhereInput>>;
  Inquiries?: InputMaybe<InquiryListRelationFilter>;
  NOT?: InputMaybe<Array<CustomerWhereInput>>;
  OR?: InputMaybe<Array<CustomerWhereInput>>;
  Reviews?: InputMaybe<ReviewListRelationFilter>;
  User?: InputMaybe<UserRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  displayName?: InputMaybe<StringFilter>;
  uid?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CustomerWhereUniqueInput = {
  uid: Scalars['String']['input'];
};

export type DateFilterInput = {
  end: Scalars['String']['input'];
  start: Scalars['String']['input'];
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type EnumInquiryStatusFilter = {
  equals?: InputMaybe<InquiryStatus>;
  in?: InputMaybe<Array<InquiryStatus>>;
  not?: InputMaybe<InquiryStatus>;
  notIn?: InputMaybe<Array<InquiryStatus>>;
};

export type EnumPropertyFeatureTypeFilter = {
  equals?: InputMaybe<PropertyFeatureType>;
  in?: InputMaybe<Array<PropertyFeatureType>>;
  not?: InputMaybe<PropertyFeatureType>;
  notIn?: InputMaybe<Array<PropertyFeatureType>>;
};

export type EnumPropertyPurposeFilter = {
  equals?: InputMaybe<PropertyPurpose>;
  in?: InputMaybe<Array<PropertyPurpose>>;
  not?: InputMaybe<PropertyPurpose>;
  notIn?: InputMaybe<Array<PropertyPurpose>>;
};

export type EnumPropertyTypeFilter = {
  equals?: InputMaybe<PropertyType>;
  in?: InputMaybe<Array<PropertyType>>;
  not?: InputMaybe<PropertyType>;
  notIn?: InputMaybe<Array<PropertyType>>;
};

export type FloatFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<Scalars['Float']['input']>;
};

export type Inquiry = {
  __typename?: 'Inquiry';
  agentAssignment?: Maybe<AgentAssignment>;
  contactNotes: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customer: Customer;
  customerId: Scalars['String']['output'];
  endTime: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  inquiryTimeline: Array<InquiryTimeline>;
  listPriceAtInquiry?: Maybe<Scalars['Float']['output']>;
  passcode?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  property: Property;
  propertyId: Scalars['Float']['output'];
  startTime: Scalars['DateTime']['output'];
  status: InquiryStatus;
  totalPrice?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type InquiryListRelationFilter = {
  every?: InputMaybe<InquiryWhereInput>;
  none?: InputMaybe<InquiryWhereInput>;
  some?: InputMaybe<InquiryWhereInput>;
};

export type InquiryOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type InquiryOrderByWithRelationInput = {
  AgentAssignment?: InputMaybe<AgentAssignmentOrderByWithRelationInput>;
  Customer?: InputMaybe<CustomerOrderByWithRelationInput>;
  InquiryTimeline?: InputMaybe<InquiryTimelineOrderByRelationAggregateInput>;
  Property?: InputMaybe<PropertyOrderByWithRelationInput>;
  contactNotes?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  customerId?: InputMaybe<SortOrder>;
  endTime?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  listPriceAtInquiry?: InputMaybe<SortOrder>;
  passcode?: InputMaybe<SortOrder>;
  phoneNumber?: InputMaybe<SortOrder>;
  propertyId?: InputMaybe<SortOrder>;
  startTime?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  totalPrice?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type InquiryRelationFilter = {
  is?: InputMaybe<InquiryWhereInput>;
  isNot?: InputMaybe<InquiryWhereInput>;
};

export enum InquiryScalarFieldEnum {
  ContactNotes = 'contactNotes',
  CreatedAt = 'createdAt',
  CustomerId = 'customerId',
  EndTime = 'endTime',
  Id = 'id',
  ListPriceAtInquiry = 'listPriceAtInquiry',
  Passcode = 'passcode',
  PhoneNumber = 'phoneNumber',
  PropertyId = 'propertyId',
  StartTime = 'startTime',
  Status = 'status',
  TotalPrice = 'totalPrice',
  UpdatedAt = 'updatedAt',
}

export enum InquiryStatus {
  Closed = 'CLOSED',
  Interested = 'INTERESTED',
  Proposal = 'PROPOSAL',
  VisitScheduled = 'VISIT_SCHEDULED',
}

export type InquiryTimeline = {
  __typename?: 'InquiryTimeline';
  agentId?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  inquiryId: Scalars['Float']['output'];
  managerId?: Maybe<Scalars['String']['output']>;
  status: InquiryStatus;
  timestamp: Scalars['DateTime']['output'];
};

export type InquiryTimelineListRelationFilter = {
  every?: InputMaybe<InquiryTimelineWhereInput>;
  none?: InputMaybe<InquiryTimelineWhereInput>;
  some?: InputMaybe<InquiryTimelineWhereInput>;
};

export type InquiryTimelineOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type InquiryTimelineOrderByWithRelationInput = {
  Agent?: InputMaybe<AgentOrderByWithRelationInput>;
  BrokerageManager?: InputMaybe<BrokerageManagerOrderByWithRelationInput>;
  Inquiry?: InputMaybe<InquiryOrderByWithRelationInput>;
  agentId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  inquiryId?: InputMaybe<SortOrder>;
  managerId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  timestamp?: InputMaybe<SortOrder>;
};

export enum InquiryTimelineScalarFieldEnum {
  AgentId = 'agentId',
  Id = 'id',
  InquiryId = 'inquiryId',
  ManagerId = 'managerId',
  Status = 'status',
  Timestamp = 'timestamp',
}

export type InquiryTimelineWhereInput = {
  AND?: InputMaybe<Array<InquiryTimelineWhereInput>>;
  Agent?: InputMaybe<AgentRelationFilter>;
  BrokerageManager?: InputMaybe<BrokerageManagerRelationFilter>;
  Inquiry?: InputMaybe<InquiryRelationFilter>;
  NOT?: InputMaybe<Array<InquiryTimelineWhereInput>>;
  OR?: InputMaybe<Array<InquiryTimelineWhereInput>>;
  agentId?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  inquiryId?: InputMaybe<IntFilter>;
  managerId?: InputMaybe<StringFilter>;
  status?: InputMaybe<InquiryStatus>;
  timestamp?: InputMaybe<DateTimeFilter>;
};

export type InquiryTimelineWhereUniqueInput = {
  id: Scalars['Float']['input'];
};

export type InquiryWhereInput = {
  AND?: InputMaybe<Array<InquiryWhereInput>>;
  AgentAssignment?: InputMaybe<AgentAssignmentRelationFilter>;
  Customer?: InputMaybe<CustomerRelationFilter>;
  InquiryTimeline?: InputMaybe<InquiryTimelineListRelationFilter>;
  NOT?: InputMaybe<Array<InquiryWhereInput>>;
  OR?: InputMaybe<Array<InquiryWhereInput>>;
  Property?: InputMaybe<PropertyRelationFilter>;
  contactNotes?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  customerId?: InputMaybe<StringFilter>;
  endTime?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  listPriceAtInquiry?: InputMaybe<FloatFilter>;
  passcode?: InputMaybe<StringFilter>;
  phoneNumber?: InputMaybe<StringFilter>;
  propertyId?: InputMaybe<IntFilter>;
  startTime?: InputMaybe<DateTimeFilter>;
  status?: InputMaybe<EnumInquiryStatusFilter>;
  totalPrice?: InputMaybe<FloatFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type InquiryWhereUniqueInput = {
  id: Scalars['Float']['input'];
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
};

export type LocationFilterInput = {
  ne_lat: Scalars['Float']['input'];
  ne_lng: Scalars['Float']['input'];
  sw_lat: Scalars['Float']['input'];
  sw_lng: Scalars['Float']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  token: Scalars['String']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  assignAgent: Inquiry;
  createAddress: Address;
  createAdmin: Admin;
  createAgent: CreateAgentPayload;
  createAgentAssignment: AgentAssignment;
  createBrokerage: Brokerage;
  createBrokerageManager: BrokerageManager;
  createCustomer: Customer;
  createInquiry: Inquiry;
  createInquiryTimeline: InquiryTimeline;
  createProperty: Property;
  createPropertyFeature: PropertyFeature;
  createReview: Review;
  createVerification: Verification;
  login: LoginOutput;
  registerWithCredentials: User;
  registerWithProvider: User;
  removeAddress: Address;
  removeAdmin: Admin;
  removeAgent: Agent;
  removeAgentAssignment: AgentAssignment;
  removeBrokerage: Brokerage;
  removeBrokerageManager: BrokerageManager;
  removeCustomer: Customer;
  removeInquiry: Inquiry;
  removeInquiryTimeline: InquiryTimeline;
  removeProperty: Property;
  removePropertyFeature: PropertyFeature;
  removeReview: Review;
  removeUser: User;
  removeVerification: Verification;
  updateAddress: Address;
  updateAdmin: Admin;
  updateAgent: Agent;
  updateAgentAssignment: AgentAssignment;
  updateBrokerage: Brokerage;
  updateBrokerageManager: BrokerageManager;
  updateCustomer: Customer;
  updateInquiry: Inquiry;
  updateInquiryTimeline: InquiryTimeline;
  updateProperty: Property;
  updatePropertyFeature: PropertyFeature;
  updateReview: Review;
  updateUser: User;
  updateVerification: Verification;
};

export type MutationAssignAgentArgs = {
  inquiryId: Scalars['Float']['input'];
  status: Scalars['String']['input'];
};

export type MutationCreateAddressArgs = {
  createAddressInput: CreateAddressInput;
};

export type MutationCreateAdminArgs = {
  createAdminInput: CreateAdminInput;
};

export type MutationCreateAgentArgs = {
  createAgentInput: CreateAgentInput;
};

export type MutationCreateAgentAssignmentArgs = {
  createAgentAssignmentInput: CreateAgentAssignmentInput;
};

export type MutationCreateBrokerageArgs = {
  createBrokerageInput: CreateBrokerageInput;
};

export type MutationCreateBrokerageManagerArgs = {
  createBrokerageManagerInput: CreateBrokerageManagerInput;
};

export type MutationCreateCustomerArgs = {
  createCustomerInput: CreateCustomerInput;
};

export type MutationCreateInquiryArgs = {
  createInquiryInput: CreateInquiryInput;
};

export type MutationCreateInquiryTimelineArgs = {
  createInquiryTimelineInput: CreateInquiryTimelineInput;
};

export type MutationCreatePropertyArgs = {
  createPropertyInput: CreatePropertyInput;
};

export type MutationCreatePropertyFeatureArgs = {
  createPropertyFeatureInput: CreatePropertyFeatureInput;
};

export type MutationCreateReviewArgs = {
  createReviewInput: CreateReviewInput;
};

export type MutationCreateVerificationArgs = {
  createVerificationInput: CreateVerificationInput;
};

export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type MutationRegisterWithCredentialsArgs = {
  registerWithCredentialsInput: RegisterWithCredentialsInput;
};

export type MutationRegisterWithProviderArgs = {
  registerWithProviderInput: RegisterWithProviderInput;
};

export type MutationRemoveAddressArgs = {
  where: AddressWhereUniqueInput;
};

export type MutationRemoveAdminArgs = {
  where: AdminWhereUniqueInput;
};

export type MutationRemoveAgentArgs = {
  where: AgentWhereUniqueInput;
};

export type MutationRemoveAgentAssignmentArgs = {
  where: AgentAssignmentWhereUniqueInput;
};

export type MutationRemoveBrokerageArgs = {
  where: BrokerageWhereUniqueInput;
};

export type MutationRemoveBrokerageManagerArgs = {
  where: BrokerageManagerWhereUniqueInput;
};

export type MutationRemoveCustomerArgs = {
  where: CustomerWhereUniqueInput;
};

export type MutationRemoveInquiryArgs = {
  where: InquiryWhereUniqueInput;
};

export type MutationRemoveInquiryTimelineArgs = {
  where: InquiryTimelineWhereUniqueInput;
};

export type MutationRemovePropertyArgs = {
  where: PropertyWhereUniqueInput;
};

export type MutationRemovePropertyFeatureArgs = {
  where: PropertyFeatureWhereUniqueInput;
};

export type MutationRemoveReviewArgs = {
  where: ReviewWhereUniqueInput;
};

export type MutationRemoveUserArgs = {
  where: UserWhereUniqueInput;
};

export type MutationRemoveVerificationArgs = {
  where: VerificationWhereUniqueInput;
};

export type MutationUpdateAddressArgs = {
  updateAddressInput: UpdateAddressInput;
};

export type MutationUpdateAdminArgs = {
  updateAdminInput: UpdateAdminInput;
};

export type MutationUpdateAgentArgs = {
  updateAgentInput: UpdateAgentInput;
};

export type MutationUpdateAgentAssignmentArgs = {
  updateAgentAssignmentInput: UpdateAgentAssignmentInput;
};

export type MutationUpdateBrokerageArgs = {
  updateBrokerageInput: UpdateBrokerageInput;
};

export type MutationUpdateBrokerageManagerArgs = {
  updateBrokerageManagerInput: UpdateBrokerageManagerInput;
};

export type MutationUpdateCustomerArgs = {
  updateCustomerInput: UpdateCustomerInput;
};

export type MutationUpdateInquiryArgs = {
  updateInquiryInput: UpdateInquiryInput;
};

export type MutationUpdateInquiryTimelineArgs = {
  updateInquiryTimelineInput: UpdateInquiryTimelineInput;
};

export type MutationUpdatePropertyArgs = {
  updatePropertyInput: UpdatePropertyInput;
};

export type MutationUpdatePropertyFeatureArgs = {
  updatePropertyFeatureInput: UpdatePropertyFeatureInput;
};

export type MutationUpdateReviewArgs = {
  updateReviewInput: UpdateReviewInput;
};

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type MutationUpdateVerificationArgs = {
  updateVerificationInput: UpdateVerificationInput;
};

export type Property = {
  __typename?: 'Property';
  address?: Maybe<Address>;
  brokerage?: Maybe<Brokerage>;
  brokerageId?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  featureCounts: Array<PropertyFeatureTypeCount>;
  id: Scalars['Float']['output'];
  images: Array<Scalars['String']['output']>;
  listPrice?: Maybe<Scalars['Float']['output']>;
  propertyFeatures: Array<PropertyFeature>;
  propertyType: PropertyType;
  purpose: PropertyPurpose;
  responsibleAgentId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  verification?: Maybe<Verification>;
};

export type PropertyFeature = {
  __typename?: 'PropertyFeature';
  createdAt: Scalars['DateTime']['output'];
  displayName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  property: Property;
  propertyId: Scalars['Float']['output'];
  quantity: Scalars['Float']['output'];
  type: PropertyFeatureType;
  updatedAt: Scalars['DateTime']['output'];
};

export type PropertyFeatureListRelationFilter = {
  every?: InputMaybe<PropertyFeatureWhereInput>;
  none?: InputMaybe<PropertyFeatureWhereInput>;
  some?: InputMaybe<PropertyFeatureWhereInput>;
};

export type PropertyFeatureOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type PropertyFeatureOrderByWithRelationInput = {
  Property?: InputMaybe<PropertyOrderByWithRelationInput>;
  createdAt?: InputMaybe<SortOrder>;
  displayName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  propertyId?: InputMaybe<SortOrder>;
  quantity?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum PropertyFeatureScalarFieldEnum {
  CreatedAt = 'createdAt',
  DisplayName = 'displayName',
  Id = 'id',
  PropertyId = 'propertyId',
  Quantity = 'quantity',
  Type = 'type',
  UpdatedAt = 'updatedAt',
}

export enum PropertyFeatureType {
  AirConditioner = 'AIR_CONDITIONER',
  Bathroom = 'BATHROOM',
  Bedroom = 'BEDROOM',
  BuiltInWardrobe = 'BUILT_IN_WARDROBE',
  FurnishedKitchen = 'FURNISHED_KITCHEN',
  Other = 'OTHER',
  ParkingSpot = 'PARKING_SPOT',
}

export type PropertyFeatureTypeCount = {
  __typename?: 'PropertyFeatureTypeCount';
  count?: Maybe<Scalars['Float']['output']>;
  type: PropertyFeatureType;
};

export type PropertyFeatureWhereInput = {
  AND?: InputMaybe<Array<PropertyFeatureWhereInput>>;
  NOT?: InputMaybe<Array<PropertyFeatureWhereInput>>;
  OR?: InputMaybe<Array<PropertyFeatureWhereInput>>;
  Property?: InputMaybe<PropertyRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  displayName?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  propertyId?: InputMaybe<IntFilter>;
  quantity?: InputMaybe<IntFilter>;
  type?: InputMaybe<EnumPropertyFeatureTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type PropertyFeatureWhereUniqueInput = {
  id: Scalars['Float']['input'];
};

export type PropertyFilter = {
  orderBy?: InputMaybe<Array<PropertyOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  where?: InputMaybe<PropertyWhereInput>;
};

export type PropertyListRelationFilter = {
  every?: InputMaybe<PropertyWhereInput>;
  none?: InputMaybe<PropertyWhereInput>;
  some?: InputMaybe<PropertyWhereInput>;
};

export type PropertyOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type PropertyOrderByWithRelationInput = {
  Address?: InputMaybe<AddressOrderByWithRelationInput>;
  Brokerage?: InputMaybe<BrokerageOrderByWithRelationInput>;
  Inquiries?: InputMaybe<InquiryOrderByRelationAggregateInput>;
  PropertyFeatures?: InputMaybe<PropertyFeatureOrderByRelationAggregateInput>;
  ResponsibleAgent?: InputMaybe<AgentOrderByWithRelationInput>;
  Reviews?: InputMaybe<ReviewOrderByRelationAggregateInput>;
  Verification?: InputMaybe<VerificationOrderByWithRelationInput>;
  brokerageId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  displayName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  images?: InputMaybe<SortOrder>;
  listPrice?: InputMaybe<SortOrder>;
  propertyType?: InputMaybe<SortOrder>;
  purpose?: InputMaybe<SortOrder>;
  responsibleAgentId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum PropertyPurpose {
  Rent = 'RENT',
  RentAndSale = 'RENT_AND_SALE',
  Sale = 'SALE',
}

export type PropertyRelationFilter = {
  is?: InputMaybe<PropertyWhereInput>;
  isNot?: InputMaybe<PropertyWhereInput>;
};

export enum PropertyScalarFieldEnum {
  BrokerageId = 'brokerageId',
  CreatedAt = 'createdAt',
  Description = 'description',
  DisplayName = 'displayName',
  Id = 'id',
  Images = 'images',
  ListPrice = 'listPrice',
  PropertyType = 'propertyType',
  Purpose = 'purpose',
  ResponsibleAgentId = 'responsibleAgentId',
  UpdatedAt = 'updatedAt',
}

export enum PropertyType {
  Apartment = 'APARTMENT',
  House = 'HOUSE',
}

export type PropertyWhereInput = {
  AND?: InputMaybe<Array<PropertyWhereInput>>;
  Address?: InputMaybe<AddressRelationFilter>;
  Brokerage?: InputMaybe<BrokerageRelationFilter>;
  Inquiries?: InputMaybe<InquiryListRelationFilter>;
  NOT?: InputMaybe<Array<PropertyWhereInput>>;
  OR?: InputMaybe<Array<PropertyWhereInput>>;
  PropertyFeatures?: InputMaybe<PropertyFeatureListRelationFilter>;
  ResponsibleAgent?: InputMaybe<AgentRelationFilter>;
  Reviews?: InputMaybe<ReviewListRelationFilter>;
  Verification?: InputMaybe<VerificationRelationFilter>;
  brokerageId?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  displayName?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  images?: InputMaybe<StringListFilter>;
  listPrice?: InputMaybe<FloatFilter>;
  propertyType?: InputMaybe<EnumPropertyTypeFilter>;
  purpose?: InputMaybe<EnumPropertyPurposeFilter>;
  responsibleAgentId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type PropertyWhereUniqueInput = {
  id: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  address: Address;
  addresses: Array<Address>;
  admin: Admin;
  adminMe: Admin;
  admins: Array<Admin>;
  adminsCount: Scalars['Float']['output'];
  agent: Agent;
  agentAssignment: AgentAssignment;
  agentAssignments: Array<AgentAssignment>;
  bookingTimeline: InquiryTimeline;
  bookingTimelines: Array<InquiryTimeline>;
  brokerage: Brokerage;
  brokerageManager: BrokerageManager;
  brokerages: Array<Brokerage>;
  companyAgents: Array<Agent>;
  companyAgentsTotal: Scalars['Float']['output'];
  customer: Customer;
  customers: Array<Customer>;
  getAuthProvider?: Maybe<AuthProvider>;
  inquiries: Array<Inquiry>;
  inquiriesCount: AggregateCountOutput;
  inquiriesForAgent: Array<Inquiry>;
  inquiriesForCustomer: Array<Inquiry>;
  inquiriesForProperty: Array<Inquiry>;
  inquiry: Inquiry;
  managers: Array<BrokerageManager>;
  myBrokerage: Brokerage;
  myPropertiesAsAgent: Array<Property>;
  myPropertiesAsAgentCount: AggregateCountOutput;
  properties: Array<Property>;
  propertiesCount: AggregateCountOutput;
  property: Property;
  propertyFeature: PropertyFeature;
  propertyFeatures: Array<PropertyFeature>;
  review: Review;
  reviews: Array<Review>;
  searchProperties: Array<Property>;
  user: User;
  users: Array<User>;
  valetDrops: Array<Inquiry>;
  valetDropsTotal: Scalars['Float']['output'];
  valetMe?: Maybe<Agent>;
  valetPickups: Array<Inquiry>;
  valetPickupsTotal: Scalars['Float']['output'];
  valets: Array<Agent>;
  verification: Verification;
  verifications: Array<Verification>;
  whoami: User;
};

export type QueryAddressArgs = {
  where: AddressWhereUniqueInput;
};

export type QueryAddressesArgs = {
  cursor?: InputMaybe<AddressWhereUniqueInput>;
  distinct?: InputMaybe<Array<AddressScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AddressOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  where?: InputMaybe<AddressWhereInput>;
};

export type QueryAdminArgs = {
  where: AdminWhereUniqueInput;
};

export type QueryAdminsArgs = {
  cursor?: InputMaybe<AdminWhereUniqueInput>;
  distinct?: InputMaybe<Array<AdminScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AdminOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  where?: InputMaybe<AdminWhereInput>;
};

export type QueryAdminsCountArgs = {
  where?: InputMaybe<AdminWhereInput>;
};

export type QueryAgentArgs = {
  where: AgentWhereUniqueInput;
};

export type QueryAgentAssignmentArgs = {
  where: AgentAssignmentWhereUniqueInput;
};

export type QueryAgentAssignmentsArgs = {
  cursor?: InputMaybe<AgentAssignmentWhereUniqueInput>;
  distinct?: InputMaybe<Array<AgentAssignmentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AgentAssignmentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  where?: InputMaybe<AgentAssignmentWhereInput>;
};

export type QueryBookingTimelineArgs = {
  where: InquiryTimelineWhereUniqueInput;
};

export type QueryBookingTimelinesArgs = {
  cursor?: InputMaybe<InquiryTimelineWhereUniqueInput>;
  distinct?: InputMaybe<Array<InquiryTimelineScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<InquiryTimelineOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  where?: InputMaybe<InquiryTimelineWhereInput>;
};

export type QueryBrokerageArgs = {
  where: BrokerageWhereUniqueInput;
};

export type QueryBrokerageManagerArgs = {
  where: BrokerageManagerWhereUniqueInput;
};

export type QueryBrokeragesArgs = {
  cursor?: InputMaybe<BrokerageWhereUniqueInput>;
  distinct?: InputMaybe<Array<BrokerageScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<BrokerageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  where?: InputMaybe<BrokerageWhereInput>;
};

export type QueryCompanyAgentsArgs = {
  cursor?: InputMaybe<AgentWhereUniqueInput>;
  distinct?: InputMaybe<Array<AgentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AgentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  where?: InputMaybe<AgentWhereInput>;
};

export type QueryCompanyAgentsTotalArgs = {
  where?: InputMaybe<AgentWhereInput>;
};

export type QueryCustomerArgs = {
  where: CustomerWhereUniqueInput;
};

export type QueryCustomersArgs = {
  cursor?: InputMaybe<CustomerWhereUniqueInput>;
  distinct?: InputMaybe<Array<CustomerScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CustomerOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  where?: InputMaybe<CustomerWhereInput>;
};

export type QueryGetAuthProviderArgs = {
  uid: Scalars['String']['input'];
};

export type QueryInquiriesArgs = {
  cursor?: InputMaybe<InquiryWhereUniqueInput>;
  distinct?: InputMaybe<Array<InquiryScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<InquiryOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  where?: InputMaybe<InquiryWhereInput>;
};

export type QueryInquiriesCountArgs = {
  where?: InputMaybe<InquiryWhereInput>;
};

export type QueryInquiriesForAgentArgs = {
  cursor?: InputMaybe<InquiryWhereUniqueInput>;
  distinct?: InputMaybe<Array<InquiryScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<InquiryOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  where?: InputMaybe<InquiryWhereInput>;
};

export type QueryInquiriesForCustomerArgs = {
  cursor?: InputMaybe<InquiryWhereUniqueInput>;
  distinct?: InputMaybe<Array<InquiryScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<InquiryOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  where?: InputMaybe<InquiryWhereInput>;
};

export type QueryInquiriesForPropertyArgs = {
  cursor?: InputMaybe<InquiryWhereUniqueInput>;
  distinct?: InputMaybe<Array<InquiryScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<InquiryOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  where?: InputMaybe<InquiryWhereInput>;
};

export type QueryInquiryArgs = {
  where: InquiryWhereUniqueInput;
};

export type QueryManagersArgs = {
  cursor?: InputMaybe<BrokerageManagerWhereUniqueInput>;
  distinct?: InputMaybe<Array<BrokerageManagerScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<BrokerageManagerOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  where?: InputMaybe<BrokerageManagerWhereInput>;
};

export type QueryMyPropertiesAsAgentArgs = {
  cursor?: InputMaybe<PropertyWhereUniqueInput>;
  distinct?: InputMaybe<Array<PropertyScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PropertyOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  where?: InputMaybe<PropertyWhereInput>;
};

export type QueryPropertiesArgs = {
  cursor?: InputMaybe<PropertyWhereUniqueInput>;
  distinct?: InputMaybe<Array<PropertyScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PropertyOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  where?: InputMaybe<PropertyWhereInput>;
};

export type QueryPropertiesCountArgs = {
  where?: InputMaybe<PropertyWhereInput>;
};

export type QueryPropertyArgs = {
  where: PropertyWhereUniqueInput;
};

export type QueryPropertyFeatureArgs = {
  where: PropertyFeatureWhereUniqueInput;
};

export type QueryPropertyFeaturesArgs = {
  cursor?: InputMaybe<PropertyFeatureWhereUniqueInput>;
  distinct?: InputMaybe<Array<PropertyFeatureScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PropertyFeatureOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  where?: InputMaybe<PropertyFeatureWhereInput>;
};

export type QueryReviewArgs = {
  where: ReviewWhereUniqueInput;
};

export type QueryReviewsArgs = {
  cursor?: InputMaybe<ReviewWhereUniqueInput>;
  distinct?: InputMaybe<Array<ReviewScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ReviewOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  where?: InputMaybe<ReviewWhereInput>;
};

export type QuerySearchPropertiesArgs = {
  dateFilter: DateFilterInput;
  featuresFilter?: InputMaybe<PropertyFeatureWhereInput>;
  locationFilter: LocationFilterInput;
  propertyFilter?: InputMaybe<PropertyFilter>;
};

export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};

export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  where?: InputMaybe<UserWhereInput>;
};

export type QueryValetDropsArgs = {
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
};

export type QueryValetPickupsArgs = {
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
};

export type QueryValetsArgs = {
  cursor?: InputMaybe<AgentWhereUniqueInput>;
  distinct?: InputMaybe<Array<AgentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AgentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  where?: InputMaybe<AgentWhereInput>;
};

export type QueryVerificationArgs = {
  where: VerificationWhereUniqueInput;
};

export type QueryVerificationsArgs = {
  cursor?: InputMaybe<VerificationWhereUniqueInput>;
  distinct?: InputMaybe<Array<VerificationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<VerificationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  where?: InputMaybe<VerificationWhereInput>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive',
}

export type RegisterWithCredentialsInput = {
  email: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};

export type RegisterWithProviderInput = {
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type: AuthProviderType;
  uid: Scalars['String']['input'];
};

export type Review = {
  __typename?: 'Review';
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  customerId: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  propertyId: Scalars['Float']['output'];
  rating: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ReviewListRelationFilter = {
  every?: InputMaybe<ReviewWhereInput>;
  none?: InputMaybe<ReviewWhereInput>;
  some?: InputMaybe<ReviewWhereInput>;
};

export type ReviewOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ReviewOrderByWithRelationInput = {
  Customer?: InputMaybe<CustomerOrderByWithRelationInput>;
  Property?: InputMaybe<PropertyOrderByWithRelationInput>;
  comment?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  customerId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  propertyId?: InputMaybe<SortOrder>;
  rating?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum ReviewScalarFieldEnum {
  Comment = 'comment',
  CreatedAt = 'createdAt',
  CustomerId = 'customerId',
  Id = 'id',
  PropertyId = 'propertyId',
  Rating = 'rating',
  UpdatedAt = 'updatedAt',
}

export type ReviewWhereInput = {
  AND?: InputMaybe<Array<ReviewWhereInput>>;
  Customer?: InputMaybe<CustomerRelationFilter>;
  NOT?: InputMaybe<Array<ReviewWhereInput>>;
  OR?: InputMaybe<Array<ReviewWhereInput>>;
  Property?: InputMaybe<PropertyRelationFilter>;
  comment?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  customerId?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  propertyId?: InputMaybe<IntFilter>;
  rating?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ReviewWhereUniqueInput = {
  id: Scalars['Float']['input'];
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringListFilter = {
  equals?: InputMaybe<Array<Scalars['String']['input']>>;
  has?: InputMaybe<Scalars['String']['input']>;
  hasEvery?: InputMaybe<Array<Scalars['String']['input']>>;
  hasSome?: InputMaybe<Array<Scalars['String']['input']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateAddressInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  lat?: InputMaybe<Scalars['Float']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
  propertyId?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateAdminInput = {
  uid: Scalars['String']['input'];
};

export type UpdateAgentAssignmentInput = {
  assignedAgentId?: InputMaybe<Scalars['String']['input']>;
  inquiryId: Scalars['Float']['input'];
  visitLat?: InputMaybe<Scalars['Float']['input']>;
  visitLng?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateAgentInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  licenseID?: InputMaybe<Scalars['String']['input']>;
  uid: Scalars['String']['input'];
};

export type UpdateBrokerageInput = {
  brokerageManagerId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  managerName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBrokerageManagerInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  uid: Scalars['String']['input'];
};

export type UpdateCustomerInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  uid: Scalars['String']['input'];
};

export type UpdateInquiryInput = {
  agentAssignment?: InputMaybe<CreateAgentAssignmentInputWithoutInquiryId>;
  contactNotes?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['Float']['input'];
  listPriceAtInquiry?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  propertyId?: InputMaybe<Scalars['Float']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  totalPrice?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateInquiryTimelineInput = {
  id: Scalars['Float']['input'];
  inquiryId?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<InquiryStatus>;
};

export type UpdatePropertyFeatureInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  propertyId?: InputMaybe<Scalars['Float']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<PropertyFeatureType>;
};

export type UpdatePropertyInput = {
  Address?: InputMaybe<CreateAddressInputWithoutPropertyId>;
  PropertyFeatures?: InputMaybe<
    Array<CreatePropertyFeatureInputWithoutPropertyId>
  >;
  brokerageId?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  listPrice?: InputMaybe<Scalars['Float']['input']>;
  propertyType?: InputMaybe<PropertyType>;
  purpose?: InputMaybe<PropertyPurpose>;
  responsibleAgentId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  propertyId?: InputMaybe<Scalars['Float']['input']>;
  rating?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateUserInput = {
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AuthProviderType>;
  uid: Scalars['String']['input'];
};

export type UpdateVerificationInput = {
  propertyId: Scalars['Float']['input'];
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};

export type User = {
  __typename?: 'User';
  admin?: Maybe<Admin>;
  agent?: Maybe<Agent>;
  brokerageManager?: Maybe<BrokerageManager>;
  createdAt: Scalars['DateTime']['output'];
  customer?: Maybe<Customer>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  uid: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UserOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  uid?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export enum UserScalarFieldEnum {
  CreatedAt = 'createdAt',
  Image = 'image',
  Name = 'name',
  Uid = 'uid',
  UpdatedAt = 'updatedAt',
}

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  name?: InputMaybe<StringFilter>;
  uid?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type UserWhereUniqueInput = {
  uid: Scalars['String']['input'];
};

export type Verification = {
  __typename?: 'Verification';
  adminId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  propertyId: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  verified: Scalars['Boolean']['output'];
};

export type VerificationListRelationFilter = {
  every?: InputMaybe<VerificationWhereInput>;
  none?: InputMaybe<VerificationWhereInput>;
  some?: InputMaybe<VerificationWhereInput>;
};

export type VerificationOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type VerificationOrderByWithRelationInput = {
  Admin?: InputMaybe<AdminOrderByWithRelationInput>;
  Property?: InputMaybe<PropertyOrderByWithRelationInput>;
  adminId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  propertyId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  verified?: InputMaybe<SortOrder>;
};

export type VerificationRelationFilter = {
  is?: InputMaybe<VerificationWhereInput>;
  isNot?: InputMaybe<VerificationWhereInput>;
};

export enum VerificationScalarFieldEnum {
  AdminId = 'adminId',
  CreatedAt = 'createdAt',
  PropertyId = 'propertyId',
  UpdatedAt = 'updatedAt',
  Verified = 'verified',
}

export type VerificationWhereInput = {
  AND?: InputMaybe<Array<VerificationWhereInput>>;
  Admin?: InputMaybe<AdminRelationFilter>;
  NOT?: InputMaybe<Array<VerificationWhereInput>>;
  OR?: InputMaybe<Array<VerificationWhereInput>>;
  Property?: InputMaybe<PropertyRelationFilter>;
  adminId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  propertyId?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  verified?: InputMaybe<BoolFilter>;
};

export type VerificationWhereUniqueInput = {
  propertyId: Scalars['Float']['input'];
};

export type RegisterWithCredentialsMutationVariables = Exact<{
  registerWithCredentialsInput: RegisterWithCredentialsInput;
}>;

export type RegisterWithCredentialsMutation = {
  __typename?: 'Mutation';
  registerWithCredentials: {
    __typename?: 'User';
    updatedAt: any;
    uid: string;
    name?: string | null;
    image?: string | null;
    createdAt: any;
  };
};

export type BrokeragesQueryVariables = Exact<{
  distinct?: InputMaybe<
    Array<BrokerageScalarFieldEnum> | BrokerageScalarFieldEnum
  >;
  orderBy?: InputMaybe<
    Array<BrokerageOrderByWithRelationInput> | BrokerageOrderByWithRelationInput
  >;
  where?: InputMaybe<BrokerageWhereInput>;
  cursor?: InputMaybe<BrokerageWhereUniqueInput>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
}>;

export type BrokeragesQuery = {
  __typename?: 'Query';
  brokerages: Array<{
    __typename?: 'Brokerage';
    createdAt: any;
    description?: string | null;
    displayName?: string | null;
    id: number;
    updatedAt: any;
    properties: Array<{ __typename?: 'Property'; id: number }>;
    brokerageManagers: Array<{ __typename?: 'BrokerageManager'; uid: string }>;
  }>;
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'LoginOutput';
    token: string;
    user: {
      __typename?: 'User';
      uid: string;
      name?: string | null;
      image?: string | null;
    };
  };
};

export type GetAuthProviderQueryVariables = Exact<{
  uid: Scalars['String']['input'];
}>;

export type GetAuthProviderQuery = {
  __typename?: 'Query';
  getAuthProvider?: {
    __typename?: 'AuthProvider';
    uid: string;
    type: AuthProviderType;
  } | null;
};

export type RegisterWithProviderMutationVariables = Exact<{
  registerWithProviderInput: RegisterWithProviderInput;
}>;

export type RegisterWithProviderMutation = {
  __typename?: 'Mutation';
  registerWithProvider: { __typename?: 'User'; uid: string };
};

export type SearchPropertiesQueryVariables = Exact<{
  dateFilter: DateFilterInput;
  locationFilter: LocationFilterInput;
  featuresFilter?: InputMaybe<PropertyFeatureWhereInput>;
  propertyFilter?: InputMaybe<PropertyFilter>;
}>;

export type SearchPropertiesQuery = {
  __typename?: 'Query';
  searchProperties: Array<{
    __typename?: 'Property';
    id: number;
    images: Array<string>;
    displayName?: string | null;
    listPrice?: number | null;
    address?: {
      __typename?: 'Address';
      lat: number;
      lng: number;
      address: string;
    } | null;
    featureCounts: Array<{
      __typename?: 'PropertyFeatureTypeCount';
      type: PropertyFeatureType;
      count?: number | null;
    }>;
    verification?: { __typename?: 'Verification'; verified: boolean } | null;
  }>;
};

export type CreatePropertyFeatureMutationVariables = Exact<{
  createPropertyFeatureInput: CreatePropertyFeatureInput;
}>;

export type CreatePropertyFeatureMutation = {
  __typename?: 'Mutation';
  createPropertyFeature: { __typename?: 'PropertyFeature'; id: number };
};

export type MyBrokerageQueryVariables = Exact<{ [key: string]: never }>;

export type MyBrokerageQuery = {
  __typename?: 'Query';
  myBrokerage: {
    __typename?: 'Brokerage';
    id: number;
    createdAt: any;
    displayName?: string | null;
    properties: Array<{
      __typename?: 'Property';
      displayName?: string | null;
      id: number;
      description?: string | null;
      address?: {
        __typename?: 'Address';
        id: number;
        address: string;
        lat: number;
        lng: number;
      } | null;
    }>;
  };
};

export type CreateBrokerageMutationVariables = Exact<{
  createBrokerageInput: CreateBrokerageInput;
}>;

export type CreateBrokerageMutation = {
  __typename?: 'Mutation';
  createBrokerage: { __typename?: 'Brokerage'; id: number };
};

export type PropertiesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  cursor?: InputMaybe<PropertyWhereUniqueInput>;
  orderBy?: InputMaybe<
    Array<PropertyOrderByWithRelationInput> | PropertyOrderByWithRelationInput
  >;
  where?: InputMaybe<PropertyWhereInput>;
}>;

export type PropertiesQuery = {
  __typename?: 'Query';
  properties: Array<{
    __typename?: 'Property';
    id: number;
    displayName?: string | null;
    description?: string | null;
    images: Array<string>;
    verification?: { __typename?: 'Verification'; verified: boolean } | null;
    address?: {
      __typename?: 'Address';
      id: number;
      lat: number;
      lng: number;
      address: string;
    } | null;
    featureCounts: Array<{
      __typename?: 'PropertyFeatureTypeCount';
      type: PropertyFeatureType;
      count?: number | null;
    }>;
  }>;
  propertiesCount: { __typename?: 'AggregateCountOutput'; count: number };
};

export type CreatePropertyMutationVariables = Exact<{
  createPropertyInput: CreatePropertyInput;
}>;

export type CreatePropertyMutation = {
  __typename?: 'Mutation';
  createProperty: { __typename?: 'Property'; id: number };
};

export type AgentFieldsFragment = {
  __typename?: 'Agent';
  image?: string | null;
  uid: string;
  displayName: string;
};

export type InquiryFieldsFragment = {
  __typename?: 'Inquiry';
  id: number;
  listPriceAtInquiry?: number | null;
  endTime: any;
  startTime: any;
  contactNotes: string;
  passcode?: string | null;
  status: InquiryStatus;
  inquiryTimeline: Array<{
    __typename?: 'InquiryTimeline';
    status: InquiryStatus;
    timestamp: any;
  }>;
  agentAssignment?: {
    __typename?: 'AgentAssignment';
    assignedAgent?: {
      __typename?: 'Agent';
      image?: string | null;
      uid: string;
      displayName: string;
    } | null;
  } | null;
  property: {
    __typename?: 'Property';
    displayName?: string | null;
    images: Array<string>;
    address?: {
      __typename?: 'Address';
      address: string;
      lat: number;
      lng: number;
    } | null;
  };
};

export type InquiriesForCustomerQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  cursor?: InputMaybe<InquiryWhereUniqueInput>;
  orderBy?: InputMaybe<
    Array<InquiryOrderByWithRelationInput> | InquiryOrderByWithRelationInput
  >;
  where?: InputMaybe<InquiryWhereInput>;
  distinct?: InputMaybe<Array<InquiryScalarFieldEnum> | InquiryScalarFieldEnum>;
}>;

export type InquiriesForCustomerQuery = {
  __typename?: 'Query';
  inquiriesForCustomer: Array<{
    __typename?: 'Inquiry';
    id: number;
    listPriceAtInquiry?: number | null;
    endTime: any;
    startTime: any;
    contactNotes: string;
    passcode?: string | null;
    status: InquiryStatus;
    inquiryTimeline: Array<{
      __typename?: 'InquiryTimeline';
      status: InquiryStatus;
      timestamp: any;
    }>;
    agentAssignment?: {
      __typename?: 'AgentAssignment';
      assignedAgent?: {
        __typename?: 'Agent';
        image?: string | null;
        uid: string;
        displayName: string;
      } | null;
    } | null;
    property: {
      __typename?: 'Property';
      displayName?: string | null;
      images: Array<string>;
      address?: {
        __typename?: 'Address';
        address: string;
        lat: number;
        lng: number;
      } | null;
    };
  }>;
  inquiriesCount: { __typename?: 'AggregateCountOutput'; count: number };
};

export type InquiriesForPropertyQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  cursor?: InputMaybe<InquiryWhereUniqueInput>;
  orderBy?: InputMaybe<
    Array<InquiryOrderByWithRelationInput> | InquiryOrderByWithRelationInput
  >;
  where?: InputMaybe<InquiryWhereInput>;
  distinct?: InputMaybe<Array<InquiryScalarFieldEnum> | InquiryScalarFieldEnum>;
}>;

export type InquiriesForPropertyQuery = {
  __typename?: 'Query';
  inquiriesForProperty: Array<{
    __typename?: 'Inquiry';
    id: number;
    listPriceAtInquiry?: number | null;
    endTime: any;
    startTime: any;
    contactNotes: string;
    passcode?: string | null;
    status: InquiryStatus;
    inquiryTimeline: Array<{
      __typename?: 'InquiryTimeline';
      status: InquiryStatus;
      timestamp: any;
    }>;
    agentAssignment?: {
      __typename?: 'AgentAssignment';
      assignedAgent?: {
        __typename?: 'Agent';
        image?: string | null;
        uid: string;
        displayName: string;
      } | null;
    } | null;
    property: {
      __typename?: 'Property';
      displayName?: string | null;
      images: Array<string>;
      address?: {
        __typename?: 'Address';
        address: string;
        lat: number;
        lng: number;
      } | null;
    };
  }>;
  inquiriesCount: { __typename?: 'AggregateCountOutput'; count: number };
};

export type CreateInquiryTimelineMutationVariables = Exact<{
  createInquiryTimelineInput: CreateInquiryTimelineInput;
}>;

export type CreateInquiryTimelineMutation = {
  __typename?: 'Mutation';
  createInquiryTimeline: {
    __typename?: 'InquiryTimeline';
    inquiryId: number;
    id: number;
    managerId?: string | null;
    status: InquiryStatus;
    timestamp: any;
  };
};

export type AgentMeQueryVariables = Exact<{ [key: string]: never }>;

export type AgentMeQuery = {
  __typename?: 'Query';
  valetMe?: {
    __typename?: 'Agent';
    uid: string;
    brokerageId?: number | null;
  } | null;
};

export type AdminMeQueryVariables = Exact<{ [key: string]: never }>;

export type AdminMeQuery = {
  __typename?: 'Query';
  adminMe: { __typename?: 'Admin'; uid: string };
};

export type CreateAgentMutationVariables = Exact<{
  createAgentInput: CreateAgentInput;
}>;

export type CreateAgentMutation = {
  __typename?: 'Mutation';
  createAgent: {
    __typename?: 'CreateAgentPayload';
    email: string;
    temporaryPassword: string;
    agent: {
      __typename?: 'Agent';
      uid: string;
      displayName: string;
      licenseID: string;
      image?: string | null;
      brokerageId?: number | null;
    };
  };
};

export type MyPropertiesAsAgentQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
}>;

export type MyPropertiesAsAgentQuery = {
  __typename?: 'Query';
  myPropertiesAsAgent: Array<{
    __typename?: 'Property';
    id: number;
    displayName?: string | null;
    description?: string | null;
    images: Array<string>;
    verification?: { __typename?: 'Verification'; verified: boolean } | null;
    address?: {
      __typename?: 'Address';
      id: number;
      lat: number;
      lng: number;
      address: string;
    } | null;
    featureCounts: Array<{
      __typename?: 'PropertyFeatureTypeCount';
      type: PropertyFeatureType;
      count?: number | null;
    }>;
  }>;
  myPropertiesAsAgentCount: {
    __typename?: 'AggregateCountOutput';
    count: number;
  };
};

export type CompanyAgentsQueryVariables = Exact<{
  distinct?: InputMaybe<Array<AgentScalarFieldEnum> | AgentScalarFieldEnum>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  cursor?: InputMaybe<AgentWhereUniqueInput>;
  orderBy?: InputMaybe<
    Array<AgentOrderByWithRelationInput> | AgentOrderByWithRelationInput
  >;
  where?: InputMaybe<AgentWhereInput>;
}>;

export type CompanyAgentsQuery = {
  __typename?: 'Query';
  companyAgentsTotal: number;
  companyAgents: Array<{
    __typename?: 'Agent';
    displayName: string;
    uid: string;
    createdAt: any;
    updatedAt: any;
    brokerageId?: number | null;
    image?: string | null;
    licenseID: string;
  }>;
};

export type ValetPickupsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
}>;

export type ValetPickupsQuery = {
  __typename?: 'Query';
  valetPickupsTotal: number;
  valetPickups: Array<{
    __typename?: 'Inquiry';
    id: number;
    contactNotes: string;
    startTime: any;
    endTime: any;
    agentAssignment?: {
      __typename?: 'AgentAssignment';
      visitLat?: number | null;
      visitLng?: number | null;
      assignedAgentId?: string | null;
    } | null;
    property: {
      __typename?: 'Property';
      address?: { __typename?: 'Address'; lat: number; lng: number } | null;
    };
  }>;
};

export type ValetDropsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
}>;

export type ValetDropsQuery = {
  __typename?: 'Query';
  valetDropsTotal: number;
  valetDrops: Array<{
    __typename?: 'Inquiry';
    id: number;
    contactNotes: string;
    startTime: any;
    endTime: any;
    agentAssignment?: {
      __typename?: 'AgentAssignment';
      visitLat?: number | null;
      visitLng?: number | null;
      assignedAgentId?: string | null;
    } | null;
    property: {
      __typename?: 'Property';
      address?: { __typename?: 'Address'; lat: number; lng: number } | null;
    };
  }>;
};

export type AssignAgentMutationVariables = Exact<{
  inquiryId: Scalars['Float']['input'];
  status: Scalars['String']['input'];
}>;

export type AssignAgentMutation = {
  __typename?: 'Mutation';
  assignAgent: { __typename?: 'Inquiry'; id: number };
};

export type AgentInquiryFieldsFragment = {
  __typename?: 'Inquiry';
  id: number;
  contactNotes: string;
  passcode?: string | null;
  status: InquiryStatus;
  startTime: any;
  endTime: any;
  property: {
    __typename?: 'Property';
    address?: { __typename?: 'Address'; lat: number; lng: number } | null;
  };
};

export type MyPickupTripsQueryVariables = Exact<{
  distinct?: InputMaybe<Array<InquiryScalarFieldEnum> | InquiryScalarFieldEnum>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  orderBy?: InputMaybe<
    Array<InquiryOrderByWithRelationInput> | InquiryOrderByWithRelationInput
  >;
  where?: InputMaybe<InquiryWhereInput>;
}>;

export type MyPickupTripsQuery = {
  __typename?: 'Query';
  inquiriesForAgent: Array<{
    __typename?: 'Inquiry';
    id: number;
    contactNotes: string;
    passcode?: string | null;
    status: InquiryStatus;
    startTime: any;
    endTime: any;
    agentAssignment?: {
      __typename?: 'AgentAssignment';
      visitLat?: number | null;
      visitLng?: number | null;
      assignedAgentId?: string | null;
    } | null;
    property: {
      __typename?: 'Property';
      address?: { __typename?: 'Address'; lat: number; lng: number } | null;
    };
  }>;
  inquiriesCount: { __typename?: 'AggregateCountOutput'; count: number };
};

export type MyDropTripsQueryVariables = Exact<{
  distinct?: InputMaybe<Array<InquiryScalarFieldEnum> | InquiryScalarFieldEnum>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  orderBy?: InputMaybe<
    Array<InquiryOrderByWithRelationInput> | InquiryOrderByWithRelationInput
  >;
  where?: InputMaybe<InquiryWhereInput>;
}>;

export type MyDropTripsQuery = {
  __typename?: 'Query';
  inquiriesForAgent: Array<{
    __typename?: 'Inquiry';
    id: number;
    contactNotes: string;
    passcode?: string | null;
    status: InquiryStatus;
    startTime: any;
    endTime: any;
    agentAssignment?: {
      __typename?: 'AgentAssignment';
      visitLat?: number | null;
      visitLng?: number | null;
      assignedAgentId?: string | null;
    } | null;
    property: {
      __typename?: 'Property';
      address?: { __typename?: 'Address'; lat: number; lng: number } | null;
    };
  }>;
  inquiriesCount: { __typename?: 'AggregateCountOutput'; count: number };
};

export type CreateVerificationMutationVariables = Exact<{
  createVerificationInput: CreateVerificationInput;
}>;

export type CreateVerificationMutation = {
  __typename?: 'Mutation';
  createVerification: {
    __typename?: 'Verification';
    adminId: string;
    createdAt: any;
    propertyId: number;
    updatedAt: any;
    verified: boolean;
  };
};

export type RemoveVerificationMutationVariables = Exact<{
  where: VerificationWhereUniqueInput;
}>;

export type RemoveVerificationMutation = {
  __typename?: 'Mutation';
  removeVerification: {
    __typename?: 'Verification';
    adminId: string;
    createdAt: any;
    propertyId: number;
    updatedAt: any;
    verified: boolean;
  };
};

export type AdminsQueryVariables = Exact<{
  distinct?: InputMaybe<Array<AdminScalarFieldEnum> | AdminScalarFieldEnum>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  cursor?: InputMaybe<AdminWhereUniqueInput>;
  orderBy?: InputMaybe<
    Array<AdminOrderByWithRelationInput> | AdminOrderByWithRelationInput
  >;
  where?: InputMaybe<AdminWhereInput>;
}>;

export type AdminsQuery = {
  __typename?: 'Query';
  adminsCount: number;
  admins: Array<{
    __typename?: 'Admin';
    uid: string;
    updatedAt: any;
    createdAt: any;
    verificationsCount: number;
    user?: { __typename?: 'User'; name?: string | null } | null;
  }>;
};

export type RemoveAdminMutationVariables = Exact<{
  where: AdminWhereUniqueInput;
}>;

export type RemoveAdminMutation = {
  __typename?: 'Mutation';
  removeAdmin: {
    __typename?: 'Admin';
    createdAt: any;
    updatedAt: any;
    uid: string;
    user?: { __typename?: 'User'; name?: string | null } | null;
  };
};

export type CreateAdminMutationVariables = Exact<{
  createAdminInput: CreateAdminInput;
}>;

export type CreateAdminMutation = {
  __typename?: 'Mutation';
  createAdmin: {
    __typename?: 'Admin';
    createdAt: any;
    uid: string;
    updatedAt: any;
    user?: { __typename?: 'User'; name?: string | null } | null;
  };
};

export const namedOperations = {
  Query: {
    Brokerages: 'Brokerages',
    GetAuthProvider: 'GetAuthProvider',
    SearchProperties: 'SearchProperties',
    myBrokerage: 'myBrokerage',
    Properties: 'Properties',
    InquiriesForCustomer: 'InquiriesForCustomer',
    InquiriesForProperty: 'InquiriesForProperty',
    AgentMe: 'AgentMe',
    AdminMe: 'AdminMe',
    myPropertiesAsAgent: 'myPropertiesAsAgent',
    companyAgents: 'companyAgents',
    valetPickups: 'valetPickups',
    valetDrops: 'valetDrops',
    myPickupTrips: 'myPickupTrips',
    myDropTrips: 'myDropTrips',
    admins: 'admins',
  },
  Mutation: {
    RegisterWithCredentials: 'RegisterWithCredentials',
    Login: 'Login',
    RegisterWithProvider: 'RegisterWithProvider',
    CreatePropertyFeature: 'CreatePropertyFeature',
    CreateBrokerage: 'CreateBrokerage',
    CreateProperty: 'CreateProperty',
    createInquiryTimeline: 'createInquiryTimeline',
    CreateAgent: 'CreateAgent',
    AssignAgent: 'AssignAgent',
    CreateVerification: 'CreateVerification',
    RemoveVerification: 'RemoveVerification',
    RemoveAdmin: 'RemoveAdmin',
    CreateAdmin: 'CreateAdmin',
  },
  Fragment: {
    AgentFields: 'AgentFields',
    InquiryFields: 'InquiryFields',
    AgentInquiryFields: 'AgentInquiryFields',
  },
};
export const AgentFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AgentFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Agent' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
          { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AgentFieldsFragment, unknown>;
export const InquiryFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InquiryFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Inquiry' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listPriceAtInquiry' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'endTime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startTime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contactNotes' } },
          { kind: 'Field', name: { kind: 'Name', value: 'passcode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inquiryTimeline' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'agentAssignment' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'assignedAgent' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AgentFields' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'images' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'address' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'address' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'lat' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lng' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AgentFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Agent' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
          { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<InquiryFieldsFragment, unknown>;
export const AgentInquiryFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AgentInquiryFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Inquiry' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contactNotes' } },
          { kind: 'Field', name: { kind: 'Name', value: 'passcode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startTime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endTime' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'address' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'lat' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lng' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AgentInquiryFieldsFragment, unknown>;
export const RegisterWithCredentialsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RegisterWithCredentials' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'registerWithCredentialsInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'RegisterWithCredentialsInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'registerWithCredentials' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'registerWithCredentialsInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'registerWithCredentialsInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RegisterWithCredentialsMutation,
  RegisterWithCredentialsMutationVariables
>;
export const BrokeragesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Brokerages' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'distinct' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'BrokerageScalarFieldEnum' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BrokerageOrderByWithRelationInput',
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'BrokerageWhereInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cursor' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'BrokerageWhereUniqueInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'brokerages' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'distinct' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'distinct' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cursor' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cursor' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skip' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'take' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'properties' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'brokerageManagers' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BrokeragesQuery, BrokeragesQueryVariables>;
export const LoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Login' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'loginInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'LoginInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'loginInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'loginInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const GetAuthProviderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAuthProvider' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'uid' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getAuthProvider' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'uid' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'uid' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetAuthProviderQuery,
  GetAuthProviderQueryVariables
>;
export const RegisterWithProviderDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RegisterWithProvider' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'registerWithProviderInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'RegisterWithProviderInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'registerWithProvider' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'registerWithProviderInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'registerWithProviderInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RegisterWithProviderMutation,
  RegisterWithProviderMutationVariables
>;
export const SearchPropertiesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SearchProperties' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'dateFilter' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DateFilterInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'locationFilter' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'LocationFilterInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'featuresFilter' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'PropertyFeatureWhereInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'propertyFilter' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'PropertyFilter' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'searchProperties' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'dateFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'dateFilter' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'locationFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'locationFilter' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'featuresFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'featuresFilter' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'propertyFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'propertyFilter' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'address' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'lat' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lng' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'address' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'images' } },
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'listPrice' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'featureCounts' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'verification' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'verified' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SearchPropertiesQuery,
  SearchPropertiesQueryVariables
>;
export const CreatePropertyFeatureDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreatePropertyFeature' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'createPropertyFeatureInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreatePropertyFeatureInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createPropertyFeature' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createPropertyFeatureInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'createPropertyFeatureInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreatePropertyFeatureMutation,
  CreatePropertyFeatureMutationVariables
>;
export const MyBrokerageDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'myBrokerage' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'myBrokerage' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'properties' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'displayName' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'address' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'address' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lat' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lng' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MyBrokerageQuery, MyBrokerageQueryVariables>;
export const CreateBrokerageDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateBrokerage' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'createBrokerageInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateBrokerageInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createBrokerage' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createBrokerageInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'createBrokerageInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateBrokerageMutation,
  CreateBrokerageMutationVariables
>;
export const PropertiesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Properties' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cursor' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'PropertyWhereUniqueInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'PropertyOrderByWithRelationInput',
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'PropertyWhereInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'properties' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skip' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'take' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cursor' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cursor' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'images' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'verification' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'verified' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'address' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lat' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lng' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'address' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'featureCounts' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'propertiesCount' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'count' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PropertiesQuery, PropertiesQueryVariables>;
export const CreatePropertyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateProperty' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'createPropertyInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreatePropertyInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createProperty' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createPropertyInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'createPropertyInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreatePropertyMutation,
  CreatePropertyMutationVariables
>;
export const InquiriesForCustomerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'InquiriesForCustomer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cursor' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'InquiryWhereUniqueInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'InquiryOrderByWithRelationInput',
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'InquiryWhereInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'distinct' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'InquiryScalarFieldEnum' },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inquiriesForCustomer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skip' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'take' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cursor' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cursor' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'distinct' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'distinct' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'InquiryFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inquiriesCount' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'count' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AgentFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Agent' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
          { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InquiryFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Inquiry' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listPriceAtInquiry' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'endTime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startTime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contactNotes' } },
          { kind: 'Field', name: { kind: 'Name', value: 'passcode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inquiryTimeline' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'agentAssignment' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'assignedAgent' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AgentFields' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'images' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'address' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'address' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'lat' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lng' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  InquiriesForCustomerQuery,
  InquiriesForCustomerQueryVariables
>;
export const InquiriesForPropertyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'InquiriesForProperty' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cursor' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'InquiryWhereUniqueInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'InquiryOrderByWithRelationInput',
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'InquiryWhereInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'distinct' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'InquiryScalarFieldEnum' },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inquiriesForProperty' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skip' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'take' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cursor' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cursor' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'distinct' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'distinct' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'InquiryFields' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inquiriesCount' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'count' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AgentFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Agent' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
          { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'InquiryFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Inquiry' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'listPriceAtInquiry' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'endTime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startTime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contactNotes' } },
          { kind: 'Field', name: { kind: 'Name', value: 'passcode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inquiryTimeline' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'agentAssignment' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'assignedAgent' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'AgentFields' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'images' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'address' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'address' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'lat' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lng' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  InquiriesForPropertyQuery,
  InquiriesForPropertyQueryVariables
>;
export const CreateInquiryTimelineDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createInquiryTimeline' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'createInquiryTimelineInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateInquiryTimelineInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createInquiryTimeline' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createInquiryTimelineInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'createInquiryTimelineInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'inquiryId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'managerId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateInquiryTimelineMutation,
  CreateInquiryTimelineMutationVariables
>;
export const AgentMeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AgentMe' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'valetMe' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'brokerageId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AgentMeQuery, AgentMeQueryVariables>;
export const AdminMeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AdminMe' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'adminMe' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminMeQuery, AdminMeQueryVariables>;
export const CreateAgentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateAgent' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'createAgentInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateAgentInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createAgent' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createAgentInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'createAgentInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'agent' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'displayName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'licenseID' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'brokerageId' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'temporaryPassword' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateAgentMutation, CreateAgentMutationVariables>;
export const MyPropertiesAsAgentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'myPropertiesAsAgent' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'myPropertiesAsAgent' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skip' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'take' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'images' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'verification' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'verified' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'address' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lat' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lng' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'address' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'featureCounts' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'myPropertiesAsAgentCount' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'count' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MyPropertiesAsAgentQuery,
  MyPropertiesAsAgentQueryVariables
>;
export const CompanyAgentsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'companyAgents' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'distinct' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'AgentScalarFieldEnum' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cursor' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'AgentWhereUniqueInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'AgentOrderByWithRelationInput' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'AgentWhereInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'companyAgents' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'distinct' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'distinct' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skip' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'take' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cursor' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cursor' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'brokerageId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                { kind: 'Field', name: { kind: 'Name', value: 'licenseID' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'companyAgentsTotal' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CompanyAgentsQuery, CompanyAgentsQueryVariables>;
export const ValetPickupsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'valetPickups' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'valetPickups' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skip' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'take' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'contactNotes' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'agentAssignment' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'visitLat' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'visitLng' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'assignedAgentId' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'startTime' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endTime' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'property' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'address' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lat' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lng' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'valetPickupsTotal' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ValetPickupsQuery, ValetPickupsQueryVariables>;
export const ValetDropsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'valetDrops' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'valetDrops' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skip' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'take' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'contactNotes' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'startTime' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endTime' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'agentAssignment' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'visitLat' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'visitLng' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'assignedAgentId' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'property' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'address' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lat' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lng' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'valetDropsTotal' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ValetDropsQuery, ValetDropsQueryVariables>;
export const AssignAgentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AssignAgent' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'inquiryId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'status' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignAgent' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'inquiryId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'inquiryId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'status' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AssignAgentMutation, AssignAgentMutationVariables>;
export const MyPickupTripsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'myPickupTrips' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'distinct' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'InquiryScalarFieldEnum' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'InquiryOrderByWithRelationInput',
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'InquiryWhereInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inquiriesForAgent' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'distinct' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'distinct' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skip' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'take' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AgentInquiryFields' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'agentAssignment' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'visitLat' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'visitLng' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'assignedAgentId' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inquiriesCount' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'count' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AgentInquiryFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Inquiry' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contactNotes' } },
          { kind: 'Field', name: { kind: 'Name', value: 'passcode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startTime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endTime' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'address' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'lat' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lng' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MyPickupTripsQuery, MyPickupTripsQueryVariables>;
export const MyDropTripsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'myDropTrips' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'distinct' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'InquiryScalarFieldEnum' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'InquiryOrderByWithRelationInput',
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'InquiryWhereInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inquiriesForAgent' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'distinct' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'distinct' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skip' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'take' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AgentInquiryFields' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'agentAssignment' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'visitLat' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'visitLng' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'assignedAgentId' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'inquiriesCount' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'count' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AgentInquiryFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Inquiry' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contactNotes' } },
          { kind: 'Field', name: { kind: 'Name', value: 'passcode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startTime' } },
          { kind: 'Field', name: { kind: 'Name', value: 'endTime' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'property' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'address' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'lat' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'lng' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MyDropTripsQuery, MyDropTripsQueryVariables>;
export const CreateVerificationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateVerification' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'createVerificationInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateVerificationInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createVerification' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createVerificationInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'createVerificationInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'adminId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'propertyId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'verified' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateVerificationMutation,
  CreateVerificationMutationVariables
>;
export const RemoveVerificationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RemoveVerification' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'VerificationWhereUniqueInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'removeVerification' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'adminId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'propertyId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'verified' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RemoveVerificationMutation,
  RemoveVerificationMutationVariables
>;
export const AdminsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'admins' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'distinct' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'AdminScalarFieldEnum' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'cursor' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'AdminWhereUniqueInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'AdminOrderByWithRelationInput' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'AdminWhereInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'admins' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'distinct' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'distinct' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skip' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'take' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cursor' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'cursor' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'verificationsCount' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'adminsCount' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminsQuery, AdminsQueryVariables>;
export const RemoveAdminDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RemoveAdmin' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AdminWhereUniqueInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'removeAdmin' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RemoveAdminMutation, RemoveAdminMutationVariables>;
export const CreateAdminDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateAdmin' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'createAdminInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateAdminInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createAdmin' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createAdminInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'createAdminInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateAdminMutation, CreateAdminMutationVariables>;
