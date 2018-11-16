resultGui = $("#result-gui");
var strGui = '';

//var gFormat, gFrame, gShadow, gDataSize1, gDataSize2, gMyClass, gMTop, gMBottom, descr;


var guiOption = {};

function getGuiCode() {
	$(".gui-item .wrapper-element").each(function () {
		descr = $(this).next(".description").val();

		guiOption.gNumber = $(this).find('#gui-num').val();
		guiOption.gFormat = $(this).find('#gui-format').prop('checked');
		guiOption.gFrame = $(this).find('#gui-frame').prop('checked');
		guiOption.gShadow = $(this).find('#gui-shadow').prop('checked');
		guiOption.gDataSize1 = $(this).find('#gui-dataSize1').val();
		guiOption.gDataSize2 = $(this).find('#gui-dataSize2').val();
		guiOption.gMyClass = $(this).find('#gui-my-class').val();
		guiOption.gMTop = $(this).find('#gui-mTop').val();
		guiOption.gMBottom = $(this).find('#gui-mBottom').val();
		if (descr) {
			maxGui(guiOption, descr);
		} else {
			minGui(guiOption);
		}
	});
}

function minGui(guiOption) {
	var opt = checkOption(guiOption);
	opt.gMTop = opt.gMTop || "2";
	opt.gMBottom = opt.gMBottom || "2";
	strGui = strGui + opt.gMyClassStart + '\n<div class="zooming">\n<figure itemprop="associatedMedia" style="margin-top: ' + opt.gMTop + 'em; margin-bottom: ' + opt.gMBottom + 'em">\n<a href="' + opt.gnum + opt.gFormat + '" itemprop="contentUrl" data-size="' + opt.gdatasize + '">\n<img src="' + opt.gnum + opt.gFormat + '" itemprop="thumbnail" class="' + opt.gFrame + ' ' + opt.gShadow + '" />\n</a>\n</figure>\n</div>\n' + opt.gMyClassEnd;
}

function maxGui(guiOption, description) {
	var opt = checkOption(guiOption);
	opt.gMTop = opt.gMTop || "2";
	opt.gMBottom = opt.gMBottom || "1";
	strGui = strGui + opt.gMyClassStart + '\n<div class="zooming">\n<figure itemprop="associatedMedia" style="margin-top: ' + opt.gMTop + 'em; margin-bottom: ' + opt.gMBottom + 'em">\n<a href="' + opt.gnum + opt.gFormat + '" itemprop="contentUrl" data-size="' + opt.gdatasize + '">\n<img src="' + opt.gnum + opt.gFormat + '" itemprop="thumbnail" class="' + opt.gFrame + ' ' + opt.gShadow + '" />\n</a>\n<figcaption itemprop="caption description">\n' + description + '\n</figcaption>\n</figure>\n</div>\n' + opt.gMyClassEnd + '<figcaption itemprop="caption description">\n' + description + '\n</figcaption>\n';
}

function checkOption(guiOption) {
	var num = guiOption.gNumber;

	if (num < 10) {
		num = '0' + num;
	}
	guiOption.gnum = num;

	guiOption.gFormat ? guiOption.gFormat = '.png' : guiOption.gFormat = '.jpg';
	guiOption.gFrame ? guiOption.gFrame = 'frame' : guiOption.gFrame = '';
	guiOption.gShadow ? guiOption.gShadow = 'shadow' : guiOption.gShadow = '';

	var datasize;
	if (guiOption.gDataSize1) {
		datasize = guiOption.gDataSize1 + "x" + guiOption.gDataSize2;
	} else {
		datasize = "";
	}
	guiOption.gdatasize = datasize;

	if (guiOption.gMyClass) {
		guiOption.gMyClassStart = '\n<div class="' + guiOption.gMyClass + '">';
		guiOption.gMyClassEnd = '</div>\n';
	} else {
		guiOption.gMyClassStart = '';
		guiOption.gMyClassEnd = '';
	}


	return guiOption;
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


$(".gui-item").on("click", '.wrapper-element .gui-btn-option', function (e) {
	$(this).prev('.option-item').fadeToggle("fast");
});

$(".gui-item").on("focus", '.wrapper-element #gui-num', function (e) {
	$(this).val('');
});


$("#gui-comm-start").on("input", function (e) {
	var start = $(this).val();
	$(".gui-item .wrapper-element #gui-num").each(function () {
		$(this).val(start++);
	});
});

$("#gui-comm-format").on("input", function (e) {
	if ($(this).prop('checked')) {
		$(".gui-item .wrapper-element #gui-format").each(function () {
			$(this).attr("checked", "checked");
		});
	} else {
	$(".gui-item .wrapper-element #gui-format").each(function () {
		$(this).removeAttr("checked");
	});
	}
});

$("#gui-comm-frame").on("input", function (e) {
	if ($(this).prop('checked')) {
		$(".gui-item .wrapper-element #gui-frame").each(function () {
			$(this).attr("checked", "checked");
		});
	} else {
	$(".gui-item .wrapper-element #gui-frame").each(function () {
		$(this).removeAttr("checked");
	});
	}
});

$("#gui-comm-shadow").on("input", function (e) {
	if ($(this).prop('checked')) {
		$(".gui-item .wrapper-element #gui-shadow").each(function () {
			$(this).attr("checked", "checked");
		});
	} else {
	$(".gui-item .wrapper-element #gui-shadow").each(function () {
		$(this).removeAttr("checked");
	});
	}
});

$("#gui-comm-dataSize1").on("input", function (e) {
	var d = $(this).val();
	$(".gui-item .wrapper-element #gui-dataSize1").each(function () {
		$(this).val(d);
	});
});

$("#gui-comm-dataSize2").on("input", function (e) {
	var d = $(this).val();
	$(".gui-item .wrapper-element #gui-dataSize2").each(function () {
		$(this).val(d);
	});
});

$("#gui-comm-my-class").on("input", function (e) {
	var c = $(this).val();
	$(".gui-item .wrapper-element #gui-my-class").each(function () {
		$(this).val(c);
	});
});

$("#gui-comm-mTop").on("input", function (e) {
	var c = $(this).val();
	$(".gui-item .wrapper-element #gui-mTop").each(function () {
		$(this).val(c);
	});
});

$("#gui-comm-mBottom").on("input", function (e) {
	var c = $(this).val();
	$(".gui-item .wrapper-element #gui-mBottom").each(function () {
		$(this).val(c);
	});
});