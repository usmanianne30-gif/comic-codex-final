import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";

export const Route = createFileRoute("/codex")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Right-Click Codex — A Comic Commonplace Book" },
      { name: "description", content: "A bright comic-book commonplace book. Right-click anywhere to reveal a theme, a panel, and its explanation." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bangers&family=Caveat:wght@500;700&family=Permanent+Marker&family=Special+Elite&display=swap" },
    ],
  }),
});

type Entry = {
  theme: string;
  panel: { caption: string; sfx: string; art: "lightbulb" | "speedlines" | "explosion" | "thoughtcloud" | "eye" | "key" | "spiral" | "heart" };
  explanation: string;
  /** A more theoretical / academic reading of the theme. Leave undefined to show a placeholder. */
  theory?: string;
  tone: "yellow" | "pink" | "blue" | "mint";
};

const THEORY_PLACEHOLDER =
  "[ theoretical description goes here — to be added later. This is the deeper, more academic reading of the theme: its references, its lineage, its arguments. Footnotes welcome. ]";

const ENTRIES: Entry[] = [
  {
    theme: "On the Visual Scream",
    panel: { caption: "OH MY GOD I'M SICK!", sfx: "KRRSSH!", art: "explosion" },
    explanation:
      "The explosion of wild, radiating blonde hair fills the top-left panel, transforming Marisa's head into a visual scream before her mouth opens. The hair, rendered in aggressive, uncontrolled lines, literalizes the phrase \"hair-raising\" terror, making visible the invisible shock of diagnosis. This formal choice is crucial: Marchetto refuses to contain female panic within decorous bounds. The typography escalates across three panels—from conversational \"10-12-03 A.M. THE NEXT MILLISECOND I HAD TO CALL MY PARENTS\" to the visual assault of \"OH MY GOD I'M SICK!\" rendered in oversized letters against a night sky dotted with stars that might be tears, might be cosmic indifference.\n\nWhat's striking is Marchetto's insistence on precise temporality: \"10-12-03 A.M. THE NEXT MILLISECOND.\" This specificity claims documentary authority, positioning her lived experience against medical abstraction. The second panel's text—\"OF COURSE MY (S)MOTHER PICKED UP THE PHONE FIRST\"—employs the parenthetical \"(S)\" to layer meaning: protective mother/suffocating mother, compressed into one mark. This typographic innovation demonstrates comics' unique capacity to visualize ambivalence spatially. The phone itself becomes a recurring motif throughout these panels—technology as both connector and alienator, through which devastating news travels at speed.",
    tone: "pink",
  },
  {
    theme: "On Memory",
    panel: { caption: "The drawer remembered him.", sfx: "creak…", art: "key" },
    explanation: "We don't store memories — objects do. A key, a smell, a song; they are the librarians of the self, lending us back to ourselves on quiet afternoons.",
    tone: "blue",
  },
  {
    theme: "On Beginnings",
    panel: { caption: "Page one. Again.", sfx: "FWIP!", art: "lightbulb" },
    explanation: "Every beginning is a forgery of the first one. The trick is not to wait for thunder — it is to strike the match yourself, indoors, where no one is watching.",
    tone: "yellow",
  },
  {
    theme: "On Loneliness",
    panel: { caption: "He waved at the streetlight.", sfx: "...", art: "thoughtcloud" },
    explanation: "Loneliness is not the absence of people but the absence of being recognised. A streetlight will do, briefly. So will a notebook.",
    tone: "pink",
  },
  {
    theme: "On Speed",
    panel: { caption: "The city blurred past her bicycle.", sfx: "WHOOSH!!", art: "speedlines" },
    explanation: "Speed is a kind of forgetting that feels like freedom. Slow down once a week, just to remember which buildings you've been ignoring.",
    tone: "blue",
  },
  {
    theme: "On Anger",
    panel: { caption: "And then — the kettle.", sfx: "KA-POW!", art: "explosion" },
    explanation: "Anger is grief in a louder coat. Listen for what it's protecting before you ask it to leave the room.",
    tone: "pink",
  },
  {
    theme: "On Attention",
    panel: { caption: "She looked. Really looked.", sfx: "blink.", art: "eye" },
    explanation: "Attention is the rarest and purest form of generosity. Most days we tip with loose change.",
    tone: "mint",
  },
  {
    theme: "On Love",
    panel: { caption: "Two cups, one kettle.", sfx: "ba-dump.", art: "heart" },
    explanation: "Love is mostly logistics — who buys the milk, who answers the door — set on fire by something the logistics cannot explain.",
    tone: "pink",
  },
  {
    theme: "On Doubt",
    panel: { caption: "He read the sentence twice.", sfx: "hmm…", art: "thoughtcloud" },
    explanation: "Doubt is not the opposite of belief; it's the room belief lives in. Without walls, faith is just weather.",
    tone: "blue",
  },
  {
    theme: "On Joy",
    panel: { caption: "She danced in the kitchen, alone.", sfx: "TA-DA!", art: "lightbulb" },
    explanation: "Joy is small and uninvited. It will not show up for the camera. Practice noticing it the way you'd notice a bird at the window.",
    tone: "yellow",
  },
  {
    theme: "On Time",
    panel: { caption: "The clock pretended not to notice.", sfx: "tick. tick.", art: "spiral" },
    explanation: "Time isn't running out — it's being spent. The question isn't how much is left, but who you're spending it with.",
    tone: "mint",
  },
  {
    theme: "On Failure",
    panel: { caption: "He laughed before the crash.", sfx: "WUMP!", art: "explosion" },
    explanation: "Failure is data wearing a humiliation costume. Take notes. The costume comes off in the morning.",
    tone: "yellow",
  },
];

const ART = {
  lightbulb: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M50 18 c-15 0 -24 11 -24 24 c0 10 6 16 10 22 l28 0 c4 -6 10 -12 10 -22 c0 -13 -9 -24 -24 -24 z" fill="var(--pop-yellow)"/>
        <path d="M40 70 l20 0 M42 78 l16 0 M46 86 l8 0"/>
        <path d="M50 6 l0 8 M22 18 l5 5 M78 18 l-5 5 M10 42 l7 0 M83 42 l7 0"/>
      </g>
    </svg>
  ),
  speedlines: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <line x1="10" y1="30" x2="60" y2="30"/>
        <line x1="20" y1="42" x2="80" y2="42"/>
        <line x1="5" y1="54" x2="50" y2="54"/>
        <line x1="25" y1="66" x2="90" y2="66"/>
        <line x1="15" y1="78" x2="65" y2="78"/>
      </g>
      <circle cx="78" cy="50" r="10" fill="var(--pop-red)" stroke="currentColor" strokeWidth="3"/>
    </svg>
  ),
  explosion: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <polygon points="50,5 58,28 82,18 70,40 95,48 70,58 82,80 58,70 50,95 42,70 18,82 30,58 5,50 30,42 18,18 42,30"
        fill="var(--pop-red)" stroke="currentColor" strokeWidth="3" strokeLinejoin="miter"/>
      <text x="50" y="58" textAnchor="middle" fontFamily="Bangers" fontSize="22" fill="var(--paper)">BAM!</text>
    </svg>
  ),
  thoughtcloud: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <g fill="var(--paper)" stroke="currentColor" strokeWidth="3">
        <path d="M25 50 c-10 0 -14 -14 -2 -18 c-2 -12 14 -16 20 -8 c4 -10 22 -10 24 2 c14 -2 18 14 6 20 c4 10 -10 18 -18 12 c-4 10 -22 8 -22 -2 c-6 4 -16 0 -8 -6 z"/>
        <circle cx="22" cy="78" r="4"/>
        <circle cx="14" cy="88" r="2.5"/>
      </g>
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <g fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M10 50 c15 -25 65 -25 80 0 c-15 25 -65 25 -80 0 z" fill="var(--paper)"/>
        <circle cx="50" cy="50" r="14" fill="var(--pop-blue)"/>
        <circle cx="50" cy="50" r="6" fill="currentColor"/>
        <circle cx="54" cy="46" r="2" fill="var(--paper)" stroke="none"/>
      </g>
    </svg>
  ),
  key: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <g fill="var(--pop-yellow)" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
        <circle cx="28" cy="50" r="16"/>
        <rect x="40" y="44" width="50" height="12"/>
        <rect x="70" y="56" width="6" height="10"/>
        <rect x="82" y="56" width="6" height="14"/>
        <circle cx="28" cy="50" r="5" fill="var(--paper)"/>
      </g>
    </svg>
  ),
  spiral: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M50 50 m0 0 a4 4 0 1 1 8 0 a8 8 0 1 1 -16 0 a14 14 0 1 1 28 0 a20 20 0 1 1 -40 0 a26 26 0 1 1 52 0"
        fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M50 82 C 18 60 12 38 28 26 C 40 18 50 30 50 36 C 50 30 60 18 72 26 C 88 38 82 60 50 82 z"
        fill="var(--pop-red)" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M40 38 q4 -6 10 -4" fill="none" stroke="var(--paper)" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  ),
};

const TONE_BG: Record<Entry["tone"], string> = {
  yellow: "halftone-yellow",
  pink: "halftone-pink",
  blue: "halftone-blue",
  mint: "bg-pop-mint",
};

function Index() {
  const [menu, setMenu] = useState<{ x: number; y: number; entry: Entry; key: number } | null>(null);
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);
  const [theoryOpen, setTheoryOpen] = useState(false);
  const [theorySide, setTheorySide] = useState<"right" | "left">("right");
  const [count, setCount] = useState(0);
  const [revealedIds, setRevealedIds] = useState<number[]>([]);
  const idxRef = useRef(0);
  const stageTimers = useRef<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("codex-revealed");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setRevealedIds(parsed);
          idxRef.current = parsed.length;
        }
      } catch (e) {}
    }
  }, []);

  const openEntry = useCallback((index: number, x: number, y: number) => {
    const entry = ENTRIES[index];
    const W = 360, H = 440, THEORY_W = 320, GAP = 12;
    // make sure there's room for the theory drawer on the right; otherwise flip it
    const roomRight = window.innerWidth - x - W - GAP;
    const side: "right" | "left" = roomRight >= THEORY_W + 16 ? "right" : "left";
    const maxX = side === "right"
      ? window.innerWidth - W - THEORY_W - GAP - 16
      : window.innerWidth - W - 16;
    const minX = side === "left" ? THEORY_W + GAP + 16 : 16;
    const clampedX = Math.max(minX, Math.min(x, maxX));
    const clampedY = Math.max(16, Math.min(y, window.innerHeight - H - 16));

    stageTimers.current.forEach(clearTimeout);
    setStage(0);
    setTheoryOpen(false);
    setTheorySide(side);
    setMenu({ x: clampedX, y: clampedY, entry, key: Date.now() });
    stageTimers.current = [
      window.setTimeout(() => setStage(1), 50),
      window.setTimeout(() => setStage(2), 650),
      window.setTimeout(() => setStage(3), 1500),
    ];

    setRevealedIds((prev) => {
      if (!prev.includes(index)) {
        const next = [...prev, index];
        localStorage.setItem("codex-revealed", JSON.stringify(next));
        return next;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    const onContext = (e: MouseEvent) => {
      e.preventDefault();
      const index = idxRef.current % ENTRIES.length;
      idxRef.current += 1;
      setCount((c) => c + 1);
      openEntry(index, e.clientX, e.clientY);
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-codex-panel]")) setMenu(null);
    };
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setMenu(null); };

    window.addEventListener("contextmenu", onContext);
    window.addEventListener("click", onClick);
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("contextmenu", onContext);
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onEsc);
      stageTimers.current.forEach(clearTimeout);
    };
  }, [openEntry]);

  return (
    <main className="relative min-h-screen overflow-hidden" style={{ zIndex: 0 }}>
      {/* tape decorations */}
      <span className="tape" style={{ top: 24, left: 120, transform: "rotate(-6deg)" }} />
      <span className="tape" style={{ top: 18, right: 80, transform: "rotate(8deg)", background: "color-mix(in oklab, var(--pop-pink) 70%, white)" }} />
      <span className="tape" style={{ bottom: 40, left: "40%", transform: "rotate(-3deg)", background: "color-mix(in oklab, var(--pop-mint) 70%, white)" }} />

      {/* History Sidebar */}
      <aside
        className="absolute font-hand flex flex-col gap-2"
        style={{
          top: 40, left: 80, width: 260, zIndex: 10,
          background: "var(--paper)",
          padding: "16px",
          boxShadow: "6px 6px 0 var(--ink)",
          border: "3px solid var(--ink)",
          maxHeight: "calc(100vh - 80px)",
        }}
      >
        <div className="font-marker text-2xl mb-1 border-b-[3px] border-ink pb-2">Codex Archive</div>
        {revealedIds.length === 0 ? (
          <div className="text-lg opacity-70 mt-2">Nothing revealed yet. Right-click anywhere to begin.</div>
        ) : (
          <ul className="space-y-3 overflow-y-auto pr-2 pb-4" style={{ scrollbarWidth: "thin" }}>
            {revealedIds.map((id) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEntry(id, 340, Math.max(16, e.clientY - 150));
                  }}
                  className={`text-left w-full px-3 py-2 ink-border transition-transform hover:-translate-y-1 ${TONE_BG[ENTRIES[id].tone]} opacity-90 hover:opacity-100`}
                  style={{ boxShadow: "3px 3px 0 var(--ink)" }}
                >
                  <div className="font-marker text-xs opacity-70 mb-1">№ {id.toString().padStart(3, "0")}</div>
                  <div className="font-bold text-lg leading-tight">{ENTRIES[id].theme}</div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>

      <h1
        className="absolute font-display text-pop-red"
        style={{
          top: 80, left: 380,
          fontSize: "clamp(56px, 9vw, 128px)",
          letterSpacing: "0.04em",
          lineHeight: 0.95,
          WebkitTextStroke: "2px var(--ink)",
          textShadow: "5px 5px 0 var(--ink)",
          transform: "rotate(-2deg)",
          zIndex: 2,
        }}
      >
        THE RIGHT-CLICK<br/>CODEX
      </h1>

      <p
        className="absolute font-hand text-ink"
        style={{ top: 340, left: 386, fontSize: 32, lineHeight: 1.1, transform: "rotate(-1deg)", zIndex: 2, maxWidth: 560 }}
      >
        a bright little commonplace book — half comic, half notebook —
        that only speaks when you <span className="px-2 py-0.5 halftone-yellow ink-border">right-click</span>.
      </p>

      {/* instruction card */}
      <section
        className="absolute paper ink-border ink-shadow p-6 max-w-sm"
        style={{ top: 460, left: 386, background: "var(--paper)", transform: "rotate(-0.5deg)", zIndex: 2 }}
      >
        <div className="font-marker text-2xl mb-2">how it works →</div>
        <ol className="font-body text-base space-y-2">
          <li><span className="halftone-blue ink-border px-2 py-0.5 font-display tracking-wide">1</span> Right-click anywhere on the page.</li>
          <li><span className="halftone-pink ink-border px-2 py-0.5 font-display tracking-wide">2</span> A <em>theme</em> appears. Then a <em>panel</em>. Then an <em>explanation</em>.</li>
          <li><span className="halftone-yellow ink-border px-2 py-0.5 font-display tracking-wide">3</span> Click anywhere else to close it. Right-click again for the next one.</li>
        </ol>
        <div className="mt-4 font-hand text-xl text-pop-red" style={{ transform: "rotate(-1deg)" }}>
          {count === 0 ? "↘ try it now" : `entries opened: ${count}`}
        </div>
      </section>

      {/* sticky-note margin */}
      <aside
        className="absolute font-hand"
        style={{
          top: 110, right: 60, width: 230, transform: "rotate(3deg)", zIndex: 2,
          background: "color-mix(in oklab, var(--pop-yellow) 60%, white)",
          padding: "20px 18px",
          boxShadow: "6px 6px 0 var(--ink)",
          border: "3px solid var(--ink)",
        }}
      >
        <div className="font-marker text-xl mb-1">notes to self —</div>
        <p className="text-xl leading-tight">
          Keep what you cannot say out loud. The margins are for the truer thing.
        </p>
        <div className="mt-3 text-base opacity-70">— from a notebook, 1934</div>
      </aside>

      {/* doodles */}
      <svg className="absolute pointer-events-none" style={{ top: 540, right: 100, width: 180, height: 180, zIndex: 1 }} viewBox="0 0 100 100">
        <g fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round">
          <path d="M20 80 Q 50 20 80 70" />
          <path d="M30 75 q 10 -10 20 0" />
          <text x="22" y="92" fontFamily="Caveat" fontSize="14" fill="var(--ink)" stroke="none">a thought, mid-flight</text>
        </g>
      </svg>

      {/* the right-click panel */}
      {menu && (
        <div
          data-codex-panel
          key={menu.key}
          className="fixed"
          style={{ left: menu.x, top: menu.y, zIndex: 50 }}
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* main panel */}
          <div className="relative animate-pop-in" style={{ width: 360 }}>
            {/* THEME header */}
            <div
              className={`ink-border ${TONE_BG[menu.entry.tone]} px-4 py-2 flex items-center justify-between`}
              style={{ boxShadow: "6px 6px 0 var(--ink)" }}
            >
              <div className="font-display tracking-wider text-2xl text-ink">
                {stage >= 1 ? menu.entry.theme.toUpperCase() : "…"}
              </div>
              <div className="font-marker text-xs text-ink/70">№ {count.toString().padStart(3, "0")}</div>
            </div>

            {/* PANEL */}
            <div className="ink-border bg-paper" style={{ boxShadow: "6px 6px 0 var(--ink)", marginTop: -3 }}>
              <div className="relative aspect-[4/3] overflow-hidden bg-paper">
                {stage >= 2 && (
                  <>
                    <div className={`absolute inset-0 ${TONE_BG[menu.entry.tone]} opacity-60`} />
                    <div className="absolute inset-0 flex items-center justify-center text-ink animate-pop-in">
                      <div className="w-1/2 h-1/2">{ART[menu.entry.panel.art]}</div>
                    </div>
                    <div
                      className="absolute top-3 right-3 font-display text-3xl text-pop-red animate-pop-in"
                      style={{ WebkitTextStroke: "1.5px var(--ink)", transform: "rotate(8deg)" }}
                    >
                      {menu.entry.panel.sfx}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 m-2 ink-border bg-paper px-3 py-1 font-body text-sm animate-slide-up">
                      {menu.entry.panel.caption}
                    </div>
                  </>
                )}
                {stage < 2 && (
                  <div className="absolute inset-0 flex items-center justify-center font-hand text-2xl text-ink/40">
                    drawing…
                  </div>
                )}
              </div>

              {/* EXPLANATION */}
              <div className="p-4 border-t-[3px] border-ink relative">
                <div className="absolute -top-3 left-4 font-marker text-xs px-2 py-0.5 ink-border bg-pop-mint">
                  EXPLANATION
                </div>
                {stage >= 3 ? (
                  <div className="font-hand text-xl leading-snug text-ink animate-scribble space-y-3 max-h-[50vh] overflow-y-auto pr-2">
                    {menu.entry.explanation.split(/\n\n+/).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                ) : (
                  <p className="font-hand text-xl leading-snug text-ink/30">
                    {stage >= 2 ? "writing…" : "…"}
                  </p>
                )}
                <div className="mt-3 text-xs font-body text-ink/60 flex justify-between">
                  <span>click anywhere to close</span>
                  <span>right-click for next →</span>
                </div>
              </div>
            </div>

            {/* arrow toggle — appears once explanation is in */}
            {stage >= 3 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setTheoryOpen((v) => !v); }}
                aria-label={theoryOpen ? "Hide theoretical reading" : "Show theoretical reading"}
                aria-expanded={theoryOpen}
                className={`absolute top-1/2 -translate-y-1/2 ink-border bg-pop-yellow flex items-center justify-center font-display text-2xl text-ink animate-pop-in hover:bg-pop-red hover:text-paper transition-colors ${
                  theorySide === "right" ? "-right-6" : "-left-6"
                }`}
                style={{
                  width: 44, height: 64,
                  boxShadow: theorySide === "right" ? "4px 4px 0 var(--ink)" : "-4px 4px 0 var(--ink)",
                }}
              >
                {theorySide === "right" ? (theoryOpen ? "‹" : "›") : (theoryOpen ? "›" : "‹")}
              </button>
            )}
          </div>

          {/* THEORY drawer */}
          {theoryOpen && stage >= 3 && (
            <div
              className="absolute top-0 animate-slide-up"
              style={{
                width: 320,
                [theorySide]: -332,
              } as React.CSSProperties}
            >
              <div
                className="ink-border bg-paper relative"
                style={{ boxShadow: "6px 6px 0 var(--ink)" }}
              >
                <div className="halftone-blue ink-border-b px-4 py-2 border-b-[3px] border-ink flex items-center justify-between">
                  <div className="font-display tracking-wider text-lg text-ink">THEORY</div>
                  <div className="font-marker text-[10px] text-ink/70">marginalia</div>
                </div>
                <div className="p-4 relative">
                  {/* faux footnote rule */}
                  <div className="absolute left-4 right-4 top-2 border-t border-dashed border-ink/30" />
                  <p
                    className={`font-body text-[13px] leading-relaxed ${menu.entry.theory ? "text-ink" : "text-ink/50 italic"}`}
                  >
                    {menu.entry.theory ?? THEORY_PLACEHOLDER}
                  </p>
                  <div className="mt-3 font-hand text-base text-pop-red" style={{ transform: "rotate(-1deg)" }}>
                    — see also: {menu.entry.theme.toLowerCase().replace(/^on\s+/, "")}, ibid.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* footer scrawl */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-hand text-lg text-ink/70 z-2">
        kept by hand · pressed under the page · {new Date().getFullYear()}
      </div>
      {/* next button to conclusion */}
      <Link
        to="/conclusion"
        className="fixed right-0 top-1/2 -translate-y-1/2 ink-border bg-pop-yellow flex items-center justify-center font-display text-4xl text-ink hover:bg-pop-red hover:text-paper transition-colors z-50 group"
        style={{
          width: 64, height: 80,
          borderRight: "none",
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          boxShadow: "-4px 4px 0 var(--ink)",
        }}
        aria-label="Proceed to Conclusion"
      >
        <span className="transform group-hover:translate-x-1 transition-transform">›</span>
      </Link>
    </main>
  );
}
