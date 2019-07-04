chrome.runtime.onInstalled.addListener(function () {
	chrome.storage.sync.set({ speed: 4 }, function () { });
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({
				pageUrl: { hostEquals: 'www.bilibili.com', schemes: ['https'] },
				css: ["video"]
			})
			],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
});