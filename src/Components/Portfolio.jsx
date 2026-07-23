/**
 * Portfolio component
 *
 * Highlights some of your creations. These can be designs, websites,
 * open source contributions, articles you've written and more.
 *
 * The projects are presented as an open book: the left side is a decorative
 * cover, the right side shows one project per page. Hover (or focus/tap) a
 * bookmark tab on the right edge to turn the book to that page.
 */

import React from "react";

import Reveal from "./Reveal";
import { useTheme } from "../ThemeContext";

/**
 * Cover illustration shown on the outside of the book while it is closed.
 */
import coverImage from "../images/third-pic.jpg";

/**
 * Banner illustrations for each project. Each banner is printed on the page
 * facing that project's text (the back of the previous leaf, or the inside of
 * the cover for the first project), so it turns together with the paper.
 */
import saveBiteBanner from "../images/hero_banner.png";
import powerHubBanner from "../images/banner1.png";
import smartHomeBanner from "../images/banner2.jpg";
import roomBanner from "../images/banner3.png";

const coverImageAltText = "an enchanted desk with books, a laptop and glowing magic";

/**
 * Forest backdrop for the whole section: the book rests in a grassy clearing.
 * A sunlit clearing in light mode and a moonlit, firefly-lit one in dark mode.
 */
import dayBackdrop from "../images/sixth-pic.png";
import nightBackdrop from "../images/seventh-pic.png";

/**
 * Project list
 *
 * Each project becomes one page of the book. The short `tab` label is printed
 * on that page's bookmark so it is easy to tell the pages apart.
 */
const projectList = [
  {
    tab: "SaveBite",
    title: "SaveBite - Webapp chia sẻ thức ăn thừa",
    description:
      "Nền tảng web kết nối người có thức ăn thừa với người cần, góp phần giảm lãng phí thực phẩm trong cộng đồng.",
    url: "https://save-bite.app/",
    banner: saveBiteBanner,
  },
  {
    tab: "PowerHub",
    title: "PowerHub - Nền tảng quản lí điện năng",
    description:
      "Đồ án Đa ngành xây dựng nền tảng giám sát và quản lí điện năng tiêu thụ, hỗ trợ người dùng theo dõi và tối ưu hóa việc sử dụng điện.",
    url: "https://github.com/HuyHaloed/PowerHub",
    banner: powerHubBanner,
  },
  {
    tab: "Smart Home",
    title: "Thiết kế luận lý - Vận hành nhà thông minh",
    description:
      "Đồ án môn học Thiết kế luận lý, xây dựng hệ thống điều khiển và vận hành các thiết bị trong nhà thông minh bằng mạch logic.",
    url: "https://github.com/MrSineCos/DA_TKLL",
    banner: smartHomeBanner,
  },
  {
    tab: "Room Management",
    title: "Hệ thống quản lí phòng",
    description:
      "Hệ thống hỗ trợ quản lí thông tin phòng, đặt phòng và theo dõi tình trạng sử dụng một cách hiệu quả.",
    url: "https://github.com/MrSineCos/Room-management-system",
    banner: roomBanner,
  },
];

/**
 * Auto-flip timing.
 *
 * OPEN_INTERVAL_MS – how long each page stays open before turning to the next
 *                    (5s while the reader is not hovering).
 * CLOSE_STEP_MS    – delay between each leaf while the book flips its pages
 *                    back shut. Kept well under the (shortened) closing leaf
 *                    transition so the pages riffle back quickly.
 * COVER_MS         – time for the cover to fold shut / swing open; matches the
 *                    cover's CSS transition so the sequence waits for it.
 * REST_PAUSE_MS    – how long the book sits closed in its resting state (10s)
 *                    before the next cycle begins.
 *
 * Phases: "closed" (resting, cover folded over page one, book centred) →
 * "opening" (cover swings open, book slides into the two-page spread) →
 * "reading" (pages turn forward every OPEN_INTERVAL_MS) → "closing" (pages
 * riffle back quickly) → "folding" (cover folds shut, book recentres) →
 * back to "closed".
 */
const OPEN_INTERVAL_MS = 5000;
const CLOSE_STEP_MS = 260;
const COVER_MS = 900;
const REST_PAUSE_MS = 10000;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Portfolio = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  // Where the book is in its open/close cycle (see the phase note above).
  const [phase, setPhase] = React.useState("closed");
  // The book only animates while it is on screen...
  const [inView, setInView] = React.useState(false);
  // ...and while the browser tab is actually visible. Pausing on a hidden tab
  // keeps the JS timers and the CSS transitions in step, so the book no longer
  // flips back and forth when the reader returns from another tab.
  const [documentVisible, setDocumentVisible] = React.useState(
    typeof document === "undefined" || document.visibilityState !== "hidden"
  );
  // Pause auto-play while the reader is hovering the book themselves.
  const [interacting, setInteracting] = React.useState(false);
  const stageRef = React.useRef(null);
  const total = projectList.length;
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // The cover is folded over the pages while closed (and mid-fold); everything
  // else drives its own CSS classes so the markup stays declarative.
  const isClosed = phase === "closed" || phase === "folding";
  const isClosing = phase === "closing";

  // Readers who prefer reduced motion get the book left open and still, so the
  // project pages are visible without any flipping.
  React.useEffect(() => {
    if (prefersReducedMotion()) {
      setPhase("reading");
    }
  }, []);

  // Only run the auto-flip while the book is on screen; pause it once it
  // scrolls out of view and resume when it comes back.
  React.useEffect(() => {
    const node = stageRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Track browser-tab visibility so the loop can pause on hidden tabs.
  React.useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }
    const onVisibilityChange = () => setDocumentVisible(document.visibilityState !== "hidden");
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  // The self-scheduling animation loop. Each state change re-arms a single
  // timer, so the effect walks the book through the phases described above.
  React.useEffect(() => {
    if (!inView || !documentVisible || interacting || prefersReducedMotion()) {
      return undefined;
    }

    let timer;
    switch (phase) {
      case "closed":
        // Rest a moment, then swing the cover open for the next cycle.
        timer = setTimeout(() => setPhase("opening"), REST_PAUSE_MS);
        break;
      case "opening":
        // Wait for the cover to finish opening, then start reading.
        timer = setTimeout(() => setPhase("reading"), COVER_MS);
        break;
      case "reading":
        if (activeIndex < total - 1) {
          // Turn to the next page after it has been on screen long enough.
          timer = setTimeout(() => setActiveIndex((i) => i + 1), OPEN_INTERVAL_MS);
        } else {
          // Past the last page: start folding the book shut.
          timer = setTimeout(() => setPhase("closing"), OPEN_INTERVAL_MS);
        }
        break;
      case "closing":
        if (activeIndex > 0) {
          // Riffle the leaves back quickly toward page one.
          timer = setTimeout(() => setActiveIndex((i) => i - 1), CLOSE_STEP_MS);
        } else {
          // Pages are back; now fold the cover over and recentre the book.
          timer = setTimeout(() => setPhase("folding"), CLOSE_STEP_MS);
        }
        break;
      case "folding":
        // Wait for the cover to finish folding, then rest.
        timer = setTimeout(() => setPhase("closed"), COVER_MS);
        break;
      default:
        break;
    }

    return () => clearTimeout(timer);
  }, [inView, documentVisible, interacting, phase, activeIndex, total]);

  // Entering the book's hit area only PAUSES the auto-flip — it never opens the
  // book. This lives on a stationary wrapper (the book slides via transform,
  // which does not move its layout box), so parking the cursor next to a closed
  // book no longer makes it open and close over and over.
  const handleHitEnter = () => {
    setInteracting(true);
  };

  // Leaving the hit area resumes the auto-flip and, if the book is open, folds
  // it back shut. (Skip re-closing when it is already closed.)
  const handleHitLeave = () => {
    setInteracting(false);
    setPhase((p) => (p === "closed" || p === "folding" ? p : "closing"));
  };

  // Only the bookmark tabs open the book: hovering (or focusing/clicking) one
  // swings it open and turns to that project's page.
  const handleBookmarkOpen = (index) => {
    setInteracting(true);
    setPhase("reading");
    setActiveIndex(index);
  };

  return (
    <section className="padding" id="portfolio">
      <div className="portfolio-bg" aria-hidden="true">
        <img
          className="portfolio-bg__img"
          src={dayBackdrop}
          alt=""
          style={{ opacity: isDark ? 0 : 1 }}
        />
        <img
          className="portfolio-bg__img"
          src={nightBackdrop}
          alt=""
          style={{ opacity: isDark ? 1 : 0 }}
        />
      </div>
      <Reveal>
        <h2 className="section-title">Portfolio</h2>
      </Reveal>

      <Reveal>
        <div className="book-stage" ref={stageRef}>
          {/* Stationary hit area: stays put while the book slides inside it, so
              hovering here just pauses the auto-flip without ever re-triggering
              open/close. */}
          <div className="book-hit" onMouseEnter={handleHitEnter} onMouseLeave={handleHitLeave}>
            <div
              className={`book${isClosed ? " book--closed" : ""}${
                isClosing ? " book--closing" : ""
              }`}
            >
              {/* Left flap: hinged at the spine, it folds over the pages to close
                the book. Its inner face is the illustration page of the first
                project (plain paper, like the content pages); its outer face is
                the decorated cover seen while the book is closed. */}
              <div className="book__side book__cover">
                <div className="book__cover-face book__cover-face--front">
                  <div className="page-illustration">
                    <img src={projectList[0].banner} alt={`Ảnh dự án ${projectList[0].tab}`} />
                  </div>
                </div>
                <div className="book__cover-face book__cover-face--back" aria-hidden="true">
                  <div className="book__cover-inner">
                    <img src={coverImage} className="book__cover-img" alt={coverImageAltText} />
                    <p className="book__cover-title">My Works</p>
                    <p className="book__cover-hint">Rê chuột vào dải đánh dấu để lật trang →</p>
                  </div>
                </div>
              </div>

              {/* Center spine */}
              <div className="book__spine" aria-hidden="true" />

              {/* Right side: stack of turnable leaves */}
              <div className="book__side book__pages">
                {projectList.map((project, index) => {
                  const turned = index < activeIndex;
                  const zIndex = turned ? index : total - index;
                  return (
                    <div
                      className={`leaf${turned ? " leaf--turned" : ""}`}
                      style={{ zIndex }}
                      key={project.title}
                    >
                      <div className="leaf__face leaf__front">
                        <div className="leaf__content">
                          <span className="leaf__page-no">
                            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                          </span>
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="leaf__title-link"
                          >
                            <h3 className="leaf__title">{project.title}</h3>
                          </a>
                          <p className="leaf__desc">{project.description}</p>
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="leaf__more"
                          >
                            Xem thêm →
                          </a>
                        </div>
                      </div>
                      {/* Back of the leaf: seen on the left once turned. It carries
                        the banner of the NEXT project so each open spread pairs
                        that project's illustration (left) with its text (right),
                        and the picture turns together with the paper. */}
                      <div className="leaf__face leaf__back" aria-hidden="true">
                        {projectList[index + 1] ? (
                          <div className="page-illustration">
                            <img src={projectList[index + 1].banner} alt="" />
                          </div>
                        ) : (
                          <span className="leaf__ornament">✦</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bookmark tabs */}
              <ul className="bookmarks">
                {projectList.map((project, index) => (
                  <li key={project.title}>
                    <button
                      type="button"
                      className={`bookmark${index === activeIndex ? " bookmark--active" : ""}`}
                      style={{ "--bm": index }}
                      onMouseEnter={() => handleBookmarkOpen(index)}
                      onFocus={() => handleBookmarkOpen(index)}
                      onClick={() => handleBookmarkOpen(index)}
                      aria-label={`Trang ${index + 1}: ${project.title}`}
                      aria-pressed={index === activeIndex}
                    >
                      <span className="bookmark__label">{project.tab}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Portfolio;
