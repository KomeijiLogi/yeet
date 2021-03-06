$(function() {
	//权限列表
	//easyExt.initTreeGridMenu('#tg','/t_base_menu/getMenu'); 
	//easyExt.initDataGridMenu('#dg','/t_base_menu/findAllByPage');
	easyExt.initTreeGrid('#tg','/t_base_menu/getMenu'); 
	easyExt.initDataGrid('#dg','/t_base_menu/findAllByPage');
	
	//删除权限
	$("#del").click(function(){
		var selRows=$('#dg').treegrid('getSelections');
		easyExt.del(selRows,'/t_base_menu/deleteBatch',function(){//删除成功后执行的动作，一般用于刷新datagrid
			$('#tg').treegrid('reload'); 
			$('#dg').datagrid('reload');
			$('#dg').datagrid('clearSelections'); //清除选择项
			$('#tg').datagrid('clearSelections'); //清除选择项
		});
	});
	//添加权限
	$("#add").click(function(){
		//上级菜单
		$('#parent').combotree({
			width:180,
			method:'POST',
		    url: easyExt.url+'/t_base_menu/getMenu',
			iconCls: 'iconCls',
		    animate:true
		}); 
		
		
		
		easyExt.add('/t_base_menu/addOne',function(){
			$('#tg').treegrid('reload'); 
			$('#dg').datagrid('reload'); 
		});
	});
	//修改权限
	$("#edit").click(function(){
		//上级菜单
		$('#parent').combotree({
			width:180,
			method:'GET',
		    url: easyExt.url+'/t_base_menu/getMenu',
			iconCls: 'iconCls',
		    animate:false
		});
		var selRows=$('#dg').treegrid('getSelections');
		easyExt.edit(selRows,'/t_base_menu/updateOne',function(){
			$('#tg').treegrid('reload');
			$('#dg').datagrid('reload');
		});
	
	});
	//添加基本权限
//	$("#addPermission").click(function(){
//		var selRows=$('#tg').treegrid('getSelections');//返回选中行
//		easyExt.ajax({url:easyExt.url+"/sys_privilege/addPermission?pId="+selRows[0].id,type:'GET'},function(data, status, xhr){
//			if(data){
//				$.messager.alert("提示", "添加基本权限成功！", "info");
//			}
//		});
//	});
	
});
