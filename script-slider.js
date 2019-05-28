$(function () {
	inputResult = $("#result");


	function getSlider(str, num, jpgPng, objClass, start, end, dataSize1, dataSize2, mTop, mBottom, image80, myClass, imgClass, addCodeTop, addCodeBottom, arrPass, arrOnly, path) {


		var i = +start || 1;
		var max = Math.max.apply(null, arrOnly);
		if (end) {
			num = end;
		} else if (max) {
			num = max;
		}


		mTop = mTop || "2";
		mBottom = mBottom || "2";

		addCodeTop = addCodeTop || "";
		addCodeBottom = addCodeBottom || "";

		var x;
		if (dataSize1) {
			x = "x";
		} else {
			x = "";
		}


		var startImage80, endImage80;
		if (image80) {
			startImage80 = '\n<div class="image80">';
			endImage80 = '</div>\n';
		} else {
			startImage80 = '';
			endImage80 = '';
		}
		if (myClass) {
			startImage80 = '\n<div class="' + myClass + '">';
			endImage80 = '</div>\n';
		}


		let imgClassVal = '';
		if (imgClass) {
			imgClassVal = imgClass;
		}

		jpgPng ? jpgPng = 'png' : jpgPng = 'jpg';

		objClass ? objClass = 'obj' : objClass = '';

		var passCheck;
		var onlyCheck;

		for (i; i <= num; i++) {
			function isPositive(number) {
				return number == i; //Проверяем массив на совпадение
			}

			function isNegative(number2) {
				return number2 == i; //Проверяем массив на совпадение
			}
			passCheck = arrPass.some(isPositive);
			if (passCheck) {
				continue;
			}
			if (arrOnly[1]) {
				onlyCheck = arrOnly.some(isNegative);
				if (!onlyCheck) {
					continue;
				}
			}

			if (i < 10) {
				i = "0" + i;
			}
			str = str + '\n<figure itemprop="associatedMedia">\n<a href="' + path + i + '.' + jpgPng + '" itemprop="contentUrl" data-size="' + dataSize1 + x + dataSize2 + '">\n<img src="' + path + i + '.' + jpgPng + '" itemprop="thumbnail" class="item ' + imgClassVal + ' ' + objClass + '" />\n</a>\n<figcaption itemprop="caption description">\n \n</figcaption>\n<pswp__caption__center itemprop="caption description">\n<div class="caption_padding">\n \n</div>\n</pswp__caption__center>\n</figure>\n';
		}

		return addCodeTop + startImage80 + '\n<div class="zooming sliding_gallery" itemscope style="margin:auto; margin-top: ' + mTop + 'em; margin-bottom: ' + mBottom + 'em;">\n' + str + '\n</div>\n' + endImage80 + addCodeBottom;
	}


	$("#btnSlide").on("click", function () {
		var inputNum = $("#text");
		var jpgPng = $("#jpg-png-slider").prop('checked');
		var start = $("#start").val();
		var end = $("#end").val();
		var dataSize1 = $("#dataSize1-slider").val();
		var dataSize2 = $("#dataSize2-slider").val();
		var mTop = $("#mTop-slider").val();
		var mBottom = $("#mBottom-slider").val();
		var myClass = $("#my-class-slider").val();
		var imgClass = $("#img-class-slider").val();
		var objClass = $("#obj-slider").prop('checked');
		var addCodeTop = $("#addcode-top-slider").val();
		var addCodeBottom = $("#addcode-bottom-slider").val();
		var pass = $("#pass").val();
		var only = $("#only").val();
		var image80 = $("#image80-slider").prop('checked');
		var path = $("#path-slider").val();

		var num = +inputNum.val();
		var arrPass = pass.split(' ');
		var arrOnly = only.split(' ');

		var str = '';
		str = getSlider(str, num, jpgPng, objClass, start, end, dataSize1, dataSize2, mTop, mBottom, image80, myClass, imgClass, addCodeTop, addCodeBottom, arrPass, arrOnly, path);
		inputResult.val(str);

		//Автоматическое копирование в буфер обменм
		event.preventDefault();
		inputResult.select();
		document.execCommand("copy");
		//Автоматическое копирование в буфер обменм end

		//console.log(jpgPng); .replace(/ /g, '')
	})

});