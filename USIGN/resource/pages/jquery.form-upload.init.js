/**
 * Theme: Metrica - Responsive Bootstrap 4 Admin Dashboard
 * Author: Mannatthemes
 * Upload Js
 */


 // dropify js

$(function () {

  // Translated
  $('.dropify').dropify({
	messages: {
	  default: '<p class=\'text-dark\'>파일을 드래그 앤 드롭하거나 클릭하여<br>서명을 진행할 파일을 선택해주세요.</p><button class=\'btn btn-blue btn-round mt-3 px-5\'>파일 업로드</button>',
	  replace: '<p>파일을 드래그 앤 드롭하거나 클릭하여<br>업로드한 파일을 교체할 수 있습니다.</p><button class=\'btn btn-info btn-round mt-3 px-5\'>파일 재업로드</button>',
	  remove:  '지우기',
	  error:   '파일을 업로드하는 도중 문제가 발생하였습니다.'
	},

	error: {
	  fileSize: '{{ value }} 이하의 파일만 업로드할 수 있습니다.',
	  imageFormat: '지원하지 않는 확장자입니다. ({{ value }})'
	}, 

	tpl: {
		errorsContainer: ''
	}
  });

  // Used events
  var drEvent = $('#input-file-events').dropify();



//  drEvent.on('dropify.beforeClear', function(event, element){
//      return confirm("Do you really want to delete \"" + element.file.name + "\" ?");
//  });

  drEvent.on('dropify', function(event, element){
    alert();
  });

  drEvent.on('dropify.afterClear', function(event, element){
      $(".upload_file_sizse").text("");
	  $(".upload_file").hide();
	  $(".load_file").switchClass("btn-danger", "btn-info");
  });

  drEvent.on('dropify.errors', function(event, element){
      console.log('Has Errors');
  });

  var drDestroy = $('#input-file-to-destroy').dropify();
  drDestroy = drDestroy.data('dropify')
  $('#toggleDropify').on('click', function(e){
      e.preventDefault();
      if (drDestroy.isDropified()) {
          drDestroy.destroy();
      } else {
          drDestroy.init();
      }
  })
});
