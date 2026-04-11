import { useState } from "react";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";

const previewObserverOptions: IntersectionObserverInit = {
  threshold: 0.12,
  rootMargin: "0px 0px -80px 0px",
};
import {
  HeroPreviewRoot,
  HeroPreviewFrame,
  HeroPreviewChrome,
  HeroPreviewDots,
  HeroPreviewDot,
  HeroPreviewUrlBar,
  HeroPreviewBody,
  HeroPreviewImage,
  HeroPreviewPlaceholder,
  HeroPreviewPlaceholderInner,
  HeroPreviewBadge,
  HeroPreviewBadgeRow,
} from "../styles/HeroPreviewStyles";

const HERO_IMAGE_SRC = "/images/welcome/hero-app.webp";

export function HeroAppPreview() {
  const { ref, isVisible } = useScrollAnimation(previewObserverOptions);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <HeroPreviewRoot ref={ref} $visible={isVisible}>
      <HeroPreviewFrame>
        <HeroPreviewChrome>
          <HeroPreviewDots>
            <HeroPreviewDot $tone="close" />
            <HeroPreviewDot $tone="min" />
            <HeroPreviewDot $tone="max" />
          </HeroPreviewDots>
          <HeroPreviewUrlBar>oralcheckr.app</HeroPreviewUrlBar>
        </HeroPreviewChrome>
        <HeroPreviewBody>
          {!imgFailed ? (
            <HeroPreviewImage
              src={HERO_IMAGE_SRC}
              alt="OralCheckr app preview"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <HeroPreviewPlaceholder>
              <HeroPreviewPlaceholderInner>
                <span>Your habits and insights</span>
                <small>Add a screenshot at public/images/welcome/hero-app.webp</small>
              </HeroPreviewPlaceholderInner>
            </HeroPreviewPlaceholder>
          )}
        </HeroPreviewBody>
      </HeroPreviewFrame>
      <HeroPreviewBadgeRow>
        <HeroPreviewBadge>Assess</HeroPreviewBadge>
        <HeroPreviewBadge>Track</HeroPreviewBadge>
        <HeroPreviewBadge>Improve</HeroPreviewBadge>
      </HeroPreviewBadgeRow>
    </HeroPreviewRoot>
  );
}
