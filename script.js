$(function () {



	var defaultScreen = localStorage.getItem("defaultScreen");
	if (defaultScreen === 'true') {
		$('.wrapp-all').addClass('d-n');
		$('.grfic-interface').removeClass('d-n');
		$(".grfic-interface #default-screen").each(function () {
			$(this).prop("checked", true);
		});
	} else {
		$('.wrapp-all').removeClass('d-n');
		$('.grfic-interface').addClass('d-n');
		$(".grfic-interface #default-screen").each(function () {
			$(this).prop("checked", false);
		});
	}



	inputResult = $("#result");

	//Для удобства
	$('#text').focus(); //При загрузки ставим фокус в "текст"

	$('#text').focus(function () {
		inputResult.val('');
		inputText.val('');
	});

	//Для удобства end

	function getMin(str, num, jpgPng, border, start, end, dataSize1, dataSize2, mTop, mBottom, image80, shadow, myClass, imgClass, addCodeTop, addCodeBottom, arrPass, arrOnly, path) {
		var i = +start || "1";
		var max = Math.max.apply(null, arrOnly);

		if (end) {
			num = end;
		} else if (max) {
			num = max;
		}

		addCodeTop = addCodeTop || "";
		addCodeBottom = addCodeBottom || "";


		mTop = mTop || "2";
		mBottom = mBottom || "2";

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

		shadow ? shadow = 'shadow' : shadow = '';

		jpgPng ? jpgPng = 'png' : jpgPng = 'jpg';
		border ? border = 'frame' : border = '';

		/* function isSome(number) {
			return number === i;
		} */
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
			if (arrOnly[0]) {
				onlyCheck = arrOnly.some(isNegative);
				if (!onlyCheck) {
					continue;
				}
			}

			if (i < 10) {
				i = "0" + i;
			}

			str = str + addCodeTop + startImage80 + '\n<div class="zooming">\n<figure itemprop="associatedMedia" style="margin-top: ' + mTop + 'em; margin-bottom: ' + mBottom + 'em">\n<a href="' + path + i + '.' + jpgPng + '" itemprop="contentUrl" data-size="' + dataSize1 + x + dataSize2 + '">\n<img src="' + path + i + '.' + jpgPng + '" itemprop="thumbnail" class="' + imgClassVal + ' ' + border + ' ' + shadow + '" />\n</a>\n</figure>\n</div>\n' + endImage80 + addCodeBottom;
		}
		return str;
	}









	function getMax(str, num, jpgPng, border, start, end, dataSize1, dataSize2, mTop, mBottom, image80, shadow, myClass, imgClass, addCodeTop, addCodeBottom, arrPass, arrOnly, path) {
		var i = +start || 1;
		var max = Math.max.apply(null, arrOnly);
		if (end) {
			num = end;
		} else if (max) {
			num = max;
		}



		addCodeTop = addCodeTop || "";
		addCodeBottom = addCodeBottom || "";


		mTop = mTop || "2";
		mBottom = mBottom || "1";

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

		shadow ? shadow = 'shadow' : shadow = '';
		jpgPng ? jpgPng = 'png' : jpgPng = 'jpg';
		border ? border = 'frame' : border = '';

		var passCheck;
		var onlyCheck;

		for (i; i <= num; i++) {
			function isPositive(number) {
				return number == i;
			}

			function isNegative(number2) {
				return number2 == i;
			}
			passCheck = arrPass.some(isPositive);
			if (passCheck) {
				continue;
			}
			if (arrOnly[0]) {
				onlyCheck = arrOnly.some(isNegative);
				if (!onlyCheck) {
					continue;
				}
			}

			if (i < 10) {
				i = "0" + i;
			}
			str = str + addCodeTop + startImage80 + '\n<div class="zooming">\n<figure itemprop="associatedMedia" style="margin-top: ' + mTop + 'em; margin-bottom: ' + mBottom + 'em">\n<a href="' + path + i + '.' + jpgPng + '" itemprop="contentUrl" data-size="' + dataSize1 + x + dataSize2 + '">\n<img src="' + path + i + '.' + jpgPng + '" itemprop="thumbnail" class="' + imgClassVal + ' ' + border + ' ' + shadow + '" />\n</a>\n<figcaption itemprop="caption description">\n\n </figcaption>\n</figure>\n</div>\n' + endImage80 + '<figcaption itemprop="caption description">\n\n</figcaption>\n' + addCodeBottom;
		}
		return str;
	}

	$("#btn").on("click", function () {
		var inputNum = $("#text");
		var jpgPng = $("#jpg-png").prop('checked');
		var border = $("#border").prop('checked');
		var shadow = $("#shadow").prop('checked');
		var start = $("#start").val();
		var end = $("#end").val();
		var dataSize1 = $("#dataSize1").val();
		var dataSize2 = $("#dataSize2").val();
		var mTop = $("#mTop").val();
		var mBottom = $("#mBottom").val();
		var myClass = $("#my-class").val();
		var imgClass = $("#img-class").val();
		var pass = $("#pass").val();
		var only = $("#only").val();
		var addCodeTop = $("#addcode-top").val();
		var addCodeBottom = $("#addcode-bottom").val();
		var image80 = $("#image80").prop('checked');
		var path = $("#path").val();


		var str = '';
		var num = +inputNum.val();

		var arrPass = pass.split(' ');
		var arrOnly = only.split(' ');


		if ($('#min-max').prop('checked')) {
			str = getMax(str, num, jpgPng, border, start, end, dataSize1, dataSize2, mTop, mBottom, image80, shadow, myClass, imgClass, addCodeTop, addCodeBottom, arrPass, arrOnly, path);
		} else {
			str = getMin(str, num, jpgPng, border, start, end, dataSize1, dataSize2, mTop, mBottom, image80, shadow, myClass, imgClass, addCodeTop, addCodeBottom, arrPass, arrOnly, path);
		}
		inputResult.val(str);

		//Автоматическое копирование в буфер обменм
		event.preventDefault();
		inputResult.select();
		document.execCommand("copy");
		//Автоматическое копирование в буфер обменм end

	});





	$(".close-gui").on("click", function () {
		$(".wrapp-all").removeClass('d-n');
		$(".grfic-interface").addClass('d-n');
	});

	$("#min-max").change(function () {
		if (this.checked) {
			$("#mBottom").attr("placeholder", "1");
		} else {
			$("#mBottom").attr("placeholder", "2");
		}
	});

	$(".reset").on("click", function () {
		$("#start, #end, #text, #only, #pass").val("");
	});


	$("#gui-btn").on("click", function () {
		$(".wrapp-all").addClass('d-n');
		$(".grfic-interface").removeClass('d-n');
	});



	$("#slider").on("click", function () {
		$(".option__slider .zoom-slider .zoom").css('flex-grow', '1');
		$(".option__slider .zoom-slider .slider").css('flex-grow', '7');

		$(".slider__container").removeClass("d-n");
		$(".common__container").addClass("d-n");

		$("#btn").addClass("d-n");
		$("#btnSlide").removeClass("d-n");
	});

	$("#zoom").on("click", function () {
		$(".option__slider .zoom-slider .zoom").css('flex-grow', '7');
		$(".option__slider .zoom-slider .slider").css('flex-grow', '1');

		$(".slider__container").addClass("d-n");
		$(".common__container").removeClass("d-n");

		$("#btn").removeClass("d-n");
		$("#btnSlide").addClass("d-n");
	});




});