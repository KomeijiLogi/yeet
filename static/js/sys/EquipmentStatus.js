$(function() {
	//初始化表格
	easyExt.initDataGrid('#dg','/t_equipment_status/findAllByPage');
	//搜索实现
	$("#search").click(function(){
		$('#dg').datagrid('load',$('#tForm').serializeJson());
	});
	$('#dept').combotree({
		method: 'get',
	    url: easyExt.url+'/sys_department/tree'
	});
	
	function getUserRole(user) {
		var json={};
		var roleId="";
		$('#userRole').dialog({
			title:'用户角色管理',  
			buttons:[{
					text:'确认',
					handler:function(){
						var role=$('#ur_dg').datagrid('getSelections');
						for(var i=0,j=role.length;i<j;i++){
							roleId+=role[i].id+",";
						}
					    easyExt.ajax({url:easyExt.url+"/sys_role/saveUserRole?userId="+user.id+"&roleId="+roleId},function(data,status,xhr){
					    	$.messager.alert("提示", "请求成功！", "info");
					    });
						$('#userRole').dialog('close');
					}
				},{
					text:'取消',
					handler:function(){
						$('#userRole').dialog('close');
				}
		    }]
		});
		$('#userRole').dialog('open');
		easyExt.initDataGrid('#ur_dg','/sys_role/findAllByPage');
		$('#ur_dg').datagrid({
			onLoadSuccess: function() {
				$('#ur_dg').datagrid('tooltip');
				easyExt.ajax({url:easyExt.url+"/sys_role/getUserRole",type:'get',data:{userId:user.id}},function(data,status,xhr){
					if(data){
						for(var i=0,j=data.length;i<j;i++){
							$('#ur_dg').datagrid('selectRecord',data[i].columns.id);
						}
					}
				});
		     }
		});
		$('#ur_dg').datagrid('clearSelections'); //清除选择项
	}
});