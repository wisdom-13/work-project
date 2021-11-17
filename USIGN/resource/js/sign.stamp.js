/********* Stamp 선택 *********/ 

$(function() {

	// 탭 이동
	$(".sign_tab [data-toggle=tab]").on("click", function () {
		var href = $(this).attr("href");
		$(".sign_add").data("type", href);
		$(".sign_add").attr("onclick", "sign_add('"+href+"')")

		var tab_disabled = (href == "#sign-upload" && !$(".cr-image").attr("src"));
		$(".sign_add").attr("disabled", tab_disabled); // 업로드일 경우 버튼 비활성화
	});

	// 이름 입력
	$(".sign_text_btn").on("click", function(){

		console.log('a');
		var type = $(this).data("type");
		var text = $(type+" [name=sign_text]").val();

		if (text == "") {
			alert("서명을 진행할 이름을 입력해주세요.");
		} else {
			$(type+" .text-wrap").text(text);
		}

		var length = getTextLength(text);
		
		if (length > 10) {
			$(".sign-wrap").switchClass("col-md-6", "col-md-12");
		} else {
			$(".sign-wrap").switchClass("col-md-12", "col-md-6");
		}
	})

	// 사인만들기 - 선택
	$(".sign-wrap").on("click",  function(e) {
		$(".sign-wrap").removeClass("active");
		$(this).addClass("active");
	});
});



/********* 사인 그리기 *********/ 

$(function() {

	// 캔버스 그리기
	var canvas = $(".sigPad canvas")[0];
	var signaturePad = new SignaturePad(canvas, {
		minWidth: 2.5,
		maxWidth: 4,
	});

	$(".sign_reset").on("click", function(){
		signaturePad.clear();
	});

});



// 서명 추가 
function sign_add(type) {

	var canvas = $(".sigPad canvas")[0];

	
	// 그리기
	if (type == "#sign-draw") {
		var blank = isCanvasBlank(canvas);
		if (blank) {
			alert("서명을 그려주세요.");
			return false;
		}

		var tc = trimCanvas(canvas); // 여백제거 
		var sign = tc.toDataURL();

		stamp_image(sign);

	// 텍스트 
	} else if (type == "#sign-font") {
		
		$(".sign-stemp").css("padding-top", "0");

		var nowScroll = $(document).scrollTop();

		$(document).scrollTop(0);

		var obj = $(".sign-wrap.active .sign-ex")[0];
		console.log(obj);
		html2canvas(obj, {
			backgroundColor: null,
		}).then(function(canvas) {
			
			document.body.appendChild(canvas); // ToDo: 어떤 의미인지 확인
			canvas = trimCanvas(canvas); // 여백제거 
			var sign = canvas.toDataURL();
			
			stamp_image(sign);

			$(".sign-stemp").css("padding-top", "6px");

			$(document).scrollTop(nowScroll);

			
		});

	}
}

function stamp_image(sign)
{
	$("#draggable_stamp button, .none_sign").hide();
	$("#draggable_stamp .dropdown-menu button").show();

	$("#draggable_stamp").removeClass("bg-box");
	$("#draggable_stamp").addClass("draggable_box");

	$("#draggable_stamp .stamp_title").addClass("text_board_name");


	// 사이즈 조절
	$('#draggable_stamp img').attr("src", sign).on("load", function(e) {
		$(this).css("display", "block");
		var maxWidth = ($(this).height() > 30) ? "160px" : "initial";
		$("#draggable_stamp").css({"max-width" : maxWidth});

		if ($(".document").height() < $(this).height()) {
			$("#draggable_stamp, #draggable_stamp img").css({"max-height" : $(".document").height() - 23});
		}

		$("#draggable_stamp").popover('show');
	});


	// 페이지 고정
	var now_page = $("[name=now_page]").val();

	$("#draggable_stamp").data("page", now_page);
	$("[name=signPage]").val(now_page);

	$(".stemp_page .now_page").switchClass("now_page", "now_page_sign");
	$(".now_page_sign").text(now_page);

	sign_pos();

  
	$('#stampModal').modal("hide");


	$(".add_sign").fadeIn(300);
	$(".add_sign").addClass("visible_box");
	$(".none_sign").removeClass("visible_box");
	$(".add_sign img").attr("src", sign);


	$(".complete_btn").attr("disabled", false);
	$(".complete_btn").switchClass("btn-info", "btn-blue");
	$(".complete_btn").popover("show");


	$("#draggable_stamp").resizable({
		containment: "parent",
		maxHeight: 300,
		maxWidth: 500,
		minHeight: 10,
		minWidth: 10,
		//aspectRatio: 1 / 1,
		resize: function() {
			$("#draggable_stamp").css("max-width", "initial");
			stamp_offset();
		},
	});

}



// 이미지 업로드 / 편집 
function demoUpload() {                                        
  var $uploadCrop;
  
  function readFile(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.onload = function (e) {
        $('.upload-demo').addClass('ready');
        $uploadCrop.croppie('bind', {
          url: e.target.result

        }).then(function(){
		  $(".sign_image_text").html("화면을 스크롤하여 이미지를 확대 / 축소 할 수 있습니다. <br>문서에 삽입할 도장 영역을 지정해주세요.");
		  $(".sign_add").attr("disabled", false);
        });
        
      }
      
      reader.readAsDataURL(input.files[0]);
    }
    else {
      alert("Sorry - you're browser doesn't support the FileReader API");
    }
  }
  
  $uploadCrop = $('#upload-demo').croppie({
    viewport: { width: 100, height: 100 },
    enableExif: true,
		showZoomer: false,
		enableResize: true,
  });
 
  $('#sign_file_upload').on('change', function () { readFile(this); });

  $(".sign_add").on('click', function (ev) {
	if ($(this).data("type") == "#sign-upload")	{
		$uploadCrop.croppie('result', {
			type: 'canvas',
			size: 'viewport'
		}).then(function (resp) {
			uploadImage(resp, "stamp"); 
		});
	}
  });
}

// canvas 여백 제거 
var trimCanvas = (function() {
  function rowBlank(imageData, width, y) {
    for (var x = 0; x < width; ++x) {
      if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false;
    }
    return true;
  }
  
  function columnBlank(imageData, width, x, top, bottom) {
    for (var y = top; y < bottom; ++y) {
      if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false;
    }
    return true;
  }
  
  return function(canvas)
  {
    var ctx = canvas.getContext("2d");
	var width = canvas.width;
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    var top = 0, bottom = imageData.height, left = 0, right = imageData.width;

    while (top < bottom && rowBlank(imageData, width, top)) ++top;
    while (bottom - 1 > top && rowBlank(imageData, width, bottom - 1)) --bottom;
    while (left < right && columnBlank(imageData, width, left, top, bottom)) ++left;
    while (right - 1 > left && columnBlank(imageData, width, right - 1, top, bottom)) --right;


    var trimmed = ctx.getImageData(left, top, right - left, bottom - top);
    var copy = canvas.ownerDocument.createElement("canvas");
    var copyCtx = copy.getContext("2d");
    copy.width = trimmed.width;
    copy.height = trimmed.height;
    copyCtx.putImageData(trimmed, 0, 0);
    
    return copy;
  };
})();


// 캔버스 빈 값 체크
function isCanvasBlank(canvas) {
  const blank = document.createElement('canvas');

  blank.width = canvas.width;
  blank.height = canvas.height;

  return canvas.toDataURL() === blank.toDataURL();
}





// 서명 옵션 (보이는 서명 / 보이지 않는 서명) 변경
function change_sign_type_option(signTypeOption)
{
	if (signTypeOption == "Invisible") {

		$(".invisible_box").show();
		$(".visible_box").hide();

		$("[name=signType]").val("Invisible");
		$("[name=signOption]").val("");
		$("[name=stampType]").val("");

		$("#draggable_stamp").popover("dispose");

		$(".complete_btn").attr("disabled", false);
		$(".complete_btn").switchClass("btn-info", "btn-blue");
		$(".complete_btn").popover("show");

	} else if (signTypeOption == "Visible") {

		$(".invisible_box").hide();
		$(".visible_box").show();

		$("[name=signType]").val("Visible");
		$("[name=signOption]").val("Stamp");
		$("[name=stampType]").val("Local");

		if ($("#draggable_stamp img").attr("src") == "") {
			$(".complete_btn").attr("disabled", true);
			$(".complete_btn").switchClass("btn-blue", "btn-info");
			$(".complete_btn").popover("hide");
		}
	}
}


// 사인 위치 로딩
function sign_pos()
{
	var now_page = $("[name=now_page]").val();
	var stamp_page = $("#draggable_stamp").data("page");

	if (stamp_page > 0) {
		if (stamp_page == now_page) {
			$("#draggable_stamp").show();
		} else {
			$("#draggable_stamp").hide();
			$("#draggable_stamp").popover("dispose");
		}
	}

	// 텍스트 
	$(".draggable_text").each(function(index, item){
		var text_page = $(this).find(".text_page").val();
		
		if (text_page > 0) {
			if (text_page == now_page) {
				$(this).show();
			} else {
				$(this).hide();
			}
		}
	});
}





// 서명 좌표 값 계산
function stamp_offset()
{
  var stamp_box = $("#draggable_stamp");

  var stampX = (stamp_box.position().left >= 0) ? stamp_box.position().left : 0;
  var stampY = (stamp_box.position().top >= 0) ? stamp_box.position().top : 0;
  var stampW = stamp_box.width();
  var stampH = stamp_box.height();

  var scale = $("[name=scale]").val();

  $("[name=stampX]").val((stampX/scale).toFixed(2));
  $("[name=stampY]").val((stampY/scale).toFixed(2));
  $("[name=stampWidth]").val((stampW/scale).toFixed(2));
  $("[name=stampHeight]").val((stampH/scale).toFixed(2));
}




function gotoPage_sign(sign, page)
{
	var pageNumber = gotoPage(page);

	if (sign == "sign")	{
		$("[name=signPage], [name=now_page_sign]").val(pageNumber);
		$("#draggable_stamp").data("page", pageNumber);
		$(".now_page_sign").text(pageNumber);
	}

	if (sign == "sign_pos")	{
		$("[name=signPosPage], [name=now_page_sign_pos]").val(pageNumber);
		$("#draggable_stamp_pos").data("page", pageNumber);
		$(".now_page_sign_pos").text(pageNumber);
	}

}