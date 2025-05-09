import HeroBlock from "../components/organisms/HeroBlock/HeroBlock";
import FeatureBlock from "../components/organisms/FeatureBlock/FeatureBlock";
import type { BlockProps } from "../type/blocks";

export const blockMap: Record<string, React.FC<BlockProps>> = {
  "hero-1": HeroBlock,
  "feature-1": FeatureBlock,
};
