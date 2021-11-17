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




// 좌표 설정 초기화
$("[name=wmSize]").on("change", function(){
  if ($("[name=wmPos] option:selected").val() == "0") {
    $("#draggable_wm").css({width:"auto", height:"auto", right:"auto", bottom:"auto"});
  }
});


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
}


function wm_option_sub()
{
	var wmTextSub    = $("[name=wmTextSub]").val();
	var wmColorSub   = $("[name=wmColorSub]").val();

	$("[name=wmText]").val(wmTextSub);
	$("[name=wmColor]").val(wmColorSub);

	wm_option();
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




// 워터마크 이미지
function change_wm_img(input) 
{
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



