import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";
import { resolveRelative } from "../util/path";

// Hardcoded for the same reason similar-links hardcodes its constants:
// component-only plugins are built as two separate entry points, so mutable
// options set via init() don't reliably reach this module. Site-local
// plugin, so a hardcoded list is fine — edit here to change the nav.
const NAV_LINKS: [label: string, targetSlug: string][] = [
  ["about", "about"],
  ["now", "now"],
  ["changelog", "changelog"],
  ["experiments", "experiments/"],
];

const TopNav: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const slug = fileData.slug as string | undefined;
  if (!slug) return null;

  return (
    <nav class={displayClass ? `top-nav ${displayClass}` : "top-nav"}>
      {NAV_LINKS.map(([label, target]) => (
        <a href={resolveRelative(slug, target)} class="internal">
          {label}
        </a>
      ))}
    </nav>
  );
};

TopNav.css = `
.top-nav {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-family: var(--headerFont);
  font-variant: small-caps;
  letter-spacing: 0.05em;
  font-size: 1.05rem;
}
.top-nav a.internal {
  color: var(--darkgray);
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  font-weight: 600;
}
.top-nav a.internal:hover {
  color: var(--secondary);
}
`;

export default (() => TopNav) satisfies QuartzComponentConstructor;
