var $ = jQuery.noConflict();

$(document).ready(function () {
	// В dataTransfer помещаются изображения которые перетащили в область div
	jQuery.event.props.push('dataTransfer');

	// Максимальное количество загружаемых изображений за одни раз
	var maxFiles = 100;

	// Оповещение по умолчанию
	var errMessage = 0;

	// Кнопка выбора файлов
	var defaultUploadBtn = $('#uploadbtn');

	// Массив для всех изображений
	var dataArray = [];

	// Область информер о загруженных изображениях - скрыта
	$('#uploaded-files').hide();

	// Метод при падении файла в зону загрузки
	$('#drop-files').on('drop', function (e) {
		// Передаем в files все полученные изображения
		var files = e.dataTransfer.files;
		// Проверяем на максимальное количество файлов
		if (files.length <= maxFiles) {
			// Передаем массив с файлами в функцию загрузки на предпросмотр
			loadInView(files);
		} else {
			alert('Вы не можете загружать больше ' + maxFiles + ' изображений!');
			files.length = 0;
			return;
		}
	});

	// При нажатии на кнопку выбора файлов
	defaultUploadBtn.on('change', function () {
		// Заполняем массив выбранными изображениями
		var files = $(this)[0].files;
		// Проверяем на максимальное количество файлов
		if (files.length <= maxFiles) {
			// Передаем массив с файлами в функцию загрузки на предпросмотр
			loadInView(files);
			// Очищаем инпут файл путем сброса формы
			$('#frm').each(function () {
				this.reset();
			});
		} else {
			alert('Вы не можете загружать больше ' + maxFiles + ' изображений!');
			files.length = 0;
		}
	});

	// Функция загрузки изображений на предросмотр
	function loadInView(files) {
		// Показываем обасть предпросмотра
		$('#uploaded-holder').show();

		// Для каждого файла
		$.each(files, function (index, file) {

			// Несколько оповещений при попытке загрузить не изображение
			if (!files[index].type.match('image.*')) {

				if (errMessage == 0) {
					$('#drop-files p').html('Эй! только изображения!');
					++errMessage
				} else if (errMessage == 1) {
					$('#drop-files p').html('Стоп! Загружаются только изображения!');
					++errMessage
				} else if (errMessage == 2) {
					$('#drop-files p').html("Не умеешь читать? Только изображения!");
					++errMessage
				} else if (errMessage == 3) {
					$('#drop-files p').html("Хорошо! Продолжай в том же духе");
					errMessage = 0;
				}
				return false;
			}

			// Проверяем количество загружаемых элементов
			if ((dataArray.length + files.length) <= maxFiles) {
				// показываем область с кнопками
				$('#upload-button').css({
					'display': 'block'
				});
			} else {
				alert('Вы не можете загружать больше ' + maxFiles + ' изображений!');
				return;
			}

			// Создаем новый экземпляра FileReader
			var fileReader = new FileReader();
			// Инициируем функцию FileReader
			fileReader.onload = (function (file) {

				return function (e) {
					// Помещаем URI изображения в массив
					dataArray.push({
						name: file.name,
						value: this.result
					});
					addImage((dataArray.length - 1));
				};

			})(files[index]);
			// Производим чтение картинки по URI
			fileReader.readAsDataURL(file);
		});
		return false;
	}

	// Процедура добавления эскизов на страницу
	function addImage(ind) {
		// Если индекс отрицательный значит выводим весь массив изображений
		if (ind < 0) {
			start = 0;
			end = dataArray.length;
		} else {
			// иначе только определенное изображение 
			start = ind;
			end = ind + 1;
		}
		// Оповещения о загруженных файлах
		if (dataArray.length == 0) {
			// Если пустой массив скрываем кнопки и всю область
			$('#upload-button').hide();
			$('#uploaded-holder').hide();
		} else if (dataArray.length == 1) {
			$('#upload-button span').html("Был выбран 1 файл");
		} else {
			$('#upload-button span').html(dataArray.length + " файлов были выбраны");
		}
		// Цикл для каждого элемента массива
		var numPlaseholder;
		for (i = start; i < end; i++) {
			// размещаем загруженные изображения
			numPlaseholder = i;
			if ($('#dropped-files > .image').length <= maxFiles) {
				$('#dropped-files').append('<div class="wrapper-element" data-element="' + i + '"> <div id="img-' + i + '" class="image" style="background: url(' + dataArray[i].value + '); background-size: cover;"> <a href="#" id="drop-' + i + '" class="drop-button">Удалить изображение</a></div><div class="option-item"><div class="item input"><h4>№</h4><input type="text" id="gui-num" value="' + ++numPlaseholder + '"></div><div class="item"><h4>JPG</h4><input type="checkbox" id="gui-format"><h4>PNG</h4></div><div class="item"><h4>Без рамки</h4><input type="checkbox" id="gui-frame"><h4>С рамкой</h4></div><div class="item"><h4>Без тени</h4><input type="checkbox" id="gui-shadow"><h4>С тенью</h4></div><div class="item input"><h4>Data-size</h4><input type="text" id="gui-dataSize1" placeholder=""> ×<input type="text" id="gui-dataSize2" placeholder=""></div><div class="item input"><h4>Обернуть в свой класс</h4><input type="text" id="gui-my-class" placeholder=""></div><div class="item input"><h4>Отступ сверху</h4><input type="text" id="gui-mTop" placeholder="2"> <span>em</span></div><div class="item input"><h4>Отступ снизу</h4><input type="text" id="gui-mBottom" placeholder="2"> <span>em</span></div></div><button class="gui-btn-option" data-btn-option="' + i + '"><i class="demo-icon icon-cog">&#xe802;</i></button></div><textarea data-text="' + i + '" class="description" cols="30" rows="3"></textarea>');
			}
		}
		return false;
	}

	// Удаление только выбранного изображения 
	$("#dropped-files").on("click", "a[id^='drop']", function () {
		// получаем название id
		var elid = $(this).attr('id');
		// создаем массив для разделенных строк
		var temp = new Array();
		// делим строку id на 2 части
		temp = elid.split('-');
		// получаем значение после тире тоесть индекс изображения в массиве
		dataArray.splice(temp[1], 1);
		// Удаляем старые эскизы
		$('#dropped-files > .image').remove();
		// Обновляем эскизи в соответсвии с обновленным массивом
		addImage(-1);
	});


	// Простые стили для области перетаскивания
	$('#drop-files').on('dragenter', function () {
		$(this).css({
			'box-shadow': 'inset 0px 0px 20px rgba(0, 0, 0, 0.1)',
			'border': '4px dashed #bb2b2b'
		});
		return false;
	});

	$('#drop-files').on('drop', function () {
		$(this).css({
			'box-shadow': 'none',
			'border': '4px dashed rgba(0,0,0,0.2)'
		});
		return false;
	});
});