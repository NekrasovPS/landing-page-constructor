import HeroBlock from "../components/organisms/HeroBlock/HeroBlock";
import HeroBlock2 from "../components/organisms/HeroBlock/HeroBlock2";
import HeroBlock3 from "../components/organisms/HeroBlock/HeroBlock3";
import HeroBlock4 from "../components/organisms/HeroBlock/HeroBlock4";
import HeroBlock5 from "../components/organisms/HeroBlock/HeroBlock5";
import HeroBlock6 from "../components/organisms/HeroBlock/HeroBlock6";
import HeroBlock7 from "../components/organisms/HeroBlock/HeroBlock7";
import HeroBlock8 from "../components/organisms/HeroBlock/HeroBlock8";
import HeroBlock9 from "../components/organisms/HeroBlock/HeroBlock9";
import HeroBlock10 from "../components/organisms/HeroBlock/HeroBlock10";
import FeatureBlock from "../components/organisms/FeatureBlock/FeatureBlock";
import FeatureBlock2 from "../components/organisms/FeatureBlock/FeatureBlock2";
import BenefitBlock from "../components/organisms/BenefitBlock/BenefitBlock";
import CtaBlock from "../components/organisms/CtaBlock/CtaBlock";
import FooterBlock from "../components/organisms/FooterBlock/FooterBlock";
import PricingBlock from "../components/organisms/PricingBlock/PricingBlock";
import TestimonialsBlock from "../components/organisms/TestimonialsBlock/TestimonialsBlock";
import GalleryBlock from "../components/organisms/GalleryBlock/GalleryBlock";
import FaqBlock from "../components/organisms/FaqBlock/FaqBlock";
import TeamBlock from "../components/organisms/TeamBlock/TeamBlock";
import StepsBlock from "../components/organisms/StepsBlock/StepsBlock";
import StatisticsBlock from "../components/organisms/StatisticsBlock/StatisticsBlock";
import LogosBlock from "../components/organisms/LogosBlock/LogosBlock";
import VideoBlock from "../components/organisms/VideoBlock/VideoBlock";
import NewsletterBlock from "../components/organisms/NewsletterBlock/NewsletterBlock";
import ContactFormBlock from "../components/organisms/ContactFormBlock/ContactFormBlock";
import AppDownloadBlock from "../components/organisms/AppDownloadBlock/AppDownloadBlock";

import { heroEditableFields } from "../components/organisms/HeroBlock/heroEditableFields";
import { hero2EditableFields } from "../components/organisms/HeroBlock/hero2EditableFields";
import { hero3EditableFields } from "../components/organisms/HeroBlock/hero3EditableFields";
import { hero4EditableFields } from "../components/organisms/HeroBlock/hero4EditableFields";
import { hero5EditableFields } from "../components/organisms/HeroBlock/hero5EditableFields";
import { hero6EditableFields } from "../components/organisms/HeroBlock/hero6EditableFields";
import { hero7EditableFields } from "../components/organisms/HeroBlock/hero7EditableFields";
import { hero8EditableFields } from "../components/organisms/HeroBlock/hero8EditableFields";
import { hero9EditableFields } from "../components/organisms/HeroBlock/hero9EditableFields";
import { hero10EditableFields } from "../components/organisms/HeroBlock/hero10EditableFields";
import { feature2EditableFields } from "../components/organisms/FeatureBlock/feature2EditableFields";
import { benefitEditableFields } from "../components/organisms/BenefitBlock/benefitEditableFields";
import { ctaEditableFields } from "../components/organisms/CtaBlock/ctaEditableFields";
import { footerEditableFields } from "../components/organisms/FooterBlock/footerEditableFields";
import { pricingEditableFields } from "../components/organisms/PricingBlock/pricingEditableFields";
import { testimonialEditableFields } from "../components/organisms/TestimonialsBlock/testimonialEditableFields";
import { galleryEditableFields } from "../components/organisms/GalleryBlock/galleryEditableFields";
import { faqEditableFields } from "../components/organisms/FaqBlock/faqEditableFields";
import { teamEditableFields } from "../components/organisms/TeamBlock/teamEditableFields";
import { stepsEditableFields } from "../components/organisms/StepsBlock/stepsEditableFields";
import { statisticsEditableFields } from "../components/organisms/StatisticsBlock/statisticsEditableFields";
import { logosEditableFields } from "../components/organisms/LogosBlock/logosEditableFields";
import { videoEditableFields } from "../components/organisms/VideoBlock/videoEditableFields";
import { newsletterEditableFields } from "../components/organisms/NewsletterBlock/newsletterEditableFields";
import { contactFormEditableFields } from "../components/organisms/ContactFormBlock/contactFormEditableFields";
import { appDownloadEditableFields } from "../components/organisms/AppDownloadBlock/appDownloadEditableFields";

import type { BlockProps } from "../type/blocks";

interface BlockMeta {
  component: React.FC<BlockProps>;
  editableFields: {
    name: keyof BlockProps;
    label: string;
    type: string;
  }[];
}

export const blockMap: Record<string, BlockMeta> = {
  "hero-1": {
    component: HeroBlock,
    editableFields: heroEditableFields,
  },
  "hero-2": {
    component: HeroBlock2,
    editableFields: hero2EditableFields,
  },
  "hero-3": {
    component: HeroBlock3,
    editableFields: hero3EditableFields,
  },
  "hero-4": {
    component: HeroBlock4,
    editableFields: hero4EditableFields,
  },
  "hero-5": {
    component: HeroBlock5,
    editableFields: hero5EditableFields,
  },
  "hero-6": {
    component: HeroBlock6,
    editableFields: hero6EditableFields,
  },
  "hero-7": {
    component: HeroBlock7,
    editableFields: hero7EditableFields,
  },
  "hero-8": {
    component: HeroBlock8,
    editableFields: hero8EditableFields,
  },
  "hero-9": {
    component: HeroBlock9,
    editableFields: hero9EditableFields,
  },
  "hero-10": {
    component: HeroBlock10,
    editableFields: hero10EditableFields,
  },
  "feature-1": {
    component: FeatureBlock,
    editableFields: [],
  },
  "feature-2": {
    component: FeatureBlock2,
    editableFields: feature2EditableFields,
  },
  "benefit-1": {
    component: BenefitBlock,
    editableFields: benefitEditableFields,
  },
  "cta-1": {
    component: CtaBlock,
    editableFields: ctaEditableFields,
  },
  "pricing-1": {
    component: PricingBlock,
    editableFields: pricingEditableFields,
  },
  "testimonial-1": {
    component: TestimonialsBlock,
    editableFields: testimonialEditableFields,
  },
  "footer-1": {
    component: FooterBlock,
    editableFields: footerEditableFields,
  },
  "gallery-1": {
    component: GalleryBlock,
    editableFields: galleryEditableFields,
  },
  "faq-1": {
    component: FaqBlock,
    editableFields: faqEditableFields,
  },
  "team-1": {
    component: TeamBlock,
    editableFields: teamEditableFields,
  },
  "steps-1": {
    component: StepsBlock,
    editableFields: stepsEditableFields,
  },
  "statistics-1": {
    component: StatisticsBlock,
    editableFields: statisticsEditableFields,
  },
  "logos-1": {
    component: LogosBlock,
    editableFields: logosEditableFields,
  },
  "video-1": {
    component: VideoBlock,
    editableFields: videoEditableFields,
  },
  "newsletter-1": {
    component: NewsletterBlock,
    editableFields: newsletterEditableFields,
  },
  "contact-1": {
    component: ContactFormBlock,
    editableFields: contactFormEditableFields,
  },
  "app-1": {
    component: AppDownloadBlock,
    editableFields: appDownloadEditableFields,
  },
};
