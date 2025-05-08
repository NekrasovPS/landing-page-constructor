import HeroBlock from "../components/organisms/HeroBlock/HeroBlock";
import FeatureBlock from "../components/organisms/FeatureBlock/FeatureBlock";

export const blockMap: Record<string, React.FC> = {
  "hero-1": HeroBlock,
  "feature-1": FeatureBlock,
};
