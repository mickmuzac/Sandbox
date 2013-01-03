function PrimitiveEditor()
{
	
	
		
	
	$(document.body).append("<div id='ShareWithDialog'> <select id='ShareWithNames'/> </div>");
	$('#ShareWithDialog').dialog({title:"Share With User",autoOpen:false,moveable:false,modal:true,resizable:false,open:function()
	{
	$('#ShareWithNames').empty();
		for(var i =0; i < document.Players.length; i++)
		{
			$('#ShareWithNames').append("<option value='"+document.Players[i]+"'>" + document.Players[i]+"</option>");
		}
		if(!_Editor.GetSelectedVWFNode())
		{
			_Notifier.notify('No object selected');
			$('#ShareWithDialog').dialog('close');
		}
	},buttons:{Ok:function()
	{
		var owner = vwf.getProperty(_Editor.GetSelectedVWFNode().id,'owner');
		if(typeof owner === "string")
			owner = [owner];
		owner = owner.slice(0);	
		owner.push($('#ShareWithNames').val());
		_Editor.setProperty(_Editor.GetSelectedVWFNode().id,'owner',owner);
		$('#ShareWithDialog').dialog('close');
	},Cancel:function(){
	
	}}});
	
	$('#sidepanel').append("<div id='PrimitiveEditor'>" +
	"<div id='primeditortitle' style = 'padding:3px 4px 3px 4px;font:1.5em sans-serif;font-weight: bold;' class='ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix' ><span class='ui-dialog-title' id='ui-dialog-title-Players'>Object Properties</span></div>"+
					'<div id="accordion" style="height:100%;overflow:hidden">'+
						'<h3><a href="#">Flags</a></h3>'+
						'<div>'+
							"<div id='otherprops'>"+
							"<input class='TransformEditorInput' style='width:50%;margin: 7px 2px 6px 0px;text-align: center;vertical-align: middle;' type='text' id='dispName'>Name</input><br/>"+
							"<input disabled='disabled' class='TransformEditorInput' style='width:50%;margin: 7px 2px 6px 0px;text-align: center;vertical-align: middle;' type='text' id='dispOwner'>Owners</input><br/>"+
							"<input style='margin: 7px 2px 6px 0px;text-align: center;vertical-align: middle;' type='checkbox' id='isTransparent'>Transparent</input><br/>"+
							"<input style='margin: 7px 2px 6px 0px;text-align: center;vertical-align: middle;' type='checkbox' id='isStatic'>Static</input><br/>"+
							"</div>"+
						'</div>'+		
						'<h3><a href="#">Transforms</a></h3>'+
						'<div>'+
							"<div class='EditorLabel'>Translation</div>" +
							"<div id='Translation'>" +
							"<input type='number' class='TransformEditorInput' id='PositionX'/>" +
							"<input type='number' class='TransformEditorInput' id='PositionY'/>" +
							"<input type='number' class='TransformEditorInput' id='PositionZ'/>" +
							"</div>"+
							"<div class='EditorLabel'>Rotation</div>" +
							"<div id='Rotation'>" +
							"<input type='number' class='TransformEditorInput' id='RotationX'/>" +
							"<input type='number' class='TransformEditorInput' id='RotationY'/>" +
							"<input type='number' class='TransformEditorInput' id='RotationZ'/>" +
							"<input type='number' class='TransformEditorInput' id='RotationW'/>" +
							"</div>"+
							"<div class='EditorLabel'>Scale</div>" +
							"<div id='Scale'>" +
							"<input type='number' class='TransformEditorInput' id='ScaleX'/>" +
							"<input type='number' class='TransformEditorInput' id='ScaleY'/>" +
							"<input type='number' class='TransformEditorInput' id='ScaleZ'/>" +
							"</div>"+
						'</div>'+					
									
					'</div>'	
					
					);
		$('#primeditortitle').append('<a id="primitiveeditorclose" href="#" class="ui-dialog-titlebar-close ui-corner-all" role="button" style="display: inline-block;float: right;"><span class="ui-icon ui-icon-closethick">close</span></a>');
		$('#primeditortitle').prepend('<img class="headericon" src="../vwf/view/editorview/images/icons/properties.png" />');
		$('#primitiveeditorclose').click(function()
		{
			_PrimitiveEditor.hide();
			
		});
		$('#isTransparent').change(function(e){_PrimitiveEditor.setProperty(_Editor.GetSelectedVWFNode().id,'transparent',this.checked)});
		$('#dispName').blur(function(e)
			{
				if(vwf.getProperty(_Editor.GetSelectedVWFNode().id,'DisplayName') === undefined)
				{
					vwf.createProperty(_Editor.GetSelectedVWFNode().id,'DisplayName',$(this).val());
				}
				_PrimitiveEditor.setProperty(_Editor.GetSelectedVWFNode().id,'DisplayName',$(this).val());
			});
		$('#PrimitiveEditor').css('border-bottom','5px solid #444444')
		$('#PrimitiveEditor').css('border-left','2px solid #444444')
		//$('#PrimitiveEditor').resizable({
        //    maxHeight: 550,
        //    maxWidth: 320,
        //    minHeight: 150,
        //    minWidth: 320
        //});
	//$('#PrimitiveEditor').dialog({title:'Primitive Editor',autoOpen:false, 
	//	resize:function(){
	//		$( "#accordion" ).accordion( "resize" );
	//		this.updateOtherWindows();
	//	}.bind(this),
	//	close:function(){
	//		this.updateOtherWindows();
	//	}.bind(this)
	//});
	$( "#accordion" ).accordion({
			fillSpace: true,
			heightStyle: "content"
		});
	$( ".ui-accordion-content").css('height','auto');	
	this.show = function()
	{
		//$('#PrimitiveEditor').dialog('open');
		//$('#PrimitiveEditor').dialog('option','position',[1282,40]);
		
		$('#PrimitiveEditor').prependTo($('#PrimitiveEditor').parent());
		$('#PrimitiveEditor').show('blind',function()
		{
			
		});
		showSidePanel();
		
		this.SelectionChanged(null,_Editor.GetSelectedVWFNode());
		this.open =true;
	}
	this.hide = function()
	{
		//$('#PrimitiveEditor').dialog('close');
		$('#PrimitiveEditor').hide('blind',function(){if(!$('#sidepanel').children().is(':visible'))
				hideSidePanel();});
	}
	this.isOpen = function()
	{
		//return $("#PrimitiveEditor").dialog( "isOpen" )
		return $('#PrimitiveEditor').is(':visible')
	}
	this.setProperty = function(id,prop,val)
	{
		if(document.PlayerNumber == null)
		{
			_Notifier.notify('You must log in to participate');
			return;
		}
		if(!_Editor.isOwner(id,_UserManager.GetCurrentUserName()))
		{
			_Notifier.notify('You do not have permission to edit this object');
			return;
		}
		vwf_view.kernel.setProperty(id,prop,val)
	}
	this.SelectionChanged = function(e,node)
	{
		try{
		
			if(node)
			{
				
				$( "#accordion" ).accordion('destroy');
				$( "#accordion" ).children('.modifiersection').remove();
				//update to ensure freshness
				node = vwf.getNode(node.id);
				node.properties = vwf.getProperties(node.id);
				if(!node.properties)
					return;
				
				$('#dispName').val(vwf.getProperty(node.id,'DisplayName'));
				if($('#dispName').val() == "")
				{
					$('#dispName').val(node.name);
				}
				$('#dispOwner').val(vwf.getProperty(node.id,'owner'));
				if(vwf.getProperty(node.id,'transparent'))
				{
					$('#isTransparent').attr('checked','checked');
				}else
				{
					$('#isTransparent').removeAttr('checked');
				}
				$('#BaseSectionTitle').html(node.properties.type + ": " + node.id);
				this.SelectionTransformed(null,node);
				this.setupEditorData(node);
				this.recursevlyAddModifiers(node);
				
				$( "#accordion" ).accordion({fillSpace: true});
				$( ".ui-accordion-content").css('height','auto');	
				this.updateOtherWindows();
			}
		}
		catch(e)
		{
			console.log(e);
		}
	}
	this.updateOtherWindows= function()
	{
				$('#materialeditor').dialog('option','position',[1282,40]);
				if(this.isOpen())
				{
					var t = $('#PrimitiveEditor').closest('.ui-dialog').height()+$('#PrimitiveEditor').offset().top;
					$('#materialeditor').dialog('option','position',[1282,t-20]);
				}
				
	}
	this.recursevlyAddModifiers = function(node)
	{
		for(var i in node.children)
		{
		/*	section = '<h3 class="modifiersection" ><a href="#">'+node.children[i].properties.type+'</a></h3>'+
			'<div class="modifiersection">'+
			'<div class="EditorLabel">Amount</div>' +
					'<div id="'+node.children[i].id+'Amount" nodename="'+node.children[i].id+'">'
			'</div>';
			$( "#accordion" ).append(section);
			//$("#Radius").slider({min:0,max:10,step:.10,slide:this.updateSize.bind(this)});
			$("#"+node.children[i].id+"Amount").slider({min:-1,max:1,step:.10,slide:this.modifierAmountUpdate,stop:this.modifierAmountUpdate});
			//$("#"+node.children[i].id+"Amount").slider('value',vwf.getProperty(node.children[i].id,'amount'));
			*/
			if(vwf.getProperty(node.children[i].id,'isModifier') == true)
			{
				this.setupEditorData(node.children[i]);
				this.recursevlyAddModifiers(node.children[i]);
			}
		}
	}
	this.primPropertyUpdate = function(e,ui)
	{
		
		var id = $(this).attr('nodename');
		var prop = $(this).attr('propname');
		$('#'+id+prop+'value').val(ui.value);
		var amount = ui.value;
		_PrimitiveEditor.setProperty(id,prop,parseFloat(amount));
	}
	this.primPropertyTypein = function(e,ui)
	{
		
		var id = $(this).attr('nodename');
		var prop = $(this).attr('propname');
		var amount = $(this).val();
		var slider = $(this).attr('slider');
		$(slider).slider('value',amount);
		_PrimitiveEditor.setProperty(id,prop,parseFloat(amount));
	}
	this.primPropertyValue = function(e,ui)
	{
		
		var id = $(this).attr('nodename');
		var prop = $(this).attr('propname');
		var val = $(this).attr('value');
		_PrimitiveEditor.setProperty(id,prop,val);
	}
	this.primPropertyChecked = function(e,ui)
	{
		
		var id = $(this).attr('nodename');
		var prop = $(this).attr('propname');
		if($(this).attr('checked') == 'checked')
			_PrimitiveEditor.setProperty(id,prop,true);
		else
			_PrimitiveEditor.setProperty(id,prop,false);
		
	}
	this.setupEditorData = function(node)
	{
		
		var editordata = vwf.getProperty(node.id,'EditorData');
		editordatanames = [];
		for(var i in editordata)
		{
			editordatanames.push(i);
		}
		editordatanames.sort();
		
		section = '<h3 class="modifiersection" ><a href="#">'+node.properties.type+'</a></h3>'+
			'<div class="modifiersection" id="basicSettings'+node.id+'">'+
			'</div>';
			$( "#accordion" ).append(section);
		for(var j =0; j<editordatanames.length; j++)
		{	
			var i = editordatanames[j];
			
			if(editordata[i].type == 'slider')
			{
				var inputstyle = "";
				$('#basicSettings'+node.id).append('<div style="display:inline-block;margin-bottom: 3px;margin-top: 3px;">'+editordata[i].displayname+': </div>');
				$('#basicSettings'+node.id).append('<input class="primeditorinputbox" style="'+inputstyle+'" type="number" id="'+node.id+editordata[i].property+'value"></input>');
				$('#'+node.id+editordata[i].property+'value').val(vwf.getProperty(node.id,editordata[i].property));
				$('#'+node.id+editordata[i].property+'value').change(this.primPropertyTypein);
				$('#'+node.id+editordata[i].property+'value').attr("nodename",node.id);
				$('#'+node.id+editordata[i].property+'value').attr("propname",editordata[i].property);
				$('#'+node.id+editordata[i].property+'value').attr("slider",'#'+node.id+i);
				$('#basicSettings'+node.id).append('<div id="'+node.id+i+'" nodename="'+node.id+'" propname="'+editordata[i].property+'"/>');
				var val = vwf.getProperty(node.id,editordata[i].property);
				if(val == undefined) val = 0;
				$('#'+node.id+i).slider({step:parseFloat(editordata[i].step),min:parseFloat(editordata[i].min),max:parseFloat(editordata[i].max),slide:this.primPropertyUpdate,stop:this.primPropertyUpdate,value:val});
			}
			if(editordata[i].type == 'check')
			{
				$('#basicSettings'+node.id).append('<div><input style="vertical-align: middle" type="checkbox" id="'+i+node.id+'" nodename="'+node.id+'" propname="'+editordata[i].property+'"/><div style="display:inline-block;margin-bottom: 3px;margin-top: 3px;">'+editordata[i].displayname+': </div></div>');
				var val = vwf.getProperty(node.id,editordata[i].property);
				$('#'+i+node.id).click(this.primPropertyChecked);
				if(val == true)
				{
					$('#'+i+node.id).attr('checked','checked');
				}
				//$('#'+i).
			}
			if(editordata[i].type == 'choice')
			{
				
				var id = 'basicSettings'+node.id+editordata[i].property+'choices';
				$('#basicSettings'+node.id).append('<div style="display:inline-block;margin-bottom: 3px;margin-top: 3px;">'+editordata[i].displayname+': </div>');
				$('#basicSettings'+node.id).append('<form><div id="'+id+'"></div></form>');
				var val = vwf.getProperty(node.id,editordata[i].property);
				for(var k = 0; k < editordata[i].labels.length; k++)
				{
					var newid = id+editordata[i].labels[k];
					$('#' + id).append('<input type="radio" id="'+newid+'" name="Radio"/><label id="'+newid+'label'+'" for="'+newid+'">'+editordata[i].labels[k]+'</label>');
					$('#' + newid+'label').attr('propname',editordata[i].property);
					$('#' + newid+'label').attr('nodename',node.id);
					$('#' + newid+'label').attr('value',editordata[i].values[k]);
					$('#' + newid+'label').click(this.primPropertyValue);
					if(val == editordata[i].values[k])
						$('#' + newid).attr('checked','checked');
				}
				$('#' + id).buttonset();
				
				//$('#'+i).
			}
			if(editordata[i].type == 'rangeslider')
			{
				$('#basicSettings'+node.id).append('<div style="display:inline-block;margin-bottom: 3px;margin-top: 3px;">'+editordata[i].displayname+': </div>');
				$('#basicSettings'+node.id).append('<div style="display: block;margin: 5px;" id="'+node.id+i+'" nodename="'+node.id+'" propnamemax="'+editordata[i].property[2]+'" propnamemin="'+editordata[i].property[1]+'"/>');
				
				var setval = vwf.getProperty(node.id,editordata[i].property[0]);
				var minval = vwf.getProperty(node.id,editordata[i].property[1]);
				var maxval = vwf.getProperty(node.id,editordata[i].property[2]);
				var val = [minval || editordata[i].min, maxval || editordata[i].max]
				$('#'+node.id+i).slider({range:false,step:parseFloat(editordata[i].step),min:parseFloat(editordata[i].min),max:parseFloat(editordata[i].max),values:val,
					slide:function(e, ui)
					{
						var propmin = $(this).attr('propnamemin');
						var propmax = $(this).attr('propnamemax');
						var nodeid = $(this).attr('nodename');
						_PrimitiveEditor.setProperty(nodeid,propmin,parseFloat(ui.values[0]));
						_PrimitiveEditor.setProperty(nodeid,propmax,parseFloat(ui.values[1]));
					},
					stop:function(e, ui){
						var propmin = $(this).attr('propnamemin');
						var propmax = $(this).attr('propnamemax');
						var nodeid = $(this).attr('nodename');
						_PrimitiveEditor.setProperty(nodeid,propmin,parseFloat(ui.values[0]));
						_PrimitiveEditor.setProperty(nodeid,propmax,parseFloat(ui.values[1]));
					}
				});
			}
			if(editordata[i].type == 'rangevector')
			{
				var vecvalchanged = function(e)
				{
					debugger;
					var propname = $(this).attr('propname');
					var component = $(this).attr('component');
					var nodeid = $(this).attr('nodename');
					var thisid = $(this).attr('id');
					thisid = thisid.substr(0,thisid.length - 1);
					var x = $('#'+thisid+'X').val();
					var y = $('#'+thisid+'Y').val();
					var z = $('#'+thisid+'Z').val();
								
					_PrimitiveEditor.setProperty(nodeid,propname,[parseFloat(x),parseFloat(y),parseFloat(z)]);
				}
			
				$('#basicSettings'+node.id).append('<div style="display:inline-block;margin-bottom: 3px;margin-top: 3px;">'+editordata[i].displayname+': </div>');
				
				var baseid = 'basicSettings'+node.id+i+'min';
				
				$('#basicSettings'+node.id).append('<div style="text-align:right"><div style="display:inline" >min:</div> <div style="display:inline-block;">'+
															  '<input id="'+baseid+'X'+'" component="X" nodename="'+node.id+'" propname="'+editordata[i].property[0]+'" type="number" step="'+editordata[i].step+'" class="vectorinputfront"/>'+
															  '<input id="'+baseid+'Y'+'" component="Y" nodename="'+node.id+'" propname="'+editordata[i].property[0]+'" type="number" step="'+editordata[i].step+'" class="vectorinput"/>'+
															  '<input id="'+baseid+'Z'+'" component="Z" nodename="'+node.id+'" propname="'+editordata[i].property[0]+'" type="number" step="'+editordata[i].step+'" class="vectorinput"/>' +
													'</div></div>');
				
				var propmin = vwf.getProperty(node.id, editordata[i].property[0]);
				if(propmin)
				{
					$('#'+baseid+'X').val(propmin[0]);
					$('#'+baseid+'Y').val(propmin[1]);
					$('#'+baseid+'Z').val(propmin[2]);
				}
				$('#'+baseid+'X').change(vecvalchanged);
				$('#'+baseid+'Y').change(vecvalchanged);
				$('#'+baseid+'Z').change(vecvalchanged);
				
				baseid = 'basicSettings'+node.id+i+'max';
				
				
				$('#basicSettings'+node.id).append('<div style="text-align:right"><div style="display:inline">max:</div> <div style="display:inline-block;">'+
															  '<input id="'+baseid+'X'+'" component="X" nodename="'+node.id+'" propname="'+editordata[i].property[1]+'" type="number" step="'+editordata[i].step+'"  class="vectorinputfront"/>'+
															  '<input id="'+baseid+'Y'+'" component="Y" nodename="'+node.id+'" propname="'+editordata[i].property[1]+'" type="number" step="'+editordata[i].step+'"  class="vectorinput"/>'+
															  '<input id="'+baseid+'Z'+'" component="Z" nodename="'+node.id+'" propname="'+editordata[i].property[1]+'" type="number" step="'+editordata[i].step+'"  class="vectorinput"/>' +
													'</div></div>');									
				
				var propmax = vwf.getProperty(node.id, editordata[i].property[1]);
				if(propmax)
				{
					$('#'+baseid+'X').val(propmax[0]);
					$('#'+baseid+'Y').val(propmax[1]);
					$('#'+baseid+'Z').val(propmax[2]);
				}
				$('#'+baseid+'X').change(vecvalchanged);
				$('#'+baseid+'Y').change(vecvalchanged);
				$('#'+baseid+'Z').change(vecvalchanged);
			}
			if(editordata[i].type == 'map')
			{
				$('#basicSettings'+node.id).append('<div style="display: block;margin: 5px;" id="'+node.id+i+'" nodename="'+node.id+'" propname="'+editordata[i].property+'"/>');
				$('#'+node.id+i).button({label:editordata[i].displayname});
				$('#'+node.id+i).click(function(){
					
					
					_MapBrowser.setTexturePickedCallback(function(e)
					{
						
						var propname = $(this).attr('propname');
						var nodename = $(this).attr('nodename');
						_MapBrowser.setTexturePickedCallback(null);
						_PrimitiveEditor.setProperty(nodename,propname,e);
						_MapBrowser.hide();
					
					}.bind(this));
					_MapBrowser.show();
				});
			}
			if(editordata[i].type == 'color')
			{
				var colorswatchstyle = "margin: 5px;float:right;clear:right;background-color: #FF19E9;width: 25px;height: 25px;border: 2px solid lightgray;border-radius: 3px;display: inline-block;margin-left: 20px;vertical-align: middle;box-shadow: 2px 2px 5px,1px 1px 3px gray inset;background-image: url(vwf/view/editorview/images/select3.png);background-position: center;";
				$('#basicSettings'+node.id).append('<div style="margin-bottom:10px" id="'+node.id+i+'" />');
				$('#'+node.id+i+'').append('<div style="display:inline-block;margin-bottom: 3px;margin-top: 15px;">'+editordata[i].displayname+': </div>');
				$('#'+node.id+i+'').append('<div id="'+node.id+i+'ColorPicker" style="'+colorswatchstyle+'"></div>')
				var spec = [0,1,0];
				$('#'+node.id+i+'ColorPicker').css('background-color','rgb('+Math.floor(spec[0]*255)+','+Math.floor(spec[0]*255)+','+Math.floor(spec[0]*255)+')');
				
				var parentid = node.id+i+'ColorPicker';
				
				$('#'+node.id+i+'ColorPicker').ColorPicker({colorpickerId:parentid+'picker',onShow:function(e){$(e).fadeIn();},onHide:function(e){$(e).fadeOut();return false},
				
					
					onSubmit:function(hsb, hex, rgb)
					{
						
						$('#'+(this.attr('parentid'))).css('background-color',"#"+hex);
						_PrimitiveEditor.setProperty(this.attr('nodeid'),this.attr('propname'),[rgb.r/255,rgb.g/255,rgb.b/255]);

					},onChange:function(hsb, hex, rgb)
					{
						
						
						$('#'+(this.attr('parentid'))).css('background-color',"#"+hex);
						_PrimitiveEditor.setProperty(this.attr('nodeid'),this.attr('propname'),[rgb.r/255,rgb.g/255,rgb.b/255]);
					}
				
				});
				
				$('#'+$('#'+node.id+i+'ColorPicker').data('colorpickerId')).attr('parentid',parentid);;
				$('#'+$('#'+node.id+i+'ColorPicker').data('colorpickerId')).attr('propname',editordata[i].property);
				$('#'+$('#'+node.id+i+'ColorPicker').data('colorpickerId')).attr('nodeid',node.id);
				
			}
		}
		
		$('#basicSettings'+node.id).append('<div style="width: 100%;margin-top: 1em;" nodename="'+node.id+'" id="'+node.id+'deletebutton"/>');
		$('#'+node.id+'deletebutton').button({label:'Delete'});	
		$('#'+node.id+'deletebutton').click(this.deleteButtonClicked);	
		
	}
	this.deleteButtonClicked = function()
	{
		if(document.PlayerNumber == null)
		{
			_Notifier.notify('You must log in to participate');
			return;
		}
		var id = $(this).attr('nodename');
		if(!_Editor.isOwner(id,_UserManager.GetCurrentUserName()))
		{
			_Notifier.notify('You do not have permission to delete this object');
			return;
		}
		if(id == _Editor.GetSelectedVWFNode().id)
		{
			_Editor.DeleteSelection();

		}else
		{
			vwf_view.kernel.deleteNode(id);
			vwf_view.kernel.callMethod(_Editor.GetSelectedVWFNode().id,'dirtyStack');
			window.setTimeout(function(){_PrimitiveEditor.SelectionChanged(null,_Editor.GetSelectedVWFNode());},500);
		}

	}
	this.modifierAmountUpdate = function(e,ui)
	{
		
		var id = $(this).attr('nodename');
		var amount = ui.value;
		_PrimitiveEditor.setProperty(id,'amount',amount);
	}
	this.positionChanged = function()
	{
		var val = [0,0,0];
		val[0] = $('#PositionX').val();
		val[1] = $('#PositionY').val();
		val[2] = $('#PositionZ').val();
	
		this.setProperty(_Editor.GetSelectedVWFNode().id,'translation',val);
		
	}
	this.rotationChanged = function()
	{
		debugger;
		var val = [0,0,0,0];
		val[0] = $('#RotationX').val();
		val[2] = $('#RotationY').val();
		val[1] = $('#RotationZ').val();
		//val[3] = $('#RotationW').val();
		
		val[0] /= 57.2957795;
		val[1] /= 57.2957795;
		val[2] /= 57.2957795;
		
		var c1 = Math.cos(val[0]/2);
		var c2 = Math.cos(val[1]/2);
		var c3 = Math.cos(val[2]/2);
		var s1 = Math.sin(val[0]/2);
		var s2 = Math.sin(val[1]/2);
		var s3 = Math.sin(val[2]/2);
		
		var w = c1*c2*c3 - s1*s2*s3;
		var x = s1*s2*c3 + c1*c2*s3;
		var y = s1*c2*c3 + c1*s2*s3;
		var z = c1*s2*c3 - s1*c2*s3;
		
		var q = goog.vec.Quaternion.createFloat32FromValues(x,y,z,w);
		var axis = [0,0,0];
		var angle = goog.vec.Quaternion.toAngleAxis(q,axis);
		axis.push(angle * 57.2957795);
		this.setProperty(_Editor.GetSelectedVWFNode().id,'rotation',axis);
		
		
	}
	this.scaleChanged = function()
	{
		var val = [0,0,0];
		val[0] = $('#ScaleX').val();
		val[1] = $('#ScaleY').val();
		val[2] = $('#ScaleZ').val();
		
		this.setProperty(_Editor.GetSelectedVWFNode().id,'scale',val);
		
		
	}
	this.rotationMatrix_2_XYZ = function(m)
	{
		var theta1 = Math.atan2(m[6],m[10]);
		var c2 = Math.sqrt((m[0]*m[0] + m[1] * m[1]));
		var theta2 = Math.atan2(-m[2],c2);
		var s1 = Math.sin(theta1);
		var c1 = Math.cos(theta1);
		var theta3 = Math.atan2(s1*m[8]-c1*m[4], c1*m[5] - s1 * m[9]);
		return [theta1,theta2,theta3];
	}
	this.SelectionTransformed = function(e,node)
	{
		try{
			
			if(node)
			{
				
				var mat = _Editor.findviewnode(node.id).getLocalMatrix();
				var angles = this.rotationMatrix_2_XYZ(mat);
				var pos = vwf.getProperty(node.id,'translation');
				var rot = vwf.getProperty(node.id,'rotation');
				var scl = vwf.getProperty(node.id,'scale');
				$('#PositionX').val(Math.floor(pos[0]));
				$('#PositionY').val(Math.floor(pos[1]));
				$('#PositionZ').val(Math.floor(pos[2]));
				$('#RotationX').val(Math.floor(.05 + angles[1] * 57.2957795));
				$('#RotationY').val(Math.floor(.05 + angles[0] * -57.2957795));
				$('#RotationZ').val(Math.floor(.05 + angles[2] * 57.2957795));
				//$('#RotationW').val(rot[3]);
				$('#ScaleX').val(scl[0]);
				$('#ScaleY').val(scl[1]);
				$('#ScaleZ').val(scl[2]);
			}
		}
		catch(e)
		{
			 console.log(e);
		}
	}
	$(document).bind('selectionChanged',this.SelectionChanged.bind(this));
	$(document).bind('modifierCreated',this.SelectionChanged.bind(this));
	$(document).bind('selectionTransformedLocal',this.SelectionTransformed.bind(this));
//	$("#Radius").slider({min:0,max:10,step:.10,slide:this.updateSize.bind(this),stop:this.updateSize.bind(this)});
//	$("#Width").slider({min:0,max:10,step:.10,slide:this.updateSize.bind(this),stop:this.updateSize.bind(this)});
//	$("#Height").slider({min:0,max:10,step:.10,slide:this.updateSize.bind(this),stop:this.updateSize.bind(this)});
	$('#PositionX').change(this.positionChanged.bind(this));
	$('#PositionY').change(this.positionChanged.bind(this));
	$('#PositionZ').change(this.positionChanged.bind(this));
	$('#RotationX').change(this.rotationChanged.bind(this));
	$('#RotationY').change(this.rotationChanged.bind(this));
	$('#RotationZ').change(this.rotationChanged.bind(this));
	$('#RotationW').change(this.rotationChanged.bind(this));
	$('#ScaleX').change(this.scaleChanged.bind(this));
	$('#ScaleY').change(this.scaleChanged.bind(this));
	$('#ScaleZ').change(this.scaleChanged.bind(this));
	$('#RotationW').hide();
}
_PrimitiveEditor = new PrimitiveEditor();
_PrimitiveEditor.hide();