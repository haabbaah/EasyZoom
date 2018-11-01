resultGui = $("#result-gui");
var strGui = '';

function getGuiCode() {
	var arrDescr = [];
	$(".description").each(function () {
		var descr = $(this).val();
		arrDescr.push(descr);
	});

	for (var i = 0; i < arrDescr.length; i++) {

		if (arrDescr[i]) {
			maxGui(i, arrDescr[i]);
		} else {
			minGui(i);
		}
	}

	console.log(arrDescr);
}

function minGui(i) {
	var num = ++i;
	if (num < 10) {
		num = '0' + num;
	}
	strGui = strGui + '\n<div class="zooming">\n<figure itemprop="associatedMedia" style="margin-top: 2em; margin-bottom: 2em">\n<a href="' + num + '.jpg" itemprop="contentUrl" data-size="">\n<img src="' + num + '.jpg" itemprop="thumbnail" class="" />\n</a>\n</figure>\n</div>\n';
}

function maxGui(i, description) {
	var num = ++i;
	if (num < 10) {
		num = '0' + num;
	}
	strGui = strGui + '\n<div class="zooming">\n<figure itemprop="associatedMedia" style="margin-top: 2em; margin-bottom: 1em">\n<a href="' + num + '.jpg" itemprop="contentUrl" data-size="">\n<img src="' + num + '.jpg" itemprop="thumbnail" class="" />\n</a>\n<figcaption itemprop="caption description">\n' + description + '\n</figcaption>\n</figure>\n</div>\n<figcaption itemprop="caption description">\n' + description + '\n</figcaption>\n';
}


$("#btn-gui").on("click", function () {
	resultGui.val('');
	getGuiCode();
	resultGui.val(strGui);

	//Автоматическое копирование в буфер обменм
	event.preventDefault();
	resultGui.select();
	document.execCommand("copy");
	//Автоматическое копирование в буфер обменм end

});