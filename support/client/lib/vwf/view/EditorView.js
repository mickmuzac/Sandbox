"use strict";
define(["module", "version", "vwf/view", "vwf/view/editorview/alertify.js-0.3.9/src/alertify","vwf/view/editorview/Menubar","vwf/view/editorview/ObjectPools","vwf/view/editorview/LocationTools", "vwf/view/editorview/WindowResize","vwf/view/editorview/_PermissionsManager", "vwf/view/editorview/InputSetup", "vwf/view/editorview/SaveLoadTimer", "vwf/view/editorview/TouchHandler", "vwf/view/editorview/SidePanel", "vwf/view/editorview/Toolbar", "vwf/view/editorview/ChatSystemGUI", "vwf/view/editorview/PrimitiveEditor", "vwf/view/editorview/MaterialEditor", "vwf/view/editorview/Notifier", "vwf/view/editorview/ScriptEditor", "vwf/view/editorview/Editor", "vwf/view/editorview/_3DRIntegration", "vwf/view/editorview/InventoryManager", "vwf/view/editorview/HeirarchyManager",  "vwf/view/editorview/DataManager", "vwf/view/editorview/UserManager", "vwf/view/editorview/help","vwf/view/editorview/SideTabs"], function (module, version, view)
{
	return view.load(module,
	{
		// == Module Definition ====================================================================
		initialize: function ()
		{
			
			
			$(document.head).append('<link rel="stylesheet" type="text/css" href="vwf/view/editorview/ddsmoothmenu.css" />');
			$(document.head).append('<link rel="stylesheet" type="text/css" href="vwf/view/editorview/ddsmoothmenu-v.css" />')
			$(document.head).append('<link rel="stylesheet" type="text/css" href="vwf/view/editorview/Editorview.css" />')
			$(document.head).append('<link rel="stylesheet" type="text/css" href="vwf/view/editorview/alertify.js-0.3.9/themes/alertify.core.css" />')
			$(document.head).append('<link rel="stylesheet" type="text/css" href="vwf/view/editorview/alertify.js-0.3.9/themes/alertify.bootstrap.css" />')
			
			
			$(document.head).append('<script src="vwf/model/threejs/helvetiker_regular.typeface.js"></script>');
			$(document.head).append('<script src="vwf/model/threejs/tinyxmlw3cdom.js"></script>');
			$(document.head).append('<script src="vwf/model/threejs/tinyxmlsax.js"></script>');
			$(document.head).append('<script src="vwf/model/threejs/tinyxmlxpath.js"></script>');
			
			if (!window._EditorInitialized)
			{
				jQuery.extend(
				{
					parseQuerystring: function ()
					{
						var nvpair = {};
						var qs = window.location.search.replace('?', '');
						var pairs = qs.split('&');
						$.each(pairs, function (i, v)
						{
							var pair = v.split('=');
							nvpair[pair[0]] = pair[1];
						});
						return nvpair;
					}
				});
				
					
					console.log('initialize Index-vwf');
					
					window._DataManager = require("vwf/view/editorview/DataManager").getSingleton();;
					
					
					var instanceData = _DataManager.getInstanceData() || {};
					
					var needTools = instanceData && instanceData.publishSettings? instanceData.publishSettings.allowTools : true;
					//set the title of the window to the title of the world.
					document.title = instanceData.title;
					
					window._Editor = require("vwf/view/editorview/Editor").getSingleton();
					if(needTools)
					{

						var data = $.ajax('vwf/view/editorview/menus.html',
						{
							async: false,
							dataType: 'html'
						}).responseText;
						$(document.body).append(data);
						$(document.head).append('<script type="text/javascript" src="vwf/view/editorview/ddsmoothmenu.js"></script>');
					
					
						require("vwf/view/editorview/SidePanel").initialize();
						//initialize the primitive editor
						
						//initialize the primitive editor
						window._PrimitiveEditor = require("vwf/view/editorview/PrimitiveEditor").getSingleton();
						//initialize the Material editor
						window._MaterialEditor = require("vwf/view/editorview/MaterialEditor").getSingleton();
						window._MaterialEditor.hide();
						window._Notifier = require("vwf/view/editorview/Notifier").getSingleton();
						window._ScriptEditor = require("vwf/view/editorview/ScriptEditor").getSingleton();;
						window._ModelLibrary = require("vwf/view/editorview/_3DRIntegration").getSingleton();
						
						window._InventoryManager = require("vwf/view/editorview/InventoryManager").getSingleton();;
						window.HierarchyManager = require("vwf/view/editorview/HeirarchyManager").getSingleton();;
						window._PermissionsManager = require("vwf/view/editorview/_PermissionsManager").getSingleton();
					}
					window._LocationTools = require("vwf/view/editorview/LocationTools").getSingleton();
					window._UserManager = require("vwf/view/editorview/UserManager").getSingleton();;
					window.alertify = require("vwf/view/editorview/alertify.js-0.3.9/src/alertify");

					if(needTools)
					{
						require("vwf/view/editorview/help").getSingleton();
						$(document.head).append('<script type="text/javascript" src="vwf/view/editorview/PainterTool.js"></script>');
						$(document.head).append('<script type="text/javascript" src="vwf/view/editorview/AlignTool.js"></script>');
						$(document.head).append('<script type="text/javascript" src="vwf/view/editorview/SplineTool.js"></script>');
						$(document.head).append('<script type="text/javascript" src="vwf/view/editorview/TerrainTool.js"></script>');
						$(document.head).append('<script type="text/javascript" src="vwf/view/editorview/jquery.qtip-1.0.0-rc3.min.js"></script>');
						$(document.head).append('<script type="text/javascript" src="vwf/view/editorview/beautify.module.js"></script>');
					}

					$(document.head).append('<script type="text/javascript" src="vwf/view/editorview/sha256.js"></script>');
					$(document.head).append('<script type="text/javascript" src="vwf/view/editorview/jquery.ui.touch-punch.min.js"></script>');

					require("vwf/view/editorview/WindowResize").initialize();
					$('input[type="text"]').keypress(function(e){e.stopImmediatePropagation();});
					
					
					this.addManager(_UserManager);
					this.addManager(_InventoryManager);
					this.addManager(HierarchyManager);
					this.addManager(_PermissionsManager);
					this.addManager(_ScriptEditor);
					this.addManager(_ModelLibrary);
					this.addManager(_Notifier);
					this.addManager(_MaterialEditor);
					this.addManager(_PrimitiveEditor);
					this.addManager(_DataManager);


					//  $(document).ready(function(){
					//	});
				
			}
		},
		managers:[],
		addManager:function(manager)
		{
			this.managers.push(manager);
			manager.sendMessage = this.sendMessage;
			manager.getParent = function(){return this;}.bind(this);

		},
		_sendMessage:function(message,data,sender)
		{
			
			for(var i=0; i < this.managers.length; i++)
			{
				var manager = this.managers[i];
				if(manager[message] && (typeof manager[message] == "function"))
				{
					var tret = null;
					if(data && data.constructor == Array)
						tret = manager[message].apply(manager,data);
					else
						tret = manager[message].apply(manager,[data]);
					return tret;
				}
				else if(manager.receiveMessage)
				{
					var tret = manager.receiveMessage(message,data,sender);
					if(tret)
						return tret;
				}
			}
			return null;
		},
		sendMessage:function(message,data)
		{
			return this.getParent()._sendMessage(message,data,this);
		},
		viewAPINotify:function(functionName,data)
		{
			for(var i=0; i < this.managers.length; i++)
			{
				var manager = this.managers[i];
				if(manager[functionName])
				{
					manager[functionName].apply(manager,data)
				}
			}
		},
		createdNode: function (nodeID, childID, childExtendsID, childImplementsIDs, childSource, childType, childURI, childName, callback /* ( ready ) */ )
		{
			this.viewAPINotify('createdNode',arguments);
		},
		
		initializedNode: function (nodeID, childID)
		{
			this.viewAPINotify('initializedNode',arguments);
			if (childID == 'index-vwf')
			{
				if(window._Editor)
				{
					_Editor.initialize();
					InitializeEditor();
				}
				
			}
			if (window._Editor && childID != 'index-vwf')
			{
				if (window._Editor.createNodeCallback != null)
				{
					window._Editor.CallCreateNodeCallback(childID, nodeID);
				}
			}
		},
		createdProperty: function (nodeID, propertyName, propertyValue)
		{
			this.viewAPINotify('createdProperty',arguments);
		},
		initializedProperty: function (nodeID, propertyName, propertyValue)
		{
			this.viewAPINotify('initializedProperty',arguments);
		},
		deletedNode: function (nodeID)
		{
			this.viewAPINotify('deletedNode',arguments);
			if (window._Editor && _Editor.SelectedVWFID == nodeID)
			{
				_Editor.SelectObject(null);
			}
		},
		satProperty: function (nodeID, propertyName, propertyValue)
		{
			this.viewAPINotify('satProperty',arguments);
			if (window._Editor && propertyName == _Editor.transformPropertyName && _Editor.isSelected(nodeID))
			{
				_Editor.updateBoundsTransform(nodeID);
				if(vwf.client() == vwf.moniker())
				{
					if(_Editor.waitingForSet.length)
						_Editor.waitingForSet.splice(_Editor.waitingForSet.indexOf(nodeID), 1);
				
				}
				if (_Editor.waitingForSet.length == 0 || vwf.client() != vwf.moniker())
				{
					_Editor.updateGizmoLocation();
					_Editor.updateGizmoSize();
					_Editor.updateGizmoOrientation(false);
				}
				$(document).trigger('selectionTransformedLocal',[{id:nodeID}]);
			}
			
			if(window._PrimitiveEditor)
				_PrimitiveEditor.NodePropertyUpdate(nodeID, propertyName, propertyValue);
		},
		createdMethod: function (nodeID, methodName, methodParameters, methodBody)
		{
			this.viewAPINotify('createdMethod',arguments);
		},
		calledMethod: function (nodeID, methodName, methodParameters)
		{
			this.viewAPINotify('calledMethod',arguments);
		},
		createdEvent: function (nodeID, eventName, eventParameters)
		{
			this.viewAPINotify('createdEvent',arguments);
		},
		firedEvent: function (nodeID, eventName, eventParameters)
		{
			this.viewAPINotify('firedEvent',arguments);
		},
		executed: function (nodeID, scriptText, scriptType)
		{
			this.viewAPINotify('executed',arguments);
		},
	});
});

function InitializeEditor()
{

	var instanceData = _DataManager.getInstanceData() || {};				
	var needTools = instanceData && instanceData.publishSettings? instanceData.publishSettings.allowTools : true;

	document._UserManager = _UserManager;
	$('#vwf-root').css('overflow', 'hidden');
	$(document.body).css('font-size', '10px');
	$('#tabs').css('z-index', '101');
	$('#AvatarChoice').buttonset();
	$('#vwf-root').attr('tabindex', '0');
	vwf.logger.level = 6;
	if (document.Players)
	{
		for (var i = 0; i < document.Players.length; i++)
		{
			_UserManager.PlayerCreated(document.Players[i]);
		}
	}

	require("vwf/view/editorview/InputSetup").initialize();

	if(needTools)
	{
		$('#sidepanel').css('height', $(window).height() - ($('#statusbar').height() + $('#toolbar').height() + $('#smoothmenu1').height()) + 'px')
		$('#sidepanel').jScrollPane();
		require("vwf/view/editorview/Toolbar").initialize();
		
		require("vwf/view/editorview/Menubar").initialize();
		require("vwf/view/editorview/SideTabs").initialize();
		require("vwf/view/editorview/ChatSystemGUI").initialize();
		$(document.head).append('<script type="text/javascript" src="vwf/view/localization/translate.js"></script>');
		translateMenu();
	}
	require("vwf/view/editorview/SaveLoadTimer").initialize();
	
	require("vwf/view/editorview/TouchHandler").initialize();
	
	$(document.body).css('overflow', 'hidden');
	$(window).resize();
	//	$('body *').not(':has(input)').not('input').disableSelection();
	//	$('#vwf-root').enableSelection();
	//	$('#vwf-root').parent().enableSelection();
	//	$('#vwf-root').parent().parent().enableSelection();
	//	$('#index-vwf').enableSelection();
	//	$('* :not(input)').disableSelection();
	
	//localization
	
	
}

function PlayerDeleted(e)
{
	$("#" + e + "label").remove();
}

function GUID()
{
	var S4 = function ()
	{
		return Math.floor(Math.random() * 0x10000 /* 65536 */ ).toString(16);
	};
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
