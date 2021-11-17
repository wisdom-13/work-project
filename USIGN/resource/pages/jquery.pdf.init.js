// pdf.js
//var url = $("[name=filePath]").val();

//var url = 'https://www.ucert.co.kr/sample.pdf';
var pw = $("[name=decryptPwd]").val();


var loadingTask = pdfjsLib.getDocument({url: url, password: pw}); 


$(function()
{
  var pdfjsLib = window['pdfjs-dist/build/pdf'];
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'plugins/mozilla-pdf/pdf.worker.js';
  
  loadingTask.promise.then(function(pdf)
  {
    var pageMax = pdf._pdfInfo.numPages;// 최대 페이지
    $("[name=max_page]").val(pageMax);
    $(".max_page").text(pageMax);
    for(var i = 1; i <= pageMax; i++) {
      var option = "<a class='dropdown-item' href='javascript:gotoPage("+i+")'>"+i+" Page</a>";
      $(".dropdown-menu.page_menu").append(option);
    }
    
	var start_page = Number($("[name=start_page]").val());
    var pageNumber = (start_page) ? start_page : 1;
    
    if (pageNumber < 1) { pageNumber = pageMax; }
    if (pageNumber > pageMax) { pageNumber = 1; }
    
    
    pdf.getPage(pageNumber).then(function(page)	{
      renderPdfPage(page);

	  $("[name=now_page]").val(pageNumber);
	  $(".now_page").text(pageNumber);
    });

    
  }, function (reason) {
	 if (reason.code == "1") {
	  alert("비밀번호가 설정된 문서는 업로드 할 수 없습니다.");
	  location.href='/sign'; 
	  
	
	} else if (reason.code == "2") {
	  alert("올바르지 않은 비밀번호입니다.");
	  location.href=$(location).attr('href');
	  // TODO ajax으로 파일 유효성 체크 
	
	} else {
	  alert("문서를 불러오지 못했습니다. ("+reason+")");
//      location.href='/sign';
      $(".loding_section").fadeOut(600);
	}
  });

});

function gotoPage(page)
{

  var nowPage = Number($("[name=now_page]").val()); 
  var maxPage = Number($("[name=max_page]").val()); 
  
  if (page == "prev") {
    pageNumber = nowPage - 1;
  } else if (page == "next") {
    pageNumber = nowPage + 1;
  } else {
    pageNumber = Number(page);
  }


  if (pageNumber >= maxPage) {
	pageNumber = maxPage;
  }

  if (pageNumber <= 0) {
	pageNumber = 1;
  }



	if (pageNumber > 0 && pageNumber <= maxPage) {
	
		loadingTask.promise.then(function(pdf)
		{
			pdf.getPage(pageNumber).then(function(page) {
				$("[name=now_page]").val(pageNumber);
				$(".now_page").text(pageNumber);
				
				renderPdfPage(page);
			});
		});

	}

	return pageNumber;
}

function renderPdfPage(page)
{
  var bodyWidth	= $(".document").width();

  // 사이즈에 꽉차는 scale 구하기 
  var viewport_origin = page.getViewport({scale: 1});
  var scale = bodyWidth/viewport_origin.width;
  
  $("[name=scale]").val(scale);
  
  
  
  var viewport = page.getViewport({scale: scale});
  var canvas = document.getElementById('the-canvas');
  var context = canvas.getContext('2d');
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  $(".document").height(viewport.height);
  
  var renderContext = {
    canvasContext: context,
    viewport: viewport
  };
  
  var renderTask = page.render(renderContext);
  renderTask.promise.then(function() {
    $(".loding_section").fadeOut(600);
  });


//  if ($("[name=document_width]").length > 0) {
//	  $("[name=document_width]").val($(".document").width());
//	  $("[name=document_height]").val($(".document").height());
//  }

  //wm_option();
  sign_pos();


}



function fileChk(url, pw) {
  
  var loadingTask = pdfjsLib.getDocument({url: url, password: pw}); 

  var pdfjsLib = window['pdfjs-dist/build/pdf'];
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'plugins/mozilla-pdf/pdf.worker.js';
  
  loadingTask.promise.then(function(pdf){
    
	return true; 

  }, function (reason) {


	return false;
//	 if (reason.code == "1") {
//	  alert("비밀번호가 설정된 문서 입니다. 원본 파일 업로드 후 파일 설정에서 비밀번호를 설정하실 수 있습니다.");
//	  location.href='/sign'; 
//	  
//	
//	} else if (reason.code == "2") {
//	  alert("올바르지 않은 비밀번호입니다.");
//	  location.href=$(location).attr('href');
//	  // TODO ajax으로 파일 유효성 체크 
//	
//	} else {
//	  alert("문서를 불러오지 못했습니다. ("+reason.code+")");
//      location.href='/sign';
//      $(".loding_section").fadeOut(600);
//	}
  });
}