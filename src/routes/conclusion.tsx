import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/conclusion")({
  component: Conclusion,
});

function Conclusion() {
  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center p-8 bg-paper">
      {/* tape decorations */}
      <span className="tape" style={{ top: 30, right: "12%", transform: "rotate(5deg)" }} />
      <span className="tape" style={{ bottom: 40, right: "20%", transform: "rotate(-3deg)", background: "color-mix(in oklab, var(--pop-blue) 70%, white)" }} />
      <span className="tape" style={{ top: 50, left: "15%", transform: "rotate(3deg)", background: "color-mix(in oklab, var(--pop-yellow) 70%, white)" }} />

      <div 
        className="relative max-w-4xl w-full bg-paper ink-border p-12 z-10 animate-pop-in"
        style={{
          boxShadow: "12px 12px 0 var(--ink)",
        }}
      >
        <span className="tape" style={{ top: -15, left: "50%", transform: "translateX(-50%) rotate(2deg)", background: "color-mix(in oklab, var(--pop-pink) 70%, white)", zIndex: 20 }} />

        <div className="text-center mb-10">
          <h1 
            className="font-display text-pop-blue mb-4"
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              letterSpacing: "0.02em",
              lineHeight: 1.1,
              WebkitTextStroke: "1.5px var(--ink)",
              textShadow: "4px 4px 0 var(--ink)",
              transform: "rotate(1deg)",
            }}
          >
            Conclusion: <br />
            <span className="text-5xl text-pop-red" style={{ WebkitTextStroke: "1.5px var(--ink)", textShadow: "3px 3px 0 var(--ink)" }}>
              The Politics of Drawing Oneself
            </span>
          </h1>
        </div>

        <div className="font-hand text-2xl leading-relaxed text-ink space-y-6">
          <p>
            The comparison reveals that who creates autobiographical representation is not merely aesthetic preference but political necessity. The formal differences between autobiographical comics by women and male-created representation of women are fundamentally political, reflecting competing claims about who has authority to represent gendered experience, whose consciousness counts as interpretively significant, how sexuality relates to identity.
          </p>
          <p>
            Watchmen's treatment of Laurie and Sally is not simply a "male perspective" on femininity, but systematic positioning of feminine bodies as objects, feminine consciousness as secondary to masculine meaning-making. The formal comics-style choices: panel size, gaze direction, temporal privilege tie-in this logic into representation's very structure.
          </p>
          <p>
            By contrast, Bechdel and Satrapi's formal strategies, their claims to representational authority, their preservation of complexity and ambivalence, their refusal to reduce gender to sexuality or appearance show a different politics of representation. They claim the right to represent themselves, their mothers, their female relatives, as complex subjects worthy of serious analytical attention.
          </p>
          <p>
            The act of claiming representational authority over one's own gendered experience is itself political intervention. It refuses the default logic that women's bodies and desires are available for male interpretation and representation. It insists that women are subjects of knowledge about their own lives, not merely objects of male observation.
          </p>
          <div className="mt-8 p-6 ink-border text-center transform -rotate-1" style={{ backgroundColor: "color-mix(in oklab, var(--pop-mint) 20%, white)", boxShadow: "4px 4px 0 var(--ink)" }}>
            <p className="font-marker text-3xl text-pop-red" style={{ WebkitTextStroke: "0.5px var(--ink)" }}>
              The right to draw oneself is the right to be subject rather than object.
            </p>
          </div>
        </div>

        {/* Back Button */}
        <Link 
          to="/codex"
          className="absolute -left-8 top-1/2 -translate-y-1/2 ink-border bg-pop-yellow flex items-center justify-center font-display text-4xl text-ink hover:bg-pop-blue hover:text-paper transition-colors z-20 group"
          style={{
            width: 64, height: 80,
            boxShadow: "-6px 6px 0 var(--ink)",
          }}
          aria-label="Back to Commonplace Book"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform">‹</span>
        </Link>
      </div>
    </main>
  );
}
