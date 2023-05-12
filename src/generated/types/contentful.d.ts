import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface ApplyPageFields {
    heading: EntryFieldTypes.Symbol;
    pictures?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    subheading: EntryFieldTypes.RichText;
    roles: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<RoleSkeleton>>;
    learnMore?: EntryFieldTypes.RichText;
    faq?: EntryFieldTypes.RichText;
    meta: EntryFieldTypes.EntryLink<MetaSkeleton>;
}

export type ApplyPageSkeleton = EntrySkeletonType<ApplyPageFields, "applyPage">;
export type ApplyPage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<ApplyPageSkeleton, Modifiers, Locales>;

export interface CallToActionSectionFields {
    heading: EntryFieldTypes.Symbol;
    mainText: EntryFieldTypes.Text;
    organizationDescription: EntryFieldTypes.Text;
    studentDescription: EntryFieldTypes.Text;
}

export type CallToActionSectionSkeleton = EntrySkeletonType<CallToActionSectionFields, "callToActionSection">;
export type CallToActionSection<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<CallToActionSectionSkeleton, Modifiers, Locales>;

export interface CaseStudyFields {
    projectName: EntryFieldTypes.Symbol;
    projectYear: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    thumbnail?: EntryFieldTypes.AssetLink;
    previewDescription: EntryFieldTypes.Text;
    platform: EntryFieldTypes.Symbol;
    headerImage: EntryFieldTypes.AssetLink;
    mainImage: EntryFieldTypes.AssetLink;
    mainDescription: EntryFieldTypes.Text;
    nonprofitLogo: EntryFieldTypes.AssetLink;
    nonprofitDescription: EntryFieldTypes.Text;
    teamMembers?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<MemberInRoleSkeleton>>;
}

export type CaseStudySkeleton = EntrySkeletonType<CaseStudyFields, "caseStudy">;
export type CaseStudy<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<CaseStudySkeleton, Modifiers, Locales>;

export interface CaseStudySectionFields {
    caseStudies: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<CaseStudySkeleton>>;
}

export type CaseStudySectionSkeleton = EntrySkeletonType<CaseStudySectionFields, "caseStudySection">;
export type CaseStudySection<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<CaseStudySectionSkeleton, Modifiers, Locales>;

export interface ClubMemberFields {
    picture: EntryFieldTypes.AssetLink;
    name: EntryFieldTypes.Symbol;
    bio?: EntryFieldTypes.Text;
}

export type ClubMemberSkeleton = EntrySkeletonType<ClubMemberFields, "clubMember">;
export type ClubMember<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<ClubMemberSkeleton, Modifiers, Locales>;

export interface CommunityPartnerContactFields {
    heading: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.RichText;
}

export type CommunityPartnerContactSkeleton = EntrySkeletonType<CommunityPartnerContactFields, "communityPartnerContact">;
export type CommunityPartnerContact<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<CommunityPartnerContactSkeleton, Modifiers, Locales>;

export interface MemberInRoleFields {
    entryTitle: EntryFieldTypes.Symbol;
    member: EntryFieldTypes.EntryLink<ClubMemberSkeleton>;
    roleText: EntryFieldTypes.Symbol;
}

export type MemberInRoleSkeleton = EntrySkeletonType<MemberInRoleFields, "memberInRole">;
export type MemberInRole<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<MemberInRoleSkeleton, Modifiers, Locales>;

export interface MembersSectionFields {
    heading: EntryFieldTypes.Symbol;
    members: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<ClubMemberSkeleton>>;
}

export type MembersSectionSkeleton = EntrySkeletonType<MembersSectionFields, "membersSection">;
export type MembersSection<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<MembersSectionSkeleton, Modifiers, Locales>;

export interface MetaFields {
    title: EntryFieldTypes.Symbol;
    includeTitleSuffix: EntryFieldTypes.Boolean;
    description?: EntryFieldTypes.Text;
}

export type MetaSkeleton = EntrySkeletonType<MetaFields, "meta">;
export type Meta<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<MetaSkeleton, Modifiers, Locales>;

export interface PageFields {
    path: EntryFieldTypes.Symbol;
    heading: EntryFieldTypes.Symbol;
    subheading: EntryFieldTypes.RichText;
    meta: EntryFieldTypes.EntryLink<MetaSkeleton>;
    sections: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<CallToActionSectionSkeleton | CaseStudySectionSkeleton | MembersSectionSkeleton | StatsSectionSkeleton | ValuesSectionSkeleton>>;
}

export type PageSkeleton = EntrySkeletonType<PageFields, "page">;
export type Page<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<PageSkeleton, Modifiers, Locales>;

export interface RoleFields {
    name: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    applicationLink?: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.RichText;
}

export type RoleSkeleton = EntrySkeletonType<RoleFields, "role">;
export type Role<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<RoleSkeleton, Modifiers, Locales>;

export interface StatisticFields {
    statistic: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
}

export type StatisticSkeleton = EntrySkeletonType<StatisticFields, "statistic">;
export type Statistic<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<StatisticSkeleton, Modifiers, Locales>;

export interface StatsSectionFields {
    heading: EntryFieldTypes.Text;
    statistics: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<StatisticSkeleton>>;
}

export type StatsSectionSkeleton = EntrySkeletonType<StatsSectionFields, "statsSection">;
export type StatsSection<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<StatsSectionSkeleton, Modifiers, Locales>;

export interface ValueFields {
    image: EntryFieldTypes.AssetLink;
    heading: EntryFieldTypes.Symbol;
    body: EntryFieldTypes.Text;
}

export type ValueSkeleton = EntrySkeletonType<ValueFields, "value">;
export type Value<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<ValueSkeleton, Modifiers, Locales>;

export interface ValuesSectionFields {
    values: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<ValueSkeleton>>;
}

export type ValuesSectionSkeleton = EntrySkeletonType<ValuesSectionFields, "valuesSection">;
export type ValuesSection<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<ValuesSectionSkeleton, Modifiers, Locales>;
