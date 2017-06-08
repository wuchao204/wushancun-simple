//隐藏 Div，当鼠标在其他地方操作时
//if(top)
///$(document).mousedown(top.topMouseDown);

/**
 * 对象不存在
 * 
 * @param obj
 * @returns {Boolean}
 */
function isNotExist(obj) {
	return typeof (obj) == 'undefined';
}

/**
 * ajax方式提交表单时，可以提供一个回调函数，以便使用者能在表单提交结束后，能够继续做一些针对性的操作。
 * 
 * 本方法是默认提供的一个回调函数，返回到待办事务
 * 
 * @param responseText
 * @return
 */
function return2Todo(responseText) {
	var obj = eval("("+responseText+")");
	if (obj.code==0) {
		location.href = 'apsAction!toMain.action';
	}
}

/**
 * 字符串函数，以“str”开始
 * 
 * @param str
 * @returns {Boolean}
 */
String.prototype.startsWith = function(str) {
	if (str == null || str == "" || this.length == 0
			|| str.length > this.length)
		return false;
	if (this.substr(0, str.length) == str)
		return true;
	else
		return false;
	return true;
};

/**
 * 字符串函数，以“str”结尾
 * 
 * @param str
 * @returns {Boolean}
 */
String.prototype.endsWith = function(str) {
	if (str == null || str == "" || this.length == 0
			|| str.length > this.length)
		return false;
	if (this.substring(this.length - str.length) == str)
		return true;
	else
		return false;
	return true;
};

String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {  
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {  
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);  
    } else {  
        return this.replace(reallyDo, replaceWith);  
    }  
};

/** trim() method for String */  
String.prototype.trim=function() {  
    return this.replace(/(^\s*)|(\s*$)/g,'');  
};

/**
 * 打开一个窗口
 * 
 * @param url
 * @param winName
 * @param pxWidth
 * @param pxHeight
 * @param pxLeft
 * @param pxTop
 * @return
 */
function openWindow(url, winName, pxWidth, pxHeight, pxLeft, pxTop) {
	var params = '';
	params += ' width=' + (pxWidth ? pxWidth : 800);
	params += ', height=' + (pxHeight ? pxHeight : 600);
	params += ', left=' + (pxLeft ? pxLeft : (getDocumentWidth() - pxWidth) / 2);
	params += ', top=' + (pxTop ? pxTop : (getDocumentHeight() - pxHeight) / 2);
	params += ', toolbar=no, menubar=no, resizable=1,location=no,scrollbars=1, status=no';
	window.open(url, winName, params);
}

/**
 * 用JQuery UI中的Dialog，仿弹出信息提示窗口（Alert & Confirm）
 * 
 * @param message
 *            提示消息
 * @param callback
 *            回调函数名称
 * @param showCancelButton
 *            显示“取消”按钮
 * @param height
 *            窗体高度
 * @returns
 */
function showMessage(message, callback, showCancelButton, height) {

	$("body").append("<div id='dialog-confirm'>" + message + "</div>");

	var buttonsOption = {};

	showCancelButton = showCancelButton || false;
	// 判断是否需要取消按钮
	if (showCancelButton) {
		buttonsOption = {
			"确定" : function() {
				$("#dialog-confirm").html("");
				$("#dialog-confirm").remove();
                if (callback)
                	callback(true);
			},
			"取消" : function() {
                $("#dialog-confirm").html("");
                $("#dialog-confirm").remove();
				if (callback)
					callback(false);
			}
		};

	} else {
		buttonsOption = {
			"确定" : function() {
                $("#dialog-confirm").html("");
                $("#dialog-confirm").remove();
				if (callback)
					callback();
			}
		};
	}
	if(!height){
		height = 160;
	}
	$("#dialog-confirm").dialog({
		resizable : false,
		height : height,
		title : "信息提示",
		modal : true,
		buttons : buttonsOption,
		close : function() {
            $("#dialog-confirm").html("");
            $("#dialog-confirm").remove();
			if (callback)
				callback(false);
		}
	});

	// return confirm(message);
};



/**
 * 用JQuery UI中的Dialog，仿弹出信息输入窗口（Prompt）
 * 
 * @param message
 *            提示消息
 * @param callback
 *            回调函数名称
 * @param showCancelButton
 *            显示“取消”按钮 true or fasle
 * @returns
 */
function showPromptMessage(message, callback, showCancelButton) {

	$("body").append("<div id='dialog-Prompt'>" + message +"：<Br /><textArea id='_temp_promptId' name='_temp_promptName' style='width:98%; height:85px; line-height:18px; '/>"+ "</div>");

	var buttonsOption = {};

	showCancelButton = showCancelButton || false;
	// 判断是否需要取消按钮
	if (showCancelButton) {
		buttonsOption = {
			"确定" : function() {
				var returnValue=$('#_temp_promptId').val();
				if(returnValue!=""){
					if (callback)
						callback(returnValue);
					$("#dialog-Prompt").html("");
					$("#dialog-Prompt").remove();
				}else{
					alert("内容不能为空!!!");
				}
			},
			"取消" : function() {
				if (callback)
					callback("");
				$("#dialog-Prompt").html("");
				$("#dialog-Prompt").remove();
			}
		};

	} else {
		buttonsOption = {
			"确定" : function() {
				var returnValue=$('#promptId').val();
				if(returnValue!=""){
					if (callback)
						callback(returnValue);
					$("#dialog-Prompt").html("");
					$("#dialog-Prompt").remove();
				}else{
					alert("内容不能为空!!!");
				}
			}
		};
	}

	$("#dialog-Prompt").dialog({
		resizable : false,
		height : 200,
		title : "输入信息",
		modal : true,
		buttons : buttonsOption,
		open:function(){$(".ui-dialog-titlebar-close").hide();//怎么去掉关闭按钮
		},
		close : function() {
				 if (callback)
					callback(false);
				$("#dialog-Prompt").html("");
				$("#dialog-Prompt").remove(); 
		}
	});
};

/**
 * 功能:以iframe方式弹出dialog
 * 
 * @param url
 *            打开页面的url
 * @param title
 *            dialog标题
 * @param height
 *            dialog高度
 * @param width
 *            dialog宽度
 * @param scroll
 *            是否需要滚动条，默认false
 */
function openDialogInIframe(url, title, height, width, scroll,img, notAllowClose, notAllowMove) {

	if (url.indexOf('?') > 0)
		url += "&time=" + Math.random();
	else
		url += "?time=" + Math.random();

	var scrolling = scroll ? 'yes' : 'no';
	img = img || "./images/loading.gif";

	// append Dialog to body
	$("body").append("<div id='dialogDiv'></div>");

	// append loadingDiv,iframe to Dialog
	var _html = "<div id='dialogLoadingDiv' style='width:100%;align:center;top:50px;position:absolute;display:none;background-color:white'>";
	_html += "<img src='"+img+"' style='valign: bottom' />正在载入，请稍候……</div>";
	_html += "<iframe id='dialogIframe' src=''";
	_html += " width='" + width + "px' height='" + height + "px'";
	_html += " frameborder='0' scrolling='" + scrolling + "'";
	_html += " style=''></iframe>";
	$("#dialogDiv").append(_html);

	$("#dialogIframe")[0].onload = $("#dialogIframe")[0].onreadystatechange = function() {
		if (!this.readyState || this.readyState == "complete") {
			$("#dialogLoadingDiv").hide();
		}
	};
	
	// show loadingDiv
	$("#dialogLoadingDiv").show();
	
	// init Dialog
	$('#dialogDiv').dialog({
		closeOnEscape: false,
		bgiframe : true,
		autoOpen : true,
		resizable : false,
		modal : true,
		draggable : notAllowMove ? false : true,
		title : title,
		width : width + 30,

		// clear page in iframe(delete DOM after close?)
		close : function() {
			$("#dialogDiv").html("");
			$("#dialogDiv").remove();
			// 以下方式内存不释放
			// alert($("#dialogDiv").html());
		}
	});

	// open Dialog
	//$('#dialogDiv').dialog('open');
	
	$("#dialogIframe")[0].src = url;
	
	if(notAllowClose){
		$('a[role="button"]').remove();
	}
}

/**
 * 功能：关闭dialog(由iframe中的页面调用)
 * 
 * @param id
 *            dialog(div)的id
 */
function closeDialogInIframe() {
	parent.$('#dialogDiv').dialog('close');
}

/**
 * 初始化控件的帮助属性
 * 
 * 所有控件中带helpId属性
 * 
 * @param imageUrl
 *            图片的路径
 * 
 */
function initHelp(imageUrl){
	imageUrl = imageUrl || '../images/but_img_stop.gif';
	$('input[helpId]').each(function() {
		var helpId = $(this).attr('helpId');
		if(helpId){
			var _html = '<img src="'+imageUrl+'" onmouseout="$(\'#oDialog\').hide();" name="_help_image" helpId="'+helpId+'"/>';
			$(this).after(_html);
		}
	});
	
	//给新增的图标添加点击事件
	$('img[name="_help_image"]').click(function(ev){
		//alert(event.clientX);
		//alert(event.clientY);
		var img = $(this);
		var helpId = $(this).attr('helpId');
		var url ="getHelp.jsp?helpId="+helpId;
		if(img.attr('myTitle')){
			showHelpMessage(ev, img, img.attr('myTitle'));
		}else{
			$.ajax({
				type : "post",
				url : url,
				dataType : "text",
				success : function(data, textStatus) {
					showHelpMessage(ev, img, data);
				},
				error : function(data, textStatus, errorThrown) {
					// 请求出错处理
					alert("系统发生异常或登陆超时，请稍候再试！错误信息：\nXMLHttpRequest="
							+ data.responseText + "\ntextStatus=" + textStatus
							+ "\nerrorThrown=" + errorThrown);
				}
			});
		}
	});
	
}

function showHelpMessage(ev,obj, data){
	if(!$("#oDialog")[0]){
		var _html ='<DIV id=oDialog style="display:none">';
		_html += '<DIV id=myid ';
		//_html += ' style="BORDER-RIGHT: black 1px solid; PADDING-RIGHT: 10px; BORDER-TOP: white 1px solid; PADDING-LEFT: 18px; BACKGROUND: #cccccc; LEFT: 0px; PADDING-BOTTOM: 10px; FONT: 10pt tahoma; BORDER-LEFT: white 1px solid; WIDTH: 100; PADDING-TOP: 10px; BORDER-BOTTOM: black 1px solid; POSITION: absolute; TOP: 0px; HEIGHT: 50;">';
		_html += ' style="position:absolute; border-color:#ff80c0;background-color:#ffffff;border-width:1px;border-style:solid;width: 200px;"';
		//_html += data;
		_html += '</div>';
		_html += '</div>';
		obj.parent().append(_html);
	}

	$('#myid').text(data);
	var mousePos = mouseCoords(ev); 
	var curX = mousePos.x+10;
	var maxX = getDocumentWidth()-206;
	$("#myid").css('left',curX>maxX?maxX:curX);
	$("#myid").css('top',mousePos.y+10);
 
	$("#oDialog").show();
	obj.attr('myTitle',data);
}

function mouseCoords(ev) {  
    evev = ev || window.event;  
    if (ev.pageX || ev.pageY) {  
        return {  
            x : ev.pageX,  
            y : ev.pageY  
        };  
    }  
    return {  
        x : ev.clientX + document.body.scrollLeft - document.body.clientLeft,  
        y : ev.clientY + document.body.scrollTop - document.body.clientTop  
    };  
}

function IsDate(obj) {
	var arrSplit = obj.value.split("-");
	//alert(arrSplit[0]);
	//alert(arrSplit[1]);
	//alert(arrSplit[2]);
	var bGoodDay = false;
	if (arrSplit.length == 3) {
		var dtmBirth = new Date(arrSplit[0] + '/' + arrSplit[1] + '/'
				+ arrSplit[2]);
		//alert(dtmBirth.getFullYear());
		//alert(dtmBirth.getMonth());
		//alert(dtmBirth.getDate());
		bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[0]))
				&& ((dtmBirth.getMonth() + 1) == Number(arrSplit[1]))
				&& (dtmBirth.getDate() == Number(arrSplit[2]));
	}

	if (!bGoodDay) {
		showMessage('请输入正确的日期（格式: 2008-08-08）！');
        obj.value='';
        obj.focus();
		return false;
	}
}

function IsDatetime(obj){
	//alert(obj.value);
	if(obj.value.length<1){
		return true;
	}
	var reg = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))(\s(([01]\d{1})|(2[0123])):([0-5]\d):([0-5]\d))?$/;
    if (!reg.test(obj.value)) {
        alert("请输入正确的时间（格式: 2008-08-08 20:20:20）");
        obj.value='';
        obj.focus();
        return false;
    }
    return true;

}
/**
 * 初始化日期控件
 * 
 * 所有input域中带datepiker="true"属性的都默认为日期控件
 * 
 * @param buttonImage
 *            图标URL
 * @return
 */
function initDatePicker(buttonImage) {
	buttonImage = buttonImage || 'images/date.gif';
	
	$('input[datepiker="DATE"]').each(function() {
		$(this).datepicker($.extend({}, $.datepicker.regional['zh-CN'], {			
			showOtherMonths: true,
			selectOtherMonths: true,
			duration : true,
			showStatus : true,
			showOn : 'both',
			buttonImage : buttonImage,
			buttonImageOnly : true,
			buttonText : '选择日期',
			onSelect: function( selectedDate ) {
				if($(this).attr('maxDateObject'))
					$( "#"+$(this).attr('maxDateObject') ).datepicker( "option", "minDate", $(this).val() );
				if($(this).attr('minDateObject'))
					$( "#"+$(this).attr('minDateObject') ).datepicker( "option", "maxDate", $(this).val() );
			}
		}));
		
		//$(this).bind('keyup',"value=value.replace(/D/g,'')");
		var eee = this;
		$(this).change(function(){
			//alert(eee.value);
			return IsDate(eee);
		});
		// eval("$(this).datepicker($.extend({},$.datepicker.regional['zh-CN'],
		// {duration: true,showStatus: true,showOn: 'both', buttonImage: '"
		// + buttonImage
		// + "',buttonImageOnly: true,buttonText: '选择日期' }));");
	});

	//初始日期控件（带时间）
	$('input[datepiker="DATETIME"]').each(function() {

		$(this).datetimepicker({		
			showOtherMonths: true,
			selectOtherMonths: true,
			currentText : '今天',
			closeText : '关闭',
			timeText : '时间',
			hourText : '时',
			minuteText : '分',
			secondText : '秒',
			showSecond : true,
			buttonImage:buttonImage,
			onSelect: function( selectedDate ) {
				if($(this).attr('maxDateObject'))
					$( "#"+$(this).attr('maxDateObject') ).datepicker( "option", "minDate", $(this).val() );
				if($(this).attr('minDateObject'))
					$( "#"+$(this).attr('minDateObject') ).datepicker( "option", "maxDate", $(this).val() );
			}
		});
		//$(this).bind('keyup',"value=value.replace(/D/g,'')");
		var eee = this;
		$(this).blur(function(){
			//alert(eee.value);
			return IsDatetime(eee);
		});
	});

/*	//初始日期控件（只有时间）
	$('input[datepiker="TIME"]').each(function() {

		$(this).datetimepicker({
			currentText : '今天',
			closeText : '关闭',
			timeText : '时间',
			hourText : '时',
			minuteText : '分',
			secondText : '秒',
			showSecond : true,
			buttonImage:buttonImage
		});
	});*/

	$('input[datepiker^=DATE]').each(function() {
		// 最大日期属性，设置最大日期对象的最小值为当前控件的选中值
		if($(this).attr('maxDateObject'))
			$( "#"+$(this).attr('maxDateObject') ).datepicker( "option", "minDate", $(this).val() );
		// 最小日期属性，设置最小日期对象的最大值为当前控件的选中值
		if($(this).attr('minDateObject'))
			$( "#"+$(this).attr('minDateObject') ).datepicker( "option", "maxDate", $(this).val() );
		
		//设置最大值和最小值
		if($(this).attr('maxDate'))
			$(this).datepicker( "option", "maxDate", $(this).attr('maxDate') );
		if($(this).attr('minDate'))
			$(this).datepicker( "option", "minDate", $(this).attr('minDate') );
	});
	
	$("img").each(function(){
		var str = buttonImage.split("/");
		if(this.src.endsWith(str[str.length-1])){
			$(this).attr('align','absmiddle');
			//$(this).parent().html().attr;
		}
	});
}

/**
 * 初始化自动完成的控件
 */
function initAutocomplete(){
	
	var _MAX_HEIGHT_FLAG = 0;
	var _MAX_HEIGHT = '';

	$('input[autocomplete]').each(function() {
		
		var me = $(this);
		var minLength = me.attr('minLength') || 2;
		
		me.change(function(){
			if(me.val().length<minLength){
				$('#'+me.attr("forObject")).val('');
			}
		});
		
		if(_MAX_HEIGHT_FLAG<1){
			var meStyle = me.attr('style');
			if(meStyle){
				meStyle = meStyle.split(";");
				for(var i=0;i< meStyle.length;i++){
					var s = meStyle[i].split(":");
					if(s[0] == "maxheight"){
						_MAX_HEIGHT = s[1];
						break;
					}
				}
				_MAX_HEIGHT_FLAG = 1;
			}
		}
		
		var url =  $(this).attr('autocomplete');
		if(url.indexOf("?")>0){
			url += "&";
		}else{
			url +="?";
		}
		var showAll = minLength>0?false:true;
		$(this).autocomplete({
			source: function( request, response ) {
				$.ajax({
					url : encodeUrl(url+"key="+me.val()),
					dataType: "text",
					success: function( data ) {
						response( $.map( eval("(" + data + ")"), function( item ) {
						var callback = $(this).attr("autocompleteCallback");
							if(callback){
								return item;
							}else{
								return {
									label: item.name
									,value: item.id
								};
							}
							
						}));
					}
				});
			},
			minLength: minLength,
			showAll:showAll,
			select: function( event, ui ) {
				var callback = $(this).attr("autocompleteCallback");
				if(callback){
					eval(callback+'(ui.item);');
				}else{
					$(this).val(ui.item.label);
					$('#'+$(this).attr("forObject")).val(ui.item.value);

					$('#'+$(this).attr("forObject")).change();
				}
				return false;
			},
			open: function() {
				$(this).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
			},
			close: function() {
				$(this).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
			}
		});
		me.click(function() {
			me.keydown();
		});
	});

	if(_MAX_HEIGHT_FLAG>0){
		var _html = "<style>";
		_html += ".ui-autocomplete {max-height: "+_MAX_HEIGHT+";overflow: auto;}";
		_html += "* html .ui-autocomplete {	height: "+_MAX_HEIGHT+";}";
		_html += "</style>";
		 $("head").append(_html);
	}
}

function encodeUrl(url){
	url = encodeURI(encodeURI(url));
	$('#span3').text(url);
	return url;
}

/**
 * 导出到文件
 * 
 * @param url
 * 
 */
function _ajax_export(url) {

	var message = "请确定导出的文件格式：";
	message += "<select id='_ajax_export_select'>";
	message += "<option value='excel'>电子表格</option>";
	message += "<option value='word'>电子文档</option>";
	message += "<option value='pdf'>PDF</option>";
	message += "<option value='txt'>文本文件</option>";
	message += "</select>";

	showMessage(
			message,
			function(flag) {
				if (flag) {
					alert("你选择的类型是："
							+ $("#_ajax_export_select option:selected").text());
					
					if(url.indexOf("?")<0){
						url +="?";
					}
					
					url += "&ajaxExportType="+$("#_ajax_export_select").val();
					showBlock();
					// TODO 导出文件
					$.ajax({
						type : "post",
						url : url,
						dataType : "text",
						success : function(data, textStatus) {
							hideBlock();
						},
						error : function(data, textStatus, errorThrown) {
							// 请求出错处理
							alert("系统发生异常或登陆超时，请稍候再试！错误信息：\nXMLHttpRequest="
									+ data.responseText + "\ntextStatus=" + textStatus
									+ "\nerrorThrown=" + errorThrown);
						}
					});
				}
			}, true);
}

function getDocumentHeight() {
	var scrollHeight,
		offsetHeight;
	// handle IE 6
	if ($.browser.msie && $.browser.version < 7) {
		scrollHeight = Math.max(
			document.documentElement.scrollHeight,
			document.body.scrollHeight
		);
		offsetHeight = Math.max(
			document.documentElement.offsetHeight,
			document.body.offsetHeight
		);

		if (scrollHeight < offsetHeight) {
			return $(window).height();
		} else {
			return scrollHeight;
		}
	// handle "good" browsers
	} else {
		return $(document).height();
	}
}

function getDocumentWidth() {
	var scrollWidth,
		offsetWidth;
	// handle IE
	if ( $.browser.msie ) {
		scrollWidth = Math.max(
			document.documentElement.scrollWidth,
			document.body.scrollWidth
		);
		offsetWidth = Math.max(
			document.documentElement.offsetWidth,
			document.body.offsetWidth
		);

		if (scrollWidth < offsetWidth) {
			return $(window).width();
		} else {
			return scrollWidth;
		}
	// handle "good" browsers
	} else {
		return $(document).width();
	}
}

/**
 * ajax调用方法
 * 
 * @param url
 * @param callback
 */
function _ajax_execute(url, callback) {
	$.ajax({
		type : "post",
		url : url,
		dataType : "text",
		success : function(data, textStatus) {
			if (callback)
				callback(data);
		},
		error : function(data, textStatus, errorThrown) {
			
			if(errorThrown == 'Not Found'){
				//alert('页面为找到！');
			}else{
				// 请求出错处理
				alert("系统发生异常或登陆超时，请稍候再试！错误信息：\nXMLHttpRequest="
						+ data.responseText + "\ntextStatus=" + textStatus
						+ "\nerrorThrown=" + errorThrown);
			}
		}
	});
}

/**
 * ajax方式提交表单
 * 
 * @param formObj
 *            Jquery的单表对象，例如：$('#form1')
 * @param callback
 *            回调函数名称
 * @return
 */
function _ajax_submit(formObj, callback, disableMsg) {
	var ajaxOptions = {
		beforeSubmit : showRequest,
        dataType: 'html',
		success : function(responseText) {
			// 隐藏“覆盖层”
			hideBlock();
			
//			var obj = eval("("+responseText+")");
//			if (obj.code > 0 ) {
//				TopErrorMessage.init();
//				TopErrorMessage.clear();
//				TopErrorMessage.addError(null,obj.message);
//				TopErrorMessage.show();
//				setButtonDisabled(false);
//				return;
//			}
			
			var message = showResponse(responseText);
			
			// 弹出信息框
			if(callback){
			  if(!disableMsg)
          showMessage(message, function(){
            callback(responseText);
          });
			  else
			    callback(responseText);
			}else{
				showMessage(message,function(){
					setButtonDisabled(false);
				});
			}

		},
		error : function(XMLResponse) {
			showResponse("{'code':1,'message':'" + XMLResponse.responseText+"'}");
		}
	};

	formObj.ajaxSubmit(ajaxOptions);
}

/**
 * ajax post提交数据
 * 
 * @param url
 * @param data
 * @param callback
 *            回调函数名称
 * @return
 */
function getJsonByAjaxPost(url, data, callback, noShowBlock) {
	if(!noShowBlock){
		showBlock();
	}
	$.ajax({
	    type: "POST",
	    returnType:"json",
	    url: url,
	    data: data,
	    dataType: "json",
	    error : function(XMLResponse) {
			showResponse("{'code':1,'message':'" + XMLResponse.responseText+"'}");
		},
	    success : function(data) {
			if(!noShowBlock){
				hideBlock();
			}
			if(data && data.code && data.code>0){
				var errorMessage = '操作失败，由于以下原因造成：\n\n' + data.message;
				showMessage(errorMessage);
			}
			else if(callback){
				callback(data);
			}
		}
	});
}


/**
 * 提交前函数
 * 
 * @param formData
 * @param jqForm
 * @param options
 * @return
 */
function showRequest(formData, jqForm, options) {
	setButtonDisabled(true);
	showBlock();
	return true;
}

/**
 * 提交成功后函数
 * 
 * @param responseText
 *            执行的回馈消息
 * @return
 */
function showResponse(responseText) {
	var obj = eval("("+responseText+")");
	var message = '';
	try {
		if (obj.code == 0 ) {
			message = obj.message || '操作成功！';
		} else {
			message = '操作失败，由于以下原因造成：\n\n' + obj.message;
			setButtonDisabled(false);
		}
	} catch (e) {
		message = e.message;
	}

	return message;
}

/**
 * 设置页面中所有Button的有效性
 * 
 * @param flag
 *            true or false
 * @returns
 */
function setButtonDisabled(flag){
	$('input[type=button]').attr('disabled', flag);
	$('input[type=submit]').attr('disabled', flag);
	$('input[type=reset]').attr('disabled', flag);
	$('button').attr('disabled', flag);
}
/**
 * 添加一个层，用于覆盖整个用户操作区域，防止操作者重复操作
 * 
 * @param message
 */
function showBlock(message) {
	message = message || '<br/>&nbsp;&nbsp;&nbsp;正在处理中，请稍候……';
	message = "<span class='loading'>" + message + "</span>";
	$.blockUI({
		message : message,
		css : {
			width : '300px',
			height : '85px'
			// ,padding: '5px'
			// ,color:'#fff'
			// ,border:'1px solider #aaa'
			// ,backgroundColor:'#000'
			,
			'-webkit-border-radius' : '10px',
			'-moz-border-radius' : '10px',
			opacity : .8
		},
		overlayCSS : {
			opacity : '0.2'
		}
	});
}

/**
 * 隐藏层
 */
function hideBlock() {
	$.unblockUI();
}

/**
 * @param url
 *            获取数据的地址
 * @param selectId
 *            待填充select的id，默认areaOrganId2
 * @param defaultValue
 *            默认选中项的vlaue
 * @param needEmptyOption
 *            需要空选择项
 * @param callback
 *            回调函数
 */
function buildSelectorWithAjax(url, id, defaultValue, needEmptyOption, callback) {
	$("#" + id).hide().empty();
	$("#" + id)
			.after(
					"<img src='../../images/loading.gif' height=14 width=14 style='margin-left:5px;valign: bottom' />");
	$.ajax({
		type : "post",
		url : url,
		dataType : "text",
		success : function(data, textStatus) {
			var list = eval("(" + data + ")");
			if (needEmptyOption) {
				$("#" + id).append("<option value=''>请选择</option>");
			}

			$.each(list, function(i) {
				var str = "<option value='" + list[i].id + "'";
				if (defaultValue && list[i].id == defaultValue)
					str += " selected ";
				str += ">" + list[i].name + "</option>";
				$("#" + id).append(str);
			});
			$("#" + id).next().remove();

			$("#" + id).show();
			
			if(callback){
				callback();
			}
		},
		error : function(data, textStatus, errorThrown) {
			// 请求出错处理
			alert("系统发生异常或登陆超时，请稍候再试！错误信息：\nXMLHttpRequest="
					+ data.responseText + "\ntextStatus=" + textStatus
					+ "\nerrorThrown=" + errorThrown);
			$("#" + id).next().remove();
		}
	});
}

/**
 * 获取url中的请求参数
 * 
 * @param name
 * @return
 */
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

/**
 * 获取一个字符串的真实长度，全角两个，半角一个。
 * 
 * @param str
 * @return
 */
function getActualLength(str) {
	return str.replace(/[^\x00-\xff]/g, "xx").length;
}

function getActualLocation(str, count) {
	var sum = 0;
	for ( var i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375) {// 其他全角字符ASCII码
			sum += 2;
		} else if (str.charCodeAt(i) == 12288) {// 全角空格ASCII
			sum += 2;
		} else if (str.charCodeAt(i) > 32 && str.charCodeAt(i) < 127) {// a-z以及A-Z的ASCII码以及特殊
			// 字符的ASCII码
			sum += 1;
		} else {// 汉字情况
			sum += 2;
		}
		if (sum >= count) {
			return i + 1;
		}
	}
	return 1;
}

/**
 * 页面中的某行记录，做新增（或修改）时
 * 
 * @param tabName
 *            表格名称
 * @param trName
 *            行名称前缀
 * @param trId
 *            行标号
 */
function modifyItem(tabName,trName,trId,width,height,scroll){
	//需要传参数，以供打开页面使用
	var url = $('#'+tabName).attr('action');
	url += '?callback='+$('#'+tabName).attr('callback');
	url += '&tabName='+tabName;
	url += '&trName='+trName;
	if(trId){
		var jo = $('#'+trName+''+trId).find("#aUpdate").attr("jsonObject");
		url += '&index='+trId;
		url +='&jsonObject='+jo;
		url = encodeURI(url);
		url = encodeURI(url);
	}
	openDialogInIframe(url,$('#'+tabName).attr('title') || '详细信息',width || 200,height || 550,scroll || 1);
}

/**
 * 列表删除行
 * 
 * @param trName
 *            行名称前缀
 * @param trId
 *            行标号
 */
function deleteItem(trName,trId){
	showMessage('确认删除该行吗？',function(flag){
		if(flag){
			//删除该行（去掉一个TR）
			$('#'+trName+''+trId).remove();
		}
	},true);
}

/**
 * 页面中的某行记录，查看明细
 * 
 * @param tabName
 *            表格名称
 * @param trName
 *            行名称前缀
 * @param trId
 *            行标号
 */
function viewItem(tabName,trName,trId,width,height,scroll){
	//需要传参数，以供打开页面使用
	var url = $('#'+tabName).attr('action');
	url += '?1=1';
	if(trId){
		var jo = $('#'+trName+''+trId).find("#aUpdate").attr("jsonObject");
		url +='&jsonObject='+jo;
		//要两遍，不能删除
		url = encodeURI(url);
		url = encodeURI(url);
	}
	openDialogInIframe(url,$('#'+tabName).attr('title') || '详细信息',width || 200,height || 550,scroll || 1);
}


function HashMap(){   
	/** Map 大小 **/  
    var size = 0;   
    /** 对象 **/  
    var entry = new Object();   
        
    /** 存 **/  
    this.put = function (key , value){   
        if(!this.containsKey(key)){   
            size ++ ;   
        }   
        entry[key] = value;   
    };
        
    /** 取 **/  
    this.get = function (key){   
        return this.containsKey(key) ? entry[key] : null;   
    };
        
    /** 删除 **/  
    this.remove = function ( key ){   
        if( this.containsKey(key) && ( delete entry[key] ) ){   
            size --;   
        }   
    };
        
    /** 是否包含 Key **/  
    this.containsKey = function ( key ){   
        return (key in entry);   
    };
        
    /** 是否包含 Value **/  
    this.containsValue = function ( value ){   
        for(var prop in entry){   
            if(entry[prop] == value){   
                return true;   
            }   
        }   
        return false;   
    };
        
    /** 所有 Value **/  
    this.values = function (){   
        var values = new Array();   
        for(var prop in entry){   
            values.push(entry[prop]);   
        }   
        return values;   
    };
        
    /** 所有 Key **/  
    this.keys = function (){   
        var keys = new Array();   
        for(var prop in entry){   
            keys.push(prop);   
        }   
        return keys;   
    };
        
    /** Map Size **/  
    this.size = function (){   
        return size;   
    }; 
        
    /* 清空 */  
    this.clear = function (){   
        size = 0;   
        entry = new Object();   
    }; 
}
//异常定义
function Error(code, message){
	this.code = code;
	this.message = message;
	this.toString = function(){
		return this.code + "-" + this.message;
	};
}
//拼接路径、url等
function joinPath(prePath, postPath){
	var path = prePath;
	if(path.lastIndexOf('/')!=path.length-1){
		path += '/';
	}
	if(postPath.indexOf('/')==0){
		postPath = postPath.substring(1);
	}
	path += postPath;

	return path;
}
//给url添加参数
function joinParam(url, paramName, paramValue){
	if (url.indexOf("?") != -1) {
		url = url + "&" + paramName + "=" + paramValue;
	} 
	else {
		url = url + "?" + paramName + "=" + paramValue;
	}
	
	return url;
}	
function isIE5(){
	var isIE = !!window.ActiveXObject;
	if(isIE){
		if(navigator.userAgent.indexOf("MSIE 5.0")!=-1){
			return true;
		}
	}
	
	return false;
}
function isIE6(){
	var isIE=!!window.ActiveXObject;
	var isIE6=isIE&&!window.XMLHttpRequest;
	if(isIE6){
		return true;
	}

	return false;
}
function isIE7(){
	var isIE = !!window.ActiveXObject;
	if(isIE){
		if(navigator.userAgent.indexOf("MSIE 7.0")!=-1){
			return true;
		}
	}
	
	return false;
}

/**
 * json串转换为字符串
 * @param obj
 * @returns
 */
function jsonToString(obj) {
	var THIS = this;
	switch (typeof (obj)) {
	case 'string':
		return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';
	case 'array':
		return '[' + obj.map(THIS.jsonToString).join(',') + ']';
	case 'object':
		if (obj instanceof Array) {
			var strArr = [];
			var len = obj.length;
			for ( var i = 0; i < len; i++) {
				strArr.push(THIS.jsonToString(obj[i]));
			}
			return '[' + strArr.join(',') + ']';
		} else if (obj == null) {
			return 'null';

		} else {
			var string = [];
			for ( var property in obj)
				string.push(THIS.jsonToString(property) + ':'
						+ THIS.jsonToString(obj[property]));
			return '{' + string.join(',') + '}';
		}
	case 'number':
		return obj;
	default:
		return obj;
	}
}


/**
 * 定位到Ztree的某个节点，并展开节点
 * 
 * @param treeId Ztee的ID
 * @param nodeId 节点的ID
 */
function selectNodeOnZTree(treeId, nodeId){
	var treeObj = $.fn.zTree.getZTreeObj(treeId);
	if(treeObj==null){
		return;
	}
	var treeNode = treeObj.getNodeByParam("id", nodeId, null);
	if(treeNode!=null){
		//节点选中
		treeObj.selectNode(treeNode,true,true);
		//展开节点
		//while(treeNode.getParentNode()!=null){
		//	treeNode=treeNode.getParentNode();
		//}
		treeObj.expandNode(treeNode);
	}
}

/**
 * 获取所有选中的对象的value，中间用逗号隔开
 * 
 * @param name
 * @param attribute
 */
function getCheckedItemValues(name) {
	var checkedValues = "";
	$("input[name='" + name + "']" + ":checked").each(function() {
		checkedValues += this.value;
		checkedValues += ',';
	});

	checkedValues = checkedValues.substring(0, checkedValues.length - 1);
	return checkedValues;
}

/**
 * 获取所有选中的对象的属性[attribute]，中间用逗号隔开
 * 
 * @param name
 * @param attribute
 */
function getCheckedItemAttributes(name, attribute) {
	var checkedValues = "";
	$("input[name='" + name + "']" + ":checked").each(function() {
		checkedValues += $(this).attr(attribute);
		checkedValues += ',';
	});

	checkedValues = checkedValues.substring(0, checkedValues.length - 1);
	return checkedValues;
}