if (typeof browser === "undefined") {
  var browser = chrome;
}

browser.commands.onCommand.addListener(async function (command) {
  if (command !== "copyMarkdownLink") return;

  const [tab] = await browser.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  tab && browser.tabs.sendMessage(tab.id, { action: "copyMarkdownLink" });
});
