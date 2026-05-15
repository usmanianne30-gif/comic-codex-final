import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Intro,
});

function Intro() {
  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center p-8 bg-paper">
      {/* tape decorations */}
      <span className="tape" style={{ top: 40, left: "10%", transform: "rotate(-4deg)" }} />
      <span className="tape" style={{ top: 20, right: "15%", transform: "rotate(6deg)", background: "color-mix(in oklab, var(--pop-pink) 70%, white)" }} />
      <span className="tape" style={{ bottom: 50, left: "20%", transform: "rotate(-2deg)", background: "color-mix(in oklab, var(--pop-mint) 70%, white)" }} />

      <div 
        className="relative max-w-4xl w-full bg-paper ink-border p-12 z-10 animate-pop-in"
        style={{
          boxShadow: "12px 12px 0 var(--ink)",
        }}
      >
        <span className="tape" style={{ top: -15, left: "50%", transform: "translateX(-50%) rotate(-1deg)", background: "color-mix(in oklab, var(--pop-yellow) 70%, white)", zIndex: 20 }} />

        <div className="text-center mb-10">
          <h1 
            className="font-display text-pop-red mb-4"
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              letterSpacing: "0.02em",
              lineHeight: 1.1,
              WebkitTextStroke: "1.5px var(--ink)",
              textShadow: "4px 4px 0 var(--ink)",
              transform: "rotate(-1deg)",
            }}
          >
            Gender and the Politics of Self-Representation:
            <br />
            <span className="text-4xl text-pop-blue" style={{ WebkitTextStroke: "1px var(--ink)", textShadow: "3px 3px 0 var(--ink)" }}>
              How different forms of Femininity work in Graphic Narratives
            </span>
          </h1>
          <p className="font-marker text-2xl text-ink transform rotate-1">
            By: Anne Usmani
          </p>
        </div>

        <div className="font-hand text-2xl leading-relaxed text-ink space-y-6">
          <p>
            The right to draw oneself is the right to be subject rather than object. When women create autobiographical comics, they claim interpretive authority over their own gendered experience. Their bodies and experiences become sites of analysis rather than just aesthetic objects. Their consciousness becomes central rather than peripheral. Their desires become complex rather than determined.
          </p>
          <p>
            This is fundamentally different from male-created representation of women, which, regardless of artistic sophistication, always seems to position feminine bodies as available for external interpretation. The formal properties of comics, the panel composition, gaze direction, visual scale, narrative framing combine these politics into representation itself.
          </p>
          <p>
            Autobiographical form in women's hands is not merely personal expression. It is a political intervention. It refuses the historical logic that women's bodies and experiences are best understood when represented by men, insisting instead that women possess primary authority over the meaning of their own lives.
          </p>
        </div>

        {/* Next Button */}
        <Link 
          to="/codex"
          className="absolute -right-8 top-1/2 -translate-y-1/2 ink-border bg-pop-yellow flex items-center justify-center font-display text-4xl text-ink hover:bg-pop-red hover:text-paper transition-colors z-20 group"
          style={{
            width: 64, height: 80,
            boxShadow: "6px 6px 0 var(--ink)",
          }}
          aria-label="Proceed to Commonplace Book"
        >
          <span className="transform group-hover:translate-x-1 transition-transform">›</span>
        </Link>
      </div>
    </main>
  );
}
