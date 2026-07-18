import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";
import type { ComponentChildren } from "preact";
import { simplifySlug } from "@quartz-community/utils/path";

type Status = "notes" | "draft" | "in-progress" | "finished";
type Confidence = "log" | "unlikely" | "possible" | "likely" | "highly-likely" | "certain";

interface EssayFrontmatter {
  status?: Status;
  confidence?: Confidence;
  importance?: number;
}

interface BacklinkCandidate {
  unlisted?: boolean;
  links?: string[];
  slug?: string;
}

const STATUS_SCALE = "Status ladder: notes → draft → in-progress → finished";
const CONFIDENCE_SCALE = "Confidence ladder: log → unlikely → possible → likely → highly-likely → certain";

function formatDate(d: unknown): string | undefined {
  if (!(d instanceof Date) || isNaN(d.getTime())) return undefined;
  // Use local getters, not toISOString: created-modified-date parses
  // "YYYY-MM-DD" frontmatter as local midnight, so converting to UTC here
  // would shift the displayed date back a day in timezones behind UTC.
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const EssayMeta: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
  const slug = fileData.slug as string | undefined;
  if (!slug || !(slug.startsWith("essays/") || slug.startsWith("experiments/"))) {
    return null;
  }

  const frontmatter = (fileData.frontmatter ?? {}) as EssayFrontmatter;
  const dates = (fileData as { dates?: { created?: Date; modified?: Date } }).dates;

  const currentSlug = simplifySlug(slug);
  const backlinkCount = (allFiles as BacklinkCandidate[]).filter(
    (f) => f.unlisted !== true && f.links?.includes(currentSlug),
  ).length;

  const items: ComponentChildren[] = [];

  const created = formatDate(dates?.created);
  if (created) items.push(`created ${created}`);

  const modified = formatDate(dates?.modified);
  if (modified) items.push(`modified ${modified}`);

  if (frontmatter.status) {
    items.push(
      <span class={`meta-badge status-${frontmatter.status}`} title={STATUS_SCALE}>
        {frontmatter.status}
      </span>,
    );
  }

  if (frontmatter.confidence) {
    items.push(
      <span class={`meta-badge confidence-${frontmatter.confidence}`} title={CONFIDENCE_SCALE}>
        {frontmatter.confidence}
      </span>,
    );
  }

  if (typeof frontmatter.importance === "number") {
    items.push(`importance ${frontmatter.importance}`);
  }

  items.push(`${backlinkCount} backlink${backlinkCount === 1 ? "" : "s"}`);

  return (
    <p class="essay-meta">
      {items.map((item, i) => (
        <>
          {i > 0 ? " · " : ""}
          {item}
        </>
      ))}
    </p>
  );
};

EssayMeta.css = `
.essay-meta {
  margin: 0.25rem 0 0 0;
  font-size: 0.85rem;
}
`;

export default (() => EssayMeta) satisfies QuartzComponentConstructor;
