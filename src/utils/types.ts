export type Theme = 'LIGHT' | 'DARK';

export enum SortType {
  DATE = 'DATE',
  GROUPING = 'GROUPING',
  PARTICIPATION = 'PARTICIPATION',
}

export type Quote = {
  quote?: string;
  author?: string;
};

export type City = {
  id?: number;
  name?: string;
  code?: string;
};

export type FeatureFlipping = {
  canCreateGathering: boolean;
  canCreateGrouping: boolean;
};

export type Configu = {
  quote: Quote;
  featureFlipping: FeatureFlipping;
  leafletKey?: string;
  leafletAttribution?: string;
};

export type Address = {
  id: number | undefined;
  address: string;
  zipcode: number | undefined;
  city: string;
  supplement: string | undefined;
  lat?: number;
  lon?: number;
};

export const emptyAddress = (): Address => {
  return {
    id: undefined,
    address: '',
    zipcode: undefined,
    city: '',
    supplement: undefined,
  };
};

export const GATHERING_STATUS = ['DRAFT', 'PENDING', 'PUBLISHED', 'BANNED', 'REMOVED'];
const GATHERING_STATUS_READ_ONLY = ['DRAFT', 'PENDING', 'PUBLISHED', 'BANNED', 'REMOVED'] as const;
export type GatheringStatus = (typeof GATHERING_STATUS_READ_ONLY)[number];

export type Gathering = {
  id?: number;
  title?: string;
  startAddress?: Address;
  arrivalAddress?: Address;
  stepsAddresses: Address[];
  startDate?: string;
  endDate?: string;
  why?: string;
  type?: GatheringType;
  status?: GatheringStatus;
  tags?: Tag[];
  groupings?: Grouping[];

  isBookmarkedByUser?: boolean;
  isCreatedByUser?: boolean;
  isReportedByUser?: boolean;
  joiningStatusByUser?: JoiningStatus;
};

export const GATHERING_TYPE = ['PROTEST', 'STRIKE', 'OTHER'];
export const GATHERING_TYPE_READ_ONLY = ['PROTEST', 'STRIKE', 'OTHER'] as const;
export type GatheringType = (typeof GATHERING_TYPE_READ_ONLY)[number];
export const GatheringTypeLabel = new Map<GatheringType, string>([
  ['PROTEST', 'Manif'],
  ['STRIKE', 'Grève'],
  ['OTHER', 'Autre'],
]);

export const JOINING_STATUS = ['COMING', 'MAYBE_COMING', 'NOT_COMING'];
const JOINING_STATUS_READ_ONLY = ['COMING', 'MAYBE_COMING', 'NOT_COMING'] as const;
export type JoiningStatus = (typeof JOINING_STATUS_READ_ONLY)[number];

export const GATHERING_AVAILABILITIES = ['ALL', 'DRAFT', 'PAST', 'ARCHIVED', 'FORTHCOMING', 'TODAY', 'PENDING', 'PUBLISHED', 'CREATED_TODAY'];
const GATHERING_AVAILABILITIES_READ_ONLY = ['ALL', 'DRAFT', 'PAST', 'ARCHIVED', 'FORTHCOMING', 'TODAY', 'PENDING', 'PUBLISHED', 'CREATED_TODAY'] as const;
export type GatheringAvailability = (typeof GATHERING_AVAILABILITIES_READ_ONLY)[number];

export type CardAspect = 'CARD' | 'COMPACT';

export type Joining = {
  joiningStatus: JoiningStatus;
};

export type BasicUser = {
  id: number;
  email?: string;
  pseudo?: string;
};

export type FullUser = BasicUser & {
  isProfilePrivate?: boolean;
  ban: boolean;
  valid: boolean;
  verified: boolean;
};

export type UserData = BasicUser & {
  grouping: Grouping;
  followedGroupings: Grouping[];
  followedGatherings: Gathering[];
  createdGatherings: Gathering[];
};

export type UserParams = {
  isProfilePrivate: boolean;
  partiallySighted: boolean;
  isNotifGroupingsEnabled: boolean;
  isNotifUsersEnabled: boolean;
  isNotifUpdatedGatheringsEnabled: boolean;
};

export type UserDeletionParams = {
  removeUserGatherings: boolean;
  removeUserGrouping: boolean;
};

export type Credential = {
  email: string;
  password: string;
};

export type Admin = {
  email: string;
};

export type BasicGrouping = {
  id?: number;
  name: string;
  description?: string;
};

export type Grouping = BasicGrouping & {
  removed?: boolean;
  validated?: boolean;
  representative?: BasicUser;
  isBookmarkedByUser?: boolean;
  address?: Address;
  phone?: string;
  website?: string;
  information?: string;
  slogan?: string;
  contact?: string;
  confirmed?: boolean;
  type?: GroupingType;
  tags?: Tag[];
};

export const GROUPING_TYPES = ['ASSOCIATION', 'COLLECTIVE', 'TRADE_UNION', 'NGO', 'ADVOCACY_GROUPS', 'OTHER_GROUPING'];
const GROUPING_TYPES_READ_ONLY = ['ASSOCIATION', 'COLLECTIVE', 'TRADE_UNION', 'NGO', 'ADVOCACY_GROUPS', 'OTHER_GROUPING'] as const;
export type GroupingType = (typeof GROUPING_TYPES_READ_ONLY)[number];
export const GroupingTypeLabel = new Map<GroupingType, string>([
  ['ASSOCIATION', 'Association'],
  ['COLLECTIVE', 'Collectif'],
  ['TRADE_UNION', 'Syndicat'],
  ['NGO', 'ONG'],
  ['ADVOCACY_GROUPS', 'Groupe de plaidoyer'],
  ['OTHER_GROUPING', 'Autre'],
]);

export type Tag = {
  id?: number;
  label: string;
};

export type FollowedUser = BasicUser & {
  nbCreatedForthcomingGatherings: number;
  nbFollowedForthcomingGatherings: number;
  nbJoiningForthcomingGatherings: number;
};

export type BookmarkableType = 'GATHERING' | 'GROUPING' | 'USER' | 'SEARCH';

export enum SearchTypeEnum {
  'GATHERING' = 'GATHERING',
  'GROUPING' = 'GROUPING',
}

export type SearchType = `${SearchTypeEnum}`;

export type DateType = 'FROM' | 'TODAY';

export type DashboardParams = {
  startDate: Date | string
  endDate: Date | string
};

export type SimpleSearchFiltersParams = {
  term: string | undefined;
  city: string | undefined;
  distance: number | undefined;
};

export type SearchFiltersParams = SimpleSearchFiltersParams &
  Pageable & {
  date: Date | undefined | string;
  dateType: DateType;
  groupings: number[];
  types: string[];
  sort: SortType;
};

export const defaultSearchFiltersParams: SearchFiltersParams = {
  term: undefined,
  city: undefined,
  distance: 0,
  date: undefined,
  dateType: 'FROM',
  groupings: [],
  types: [],
  sort: SortType.DATE,
};

export type Pageable = {
  page?: number;
  size?: number;
};

export type Page<T> = {
  loaded: boolean;
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {pageNumber: number; pageSize: number};
  size: number;
  sort: string;
  totalElements: number;
  totalPages: number;
  content: T[];
};

export type NotificationStatus = 'SENT' | 'READ';

export type Notification = {
  id: number;
  gatheringId: number;
  groupingName: string;
  message: string;
  datu: Date;
  status: NotificationStatus;
  fromSSE: boolean;
};

export type Report = {
  id?: number;
  gathering: Gathering | undefined;
  why: string;
  user?: BasicUser;
  createdAt?: Date;
};

export type CountReport = {
  count: number;
  gatheringId: number;
};

export type Toastounet = {
  message: string;
  type: 'success' | 'warning' | 'danger';
};

export type Contact = {
  email: string | undefined;
  subject: string | undefined;
  message: string | undefined;
};

export type Cgu = {
  articles: CguArticle[];
};

export type CguArticle = {
  order: number;
  title: string;
  content: string;
};

export type AdminCgu = {
  id: number;
  content: string;
  order: number;
  title: string;
  type: string;
  versionNumber: number;
};

export type FollowSearch = {
  id?: number;
  term: string;
  city: string;
  distance: number;
  date: Date;
  dateType: DateType;
  groupings: BasicGrouping[];
  types: GatheringType[];
};

export type AltchaChallenge = {
  algorithm: string;
  challenge: string;
  maxnumber: number;
  salt: string;
  signature: string;
};

export type WithBookmark = {
  isBookmarkedByUser?: boolean;
};
export type UserWithBookmark = FollowedUser & WithBookmark;
export type FullSearch = FollowSearch & WithBookmark;

export type RGB = {red: number; green: number; blue: number};

export type HttpError = {status: number; message: string};
