import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
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
  HeroPreviewImageCrossfade,
  HeroPreviewImageStack,
  HeroPreviewPlaceholder,
  HeroPreviewPlaceholderInner,
  HeroPreviewBadge,
  HeroPreviewBadgeRow,
} from "../styles/HeroPreviewStyles";

/** Public folder URLs must include Vite `base` (e.g. /OralCheckr/) so assets resolve on GitHub Pages. */
const welcomeScreenshot = (filename: string) =>
  `${import.meta.env.BASE_URL}images/welcome/${filename}`;

type PreviewId =
  | "dashboard"
  | "assess"
  | "track"
  | "improve"
  | "analyze";

const PREVIEW_SLIDES: readonly {
  id: PreviewId;
  label: string;
  src: string;
  alt: string;
}[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    src: welcomeScreenshot("dashboard_screenshot.png"),
    alt: "OralCheckr dashboard preview",
  },
  {
    id: "assess",
    label: "Assess",
    src: welcomeScreenshot("assess_screenshot.png"),
    alt: "OralCheckr assess questionnaire preview",
  },
  {
    id: "track",
    label: "Track",
    src: welcomeScreenshot("track_screenshot.png"),
    alt: "OralCheckr habit tracking preview",
  },
  {
    id: "improve",
    label: "Improve",
    src: welcomeScreenshot("improve_screenshot.png"),
    alt: "OralCheckr improvement goals preview",
  },
  {
    id: "analyze",
    label: "Analyze",
    src: welcomeScreenshot("analyze_screenshot.png"),
    alt: "OralCheckr analyze insights preview",
  },
];

const CROSSFADE_MS = 500;

type Slide = (typeof PREVIEW_SLIDES)[number];

export function HeroAppPreview() {
  const { ref, isVisible } = useScrollAnimation(previewObserverOptions);
  /** `null` before mount — treat as motion OK so first paint matches SSR/hydration. */
  const prefersReducedMotion = useReducedMotion() === true;
  const [activeId, setActiveId] = useState<PreviewId>(PREVIEW_SLIDES[0].id);
  const [outgoingSlide, setOutgoingSlide] = useState<Slide | null>(null);
  const [hasPreviewInteracted, setHasPreviewInteracted] = useState(false);
  const [failedIds, setFailedIds] = useState<ReadonlySet<PreviewId>>(
    () => new Set()
  );

  const activeSlide =
    PREVIEW_SLIDES.find((s) => s.id === activeId) ?? PREVIEW_SLIDES[0];
  const imgFailed = failedIds.has(activeSlide.id);

  const handleImgError = useCallback((id: PreviewId) => {
    setFailedIds((prev) => new Set(prev).add(id));
  }, []);

  useEffect(() => {
    if (!outgoingSlide) return;
    const t = window.setTimeout(() => setOutgoingSlide(null), CROSSFADE_MS);
    return () => window.clearTimeout(t);
  }, [outgoingSlide, activeId]);

  const goToSlide = (newId: PreviewId) => {
    if (newId === activeId) return;
    if (!failedIds.has(activeId)) {
      setOutgoingSlide(
        PREVIEW_SLIDES.find((s) => s.id === activeId) ?? null
      );
    } else {
      setOutgoingSlide(null);
    }
    setHasPreviewInteracted(true);
    setActiveId(newId);
  };

  const showOutgoing =
    !prefersReducedMotion &&
    outgoingSlide &&
    !failedIds.has(outgoingSlide.id) &&
    outgoingSlide.id !== activeSlide.id;

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
            prefersReducedMotion ? (
              <HeroPreviewImage
                key={activeSlide.src}
                src={activeSlide.src}
                alt={activeSlide.alt}
                onError={() => handleImgError(activeSlide.id)}
              />
            ) : (
              <HeroPreviewImageStack>
                {showOutgoing && outgoingSlide ? (
                  <HeroPreviewImageCrossfade
                    key={`out-${outgoingSlide.id}`}
                    $phase="out"
                    src={outgoingSlide.src}
                    alt=""
                    aria-hidden
                  />
                ) : null}
                <HeroPreviewImageCrossfade
                  key={`in-${activeSlide.id}`}
                  $phase={hasPreviewInteracted ? "in" : "hold"}
                  src={activeSlide.src}
                  alt={activeSlide.alt}
                  onError={() => handleImgError(activeSlide.id)}
                />
              </HeroPreviewImageStack>
            )
          ) : (
            <HeroPreviewPlaceholder>
              <HeroPreviewPlaceholderInner>
                <span>Your habits and insights</span>
                <small>
                  Missing file:{" "}
                  <code style={{ fontSize: "0.75em" }}>
                    public/images/welcome/
                    {activeSlide.src.replace(
                      `${import.meta.env.BASE_URL}images/welcome/`,
                      ""
                    )}
                  </code>
                </small>
              </HeroPreviewPlaceholderInner>
            </HeroPreviewPlaceholder>
          )}
        </HeroPreviewBody>
      </HeroPreviewFrame>
      <HeroPreviewBadgeRow role="group" aria-label="Choose app preview">
        {PREVIEW_SLIDES.map((slide) => (
          <HeroPreviewBadge
            key={slide.id}
            type="button"
            aria-pressed={activeId === slide.id}
            $active={activeId === slide.id}
            onClick={() => goToSlide(slide.id)}
          >
            {slide.label}
          </HeroPreviewBadge>
        ))}
      </HeroPreviewBadgeRow>
    </HeroPreviewRoot>
  );
}
