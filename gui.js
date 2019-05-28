function handleFileSelect(evt) {


	let files = evt.target.files; // FileList object

	// Loop through the FileList and render image files as thumbnails.
	for (let i = 0, f; f = files[i]; i++) {

		// Only process image files.
		if (!f.type.match('image.*')) {
			continue;
		}

		let reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function (theFile) {
			return function (e) {
				// Render thumbnail.
				let div = document.createElement('div');
				div.classList.add('dad-block');
				div.dataset.indexNumber = getNumFromText(escape(theFile.name));
				div.innerHTML = ['<div class="wrap-img-btn">\n<div>\n <img class="thumb" src="', e.target.result,
					'" title="', escape(theFile.name), '"/> \n </div>\n<button class="gui-btn-option" ><i class="demo-icon icon-cog">&#xe802;</i></button>\n</div> \n <strong>', escape(theFile.name),
					'</strong> \n <textarea class="description"></textarea> \n <div class="wrapper-element"><div class="option-item"><div class="item"><h4>Без рамки</h4><input type="checkbox" id="gui-frame"><h4>С рамкой</h4></div><div class="item input"><h4>Класс для img</h4><input type="text" id="gui-my-img-class" placeholder=""></div><div class="item input"><h4>Обернуть в свой класс</h4><input type="text" id="gui-my-class" placeholder=""></div><div class="item input"><h4>Отступ сверху</h4><input type="text" id="gui-mTop" placeholder=""> <span>em</span></div><div class="item input"><h4>Отступ снизу</h4><input type="text" id="gui-mBottom" placeholder=""> <span>em</span></div><div class="item input"><h4>Путь до img</h4><input type="text" id="gui-path" placeholder="../shares/img"></div></div></div>'
				].join('');
				document.getElementById('list').insertBefore(div, null);
			};
		})(f);

		// Read in the image file as a data URL.
		reader.readAsDataURL(f);
	}

	setTimeout(() => {
		sort();
	}, 100);



}


function getNumFromText(text) {
	text = +text.split('.')[0];
	return text;
}


function sort() {
	let items = $('#list .dad-block');
	let arItems = $.makeArray(items);
	arItems.sort(function (a, b) {
		return $(a).data("index-number") - $(b).data("index-number");
	});
	$(arItems).appendTo("#list");
}




document.getElementById('files').addEventListener('change', handleFileSelect, false);










let resultGui = $("#result-gui");
let strGui = '';

let guiSlider = false;


let guiOption = {};

function getGuiCode() {
	$(".grfic-interface .wrapper-element").each(function () {
		descr = $(this).prev(".description").val();

		guiOption.name = $(this).parent().find('strong').text();
		guiOption.gFrame = $(this).find('#gui-frame').prop('checked');
		guiOption.gDataSize1 = $(this).find('#gui-dataSize1').val();
		guiOption.gDataSize2 = $(this).find('#gui-dataSize2').val();
		guiOption.gMyImgClass = $(this).find('#gui-my-img-class').val();
		guiOption.gMyClass = $(this).find('#gui-my-class').val();
		guiOption.gMTop = $(this).find('#gui-mTop').val();
		guiOption.gMBottom = $(this).find('#gui-mBottom').val();
		guiOption.gPath = $(this).find('#gui-path').val();

		if (guiSlider) {
			sliderGui(guiOption, descr);
		} else {
			if (descr) {
				maxGui(guiOption, descr);
			} else {
				minGui(guiOption);
			}
		}
	});

	if (guiSlider) {
		guiOption.gMTop = guiOption.gMTop || "2";
		guiOption.gMBottom = guiOption.gMBottom || "2";
		strGui = '\n<div class="zooming sliding_gallery" itemscope style="margin:auto; margin-top: ' + guiOption.gMTop + 'em; margin-bottom: ' + guiOption.gMBottom + 'em;">\n' + strGui + '\n</div>\n';
	}
}



function minGui(guiOption) {
	let opt = checkOption(guiOption);

	opt.gMTop = opt.gMTop || "2";
	opt.gMBottom = opt.gMBottom || "2";
	strGui = strGui + opt.gMyClassStart + '\n<div class="zooming">\n<figure itemprop="associatedMedia" style="margin-top: ' + opt.gMTop + 'em; margin-bottom: ' + opt.gMBottom + 'em">\n<a href="' + opt.gPath + opt.name + '" itemprop="contentUrl" data-size="">\n<img src="' + opt.gPath + opt.name + '" itemprop="thumbnail" class="' + opt.gFrame + ' ' + opt.gMyImgClass + '" />\n</a>\n</figure>\n</div>\n' + opt.gMyClassEnd;
}

function maxGui(guiOption, description) {
	let opt = checkOption(guiOption);
	opt.gMTop = opt.gMTop || "2";
	opt.gMBottom = opt.gMBottom || "1";
	strGui = strGui + opt.gMyClassStart + '\n<div class="zooming">\n<figure itemprop="associatedMedia" style="margin-top: ' + opt.gMTop + 'em; margin-bottom: ' + opt.gMBottom + 'em">\n<a href="' + opt.gPath + opt.name + '" itemprop="contentUrl" data-size="">\n<img src="' + opt.gPath + opt.name + '" itemprop="thumbnail" class="' + opt.gFrame + ' ' + opt.gMyImgClass + '" />\n</a>\n<figcaption itemprop="caption description">\n' + description + '\n</figcaption>\n</figure>\n</div>\n' + opt.gMyClassEnd + '<figcaption itemprop="caption description">\n' + description + '\n</figcaption>\n';
}

function sliderGui(guiOption, description) {
	let opt = checkOption(guiOption);
	strGui = strGui + '\n<figure itemprop="associatedMedia">\n<a href="' + opt.gPath + opt.name + '" itemprop="contentUrl" data-size="">\n<img src="' + opt.gPath + opt.name + '" itemprop="thumbnail" class="item ' + opt.gMyImgClass + '" />\n</a>\n<figcaption itemprop="caption description">\n' + description + '\n</figcaption>\n<pswp__caption__center itemprop="caption description">\n<div class="caption_padding">\n' + description + '\n</div>\n</pswp__caption__center>\n</figure>\n';
}




function checkOption(guiOption) {
	guiOption.gFrame ? guiOption.gFrame = 'frame' : guiOption.gFrame = '';

	if (!guiOption.gMyImgClass) {
		guiOption.gMyImgClass = '';
	}


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
	strGui = '';
	resultGui.val('');
	getGuiCode();
	resultGui.val(strGui);

	//Автоматическое копирование в буфер обменм
	event.preventDefault();
	resultGui.select();
	document.execCommand("copy");
	//Автоматическое копирование в буфер обменм end

});


$(".grfic-interface").on("click", '.dad-block .gui-btn-option', function (e) {
	$(this).parent().siblings(".wrapper-element").fadeToggle("fast");
});



$("#gui-comm-frame").on("input", function (e) {
	if ($(this).prop('checked')) {
		$(".grfic-interface .wrapper-element #gui-frame").each(function () {
			$(this).prop("checked", true);
		});
	} else {
		$(".grfic-interface .wrapper-element #gui-frame").each(function () {
			$(this).prop("checked", false);
		});
	}
});


$("#gui-comm-img-class").on("input", function (e) {
	let c = $(this).val();
	$(".grfic-interface .wrapper-element #gui-my-img-class").each(function () {
		$(this).val(c);
	});
});

$("#gui-comm-my-class").on("input", function (e) {
	let c = $(this).val();
	$(".grfic-interface .wrapper-element #gui-my-class").each(function () {
		$(this).val(c);
	});
});

$("#gui-comm-mTop").on("input", function (e) {
	let c = $(this).val();
	$(".grfic-interface .wrapper-element #gui-mTop").each(function () {
		$(this).val(c);
	});
});

$("#gui-comm-mBottom").on("input", function (e) {
	let c = $(this).val();
	$(".grfic-interface .wrapper-element #gui-mBottom").each(function () {
		$(this).val(c);
	});
});

$("#gui-comm-path").on("input", function (e) {
	let c = $(this).val();
	$(".grfic-interface .wrapper-element #gui-path").each(function () {
		$(this).val(c);
	});
});





$("#default-screen").on("input", function (e) {
	if ($(this).prop('checked')) {
		localStorage.setItem("defaultScreen", true);
	} else {
		localStorage.setItem("defaultScreen", false);
	}
});






function choiceItems(event) {
	if (event.ctrlKey) {
		let bkg = document.querySelector('.choiceBkg');
		bkg.classList.toggle('d-n');
	}
}








document.getElementById('sort').addEventListener('click', sort, false);

document.querySelector('.gui-slider').addEventListener('click', function () {
	this.classList.toggle('green-btn');
	guiSlider = !guiSlider;
}, false);


document.addEventListener('keydown', choiceItems, false);