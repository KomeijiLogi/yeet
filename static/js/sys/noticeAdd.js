$(function(){

$('.cancel').click(function(){
	    window.opener = null;
	    window.open("", "_self", "");
	    window.close();
});

$('.save').click(function(){
	
	$('#form21').form('submit', {
		url:easyExt.url+"/t_notice_base/addOne?isRelease=0",
		 onSubmit: function(){    
			var date = $('.spanti').val();
			if(date==''||date==null){
				alert("标题不可为空");
				return false;
			}else if(date.length>200){
				alert("标题长度不能超过200字！");
				return false;
			}else{
				return true;
			}
		    },
		success: function(e){
			var date=$.parseJSON(e);
			var code = date.resCode;
			if(code!=0){
				doUpLoad('1',code);//发布之后 把模板id放进来 20 就是模板id
				
			}else{
				alert("操作失败");
			}
			
			
			
		}
		
	});
});

$('.publish').click(function(){
	$('#form21').form('submit', {
		url:easyExt.url+"/t_notice_base/addOne?isRelease=1",
		 onSubmit: function(){    
				var date = $('.spanti').val();
				if(date==''||date==null){
					alert("标题不可为空");
					return false;
				}else if(date.length>200){
					alert("标题长度不能超过200字！");
					return false;
				}else{
					
				}
			 
		    	var isValid = $(this).form('validate');
				return isValid;	// 返回false终止表单提交
		    },
		success: function(e){
			var date=$.parseJSON(e);
			var code = date.resCode;
			if(code!=0){
				doUpLoad('1',code);//发布之后 把模板id放进来 20 就是模板id
			}else{
				alert("操作失败");
			}
		}
		
	});
});

$('.save1').click(function(){
	
	$('#form21').form('submit', {
		url:easyExt.url+"/t_notice_base/updateOne?updatenum=1",
		 onSubmit: function(){    
				var date = $('.spanti').val();
				if(date==''||date==null){
					alert("标题不可为空");
					return false;
				}else if(date.length>200){
					alert("标题长度不能超过200字！");
					return false;
				}else{
					return true;
				}
		    },
		success: function(e){
			var date=$.parseJSON(e);
			var code = date.resCode;
			if(code!=0){
				doUpLoad('1',code);//发布之后 把模板id放进来 20 就是模板id
			}else{
				alert("操作失败");
			}
			
			
			
		}
		
	});
});

$('.publish1').click(function(){
	$('#form21').form('submit', {
		url:easyExt.url+"/t_notice_base/updateOne?updatenum=2",
		 onSubmit: function(){    
			 
				var date = $('.spanti').val();
				if(date==''||date==null){
					alert("标题不可为空");
					return false;
				}else if(date.length>200){
					alert("标题长度不能超过200字！");
					return false;
				}else{
					
				}
		    	var isValid = $(this).form('validate');
				return isValid;	// 返回false终止表单提交
		    },
		success: function(e){
			var date=$.parseJSON(e);
			var code = date.resCode;
			if(code!=0){
				doUpLoad('1',code);//发布之后 把模板id放进来 20 就是模板id
				
			}else{
				alert("操作失败");
			}
		}
		
	});
});

$('.infoFooter1').click(function(){
	$('#form21').form('submit', {
		url:easyExt.url+"/t_notice_base/updateOne?updatenum=5",
		 onSubmit: function(){    
		    	var isValid = $(this).form('validate');
				return isValid;	// 返回false终止表单提交
		    },
		success: function(e){
			var date=$.parseJSON(e);
			var code = date.resCode;
			if(code!=0){
				window.location.href=easyExt.url+"/t_notice_base/updatepage?id="+code;
				
			}else{
				alert("操作失败");
			}
		}
		
	});
});
$('.infoFooter2').click(function(){
	$('#form21').form('submit', {
		url:easyExt.url+"/t_notice_base/updateOne?updatenum=4",
		 onSubmit: function(){    
		    	var isValid = $(this).form('validate');
				return isValid;	// 返回false终止表单提交
		    },
		success: function(e){
			var date=$.parseJSON(e);
			var code = date.resCode;
			if(code!=0){
				window.location.href=easyExt.url+"/t_notice_base/updatepage?id="+code;
				
			}else{
				alert("操作失败");
			}
		}
		
	});
});
$('.infoFooter3').click(function(){
	$('#form21').form('submit', {
		url:easyExt.url+"/t_notice_base/updateOne?updatenum=3",
		 onSubmit: function(){    
		    	var isValid = $(this).form('validate');
				return isValid;	// 返回false终止表单提交
		    },
		success: function(e){
			var date=$.parseJSON(e);
			var code = date.resCode;
			if(code!=0){
				window.location.href=easyExt.url+"/t_notice_base/updatepage?id="+code;	
				
			}else{
				alert("操作失败");
			}
		}
		
	});
});
$('.infoFooter4').click(function(){
	$('#form21').form('submit', {
		url:easyExt.url+"/t_notice_base/updateOne?updatenum=5",
		 onSubmit: function(){    
		    	
		    },
		success: function(e){
			var date=$.parseJSON(e);
			var code = date.resCode;
			if(code!=0){
				window.location.href=easyExt.url+"/t_notice_base/updatepage?id="+code;
				
			}else{
				alert("操作失败");
			}
		}
		
	});
});


});