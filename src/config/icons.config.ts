import { ArrowRightIcon } from "@/icons/arrow-right.icon";
import { DeliveryIcon } from "@/icons/delivery.icon";
import { DollerIcon } from "@/icons/doller.icon";
import { FeatureFourIcon } from "@/icons/feature-four";
import { FeatureOneIcon } from "@/icons/feature-one";
import { FeatureThreeIcon } from "@/icons/feature-three";
import { FeatureTwoIcon } from "@/icons/feature-two";
import { GiftIcon } from "@/icons/gift.icon";
import { GlaseIcon } from "@/icons/glase.icon";
import { HandIcon } from "@/icons/hand-icon";
import { LeafIcon } from "@/icons/leaf-icon";
import { MrStarIcon, MrStarIconSmall } from "@/icons/mr-star-icon";
import { PromoIcon } from "@/icons/promo.icon";
import { ReviewCheckedIcon } from "@/icons/review-checked.icon";
import { ShieldIcon } from "@/icons/shield-icon";
import { TrackIcon } from "@/icons/track-icon";
import { HandHeart } from "lucide-react";

const ICON_NAMES = {
  GLASE: GlaseIcon,
  REVIEW_CHECKED: ReviewCheckedIcon,
  DELIVERY: DeliveryIcon,
  PROMO: PromoIcon,
  GIFT: GiftIcon,
  DOLLER: DollerIcon,
  ARROW_RIGHT: ArrowRightIcon,
  HAND_ICON: HandHeart,
  FEATURE_ONE: FeatureOneIcon,
  FEATURE_TWO: FeatureTwoIcon,
  FEATURE_THREE: FeatureThreeIcon,
  FEATURE_FOUR: FeatureFourIcon,
  LEAF_ICON: LeafIcon,
  SHIELD_ICON: ShieldIcon,
  HAND_ICON_BLUE: HandIcon,
  TRUCK_ICON: TrackIcon,
  MR_STAR_ICON: MrStarIcon,
  MR_STAR_ICON_SMALL: MrStarIconSmall,
};

export { ICON_NAMES };

export type IconName = keyof typeof ICON_NAMES;
