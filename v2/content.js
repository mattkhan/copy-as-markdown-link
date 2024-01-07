if (typeof browser === "undefined") {
  var browser = chrome;
}

const escapeChars = (specialChars) => (input) => {
  specialChars = new Set(specialChars);

  return input
    .split("")
    .map((char) => (specialChars.has(char) ? "\\" : "") + char)
    .join("");
};

const escapeText = escapeChars("_*[]<>\\");
const escapeUrl = escapeChars("()\\");

browser.runtime.onMessage.addListener(async function (request) {
  if (request.action !== "copyMarkdownLink") return;

  const selection = window
    .getSelection()
    .toString()
    .trim()
    .replace(/[\r\n\x0B\x0C\u0085\u2028\u2029]+/g, " ");
  const url = window.location.href;

  const link = `[${escapeText(selection)}](${escapeUrl(url)})`;
  await navigator.clipboard.writeText(link);
});
