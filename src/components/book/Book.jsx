import { forwardRef, useMemo, useState, useEffect, useRef, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import { useSwipeable } from "react-swipeable";
import { buildPageList } from "../../utils/bookPages";
import StaticImagePage from "./pages/StaticImagePage";
import SelfAssessmentPage from "./pages/SelfAssessmentPage";
import PledgePage from "./pages/PledgePage";
import DailyTrackerPage from "./pages/DailyTrackerPage";
import GratitudePage from "./pages/GratitudePage";
import WeeklyQuranPage from "./pages/WeeklyQuranPage";
import WeeklyReviewPage from "./pages/WeeklyReviewPage";
import WeeklyChallengePage from "./pages/WeeklyChallengePage";
import FutureLetterPage from "./pages/FutureLetterPage";
import FinalCommitmentPage from "./pages/FinalCommitmentPage";

const STATIC_IMAGES = {
  cover: { src: "/book/cover.jpg", alt: "غلاف الكتاب" },
  welcome: { src: "/book/welcome.jpg", alt: "الترحيب" },
  intro: { src: "/book/intro.jpg", alt: "المقدمة" },
  toc: { src: "/book/toc.jpg", alt: "ماذا ستجدين في هذا الكتاب" },
  adhkar: { src: "/book/adhkar.jpg", alt: "مرجع أذكارك اليومية" },
  closing: { src: "/book/closing.jpg", alt: "الخاتمة" },
};

// Real source-page aspect ratio (827x1170), used for the desktop two-page
// spread where width is plentiful and we want it to look like a real book.
const DESKTOP_ASPECT = 827 / 1170;
// On phones, width is always the scarce dimension (page can only ever be as
// wide as the screen), so a book-accurate ratio wastes most of the screen's
// height. Going taller/narrower here lets the page use nearly the full
// screen height, which is what actually makes it "feel like reading a real
// book" on a phone instead of a small card floating in empty space.
const MOBILE_ASPECT = 0.52;

const BOOK_WIDTH_PROP = { mobile: 400, desktop: 420 };

// react-pageflip requires each page to be a forwardRef div
const Page = forwardRef(({ children }, ref) => (
  <div ref={ref} className="w-full h-full bg-[#fdeef0]">
    {children}
  </div>
));
Page.displayName = "Page";

function renderPageContent(p) {
  if (STATIC_IMAGES[p.kind]) {
    const img = STATIC_IMAGES[p.kind];
    return <StaticImagePage src={img.src} alt={img.alt} />;
  }
  switch (p.kind) {
    case "quiz":
      return <SelfAssessmentPage />;
    case "pledge":
      return <PledgePage />;
    case "day":
      return <DailyTrackerPage day={p.day} />;
    case "gratitude":
      return <GratitudePage day={p.day} />;
    case "quran":
      return <WeeklyQuranPage week={p.week} />;
    case "review":
      return <WeeklyReviewPage week={p.week} />;
    case "challenge":
      return <WeeklyChallengePage week={p.week} />;
    case "letter":
      return <FutureLetterPage />;
    case "final":
      return <FinalCommitmentPage />;
    default:
      return null;
  }
}

export default function Book({ targetIndex, onPageChange, isMobile }) {
  const pages = useMemo(() => buildPageList(), []);
  const bookRef = useRef(null);
  const containerRef = useRef(null);
  const [current, setCurrent] = useState(0);
  // Container width fed to the flip-book (autoSize is disabled so this is
  // the ONLY thing that decides the rendered size — see recompute() below).
  const [containerWidth, setContainerWidth] = useState(isMobile ? 340 : 860);

  const recompute = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const availableWidth = el.clientWidth;
    const top = el.getBoundingClientRect().top;
    // Leave room below the book for the page counter + (on mobile) the
    // bottom nav bar, so the WHOLE book is visible without scrolling.
    const bottomReserve = isMobile ? 92 : 36;
    const availableHeight = Math.max(320, window.innerHeight - top - bottomReserve);
    const aspect = isMobile ? MOBILE_ASPECT : DESKTOP_ASPECT;

    if (isMobile) {
      const widthFromHeight = availableHeight * aspect;
      setContainerWidth(Math.round(Math.max(260, Math.min(availableWidth, widthFromHeight))));
    } else {
      const singleFromHeight = availableHeight * aspect;
      const singleFromWidth = availableWidth / 2;
      const single = Math.max(240, Math.min(singleFromHeight, singleFromWidth));
      setContainerWidth(Math.round(single * 2));
    }
  }, [isMobile]);

  useEffect(() => {
    recompute();
    window.addEventListener("resize", recompute);
    window.addEventListener("orientationchange", recompute);
    return () => {
      window.removeEventListener("resize", recompute);
      window.removeEventListener("orientationchange", recompute);
    };
  }, [recompute]);

  useEffect(() => {
    if (targetIndex != null) {
      const tryFlip = (attempt = 0) => {
        const api = bookRef.current?.pageFlip?.();
        if (api) {
          try {
            api.turnToPage(targetIndex);
          } catch {
            /* noop */
          }
        } else if (attempt < 20) {
          setTimeout(() => tryFlip(attempt + 1), 100);
        }
      };
      tryFlip();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetIndex]);

  function goNext() {
    bookRef.current?.pageFlip()?.flipNext();
  }
  function goPrev() {
    bookRef.current?.pageFlip()?.flipPrev();
  }

  // react-pageflip's own mouse/touch handling intercepts clicks meant for
  // checkboxes and text inputs inside the pages, so we disable it entirely
  // (useMouseEvents={false} below) and drive navigation only through the
  // explicit prev/next buttons plus this safe swipe layer, which only acts
  // after real horizontal swipe motion and never blocks taps underneath it.
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => goNext(),
    onSwipedRight: () => goPrev(),
    preventScrollOnSwipe: false,
    trackMouse: false,
    delta: 60,
  });

  return (
    <div className="flex flex-col items-center w-full">
      <div ref={containerRef} className="relative w-full flex justify-center">
        <button
          onClick={goNext}
          aria-label="الصفحة التالية"
          className="absolute z-30 top-1/2 -translate-y-1/2 left-0 sm:-left-2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/85 backdrop-blur border border-blush-300 text-rose-600 shadow-lg flex items-center justify-center active:scale-90 transition-transform text-lg"
        >
          ‹
        </button>
        <div {...swipeHandlers} style={{ width: `${containerWidth}px` }}>
          <HTMLFlipBook
            ref={bookRef}
            width={BOOK_WIDTH_PROP[isMobile ? "mobile" : "desktop"]}
            height={Math.round(
              BOOK_WIDTH_PROP[isMobile ? "mobile" : "desktop"] / (isMobile ? MOBILE_ASPECT : DESKTOP_ASPECT)
            )}
            size="stretch"
            minWidth={260}
            maxWidth={2200}
            minHeight={320}
            maxHeight={2200}
            maxShadowOpacity={0.4}
            showCover={false}
            mobileScrollSupport={true}
            useMouseEvents={false}
            drawShadow={true}
            flippingTime={500}
            usePortrait={isMobile}
            className="book-shadow"
            onInit={() => {
              if (targetIndex != null) {
                try {
                  bookRef.current?.pageFlip()?.turnToPage(targetIndex);
                } catch {
                  /* noop */
                }
              }
            }}
            onFlip={(e) => {
              setCurrent(e.data);
              onPageChange?.(e.data);
            }}
          >
            {pages.map((p) => (
              <Page key={p.key}>{renderPageContent(p)}</Page>
            ))}
          </HTMLFlipBook>
        </div>
        <button
          onClick={goPrev}
          aria-label="الصفحة السابقة"
          className="absolute z-30 top-1/2 -translate-y-1/2 right-0 sm:-right-2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/85 backdrop-blur border border-blush-300 text-rose-600 shadow-lg flex items-center justify-center active:scale-90 transition-transform text-lg"
        >
          ›
        </button>
      </div>
      <p className="text-center text-ink-700/50 text-[11px] mt-2">
        صفحة {current + 1} من {pages.length} · مرري يميناً أو يساراً للتنقل
      </p>
    </div>
  );
}
