"use strict";

define( [ "module", "version", 
"vwf/view","vwf/view/editorview/Menubar",
"vwf/view/editorview/WindowResize",
"vwf/view/editorview/InputSetup",
"vwf/view/editorview/SaveLoadTimer",
"vwf/view/editorview/TouchHandler",
"vwf/view/editorview/SidePanel",
"vwf/view/editorview/Toolbar",
"vwf/view/editorview/ChatSystemGUI",
"vwf/view/editorview/PrimitiveEditor",
"vwf/view/editorview/MaterialEditor",
"vwf/view/editorview/Notifier",
"vwf/view/editorview/ScriptEditor",
"vwf/view/editorview/Editor",
"vwf/view/editorview/_3DRIntegration",
"vwf/view/editorview/InventoryManager",
"vwf/view/editorview/HeirarchyManager",
"vwf/view/editorview/GlobalInventoryManager",
"vwf/view/editorview/DataManager",
"vwf/view/editorview/UserManager",
"vwf/view/editorview/Help" ], function( module, version, view ) {

    return view.load( module, {

        // == Module Definition ====================================================================

        initialize: function() {

		 
		 $(document.head).append('<link rel="stylesheet" type="text/css" href="vwf/view/editorview/ddsmoothmenu.css" />');
			$(document.head).append('<link rel="stylesheet" type="text/css" href="vwf/view/editorview/ddsmoothmenu-v.css" />')
			$(document.head).append('<link rel="stylesheet" type="text/css" href="vwf/view/editorview/editorview.css" />')
			$(document.body).append($.get('vwf/view/editorview/menus.html',{async:false,datatype:'text'}).responseText);
            $(document.head).append('<script src="vwf/model/threejs/helvetiker_regular.typeface.js"></script>');
		  
		  if(!window._EditorInitialized)
	      {
			   
					  jQuery.extend({
					  parseQuerystring: function(){
						var nvpair = {};
						var qs = window.location.search.replace('?', '');
						var pairs = qs.split('&');
						$.each(pairs, function(i, v){
						  var pair = v.split('=');
						  nvpair[pair[0]] = pair[1];
						});
						return nvpair;
					  }
					});
			
					if($.parseQuerystring().Edit != 'false')
					{
						window._EditorInitialized = true;
						console.log('initialize Index-vwf');
						var data = $.ajax('vwf/view/editorview/menus.html',{async:false,dataType:'html'}).responseText;
						$(document.body).append(data);
						$(document.head).append('<script type="text/javascript" src="vwf/view/editorview/ddsmoothmenu.js"></script>');
						
						
						require("vwf/view/editorview/SidePanel").initialize();
					
						//initialize the primitive editor
						window._Editor = require("vwf/view/editorview/Editor");
						window._Editor.initialize();
						
						//initialize the primitive editor
						window._PrimitiveEditor = require("vwf/view/editorview/PrimitiveEditor");
						window._PrimitiveEditor.initialize();
						
						//initialize the Material editor
						window._MaterialEditor = require("vwf/view/editorview/MaterialEditor");
						window._MaterialEditor.initialize();
						window._MaterialEditor.hide();
						
						window._Notifier = require("vwf/view/editorview/Notifier");
						window._Notifier.initialize();
						
						window._ScriptEditor = require("vwf/view/editorview/ScriptEditor");
						window._ScriptEditor.initialize();
						
						window._ModelLibrary = require("vwf/view/editorview/_3DRIntegration");
						window._ModelLibrary.initialize();
						
						window._InventoryManager = require("vwf/view/editorview/InventoryManager");
						window._InventoryManager.initialize();
						
						window.HierarchyManager = require("vwf/view/editorview/HeirarchyManager");
						window.HierarchyManager.initialize();
						
						window._GlobalInventoryManager = require("vwf/view/editorview/GlobalInventoryManager");
						window._GlobalInventoryManager.initialize();
					
						window._DataManager = require("vwf/view/editorview/DataManager");
						window._DataManager.initialize();
						
						window._UserManager = require("vwf/view/editorview/UserManager");
						window._UserManager.initialize();
											
						require("vwf/view/editorview/Help").initialize();
						
						$(document.head).append('<script type="text/javascript" src="vwf/view/editorview/PainterTool.js"></script>');
						$(document.head).append('<script type="text/javascript" src="vwf/view/editorview/AlignTool.js"></script>');
						
						
						
						
						$(document.head).append('<script type="text/javascript" src="vwf/view/editorview/jquery.qtip-1.0.0-rc3.min.js"></script>');
						$(document.head).append('<script type="text/javascript" src="vwf/view/editorview/sha256.js"></script>');
						$(document.head).append('<script type="text/javascript" src="vwf/view/editorview/jquery.ui.touch-punch.min.js"></script>');
						
						
					 //  $(document).ready(function(){
						
					 //	});
				   
					}
		   }
		  
			
		  
        },
        
        createdNode: function( nodeID, childID, childExtendsID, childImplementsIDs,
            childSource, childType, childURI, childName, callback /* ( ready ) */ ) {
           
			
			
			   
			 
		   
		   
        },
        
		initializedNode: function (nodeID,childID)
		{
			if($.parseQuerystring().Edit != 'false' && childID == 'index-vwf')
			{
				_Editor.initialize();
				InitializeEditor();
			}
		   if(window._Editor && childID != 'index-vwf')
		   {
				if(window._Editor.createNodeCallback != null)
				{
					window._Editor.CallCreateNodeCallback(childID,nodeID);
				}
		   }
		
		},
        createdProperty: function (nodeID, propertyName, propertyValue) {

        },
        
        initializedProperty: function (nodeID, propertyName, propertyValue) {
			
        },
        
        deletedNode: function (nodeID) {
         
		
			if(window._Editor && _Editor.SelectedVWFID == nodeID )
			{
				_Editor.SelectObject(null);
			}
		 
        },

        satProperty: function (nodeID, propertyName, propertyValue) {
			if(window._Editor && _Editor.isSelected(nodeID) && propertyName == 'transform')
			{
				
				_Editor.updateBoundsTransform(nodeID);
			
				_Editor.waitingForSet.splice(_Editor.waitingForSet.indexOf(nodeID),1);
				if(_Editor.waitingForSet.length == 0)
				{
					_Editor.updateGizmoLocation();
					_Editor.updateGizmoSize();
					_Editor.updateGizmoOrientation(false);
				}
			}
        },
        
        createdMethod: function( nodeID, methodName, methodParameters, methodBody ){
           
        },

        calledMethod: function( nodeID, methodName, methodParameters ) {

        },

        createdEvent: function( nodeID, eventName, eventParameters ) {
          
        },

        firedEvent: function ( nodeID, eventName, eventParameters ) {

        },

        executed: function( nodeID, scriptText, scriptType ) {

        },

    } );
	

	
} );


	
	function InitializeEditor(){

		document._UserManager = _UserManager;
		
		$('#vwf-root').css('overflow','hidden');
		$(document.body).css('font-size','10px');
		$('#tabs').css('z-index','101');
		$('#AvatarChoice').buttonset();
		
		$('#vwf-root').attr('tabindex','0');
		
		vwf.logger.level = 6;
		
		if(document.Players)
		{
			for(var i = 0; i< document.Players.length; i++)
			{
				_UserManager.PlayerCreated(document.Players[i]);
			}
		}
		
		$('#sidepanel').css('height',$(window).height() - ($('#statusbar').height() + $('#toolbar').height()+$('#smoothmenu1').height()) + 'px')
		
		$('#sidepanel').jScrollPane();
		
		require("vwf/view/editorview/InputSetup").initialize();
		require("vwf/view/editorview/Menubar").initialize();
		require("vwf/view/editorview/WindowResize").initialize();
		require("vwf/view/editorview/SaveLoadTimer").initialize();
		require("vwf/view/editorview/Toolbar").initialize();
		require("vwf/view/editorview/TouchHandler").initialize();
		require("vwf/view/editorview/ChatSystemGUI").initialize();
		
		$(document.body).css('overflow','hidden');
	
	//	$('body *').not(':has(input)').not('input').disableSelection();
	//	$('#vwf-root').enableSelection();
	//	$('#vwf-root').parent().enableSelection();
	//	$('#vwf-root').parent().parent().enableSelection();
	//	$('#index-vwf').enableSelection();
	//	$('* :not(input)').disableSelection();

	}
	

	
	function PlayerDeleted(e)
	{
		$("#"+e+"label").remove();
	}
	function GUID()
    {
        var S4 = function ()
        {
            return Math.floor(
                    Math.random() * 0x10000 /* 65536 */
                ).toString(16);
        };

        return (
                S4() + S4() + "-" +
                S4() + "-" +
                S4() + "-" +
                S4() + "-" +
                S4() + S4() + S4()
            );
    }
	
	