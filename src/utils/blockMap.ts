import HeroBlock from "../components/organisms/HeroBlock/HeroBlock";
import FeatureBlock from "../components/organisms/FeatureBlock/FeatureBlock";
import Header from "../components/organisms/Header/Header";
import Button from "../components/organisms/Button/Button";

export const blockMap: Record<string, React.FC> = {
  "hero-1": HeroBlock,
  "feature-1": FeatureBlock,
  "header-1": Header,
  "button-1": Button,
};
