import { useCallback, useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import { ThemeType } from "../../../App";
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

const previewObserverOptions: IntersectionObserverInit = {
  threshold: 0.12,
  rootMargin: "0px 0px -80px 0px",
};

/** Public folder URLs must include Vite `base` (e.g. /OralCheckr/) so assets resolve on GitHub Pages. */
const welcomeScreenshot = (filename: string) =>
  `${import.meta.env.BASE_URL}images/welcome/${filename}`;

type PreviewId =
  | "dashboard"
  | "assess"
  | "track"
  | "improve"
  | "analyze";

const PREVIEW_SLIDE_DEFS: readonly {
  id: PreviewId;
  label: string;
  darkFile: string;
  lightFile: string;
  alt: string;
}[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    darkFile: "dashboard_screenshot.png",
    lightFile: "dashboard_light_screenshot.png",
    alt: "OralCheckr dashboard preview",
  },
  {
    id: "assess",
    label: "Assess",
    darkFile: "assess_screenshot.png",
    lightFile: "assess_light_screenshot.png",
    alt: "OralCheckr assess questionnaire preview",
  },
  {
    id: "track",
    label: "Track",
    darkFile: "track_screenshot.png",
    lightFile: "track_light_screenshot.png",
    alt: "OralCheckr habit tracking preview",
  },
  {
    id: "improve",
    label: "Improve",
    darkFile: "improve_screenshot.png",
    lightFile: "improve_light_screenshot.png",
    alt: "OralCheckr improvement goals preview",
  },
  {
    id: "analyze",
    label: "Analyze",
    darkFile: "analyze_screenshot.png",
    lightFile: "analyze_light_screenshot.png",
    alt: "OralCheckr analyze insights preview",
  },
];

function previewSlidesForTheme(theme: ThemeType) {
  const light = theme === ThemeType.LIGHT;
  return PREVIEW_SLIDE_DEFS.map((d) => ({
    id: d.id,
    label: d.label,
    alt: d.alt,
    src: welcomeScreenshot(light ? d.lightFile : d.darkFile),
  }));
}

const CROSSFADE_MS = 500;

type Slide = ReturnType<typeof previewSlidesForTheme>[number];

interface HeroAppPreviewProps {
  theme: ThemeType;
}

export function HeroAppPreview({ theme }: HeroAppPreviewProps) {
  const { ref, isVisible } = useScrollAnimation(previewObserverOptions);
  /** `null` before mount — treat as motion OK so first paint matches SSR/hydration. */
  const prefersReducedMotion = useReducedMotion() === true;
  const previewSlides = useMemo(
    () => previewSlidesForTheme(theme),
    [theme]
  );
  const [activeId, setActiveId] = useState<PreviewId>(PREVIEW_SLIDE_DEFS[0].id);
  const [outgoingSlide, setOutgoingSlide] = useState<Slide | null>(null);
  const [hasPreviewInteracted, setHasPreviewInteracted] = useState(false);
  const [failedSrcs, setFailedSrcs] = useState<ReadonlySet<string>>(
    () => new Set()
  );

  const activeSlide =
    previewSlides.find((s) => s.id === activeId) ?? previewSlides[0];
  const imgFailed = failedSrcs.has(activeSlide.src);

  const handleImgError = useCallback((src: string) => {
    setFailedSrcs((prev) => new Set(prev).add(src));
  }, []);

  useEffect(() => {
    setOutgoingSlide(null);
  }, [theme]);

  useEffect(() => {
    if (!outgoingSlide) return;
    const t = window.setTimeout(() => setOutgoingSlide(null), CROSSFADE_MS);
    return () => window.clearTimeout(t);
  }, [outgoingSlide, activeId]);

  const goToSlide = (newId: PreviewId) => {
    if (newId === activeId) return;
    const current = previewSlides.find((s) => s.id === activeId);
    if (current && !failedSrcs.has(current.src)) {
      setOutgoingSlide(current);
    } else {
      setOutgoingSlide(null);
    }
    setHasPreviewInteracted(true);
    setActiveId(newId);
  };

  const showOutgoing =
    !prefersReducedMotion &&
    outgoingSlide &&
    !failedSrcs.has(outgoingSlide.src) &&
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
                onError={() => handleImgError(activeSlide.src)}
              />
            ) : (
              <HeroPreviewImageStack>
                {showOutgoing && outgoingSlide ? (
                  <HeroPreviewImageCrossfade
                    key={`out-${outgoingSlide.src}`}
                    $phase="out"
                    src={outgoingSlide.src}
                    alt=""
                    aria-hidden
                  />
                ) : null}
                <HeroPreviewImageCrossfade
                  key={`in-${activeSlide.src}`}
                  $phase={hasPreviewInteracted ? "in" : "hold"}
                  src={activeSlide.src}
                  alt={activeSlide.alt}
                  onError={() => handleImgError(activeSlide.src)}
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
        {previewSlides.map((slide) => (
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
