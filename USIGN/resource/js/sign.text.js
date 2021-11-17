// 텍스트 추가
function text_add()
{
    var now_page = $("[name=now_page]").val();
 
    // 문서 위에 텍스트 영역 생성
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
 
 
    // 좌측 옵션메뉴 텍스트 UI 추가
    var html2= "";
     
    html2 += "<dl class='row mb-0 text_menu_box'>";
    html2 += "<dt class='col-sm-3' style='line-height:40px'>텍스트 <span class='text_num'>1</span></dt>";
    html2 += "<dd class='col-sm-8'><textarea class='form-control text_text' name='text_0' rows='1' placeholder='텍스트를 입력해주세요.' onkeyup='text_menu_option()' onfocus='text_focus(this)'></textarea></dd>";
    html2 += "<dd class='col-sm-1 delete_text_btn' style='line-height:40px; cursor:pointer;' onclick=''><i class='fas fa-times text-danger font-20'></i></dd>";
    html2 += "</dl>";
 
    $(".text_menu_list").append(html2);
 
    text_index(); // 텍스트 순번
    text_option(); // 텍스트 옵션
}
 
// 텍스트 삭제
function text_delete(index)
{
    $(".no_"+index).remove();
    text_index();
}
 
// 텍스트 닫기
function text_close()
{
    $("body").trigger("click");
}
 
// 텍스트 좌표
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
 
// 텍스트 순번
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
        $(this).find(".delete_text_btn").attr("onclick", "text_delete('"+index+"')");
        $(this).find(".close_text_btn").attr("onclick", "text_close('"+index+"')");
    });
 
    $(".text_menu_box").each(function(index, item){
        $(this).addClass("no_"+index);
        $(this).find(".text_num").text(index+1);
        $(this).find(".text_text").attr("name", "text_menu_"+index);
        $(this).find(".delete_text_btn").attr("onclick", "text_delete('"+index+"')");
    });
     
    text_offset();
 
}
 
 
// 텍스트 옵션
function text_option()
{
    $(".draggable_text").each(function(index, item){
 
        var text    = $("[name=text_"+index+"]").val();
        var size    = $("[name=size_"+index+"]").val();
        var color   = $("[name=color_"+index+"]").val();
        var font    = $("[name=font_"+index+"]").val();
         
        $("[name=text_menu_"+index+"]").val(text);
 
        if (text == "") {
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
 
// 텍스트 사이즈 옵션
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
 
// 텍스트 메뉴 옵션
function text_menu_option()
{
    $(".text_menu_box").each(function(index, item){
        var text = $("[name=text_menu_"+index+"]").val();
        $("[name=text_"+index+"]").val(text);
    });
    text_option();
}
 
// 텍스트 포커스
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
