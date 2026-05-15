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
    theme: "CancerVixen—The Diagnosis",
    panel: { caption: "OH MY GOD I'M SICK!", sfx: "KRRSSH!", art: "explosion" },
    explanation:
      "The panel shows explosive, radiating blonde hair filling the frame before Marisa's mouth opens to scream. The typography escalates across three panels: from conversational narration to \"OH MY GOD I'M SICK!\" in oversized letters against a night sky. The text specifies \"10-12-03 A.M. THE NEXT MILLISECOND,\" claiming documentary precision. The second panel's \"(S)MOTHER\" uses parenthetical notation to layer meaning: protective/suffocating mother compressed into typographic innovation. The third panel reduces Marisa's body to a hunched shoulder and hand covering her face, small against the suburban house and a worried mother figure. The phone becomes a recurring motif—technology transmitting devastating news.",
    theory:
      "This represents the crisis of medical objectification and the autobiographical claim to subjective authority. By drawing herself receiving a diagnosis, Marchetto refuses the medical gaze that would reduce her to \"cancer patient.\" The visual scream—hair as terror made visible claims representational space for panic, refusing decorous containment of female suffering. The temporal precision (\"10-12-03 A.M. THE NEXT MILLISECOND\") asserts documentary authority, positioning lived experience against medical abstraction. The typographic innovation demonstrates comics' capacity to visualise emotional layering that prose cannot capture. Most critically, by drawing this moment herself, Marchetto maintains control over how her body is represented even as medical institutions work to reconstitute her as a clinical object. Self-representation becomes a survival strategy: she will be seen, but on her terms.",
    tone: "pink",
  },
  {
    theme: "CancerVixen—Performing Femininity Under Crisis",
    panel: { caption: "I PUT ON 'BRAVE' LIPSTICK...", sfx: "dialing...", art: "eye" },
    explanation:
      "Extreme close-up of manicured fingers holding branded lipstick: \"BRAVE LIPSTICK BY M.A.C.\" The caption narrates: \"I PUT ON 'BRAVE' LIPSTICK BY M.A.C. I NEEDED SOMETHING, ANYTHING, THAT WOULD HELP ME FACE PLEASE GOD WILLING MY FUTURE HUSBAND...\" The ellipsis trails off. Lower right shows phone screen: \"T-Mobile Dialling Silvano.\" The brand name is prominent. The yellow caption box's text interrupts itself: \"PLEASE GOD WILLING\" breaks the sentence's flow, visualising panic's interruption of thought.",
    theory:
      "This represents the strategic deployment of femininity as a survival mechanism within patriarchal structures. The lipstick, literally named \"BRAVE,\" transforms cosmetics from an imposed beauty standard into ritual armour. Yet Marchetto's formal choices prevent simple celebration: the brand prominence reminds us this is a consumer product, part of the beauty-industrial complex. The panel walks a razor's edge between critique and complicity. The interrupted syntax—\"HELP ME FACE PLEASE GOD WILLING MY FUTURE HUSBAND\"—recognises that she must now perform being both sick and marriageable. This is self-representation as doubled consciousness: Marchetto simultaneously performs femininity and analyses that performance. By drawing herself putting on lipstick, she claims authority over the meaning of this gesture. It's armour, not vanity; strategy, not capitulation. Male-created representation would not grant feminine beauty rituals this analytical complexity.",
    tone: "yellow",
  },
  {
    theme: "Shakuntala—The Mutual Gaze",
    panel: { caption: "WHAT A HANDSOME MAN HE IS!", sfx: "sigh", art: "heart" },
    explanation:
      "Split thought-bubbles show King Dushyant and Shakuntala's first encounter: \"OH! HOW BEAUTIFUL SHE IS\" and \"WHAT A HANDSOME MAN HE IS!\" The King occupies the left panel in profile, close-up, with an elaborate crown and jewellery. Shakuntala appears right, slightly smaller, with downcast eyes and a slight smile. Pink background frames both. Amar Chitra Katha style creates an idealised, iconic representation—clear lines, bright colours, beautiful types. The panel above shows them sharing fruit, King's promise: \"DON'T WORRY, I SHALL REMAIN HERE TILL I DESTROY ALL THE DEMONS. / WE SHALL ALWAYS BE GRATEFUL TO YOU.\"",
    theory:
      "This represents the illusion of reciprocal recognition that disguises asymmetric power. The symmetric thought-bubbles suggest egalitarian mutual desire, but the formal construction reveals inequality: he is crowned (royal authority), she is smaller (subordinate). The Amar Chitra Katha style's iconicity is deeply political—Shakuntala's beauty is conventional, legible within patriarchal codes. This creates the central tension: if her beauty is so apparent, so readable, why must she later fight to be \"seen\" by this same King? The panel captures the moment before complication, when seeing and being seen appear reciprocal. The exchange economy establishes itself: King provides protection, hermitage provides hospitality, and Shakuntala, a beautiful object, circulates within this system. What appears as mutual recognition is actually the establishment of Shakuntala as an aesthetic object whose value depends on male seeing. This is not self-representation but representation within patriarchal visual codes that will later be revoked.",
    tone: "blue",
  },
  {
    theme: "Shakuntala—The Ring (Material Proof)",
    panel: { caption: "WHERE IS IT?", sfx: "gasp!", art: "key" },
    explanation:
      "The middle panel shows Shakuntala's shocked face in close-up, mouth agape. Companion says: \"SHAKUNTALA, WHY DON'T YOU SHOW THE RING WHICH THE KING HAD GIVEN YOU?\" Bottom panel caption responds: \"HERE IS THE RING YOU GAVE ME—OH! WHERE IS IT? I HAD NEVER REMOVED IT.\" Shakuntala's face, veiled in pink fabric, shows widened eyes and a raised hand in dismay. The top panel shows the hermit's question to the King: \"DON'T YOU REMEMBER YOUR WIFE, SHAKUNTALA?\" King's response: \"I DON'T KNOW ANYONE BY THAT NAME. YOU MUST BE MISTAKEN.\" His thought bubble: \"HOW STRANGE THAT A MAN SHOULD FORGET HIS OWN WIFE.\"",
    theory:
      "This represents the precarity of female selfhood under systems requiring external validation. Shakuntala's embodied knowledge—memory, pregnancy, lived experience—proves insufficient. She needs the ring, the King's token, to authorise her own story. The ring's absence creates representational rupture: she has the experience but lacks the material signifier that would make it legible to patriarchal authority. The panel emphasises this through negative space—the missing ring becomes present through absence. The companion's suggestion to \"show the ring\" treats Shakuntala's subjectivity as a prosecutorial problem requiring evidence, as though her word carries no weight. The King's thought bubble—\"HOW STRANGE THAT A MAN SHOULD FORGET HIS OWN WIFE\"—reveals the violence: he acknowledges the strangeness while doing nothing to rectify it. This literalizes women's perpetual anxiety under patriarchy: selfhood, stories, and very existence remain subject to male recognition and memory. Without the material token of his giving, she becomes impossible to see, even standing visibly pregnant before him. This is the opposite of self-representation: Shakuntala cannot represent herself; she requires his representation of her to exist.",
    tone: "mint",
  },
  {
    theme: "Shakuntala—Unveiling (Visibility Without Recognition)",
    panel: { caption: "RAISE YOUR VEIL.", sfx: "rustle", art: "eye" },
    explanation:
      "Top panels show elderly companion commanding: \"SHAKUNTALA, RAISE YOUR VEIL. THE KING WILL SURELY REMEMBER YOU WHEN HE SEES YOUR FACE.\" Bottom-left shows Shakuntala in close-up, veiled, eyes downcast in modest suffering. Bottom-right shows King's response: \"YOUR FACE IS INDEED LOVELY, BUT I HAVE NEVER SEEN YOU BEFORE.\" Above, hermitage women crouch searching the ground: \"THE RING MUST HAVE FALLEN SOMEWHERE. LET US LOOK FOR IT.\" Bodies bent in supplicant postures while the King stands tall with a sceptre.",
    theory:
      "This represents the split between visibility-as-object and recognition-as-subject. The veil functions as a threshold between private (remembered, known) and public (forgotten, strange) feminine identity. The companion's faith that unveiling will trigger recognition assumes face serves as an authentic identity marker. Yet when Shakuntala unveils, the King sees \"lovely\" face, not her face—generic beauty rather than specific personhood. This crystallises how patriarchal seeing reduces women to aesthetic objects rather than recognising them as subjects with histories and claims. The composition visualises a power differential: the hermitage women crouch searching for evidence while King stands elevated. Shakuntala must prove herself through external validation (ring) while the King's word alone suffices. The formal grammar demonstrates how visibility and recognition diverge for women: she can be seen (as beautiful) without being recognised (as a known subject). Her unveiled face provokes aesthetic appreciation—\"INDEED LOVELY\"—but not memory, not acknowledgement, not the relational recognition that would constitute her as wife and mother. Visibility does not equal representational authority; being seen is not the same as being heard or believed.",
    tone: "yellow",
  },
  {
    theme: "Shakuntala—Speaking Back",
    panel: { caption: "STOP YOUR CHATTER.", sfx: "silence", art: "thoughtcloud" },
    explanation:
      "Upper-left shows Shakuntala speaking, still veiled: \"DO YOU REMEMBER HOW ONE DAY YOU COLLECTED RAIN-WATER IN A LOTUS FLOWER AND GAVE IT TO MY PET FAWN TO DRINK BUT SHE REFUSED.\" Extended speech reclaims narrative authority. Upper-right shows Shakuntala's unveiled face in close-up, confrontational: \"YET WHEN I OFFERED IT, SHE DRANK IT GLADLY. SO YOU SAID—YOU ARE BOTH CHILDREN OF THE FOREST AND TRUST EACH OTHER...AND...\" King's dismissive hand gesture: \"STOP YOUR CHATTER. I REMEMBER NO SUCH THING.\" Bottom panels escalate: \"OH DUSHYANT! IT IS WICKED OF YOU TO DISOWN YOUR OWN WIFE\" fills speech bubble dominating the panel. King sits smiling; she stands impassioned.",
    theory:
      "This represents the claim to voice as a political act, even when structural conditions deny vindication. Shakuntala shifts from showing (unveiled face) to telling (remembered scene), from visual proof to verbal testimony. She invokes specific, intimate memory—rainwater, lotus, pet fawn—details only a participant could know. This move from object-to-be-seen to speaking-subject marks the crucial shift in representational politics. The King's command—\"STOP YOUR CHATTER\"—attempts to silence her, yet the visual composition grants her face equal panel space with his. The word \"WICKED\" names patriarchal violence explicitly, transforming misunderstanding into moral condemnation. Though the plot will deny her immediate vindication, she has claimed voice, refused silence, spoken truth to power. The panel's composition, giving her final words and central position, visually enacts this reclamation. This is a partial self-representation within a narrative she did not author: Shakuntala claims speech even though male creators (Kalidasa, Amar Chitra Katha artists) ultimately control her story. The formal limit reveals the political stakes: full self-representation requires not just voice within the narrative, but control over the narrative itself.",
    tone: "pink",
  },
  {
    theme: "Watchmen—\"I Don't Know What I Should Call You\"",
    panel: { caption: "WHAT SHOULD I CALL YOU?", sfx: "glow", art: "lightbulb" },
    explanation:
      "The sequence shows Laurie Juspeczyk in a yellow costume against Dr Manhattan's blue, glowing form. Dialogue reads: \"I... I DON'T KNOW WHAT I SHOULD CALL YOU. DO YOU HAVE ANOTHER NAME, ASIDE FROM DR. MANHATTAN?\" Response: \"YES. / NAME'S / TON.\" Does not show physical consummation. Laurie's body is rendered in warm tones (yellow costume, flesh) adjacent to Jon's cool blue luminescence. Composition places her vulnerability against his post-human detachment.",
    theory:
      "This represents a male-created representation of feminine sexual uncertainty as an inherent trait rather than a structural condition. Laurie cannot name what is happening, cannot claim linguistic authority over her own experience. The visual contrast (warm/cold, yellow/blue, human/post-human) suggests radical incommensurability rather than intimacy. Critically, this differs from Bechdel/Satrapi's self-representation: Laurie is not subject claiming authority over her experience; she is an object being represented by male creators. The panel form does not grant her interpretive access to her own embodiment. Her question—\"What should I call you?\"—registers as vulnerability, incompleteness, her need to be named/recognised by the male figure. The visual rendering of her body (sexualized, exposed, warm) creates a voyeuristic relationship between the reader and the represented figure that contrasts sharply with the intimate, analytical gaze of autobiographical comics. Where Bechdel draws herself and claims authority over representation, Laurie is drawn by men (Moore conceiving, Gibbons rendering) in ways emphasising bodily availability and emotional dependence. The formal difference is political: Laurie's representation visualises not gendered self-representation but gendered objectification—representation of women's bodies and desires by those with no experiential claim to them.",
    tone: "blue",
  },
  {
    theme: "Watchmen—\"We Don't Have Much Time\"",
    panel: { caption: "LISTEN, EVERYONE MEET IN THE LOBBY...", sfx: "tick. tick.", art: "speedlines" },
    explanation:
      "Scene shows Laurie and Dan Dreiberg in conversation. Laurie's body language open but facial expression suggests uncertainty or concern. Dialogue includes: \"LISTEN, EVERYONE MEET IN THE LOBBY IN FIVE MINUTES. WE'LL ALL GO DOWN TO THE FRONT FOR A BEER.\" Relatively equal panel sizes, distributed focus suggesting democratic visual field. Yet dialogue hierarchy positions Dan and other male voices as dominant, Laurie's utterances as secondary.",
    theory:
      "This represents how gendered power operates through subtle distributional patterns rather than crude visual subordination. Laurie is perpetually addressed, managed, instructed by male figures throughout Watchmen. Even when appearing to have agency—organizing activities, suggesting plans—her suggestions are framed as responses to male authority or needs. The panel uses equal panel sizes suggesting visual democracy, yet dialogue structure creates sonic/textual hierarchy that undermines this. This formal technique reveals how gendered power operates not through obvious domination but through accumulated marginal positioning. This contrasts with how Bechdel/Satrapi use panel composition to grant themselves visual and narrative authority. When Bechdel appears in panels, even as small child, her consciousness is interpretively central—narrative structures itself around her understanding. Satrapi's perspective dominates visual field; we see world as she sees it. In Watchmen, Laurie's perspective is frequently externalized; we observe her from without, rarely inhabiting her consciousness as primary interpretive position. The formal difference reveals political stakes: external observation versus internal authority, object versus subject, represented versus self-representing.",
    tone: "yellow",
  },
  {
    theme: "Bechdel—\"When I Grow Up\"",
    panel: { caption: "A SUBMARINE HOUSE.", sfx: "splash", art: "thoughtcloud" },
    explanation:
      "[Panel showing young Alison declaring she will have a submarine house when she grows up, refusing imposed femininity through imaginative architectural fantasy. Her declaration was rendered with authority, her childhood consciousness treated as interpretively significant.]",
    theory:
      "This represents autobiographical authority, transforming childhood refusal into a politically significant act. Where Moore/Gibbons render feminine desire and uncertainty as objects of external observation, Bechdel represents her own childhood desires—including rejection of imposed femininity—as legible, interpretable, analytically significant. Her declaration that she will have a submarine house becomes, through the act of representation, a statement of intentional refusal. Laurie's uncertainties in Watchmen, by contrast, are rendered as emotional instability, psychological weakness, and grounds for male protective intervention. The formal difference, autobiographical authority versus external representation, produces radically different meanings around the same fundamental problematic: how gendered subjects navigate imposed aesthetic and behavioural systems. By drawing herself, Bechdel claims the right to interpret her own refusals as meaningful rather than dismissing them as childish whimsy. Self-representation grants analytical authority; external representation denies it.",
    tone: "blue",
  },
  {
    theme: "Bechdel—Confrontation with Father's Sexuality",
    panel: { caption: "THE UNSEEN INTERIOR.", sfx: "creak…", art: "key" },
    explanation:
      "[Panel showing nighttime exterior of family house, absence of explicit confrontation. Visual restraint rather than sensationalism. The unseen interior—secrets contained within the house—rendered as more powerful than explicit depiction. Discovery of father's homosexuality represented through architectural containment and narrative revelation rather than visual spectacle.]",
    theory:
      "This represents self-representation's refusal to subordinate one's own narrative to male sexual identity, even when that identity is marginalised. The panel gains resonance when read against Watchmen's treatment of sexuality. Where Moore/Gibbons represent Laurie's sexuality as something that happens to her—seduced, manipulated, positioned—Bechdel represents her father's sexuality as something he concealed, performed around, structured family existence to hide. The discovery of his homosexuality does not render him a victim of circumstance (as Laurie's entrapment with Jon might suggest) but implicates him in systems of deception and performance that structured the entire family's existence. Bechdel's representation refuses the logic of positioning feminine heterosexuality (Laurie's situation) and masculine homosexuality (father's situation) as equivalent vulnerabilities. Instead, she reveals how father's homosexuality—kept secret, denied, acted out through predatory behaviour with teenage boys—constitutes masculine power that appropriates and damages feminine and juvenile bodies. By representing this as part of her own narrative, Bechdel refuses to allow her father's sexuality to determine her gendered identity. She remains the subject of her own narrative, not a supporting character in a story about male desire. The visual restraint contrasts with Watchmen's graphic representation—Bechdel's restraint is a formal strategy, not prudishness. She refuses sensationalism and insists on complexity.",
    tone: "pink",
  },
  {
    theme: "Satrapi—\"The Veil Mandate at School\"",
    panel: { caption: "THE VEIL.", sfx: "sigh", art: "eye" },
    explanation:
      "[Panel showing young Marjane and her classmates at school after the revolution. The teacher is giving instructions to remove all images of the Shah from their textbooks. The visual composition emphasises the external imposition of the new school dress code on the children—the mandatory veil/uniform is visible as something imposed from above by state authority rather than chosen by the children. The panels show Marjane's resistance and confusion about this sudden change in how she must present herself at school.]",
    theory:
      "This represents autobiographical representation's capacity to visualise imposed constraint while maintaining analytical authority over its meaning. Like feminist graphic memoir more broadly, Satrapi represents the imposition of feminine constraint (mandatory veil and school uniform) as something she analyses and resists through representation. Unlike Watchmen's treatment of Laurie. Where uncertainty and emotional distress are rendered as inherent feminine traits, Satrapi represents the veil as an external political imposition, something done to her and her peers rather than expressive of their nature or desires.\nThe panel form allows her to visualise the violence of the state mandate (forcing children to destroy images, forcing new dress codes) while simultaneously claiming authority over that visualisation and its meaning. She refuses the logic that would naturalise either pre-revolutionary \"freedom\" of dress or post-revolutionary constraint as authentic expressions of feminine identity. Instead, both are revealed as structural impositions upon which girls must negotiate selfhood and resistance. By drawing herself and her classmates subjected to the veil mandate, Satrapi maintains interpretive authority: she defines what this means, how it felt, and what resistance was possible. Male-created representation would not grant this analytical distance. It would either celebrate cultural tradition or condemn cultural constraint, but not preserve the complexity of the girl navigating, resisting, and surviving both.",
    tone: "mint",
  },
  {
    theme: "Satrapi—\"Funeral Preparation and Feminine Display\"",
    panel: { caption: "THE LABOR OF APPEARANCE.", sfx: "brush...", art: "heart" },
    explanation:
      "[Panel showing a family gathering at a funeral, with particular attention to the formal dress and grooming of female mourners. The visual representation captures the specific aesthetic labour required of women even in death and grief—the careful presentation of the body, the styling of hair visible beneath veils, the composition of the face. The comic shows multiple generations of women, each rendered with attention to their appearance despite (or because of) the context of mourning and loss. The labour of maintaining feminine presentation is documented with specificity, rendered as significant work worthy of visual representation.]",
    theory:
      "This represents self-representation's capacity to render gendered labour visible and analytically significant. The panel's representation of funeral labour. The detailed attention to feminine presentation, bodily work, and aesthetic management stands in contrast to how male-authored comics treat feminine embodiment. Where male comic creators might render women's bodies as objects of visual pleasure or spectacle, Satrapi renders the work of maintaining feminine presentation (even in grief, even at funerals) as labour worthy of serious representation and analysis.\nBy documenting the specific aesthetic choices made in preparing feminine bodies for funeral display. The styling of hair, the careful draping of veils, the composed expressions, Satrapi refuses naturalisation of appearance. She reveals that even in death and mourning, feminine bodies are subject to aesthetic management and the labour of presentation. This stands in sharp contrast to how male-authored superhero comics (like Watchmen) treat embodiment: masculine bodies (particularly Jon's) are capable of transcending embodiment entirely and moving beyond concern with appearance, while feminine bodies (Laurie's, Sally's) remain fundamentally trapped in aesthetics of appearance and sexual availability.\nSatrapi's representation insists this labour is real, significant, worthy of serious representation. The refusal that male representation makes impossible. By drawing this labour herself. By visualising the work women do to maintain appearance even at funerals, Satrapi claims authority to represent gendered work that male representation either romanticises, trivialises, or renders invisible. She documents feminine labour not as a mark of oppression but as evidence of women's resilience, care work, and navigating impossible demands.",
    tone: "yellow",
  }
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
          const valid = parsed.filter(id => typeof id === 'number' && id < ENTRIES.length);
          setRevealedIds(valid);
          idxRef.current = valid.length;
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
    <main className="relative min-h-screen overflow-y-auto pb-40" style={{ zIndex: 0 }}>
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
                  <div className="font-hand text-xl leading-snug text-ink animate-scribble space-y-3 overflow-y-auto pr-2" style={{ height: "240px", scrollbarWidth: "thin" }}>
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
                <div className="p-4 relative overflow-y-auto pr-2" style={{ height: "460px", scrollbarWidth: "thin" }}>
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
