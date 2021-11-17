// 워터마크 좌표 값 계산
function wm_offset()
{
  var wm_box = $("#draggable_wm");
  
  var wmX = wm_box.position().left;
  var wmY = wm_box.position().top;
  var wmW = wm_box.width();
  var wmH = wm_box.height();
  
  var scale = $("[name=scale]").val();

  //console.log("X:"+wmX+" Y:"+wmY+" W:"+wmW+" H:"+wmH);
  
  $("[name=wmX]").val((wmX/scale).toFixed(2));
  $("[name=wmY]").val((wmY/scale).toFixed(2));
  $("[name=wmImageWidth]").val((wmW/scale).toFixed(2));
  $("[name=wmImageHeight]").val((wmH/scale).toFixed(2));

  $("#draggable_wm").css({"max-width" : "inherit"});
}

// 워터마크 사용 유무
function change_wm_use() 
{
	var fileStatus = $("[name=fileStatus]").val();
	if (fileStatus == "51000") {
		alert("서명된 파일에는 워터마크를 추가할 수 없습니다.");
		$("[name=wm_use]").prop("checked", false);
		return false; 
	}

	var browser = $("[name=browser]").val();
	if (browser == "Internet Explorer") {
		alert("IE 환경에서는 워터마크 기능을 제공하지 않습니다.");
		$("[name=wm_use]").prop("checked", false);
		return false; 
	}

	
	var val = $("input[name=wm_use]").is(":checked");

	$(".wm_onoff").text((val) ? "ON" : "OFF");


	if (val) { 
		$(".wm_box").slideDown(600);
		$("#draggable_wm").show();

	} else {
		$(".wm_box").slideUp(600);
		$("#draggable_wm").hide();
	}

    wm_option();

}


// 워터마크 타입 변경
function chagne_wm_type(wmType) 
{
  if (wmType == "Image") {

	$("#draggable_wm").resizable({ disabled:  false });


    $(".wm_image_option").show();
    $(".wm_text_option, #draggable_wm .dropdown-text p").hide();

	$("#draggable_wm").css({"max-width" : "320px"});
    
    if ($("#draggable_wm img").attr("src") == "")	{
      $("#draggable_wm, #draggable_wm img").hide();
    } else {
      $("#draggable_wm, #draggable_wm img").show();
    }
    
  } else {

	$("#draggable_wm").resizable({ disabled:  true });
	$("#draggable_wm").css({"width":"auto", "height":"auto", "max-width" : "inherit"});
	$("#draggable_wm").data("toggle", "dropdown");


    $(".wm_image_option, #draggable_wm img").hide();
    $(".wm_text_option, #draggable_wm p").show();
    
  }


}


// 워터마크 위치 변경
function change_wm_pos(wmPos)
{
  if (wmPos != 0)	{
    
    $("#draggable_wm").css({width:$("#draggable_wm").width()+"px", height:$("#draggable_wm").height()+"px"});
    
    if (wmPos == "leftTop")	{
      $("#draggable_wm").css({left:'0px', top:'0px', right:'auto', bottom:'auto'});
      
    } else if (wmPos == "rightTop")	{
      $("#draggable_wm").css({left:'auto', top:'0px', right:'0px', bottom:'auto'});
      
    } else if (wmPos == "leftBottom")	{
      $("#draggable_wm").css({left:'0px', top:'auto', right:'auto', bottom:'0px'});
      
    } else if (wmPos == "rightBottom")	{
      $("#draggable_wm").css({left:'auto', top:'auto', right:'0px', bottom:'0px'});
    }
    
    // 스크롤 이동 
    var offset = $("#draggable_wm").offset();
    $('html, body').animate({scrollTop : offset.top}, 600);
    
  }
  
  wm_offset();
}

// 좌표 설정 초기화
$("[name=wmSize]").on("change", function(){
  if ($("[name=wmPos] option:selected").val() == "0") {
    $("#draggable_wm").css({width:"auto", height:"auto", right:"auto", bottom:"auto"});
  }

})


// 워터마크 옵션
function wm_option()
{
  var wmText    = $("[name=wmText]").val();
  var wmSize    = $("[name=wmSize]").val();
  var wmColor   = $("[name=wmColor]").val();
  var wmRotate  = $("[name=wmRotate]").val();
  var wmOpacity = $("[name=wmOpacity]").val();
  
  var scale = $("[name=scale]").val();

  $(".wmSize_val").text(wmSize);
  $(".wmRotate_val").text(wmRotate);
  $(".wmOpacity_val").text(wmOpacity);
  
  $("[name=wmTextSub]").val(wmText);

  if (wmText == "")	{
	wmText = "텍스트를 입력해주세요.";
  }

  $("#draggable_wm .dropdown-toggle p").text(wmText);

  
  /*
  // 2021-06-01 제약사항
  $("#draggable_wm").css({
    "transform" : "rotate("+ wmRotate +"deg)",
    "opacity" : wmOpacity / 100,
  });
  */

  
  $("#draggable_wm .dropdown-toggle p, #draggable_wm .dropdown-toggle img").css({
    "opacity" : wmOpacity / 100,
  });
  
  
  $("#draggable_wm .dropdown-toggle p").css({
    "font-size" : wmSize * scale * 1.025 + "px",
    "color" : "#" + wmColor,
  });

  $(".colorpicker-input-addon i").css("background", "#" + wmColor + " !important");



  var left = $("#draggable_wm").css("left").replace("px", "");
  
  if (left < 0) {
	$("#draggable_wm").css("left", "0");
  }


//  wm_offset(); // DEBUG
}


function wm_option_sub()
{
	var wmTextSub    = $("[name=wmTextSub]").val();
	var wmColorSub   = $("[name=wmColorSub]").val();

	$("[name=wmText]").val(wmTextSub);
	$("[name=wmColor]").val(wmColorSub);

	wm_option();

}


function wm_size_change(btn)
{
	var size = Number($("[name=wmSize]").val());

	if (btn == "minus") { size -= 1; }
	if (btn == "plus") { size += 1; }

	if (size < 10) { size = 10; }
	if (size > 140) { size = 140; }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
	$("[name=wmSize]").val(size);

	wm_option();
}


// 워터마크 이미지
function change_wm_img(input) {
  if(input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#draggable_wm img').attr("src", e.target.result);
      $('#draggable_wm, #draggable_wm img').show();

	  $("#draggable_wm").css({"max-width" : "360px"});
      
      uploadImage(e.target.result, "wm");
    }
    reader.readAsDataURL(input.files[0]);
  	wm_offset();
  }
}


function count_change(name, btn)
{
	var val = Number($("[name="+name+"]").val());


	if (btn == "minus") { val -= 1; }
	if (btn == "plus") { val += 1; }

	if (name == "wmSize") {
		if (val < 10) { val = 10; }
		if (val > 140) { val = 140; }
	}

	if (name == "wmOpacity") {
		if (val < 0) { val = 0; }
		if (val > 100) { val = 100; }
	}


	$("[name="+name+"]").val(val);

	wm_option();
}


// 텍스트 
function add_text() 
{

	var now_page = $("[name=now_page]").val();

	var html = "";
	html += "<div class='draggable_text draggable_box active'>";
	html += "<input type='hidden' class='text_no' name='no_0' value=''>";
	html += "<input type='hidden' class='text_x' name='x_0' value=''>";
	html += "<input type='hidden' class='text_y' name='y_0' value=''>";
	html += "<input type='hidden' class='text_size' name='size_0' value='14'>";
	html += "<input type='hidden' class='text_page' name='page_0' value='"+now_page+"'>";
	html += "<p class='text_board_name'>텍스트 <span class='text_num'>1</span></p>";
	html += "<div class='dropdown-toggle' data-no='0' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' style='line-height:100%'>";
	html += "텍스트를 입력해주세요.";
	html += "</div>";
	html += "<div class='dropdown-menu round p-3 my-2'>";
	html += "<textarea class='form-control text_text' name='text_0' rows='1' placeholder='텍스트를 입력해주세요.' onkeyup='text_option()'></textarea>";

	html += "<select class='form-control mt-1 text_font' name='font_0' onchange='text_option()'>";
	html += "<option value='NanumGothic'>나눔고딕</option>";
	html += "<option value='BMEuljiro10yearslater'>BM 을지로10년후체</option>";
	html += "<option value='BMHANNAAir'>BM 한나체 </option>";
	html += "<option value='BMKIRANGHAERANG'>BM 기랑해랑체</option>";
	html += "<option value='BMYEONSUNG'>BM 연성체</option>";
	html += "<option value='BMDOHYEON'>BM 도현체</option>";
	html += "<option value='BMJUA'>BM 주아체</option>";
	html += "</select>";


	html += "<div class='form-inline mt-1'>";
	html += "<div class='col-md-4 p-0'>";
	html += "<div class='colorPicker input-group'>";
	html += "<input type='hidden' name='color_0' value='#000000' onchange='text_option()'>";
	html += "<span class='input-group-append'>";
	html += "<span class='input-group-text round colorpicker-input-addon' style='height: 39px;'><i></i></span>";
	html += "</span>";
	html += "</div>";
	html += "</div>";


	html += "<div class='col-md-8 p-0'>";
	html += "<div class='btn-group number_group'>";
	html += "<button type='button' class='form-control size_minus_btn px-2' value='0' data-toggle='click' onclick='text_size_change(this.value, \"minus\")' style='color: #CCC'>";
	html += "<i class='fas fa-minus font-12'></i>";
	html += "</button>";
	html += "<input class='form-control text-center text_size px-0' type='number' name='size_0' value='10' placeholder='크기' style='width: 100%' onfocusout='text_size_change(this.value, \"key\")'>";
	html += "<button type='button' class='form-control size_plus_btn px-2' value='0' data-toggle='click' onclick='text_size_change(this.value, \"plus\")' style='color: #CCC'>";
	html += "<i class='fas fa-plus font-12'></i>";
	html += "</button>";
	html += "</div>";
	html += "</div>";


	html += "<button class='btn btn-link mt-1 py-0 text-danger delete_text_btn' type='button' onclick=''>삭제</button>";
	html += "<button class='btn btn-link mt-1 py-0 float-right close_text_btn' type='button' onclick=''>닫기</button>";
	html += "</div>";
	html += "</div>";


	$(".draggable_text").removeClass("active");
	$(".document").append(html);

	$(".colorPicker").colorpicker({
		format: "hex"
	});


	var html2= "";
	
	html2 += "<dl class='row mb-0 text_menu_box'>";
	html2 += "<dt class='col-sm-3' style='line-height:40px'>텍스트 <span class='text_num'>1</span></dt>";
	html2 += "<dd class='col-sm-8'><textarea class='form-control text_text' name='text_0' rows='1' placeholder='텍스트를 입력해주세요.' onkeyup='text_menu_option()' onfocus='text_focus(this)'></textarea></dd>";
	html2 += "<dd class='col-sm-1 delete_text_btn' style='line-height:40px; cursor:pointer;' onclick=''><i class='fas fa-times text-danger font-20'></i></dd>";
	html2 += "</dl>";

	$(".text_menu_list").append(html2);

	text_index();
	text_option();

	
}



function delete_text(no)
{
	$(".no_"+no).remove();
	text_index();
}

function close_text()
{
	$("body").trigger("click");
}


function text_offset()
{
	
	$(".draggable_text").each(function(index, item){
		
		var text_box = $(this);

		if (text_box.css("display") != "none") {

			var textX = text_box.position().left;
			var textY = text_box.position().top;
			var textW = text_box.width();
			var textH = text_box.height();

			var scale = $("[name=scale]").val();

			$("[name=x_"+index+"]").val((textX/scale).toFixed(2));
			$("[name=y_"+index+"]").val((textY/scale).toFixed(2));
			$("[name=w_"+index+"]").val((textW/scale).toFixed(2));
			$("[name=h_"+index+"]").val((textH/scale).toFixed(2));

		}


	});

}

function text_index()
{
	var len = $(".draggable_text").length;
	$("[name=textNum]").val(len);

	if (len >= 1) {
		$(".text_menu_list").show();
	} else {
		$(".text_menu_list").hide();
	}


	$(".draggable_text").each(function(index, item){
		$(this).addClass("no_"+index);
		$(this).find(".text_num").text(index+1);
		$(this).find(".text_text").attr("name", "no_"+index);
		$(this).find(".text_text").attr("name", "text_"+index);
		$(this).find(".text_font").attr("name", "font_"+index);
		$(this).find(".text_color").attr("name", "color_"+index);
		$(this).find(".text_x").attr("name", "x_"+index);
		$(this).find(".text_y").attr("name", "y_"+index);
		$(this).find(".text_size").attr("name", "size_"+index);
		$(this).find(".text_page").attr("name", "page_"+index);
		$(this).find(".size_minus_btn, .size_plus_btn").val(index);
		$(this).find(".delete_text_btn").attr("onclick", "delete_text('"+index+"')");
		$(this).find(".close_text_btn").attr("onclick", "close_text('"+index+"')");
	});

	$(".text_menu_box").each(function(index, item){
		$(this).addClass("no_"+index);
		$(this).find(".text_num").text(index+1);
		$(this).find(".text_text").attr("name", "text_menu_"+index);
		$(this).find(".delete_text_btn").attr("onclick", "delete_text('"+index+"')");
	});
	
	text_offset();

}


function text_size_change(index, btn)
{
	var size = Number($("[name=size_"+index+"]").val());


	if (btn == "minus") { size -= 1; }
	if (btn == "plus") { size += 1; }

	if (size < 1) { size = 1; }
	if (size > 42) { size = 42; }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
	$("[name=size_"+index+"]").val(size);

	text_option();

}

function text_option()
{
	$(".draggable_text").each(function(index, item){

		var text    = $("[name=text_"+index+"]").val();
		var size    = $("[name=size_"+index+"]").val();
		var color   = $("[name=color_"+index+"]").val();
		var font    = $("[name=font_"+index+"]").val();

		
		$("[name=text_menu_"+index+"]").val(text);

		if (text == "")	{
			text = "텍스트를 입력해주세요.";
		}


		var scale = $("[name=scale]").val();

		text = text.replace(/(?:\r\n|\r|\n)/g, '<br>');
		$(this).find(".dropdown-toggle").html(text);
		

		$(this).find(".dropdown-toggle").css({
			"font-size" : size * scale * 1.025 + "px",
			"color" : "#" + color,
			"font-family" : font,
		});
		
	});
}

function text_menu_option()
{
	$(".text_menu_box").each(function(index, item){
		var text = $("[name=text_menu_"+index+"]").val();
		$("[name=text_"+index+"]").val(text);

	});

	text_option();
	
}


function text_focus(obj)
{
	var index = $(obj).attr("name").replace("text_menu_", "");

	$(".draggable_text").removeClass("active");
	$("[name=text_"+index+"]").parents(".draggable_text").addClass("active");

	// 페이지 이동 
	var page = $("[name=page_"+index+"]").val();
	var now_page = $("[name=now_page]").val();

	if (page != now_page) {
		gotoPage(Number(page));
	}
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