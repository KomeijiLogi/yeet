$(function(){
	//角色列表
	easyExt.initDataGrid('#dg','/t_receRange_base/findAllByPage');
	//easyExt.initTreeGrid('#tg','/sys_privilege/findAll'); saveRolePrivilegeAll
	
	$('.searchs').click(function(){
		 var t = $("#cc").combotree('tree'); // 得到树对象  
		 var n = t.tree('getSelected');
		 console.log(n);
		 if(n!=null){
			 var id= n.id;
			 //重新加载页面 带值传入
				$('#tg').datagrid({
					 url: easyExt.url+'/t_yun_person/findAllByPage',
					 striped: true,
					 fit : true,
					 method: 'get',
					 autoRowHeight:false,
					 queryParams: {
							id: id
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
						/* $('.idinput1').val(row.id);
						 $(id).datagrid('tooltip');*/
					 }
				 });
			 
		 }else{
			 easyExt.initDataGrid('#tg','/t_yun_person/findAllByPage');
		 }
		 

		/* easyExt.initDataGrid('#tg','/t_yun_person/findAllByPage?orgid='+id);*/
		
	});

	
	
	//删除角色
	$("#del").click(function(){
		var selRows=$('#dg').datagrid('getSelections');
		easyExt.del(selRows,'/t_receRange_base/deleteBatch',function(){//删除成功后执行的动作，一般用于刷新datagrid
			$('#dg').datagrid('reload'); 
			$('#dg').datagrid('clearSelections'); //清除选择项
		});
	});
	//添加角色
	$("#add").click(function(){
		easyExt.add('/t_receRange_base/addOne',function(){
			$('#dg').datagrid('reload'); 
		});
	});
	//修改角色
	$("#edit").click(function(){
		var selRows=$('#dg').datagrid('getSelections');
		easyExt.edit(selRows,'/t_receRange_base/updateOne',function(){//删除成功后执行的动作，一般用于刷新datagrid
			$('#dg').datagrid('reload'); 
		});
	});
	
	//搜索实现
	$("#search3").click(function(){
		$('#tg5').datagrid('load',$('#tForm3').serializeJson());
	});
	
	//保存权限
	$("#add_pri").click(function(){
		var selRows=$('#dg').datagrid('getSelections');//返回选中行
		if(selRows.length==0){
			$.messager.alert("提示", "请选择要修改的接收范围！", "info");  
			return;
		}else if(selRows.length==1){
			addPri(selRows[0]);
		}else{
			$.messager.alert("提示", "只能单项修改,请选择一行！", "info");
		}
	});
	
	function addPri(role){
		$('#userRole').dialog({
			title:'人员范围列表',  
			buttons:[{
				text:'保存当前及其子部门全部人员',
				handler:function(){
					 var t = $("#cc").combotree('tree'); // 得到树对象  
					 var n = t.tree('getSelected');
					 var id = -1;
					 if(n!=null){
						 id= n.id; 
					 }
					easyExt.ajax({
						url:easyExt.url+"/t_receRange_base/saveRolePrivilegeAll?status=all&roleId="+role.id+"&openid="+id},
					function(data, status, xhr){
						if(data){
							$.messager.alert("提示", "保存成功！", "info");
							$('#userRole').dialog('close');
						}else{
							$.messager.alert("提示", "保存失败！", "info");
							$('#userRole').dialog('close');
						}
						$('#cc').combotree('clear');
					});
					
				}
			},{
					text:'保存当前选中人员',
					handler:function(){
						var p=$('#tg').treegrid("getSelections");
						var pIds="";
						for(var i=0;j=p.length,i<j;i++){
							pIds+=p[i].openId+",";
						}
						easyExt.ajax({
							url:easyExt.url+"/t_receRange_base/saveRolePrivilegeAll?status=sum&roleId="+role.id+"&openid="+pIds},
						function(data, status, xhr){
							if(data){
								$.messager.alert("提示", "保存成功！", "info");
								$('#userRole').dialog('close');
							}else{
								$.messager.alert("提示", "保存失败！", "info");
								$('#userRole').dialog('close');
							}
							$('#cc').combotree('clear');
						});
						
					}
				},{
					text:'取消',
					handler:function(){
						$('#cc').combotree('clear');
						$('#userRole').dialog('close');
				}
		    }]
		});
		
		$('#userRole').dialog('open');
		//easyExt.initDataGrid('#tg','/t_yun_person/findAllByPage');
		easyExt.initDataGrid('#tg','/t_yun_person/findAllByPage');
		
		$('#cc').combotree({
		    url:easyExt.url+'/t_receRange_base/getMenu',
			width:180,
			method:'GET',
			iconCls: 'iconCls',
		    animate:true
		});
		
		$('#tg').datagrid({
			onLoadSuccess: function() {
				$('#tg').datagrid('tooltip');
				easyExt.ajax({url:easyExt.url+"/t_yun_person/getRolePri",type:'get',data:{roleId:role.id}},function(data,status, xhr){
					if(data){
						for(var i=0,j=data.length;i<j;i++){
							$('#tg').datagrid('selectRecord',data[i].columns.id);
						}
					} 
				});
		     }
		});
		$('#tg').datagrid('clearSelections'); //清除选择项
		
	}
	
	
	//保存权限
	$("#add_pri1").click(function(){
		var selRows=$('#dg').datagrid('getSelections');//返回选中行
		if(selRows.length==0){
			$.messager.alert("提示", "请选择要修改的接收范围！", "info");  
			return;
		}else if(selRows.length==1){
			addPri1(selRows[0]);
		}else{
			$.messager.alert("提示", "只能单项修改,请选择一行！", "info");
		}
	});
	
	function addPri1(role){
		$('#userRole1').dialog({
			title:'人员范围列表',  
			buttons:[{
					text:'删除当前选中人员',
					handler:function(){
						var p=$('#tg5').treegrid("getSelections");
						var pIds="";
						for(var i=0;j=p.length,i<j;i++){
							pIds+=p[i].openId+",";
						}
						easyExt.ajax({
							url:easyExt.url+"/t_receRange_base/delUserAll?roleId="+role.id+"&openid="+pIds},
						function(data, status, xhr){
							if(data){
								$.messager.alert("提示", "保存成功！", "info");
								$('#userRole1').dialog('close');
							}else{
								$.messager.alert("提示", "保存失败！", "info");
								$('#userRole1').dialog('close');
							}
						});
						
					}
				},{
					text:'取消',
					handler:function(){
						$('#userRole1').dialog('close');
				}
		    }]
		});
		
		$('#userRole1').dialog('open');
		$('.idinput2').val(role.id);
		$('#tg5').datagrid({
			 url: easyExt.url+'/t_yun_person/findAllUserByPage',
			 striped: true,
			 fit : true,
			 method: 'get',
			 autoRowHeight:false,
			 queryParams: {
					id: role.id
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
		

		
		$('#tg5').datagrid('clearSelections'); //清除选择项
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