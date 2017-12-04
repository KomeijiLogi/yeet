$(function(){
	//角色列表
	easyExt.initDataGrid('#dg','/t_cloumn_base/findAllByPage');
	//easyExt.initTreeGrid('#tg','/sys_privilege/findAll'); 
	//删除角色
	$("#del").click(function(){
		var selRows=$('#dg').datagrid('getSelections');
		easyExt.del(selRows,'/t_cloumn_base/deleteBatch',function(){//删除成功后执行的动作，一般用于刷新datagrid
			$('#dg').datagrid('reload'); 
			$('#dg').datagrid('clearSelections'); //清除选择项
		});
	});
	//添加角色
	$("#add").click(function(){
		easyExt.add('/t_cloumn_base/addOne',function(){
			$('#dg').datagrid('reload'); 
		});
	});
	//修改角色
	$("#edit").click(function(){
		var selRows=$('#dg').datagrid('getSelections');
		easyExt.edit(selRows,'/t_cloumn_base/updateOne',function(){//删除成功后执行的动作，一般用于刷新datagrid
			$('#dg').datagrid('reload'); 
		});
	});
	

});