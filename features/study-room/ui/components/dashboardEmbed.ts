export type StudyRoomTabKey = "dashboard" | "market" | "sectors" | "credit";

export const STUDY_ROOM_NAV_MESSAGE = "study-room-dashboard-navigate";

const NAV_PATH_MAP: Record<string, StudyRoomTabKey> = {
  "/stock/dashboard/": "dashboard",
  "/stock/market/": "market",
  "/stock/sectors/": "sectors",
  "/stock/credit-spread/": "credit",
};

const NAV_SCRIPT = `
<script>
(function() {
  var navMap = ${JSON.stringify(NAV_PATH_MAP)};
  var messageSource = ${JSON.stringify(STUDY_ROOM_NAV_MESSAGE)};
  function parseQuery(queryStr) {
    var params = {};
    if (!queryStr) return params;
    var pairs = queryStr.split('&');
    for (var i = 0; i < pairs.length; i++) {
      if (!pairs[i]) continue;
      var eq = pairs[i].indexOf('=');
      var rawKey = eq >= 0 ? pairs[i].slice(0, eq) : pairs[i];
      var rawVal = eq >= 0 ? pairs[i].slice(eq + 1) : '';
      try {
        params[decodeURIComponent(rawKey)] = decodeURIComponent(rawVal.replace(/\\+/g, ' '));
      } catch (e) {
        params[rawKey] = rawVal;
      }
    }
    return params;
  }
  function tabFromHref(href) {
    if (!href) return null;
    var noHash = href.split('#')[0];
    var qIdx = noHash.indexOf('?');
    var pathPart = qIdx >= 0 ? noHash.slice(0, qIdx) : noHash;
    var queryPart = qIdx >= 0 ? noHash.slice(qIdx + 1) : '';
    var keys = Object.keys(navMap);
    for (var i = 0; i < keys.length; i++) {
      if (pathPart === keys[i] || pathPart.endsWith(keys[i])) {
        return { tab: navMap[keys[i]], params: parseQuery(queryPart) };
      }
    }
    return null;
  }
  document.addEventListener('click', function(event) {
    var anchor = event.target && event.target.closest ? event.target.closest('a') : null;
    if (!anchor) return;
    var href = anchor.getAttribute('href');
    var match = tabFromHref(href);
    if (!match) return;
    event.preventDefault();
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(
        { source: messageSource, tab: match.tab, params: match.params },
        '*'
      );
    }
  }, true);
})();
</script>
`;

export function wrapDashboardHtml(html: string): string {
  if (!html) return html;
  if (html.includes("</body>")) {
    return html.replace("</body>", `${NAV_SCRIPT}</body>`);
  }
  return `${html}${NAV_SCRIPT}`;
}

export interface StudyRoomNavMessage {
  source: typeof STUDY_ROOM_NAV_MESSAGE;
  tab: StudyRoomTabKey;
  params: Record<string, string>;
}

export function parseStudyRoomNavMessage(
  data: unknown
): StudyRoomNavMessage | null {
  if (!data || typeof data !== "object") return null;
  const record = data as Record<string, unknown>;
  if (record.source !== STUDY_ROOM_NAV_MESSAGE) return null;
  const tab = record.tab;
  if (
    tab !== "dashboard" &&
    tab !== "market" &&
    tab !== "sectors" &&
    tab !== "credit"
  ) {
    return null;
  }
  const rawParams = record.params;
  const params: Record<string, string> = {};
  if (rawParams && typeof rawParams === "object") {
    for (const [key, value] of Object.entries(rawParams as Record<string, unknown>)) {
      if (typeof value === "string") params[key] = value;
    }
  }
  return { source: STUDY_ROOM_NAV_MESSAGE, tab, params };
}
