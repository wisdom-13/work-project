$(function() {

	$(".colorPicker").colorpicker({
		format: "hex"
	});

	$("[name=encryptPwd]").on("blur keyup", function() {
		$(this).val( $(this).val().replace( /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '' ) );
	});

	$(document).on("click", ".dropdown-menu, .colorpicker-bs-popover", function(e){
		e.stopPropagation();
		$('.text_color').colorpicker();
	});


	$(document).on("show.bs.dropdown", ".draggable_text", function(e){
		$(".draggable_text").removeClass("active");
		$(this).addClass("active");
	});


});