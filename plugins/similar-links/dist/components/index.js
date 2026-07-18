// ../../node_modules/github-slugger/index.js

// node_modules/@quartz-community/utils/dist/path.js
function simplifySlug(fp) {
  const res = stripSlashes(trimSuffix(fp, "index"), true);
  return res.length === 0 ? "/" : res;
}
function joinSegments(...args) {
  if (args.length === 0) {
    return "";
  }
  let joined = args.filter((segment) => segment !== "" && segment !== "/").map((segment) => stripSlashes(segment)).join("/");
  const first = args[0];
  const last = args[args.length - 1];
  if (first?.startsWith("/")) {
    joined = "/" + joined;
  }
  if (last?.endsWith("/")) {
    joined = joined + "/";
  }
  return joined;
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
  if (!onlyStripPrefix && s2.endsWith("/")) {
    s2 = s2.slice(0, -1);
  }
  return s2;
}
function pathToRoot(slug2) {
  let rootPath = slug2.split("/").filter((x2) => x2 !== "").slice(0, -1).map((_2) => "..").join("/");
  if (rootPath.length === 0) {
    rootPath = ".";
  }
  return rootPath;
}
function resolveRelative(current, target) {
  const res = joinSegments(pathToRoot(current), simplifySlug(target));
  return res;
}

// src/tfidf.ts
var STOPWORDS = /* @__PURE__ */ new Set([
  "the",
  "and",
  "for",
  "are",
  "but",
  "not",
  "you",
  "all",
  "any",
  "can",
  "had",
  "her",
  "was",
  "one",
  "our",
  "out",
  "day",
  "get",
  "has",
  "him",
  "his",
  "how",
  "man",
  "new",
  "now",
  "old",
  "see",
  "two",
  "way",
  "who",
  "did",
  "its",
  "let",
  "put",
  "say",
  "she",
  "too",
  "use",
  "with",
  "this",
  "that",
  "from",
  "have",
  "will",
  "your",
  "they",
  "been",
  "were",
  "than",
  "then",
  "when",
  "what",
  "which",
  "their",
  "there",
  "about",
  "into",
  "over",
  "such",
  "some",
  "more",
  "most",
  "also",
  "just",
  "like",
  "only",
  "even",
  "here",
  "them",
  "each",
  "other",
  "because",
  "while",
  "still"
]);
function tokenize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((t2) => t2.length > 2 && !STOPWORDS.has(t2));
}
function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
function computeTfIdf(docs) {
  const documentFrequency = /* @__PURE__ */ new Map();
  for (const tokens of docs) {
    for (const term of new Set(tokens)) {
      documentFrequency.set(term, (documentFrequency.get(term) ?? 0) + 1);
    }
  }
  const totalDocs = docs.length;
  return docs.map((tokens) => {
    const termFrequency = /* @__PURE__ */ new Map();
    for (const term of tokens) {
      termFrequency.set(term, (termFrequency.get(term) ?? 0) + 1);
    }
    const vector = /* @__PURE__ */ new Map();
    for (const [term, count] of termFrequency) {
      const df = documentFrequency.get(term) ?? 0;
      const idf = Math.log(totalDocs / (1 + df));
      vector.set(term, count / tokens.length * idf);
    }
    return vector;
  });
}
function cosineSimilarity(a2, b2) {
  let normA = 0;
  for (const v2 of a2.values()) normA += v2 * v2;
  let normB = 0;
  for (const v2 of b2.values()) normB += v2 * v2;
  if (normA === 0 || normB === 0) return 0;
  const [smaller, larger] = a2.size <= b2.size ? [a2, b2] : [b2, a2];
  let dot = 0;
  for (const [term, v2] of smaller) {
    const other = larger.get(term);
    if (other) dot += v2 * other;
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
var l;
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

// src/components/Similar.tsx
var MIN_WORD_COUNT = 200;
var TOP_N = 5;
var Similar = ({
  fileData,
  allFiles,
  displayClass
}) => {
  const currentSlug = fileData.slug;
  if (!currentSlug) return null;
  const docs = allFiles;
  const eligible = docs.filter((d2) => d2.slug && d2.text && wordCount(d2.text) >= MIN_WORD_COUNT);
  const currentIndex = eligible.findIndex((d2) => d2.slug === currentSlug);
  if (currentIndex === -1) return null;
  const tokenized = eligible.map((d2) => tokenize(d2.text));
  const vectors = computeTfIdf(tokenized);
  const docA = eligible[currentIndex];
  const vecA = vectors[currentIndex];
  const scored = [];
  for (let i2 = 0; i2 < eligible.length; i2++) {
    if (i2 === currentIndex) continue;
    const docB = eligible[i2];
    const vecB = vectors[i2];
    if (!docB.slug || docB.unlisted) continue;
    if (docA.links?.includes(docB.slug) || docB.links?.includes(currentSlug)) continue;
    const score = cosineSimilarity(vecA, vecB);
    if (score > 0) {
      scored.push({ slug: docB.slug, title: docB.frontmatter?.title ?? docB.slug, score });
    }
  }
  scored.sort((a2, b2) => b2.score - a2.score);
  const top = scored.slice(0, TOP_N);
  if (top.length === 0) return null;
  return /* @__PURE__ */ u2("div", { class: displayClass ? `similar-links ${displayClass}` : "similar-links", children: [
    /* @__PURE__ */ u2("h3", { children: "Similar" }),
    /* @__PURE__ */ u2("ul", { children: top.map((item) => /* @__PURE__ */ u2("li", { children: /* @__PURE__ */ u2("a", { href: resolveRelative(currentSlug, item.slug), class: "internal", children: item.title }) })) })
  ] });
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
var Similar_default = (() => Similar);

export { Similar_default as Similar };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map