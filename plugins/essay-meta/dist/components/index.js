// ../../node_modules/github-slugger/index.js

// node_modules/@quartz-community/utils/dist/path.js
function simplifySlug(fp) {
  const res = stripSlashes(trimSuffix(fp, "index"));
  return res.length === 0 ? "/" : res;
}
function endsWith(s2, suffix) {
  return s2 === suffix || s2.endsWith("/" + suffix);
}
function trimSuffix(s2, suffix) {
  if (endsWith(s2, suffix)) {
    s2 = s2.slice(0, -suffix.length);
  }
  return s2;
}
function stripSlashes(s2, onlyStripPrefix) {
  if (s2.startsWith("/")) {
    s2 = s2.substring(1);
  }
  return s2;
}
var l;
function S(n2) {
  return n2.children;
}
l = { __e: function(n2, l2, u3, t2) {
  for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Math.random().toString(8);

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l.vnode && l.vnode(l2), l2;
}

// src/components/EssayMeta.tsx
var STATUS_SCALE = "Status ladder: notes \u2192 draft \u2192 in-progress \u2192 finished";
var CONFIDENCE_SCALE = "Confidence ladder: log \u2192 unlikely \u2192 possible \u2192 likely \u2192 highly-likely \u2192 certain";
function formatDate(d2) {
  if (!(d2 instanceof Date) || isNaN(d2.getTime())) return void 0;
  const year = d2.getFullYear();
  const month = String(d2.getMonth() + 1).padStart(2, "0");
  const day = String(d2.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
var EssayMeta = ({ fileData, allFiles }) => {
  const slug2 = fileData.slug;
  if (!slug2 || !slug2.startsWith("essays/")) {
    return null;
  }
  const frontmatter = fileData.frontmatter ?? {};
  const dates = fileData.dates;
  const currentSlug = simplifySlug(slug2);
  const backlinkCount = allFiles.filter(
    (f3) => f3.unlisted !== true && f3.links?.includes(currentSlug)
  ).length;
  const items = [];
  const created = formatDate(dates?.created);
  if (created) items.push(`created ${created}`);
  const modified = formatDate(dates?.modified);
  if (modified) items.push(`modified ${modified}`);
  if (frontmatter.status) {
    items.push(/* @__PURE__ */ u2("span", { title: STATUS_SCALE, children: frontmatter.status }));
  }
  if (frontmatter.confidence) {
    items.push(/* @__PURE__ */ u2("span", { title: CONFIDENCE_SCALE, children: frontmatter.confidence }));
  }
  if (typeof frontmatter.importance === "number") {
    items.push(`importance ${frontmatter.importance}`);
  }
  items.push(`${backlinkCount} backlink${backlinkCount === 1 ? "" : "s"}`);
  return /* @__PURE__ */ u2("p", { class: "essay-meta", children: items.map((item, i2) => /* @__PURE__ */ u2(S, { children: [
    i2 > 0 ? " \xB7 " : "",
    item
  ] })) });
};
EssayMeta.css = `
.essay-meta {
  margin: 0.25rem 0 0 0;
  font-size: 0.85rem;
}
`;
var EssayMeta_default = (() => EssayMeta);

export { EssayMeta_default as EssayMeta };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map