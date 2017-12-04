$(function(){
	//角色列表
	easyExt.initDataGrid('#dg','/t_base_messagetype/findAllByPage');
	//easyExt.initTreeGrid('#tg','/sys_privilege/findAll'); 
	//删除角色
	$("#del").click(function(){
		var selRows=$('#dg').datagrid('getSelections');
		easyExt.del(selRows,'/t_base_messagetype/deleteBatch',function(){//删除成功后执行的动作，一般用于刷新datagrid
			$('#dg').datagrid('reload'); 
			$('#dg').datagrid('clearSelections'); //清除选择项
		});
	});
	//添加角色
	$("#add").click(function(){
		easyExt.add('/t_base_messagetype/addOne',function(){
			$('#dg').datagrid('reload'); 
		});
	});
	//修改角色
	$("#edit").click(function(){
		var selRows=$('#dg').datagrid('getSelections');
		easyExt.edit(selRows,'/t_base_messagetype/updateOne',function(){//删除成功后执行的动作，一般用于刷新datagrid
			$('#dg').datagrid('reload'); 
		});
	});
	//保存权限
	
	
	$("#add_pri").click(function(){
		var selRows=$('#dg').datagrid('getSelections');//返回选中行
		if(selRows.length==0){
			$.messager.alert("提示", "请选择要修改的产品信息！", "info");  
			return;
		}else if(selRows.length==1){
			addPri(selRows[0]);
		}else{
			$.messager.alert("提示", "只能单项修改,请选择一行！", "info");
		}
	});
	
	function addPri(row){
		$('#userRole').dialog({
			title:'功能菜单列表',  
			buttons:[{
					text:'保存功能模板',
					handler:function(){
						var p=$('#tg').treegrid("getSelections");
						var pIds="";
						for(var i=0;j=p.length,i<j;i++){
							pIds+=p[i].id+",";
						}
						easyExt.ajax({
							url:easyExt.url+"/t_base_messagetype/saveModluarMenu?modularId="+row.id+"&menuIds="+pIds},
						function(data, status, xhr){
							if(data){
								$.messager.alert("提示", "保存功能模板成功！", "info");
								$('#userRole').dialog('close');
							}else{
								$.messager.alert("提示", "保存功能模板失败！", "info");
								$('#userRole').dialog('close');
							}
						});
						
					}
				},{
					text:'取消',
					handler:function(){
						$('#userRole').dialog('close');
				}
		    }]
		});
		
		$('#userRole').dialog('open');
		//加载功能菜单
		easyExt.initDataGrid('#tg','/t_base_menu/findAllByPage');
		
		$('#tg').datagrid({
			onLoadSuccess: function() {
				$('#tg').datagrid('tooltip');
				easyExt.ajax({url:easyExt.url+"/t_base_menu/getRolePri",type:'get',data:{modularId:row.id}},function(data,status, xhr){
					if(data){
						for(var i=0,j=data.length;i<j;i++){
							$('#tg').datagrid('selectRecord',data[i].columns.fmenuid);
						}
					} 
				});
		     }
		});
		$('#tg').datagrid('clearSelections'); //清除选择项
	}
});
var role=role||{};

//保存权限
function savePermission(){
	var p=$('#tg').treegrid("getSelections");
	var c=$('#dg').treegrid("getSelections");
	var pIds="";
	for(var i=0;j=p.length,i<j;i++){
		pIds+=p[i].id+",";
	}
	easyExt.ajax({url:easyExt.url+"/t_base_messagetype/saveRolePrivilege?roleId="+c[0].id+"&privilegeIds="+pIds},function(data, status, xhr){
		if(data){
			$.messager.alert("提示", "保存权限成功！", "info");
		}
	});
}


