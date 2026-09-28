import { ObjectId } from "mongodb";

export interface HeroImageReference {
  url: string;
  key: string;
}

export interface HeroButtonConfig {
  enabled: boolean;
  text: string;
  link: string;
}

export interface HeroSlideDocument {
  _id?: ObjectId;
  eyebrow?: string;
  title: string;
  description?: string;
  desktopImage: HeroImageReference;
  mobileImage: HeroImageReference;
  primaryButton: HeroButtonConfig;
  secondaryButton: HeroButtonConfig;
  order: number;
  isActive: boolean;
  startDate?: Date | string | null;
  endDate?: Date | string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface HeroSlide {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  desktopImage: HeroImageReference;
  mobileImage: HeroImageReference;
  primaryButton: HeroButtonConfig;
  secondaryButton: HeroButtonConfig;
  order: number;
  isActive: boolean;
  startDate?: string | null;
  endDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateHeroSlideInput {
  eyebrow?: string;
  title: string;
  description?: string;
  desktopImage: HeroImageReference;
  mobileImage: HeroImageReference;
  primaryButton: HeroButtonConfig;
  secondaryButton: HeroButtonConfig;
  order?: number;
  isActive?: boolean;
  startDate?: string | null;
  endDate?: string | null;
}

export type UpdateHeroSlideInput = Partial<CreateHeroSlideInput>;
