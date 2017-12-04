$(function() {
	//初始化表格
	easyExt.initDataGrid('#dg','/t_yun_person/findAllByPage');
	
	
	
	//恢复账套信息 初始化 发送    $('#dg').datagrid('reload'); 重新加载页面
	$("#recoverAll").click(function(){//全部同步
		$.ajax({
			url:easyExt.url+'/t_yun_person/initializeData',
			data:{'status':1},
			dataType:'json',
			async:false,
			success:function(e){
				var data = e.resCode;
				if(data==1||data=='1'){
					$.messager.alert("提示", "同步成功！", "info");
				}else{
					$.messager.alert("提示", e.resMsg, "info");
				}
				$('#dg').datagrid('reload');
				$('#dg').datagrid('clearSelections'); //清除选择项
			}
		});	
	});
	
	//恢复账套信息 初始化 发送    $('#dg').datagrid('reload'); 重新加载页面
	$("#recover").click(function(){
		$.ajax({
			url:easyExt.url+'/t_yun_person/initializeData',
			data:{'status':2},
			dataType:'json',
			async:false,
			success:function(e){
				var data = e.resCode;
				if(data==1||data=='1'){
					$.messager.alert("提示", "同步成功！", "info");
				}else{
					$.messager.alert("提示", e.resMsg, "info");
				}
				$('#dg').datagrid('reload');
				$('#dg').datagrid('clearSelections'); //清除选择项
			}
		});	
	});
	//搜索实现
	$("#search").click(function(){
		$('#dg').datagrid('load',$('#tForm').serializeJson());
	});
	
});



