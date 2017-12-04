$(function(){
	//角色列表
	easyExt.initDataGrid('#dg','/sys_role/findAllByPage');
	//easyExt.initTreeGrid('#tg','/sys_privilege/findAll'); 
	//删除角色
	$("#del").click(function(){
		var selRows=$('#dg').datagrid('getSelections');
		easyExt.del(selRows,'/sys_role/deleteBatch',function(){//删除成功后执行的动作，一般用于刷新datagrid
			$('#dg').datagrid('reload'); 
			$('#dg').datagrid('clearSelections'); //清除选择项
		});
	});
	//添加角色
	$("#add").click(function(){
		easyExt.add('/sys_role/addOne',function(){
			$('#dg').datagrid('reload'); 
		});
	});
	//修改角色
	$("#edit").click(function(){
		var selRows=$('#dg').datagrid('getSelections');
		easyExt.edit(selRows,'/sys_role/updateOne',function(){//删除成功后执行的动作，一般用于刷新datagrid
			$('#dg').datagrid('reload'); 
		});
	});
	//保存权限
	$("#add_pri").click(function(){
		var selRows=$('#dg').datagrid('getSelections');//返回选中行
		if(selRows.length==0){
			$.messager.alert("提示", "请选择要修改的用户角色！", "info");  
			return;
		}else if(selRows.length==1){
			addPri(selRows[0]);
		}else{
			$.messager.alert("提示", "只能单项修改,请选择一行！", "info");
		}
	});
	
	function addPri(role){
		$('#userRole').dialog({
			title:'权限列表',  
			buttons:[{
					text:'保存权限',
					handler:function(){
						var p=$('#tg').treegrid("getSelections");
						var pIds="";
						for(var i=0;j=p.length,i<j;i++){
							pIds+=p[i].id+",";
						}
						easyExt.ajax({
							url:easyExt.url+"/sys_role/saveRolePrivilege?roleId="+role.id+"&privilegeIds="+pIds},
						function(data, status, xhr){
							if(data){
								$.messager.alert("提示", "保存权限成功！", "info");
								$('#userRole').dialog('close');
							}else{
								$.messager.alert("提示", "保存权限失败！", "info");
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
		easyExt.initDataGrid('#tg','/sys_privilege/findAllByPage');
		
		$('#tg').datagrid({
			onLoadSuccess: function() {
				$('#tg').datagrid('tooltip');
				easyExt.ajax({url:easyExt.url+"/sys_privilege/getRolePri",type:'get',data:{roleId:role.id}},function(data,status, xhr){
					if(data){
						for(var i=0,j=data.length;i<j;i++){
							$('#tg').datagrid('selectRecord',data[i].columns.privilegeID);
						}
					} 
				});
		     }
		});
		$('#tg').datagrid('clearSelections'); //清除选择项
	}
});
var role=role||{};
//查看权限
function lookP(id){
	role.id=id;
	$('#dg').datagrid('clearSelections');
	easyExt.ajax({url:easyExt.url+"/sys_role/getPrivilege?id="+id,type:'GET'},function(data,status, xhr){
		$('#tg').treegrid("unselectAll");
		for(var i=0;j=data.length,i<j;i++){
			$('#tg').treegrid("select",data[i].columns.id);
		}
	});
}
function formatter(value, row, index){
	return '<a href="javascript:lookP('+row.id+')"><div class="icon-hamburg-lock" style="width:16px;height:16px" title="查看权限"></div></a>';
}
//保存权限
function savePermission(){
	var p=$('#tg').treegrid("getSelections");
	var c=$('#dg').treegrid("getSelections");
	var pIds="";
	for(var i=0;j=p.length,i<j;i++){
		pIds+=p[i].id+",";
	}
	easyExt.ajax({url:easyExt.url+"/sys_role/saveRolePrivilege?roleId="+c[0].id+"&privilegeIds="+pIds},function(data, status, xhr){
		if(data){
			$.messager.alert("提示", "保存权限成功！", "info");
		}
	});
}