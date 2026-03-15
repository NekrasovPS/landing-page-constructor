import HeroBlock from "../components/organisms/HeroBlock/HeroBlock";
import HeroBlock2 from "../components/organisms/HeroBlock/HeroBlock2";
import HeroBlock3 from "../components/organisms/HeroBlock/HeroBlock3";
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

import { heroEditableFields } from "../components/organisms/HeroBlock/heroEditableFields";
import { hero2EditableFields } from "../components/organisms/HeroBlock/hero2EditableFields";
import { hero3EditableFields } from "../components/organisms/HeroBlock/hero3EditableFields";
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
};
