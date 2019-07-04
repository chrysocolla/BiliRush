window.onload = function () {
	modes = [0.125, 0.25, 0.5, 0.75, 1, 1.5, 2, 4, 6, 8]

	chrome.storage.sync.get('speed', function (data) {
		document.getElementById("speedpicker").value = data.speed;
		document.getElementById("resetbutton").value = modes[data.speed].toFixed(2);
	});

	document.getElementById("speedpicker").onchange = function () { update(document.getElementById("speedpicker").value); };

	document.getElementById("resetbutton").onclick = function () {
		document.getElementById("speedpicker").value = 4;
		update(4);
	};

	function update(speed) {
		chrome.storage.sync.set({ speed: speed }, function () {
			document.getElementById("resetbutton").value = modes[speed].toFixed(2);
		});
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			console.log("Wryyyyyyyyyyyy!");
			chrome.tabs.executeScript(
				tabs[0].id,
				{
					code: 'Array.prototype.slice.call(document.getElementsByTagName("video")).forEach(function(element){ element.playbackRate = ' + modes[speed] + ';});'
				});
		});
	}
}