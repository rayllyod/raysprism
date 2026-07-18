import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";
import { resolveRelative } from "../util/path";
import { computeTfIdf, cosineSimilarity, tokenize, wordCount } from "../tfidf";

// Pages under this word count are noise for TF-IDF and are skipped as both
// source and target. Not YAML-configurable on purpose: component-only
// plugins built as two separate entry points (this one + ./components) each
// get their own copy of any shared module state, so a mutable options
// object set via init() silently doesn't reach this file. Simpler to just
// hardcode the two constants the spec calls for.
const MIN_WORD_COUNT = 200;
const TOP_N = 5;

interface SimilarityDoc {
  slug?: string;
  text?: string;
  links?: string[];
  unlisted?: boolean;
  frontmatter?: { title?: string };
}

interface SimilarEntry {
  slug: string;
  title: string;
  score: number;
}

// Computed at build time only, inline at render (same pattern Backlinks
// itself uses via the allFiles prop) — zero client-side JS, no precompute
// step to keep in sync with page rendering order.
const Similar: QuartzComponent = ({
  fileData,
  allFiles,
  displayClass,
}: QuartzComponentProps & { displayClass?: string }) => {
  const currentSlug = fileData.slug as string | undefined;
  if (!currentSlug) return null;

  const docs = allFiles as SimilarityDoc[];
  const eligible = docs.filter((d) => d.slug && d.text && wordCount(d.text) >= MIN_WORD_COUNT);

  const currentIndex = eligible.findIndex((d) => d.slug === currentSlug);
  if (currentIndex === -1) return null;

  const tokenized = eligible.map((d) => tokenize(d.text!));
  const vectors = computeTfIdf(tokenized);

  const docA = eligible[currentIndex]!;
  const vecA = vectors[currentIndex]!;

  const scored: SimilarEntry[] = [];
  for (let i = 0; i < eligible.length; i++) {
    if (i === currentIndex) continue;
    const docB = eligible[i]!;
    const vecB = vectors[i]!;
    if (!docB.slug || docB.unlisted) continue;

    // Exclude pages already linked to/from — surface unlinked similarity,
    // don't restate what backlinks/prose links already show.
    if (docA.links?.includes(docB.slug) || docB.links?.includes(currentSlug)) continue;

    const score = cosineSimilarity(vecA, vecB);
    if (score > 0) {
      scored.push({ slug: docB.slug, title: docB.frontmatter?.title ?? docB.slug, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, TOP_N);

  if (top.length === 0) return null;

  return (
    <div class={displayClass ? `similar-links ${displayClass}` : "similar-links"}>
      <h3>Similar</h3>
      <ul>
        {top.map((item) => (
          <li>
            <a href={resolveRelative(currentSlug, item.slug)} class="internal">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

Similar.css = `
.similar-links {
  margin-top: 1rem;
  h3 {
    margin: 0 0 0.5rem 0;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      margin: 0.25rem 0;
    }
  }
}
`;

export default (() => Similar) satisfies QuartzComponentConstructor;
