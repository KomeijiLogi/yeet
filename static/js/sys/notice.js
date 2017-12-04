$(function() {
	//初始化表格
	easyExt.initDataGrid('#dg','/t_notice_base/findAllByPage');
	
	//删除主设备
	$("#del").click(function(){
		var selRows=$('#dg').datagrid('getSelections');
		easyExt.del(selRows,'/t_notice_base/deleteBatch',function(){//删除成功后执行的动作，一般用于刷新datagrid
			$('#dg').datagrid('reload'); 
			$('#dg').datagrid('clearSelections'); //清除选择项
		});
	});
	//添加主设备
	$("#add").click(function(){
		
	/*	//上级菜单
		$('#parent1').combotree({
			width:180,
			method:'GET',
		    url: easyExt.url+'/t_cloumn_base/getMenu',
			iconCls: 'iconCls',
		    animate:true
		}); 

		//上级菜单
		$('#parent2').combotree({
			width:180,
			method:'GET',
		    url: easyExt.url+'/t_receRange_base/getMenu',
			iconCls: 'iconCls',
		    animate:true
		}); 
		
		
*/
		

	window.open(easyExt.url+"/t_notice_base/addpage");
		//window.location.href=easyExt.url+"/t_notice_base/addpage";
		
	/*	easyExt.add2('/t_notice_base/addOne',function(){   
			$('#dg').datagrid('reload'); 
		});*/
	});
	//修改主设备 这里区别 属性  一个是 未发布  的   发布  编辑      2：置顶 撤回 取消  3 撤销置顶 撤回 取消      
	$("#edit").click(function(){
		var selRows=$('#dg').datagrid('getSelections');
		selRows[0].fisRelease;
		selRows[0].fupdateTime;
		if(selRows.length!=1){
			$.messager.alert("提示", "请选择要修改的行！", "info");  
			return;
		}
		
		window.open(easyExt.url+"/t_notice_base/updatepage?id="+selRows[0].id);//打开页面 跳转至选择页面
		
		
	/*	if(selRows[0].fisRelease==1||selRows[0].fisRelease=='1'){//发布
			if(selRows[0].fupdateTime==null||selRows[0].fupdateTime==''){
				easyExt.edit4(selRows,'/t_notice_base/updateOne',function(){//删除成功后执行的动作，一般用于刷新datagrid
					$('#dg').datagrid('reload'); 
					
				});
			}else{
				easyExt.edit5(selRows,'/t_notice_base/updateOne',function(){//删除成功后执行的动作，一般用于刷新datagrid
					$('#dg').datagrid('reload'); 
				
				});
			}	
		}else{
			easyExt.edit3(selRows,'/t_notice_base/updateOne',function(){//删除成功后执行的动作，一般用于刷新datagrid
				$('#dg').datagrid('reload'); 
				
			});
		}
		*/
		
		
	
		
		
		
		
		
		
		
	});
	
	// 查看人员公告 不加权限了
	$("#uodateVersion").click(function(){
		var selRows=$('#dg').datagrid('getSelections');//返回选中行
		if(selRows.length==0){
			$.messager.alert("提示", "请选择要查看的公告！", "info");  
			return;
		}else if(selRows.length==1){
			addPri(selRows[0]);
		}else{
			$.messager.alert("提示", "只能单项查看,请选择一行！", "info");
		}
	});

	function addPri(row){
		$('#userRole').dialog({
			title:'人员浏览查看列表',  
			buttons:[{
					text:'取消',
					handler:function(){
						$('#userRole').dialog('close');
				}
		    }]
		});
		
		$('#userRole').dialog('open');
		//加载功能菜单
		$('.idinput1').val(row.id);
			$('#tg').datagrid({
				 url: easyExt.url+'/t_yun_publish/findAllByPage',
				 striped: true,
				 fit : true,
				 method: 'get',
				 autoRowHeight:false,
				 queryParams: {
						id: row.id
					},
				 pagination: true,
				 showRefresh: true,
				 pagePosition: 'bottom',
				 nowrap: true,
				 collapsible: true,
				 idField: 'id',
				 fitColumns: true,
				 rownumbers: true,
				 onLoadError: function(){
					 $.messager.alert("提示", "数据加载失败！", "info");
				 },
				 onLoadSuccess: function(){
					 
				 }
			 });
		};
		

	
	
	//搜索实现
	$("#search").click(function(){
		$('#dg').datagrid('load',$('#tForm').serializeJson());
	});
	//搜索实现
	$(".search1").click(function(){
		$('#tg').datagrid('load',$('.tForm1').serializeJson());
	});
	$('#downloadExcel').click(function(){
		window.location.href=easyExt.url+'/t_notice_base/downloadExcel';
	});
	//导出用户列表可以选择的导入在前台拼接一个字符串 传递给后台 为空提示前台
	$('#exportExcelFile').click(function(){
		var selRows=$('#dg').datagrid('getSelections');
		if(selRows.length<1){
			$.messager.alert("提示", "请最少选择一项！", "info");
			return false;
		}
		var ids="";  
	     for (i = 0; i < selRows.length;i++) {  
	            if (ids =="") {  
	            	ids = selRows[i].id;  
	            } else {  
	            	ids = selRows[i].id + "," + ids;  
	            }                 
	        } 
		window.location.href=easyExt.url+'/t_notice_base/exportExcelFile?vid='+ids;
		
	});
	//添加模板
	$('#editExcelFile').click(function(){
		$.ajax({
			url:easyExt.url+"/t_notice_base/upExcelFile",
			data:{'p':'p'},
			async:false,
			dataType:'json',
			success:function(e){
				var data = e.resCode;
				if(data!=3){
		
		
						$('#addForm1').form('clear');
						$('#exportExcelDIV').dialog({
							iconCls:'icon-save',
							title:'导入模板',  
							buttons:[{
									text:'确认',
									handler:function(){
										$('#addForm1').form('submit', {
											url:easyExt.url+"/t_operation_platform/upExcelFile",
										    success: function(e){
												var data = JSON.parse(e); 
												if(data.resCode=='1'||data.resCode==1){
													$.messager.alert("提示", data.resMsg); 
													$('#exportExcelDIV').dialog('close');
													$('#dg').datagrid('reload'); 
												}else if(data.resCode=='2'||data.resCode==2){
													$.messager.alert("提示", data.resMsg, "info"); 
													$('#exportExcelDIV').dialog('close');
													$('#dg').datagrid('reload'); 
												}else{
													$.messager.alert("提示", "操作失败！", "info"); 
													$('#dg').datagrid('reload'); 
												}
										    }
										});
										
										
									}
								},{
									text:'取消',
									handler:function(){
										$('#exportExcelDIV').dialog('close');
								}
						    }]
						});
						$('#exportExcelDIV').dialog('open');
					
	
				}else{
					$.messager.alert("提示", e.resMsg, "info");  
				}
				}
			});
						
						
		
	});
	
	
	
	
	
	
	
	
	
	
});



