define({
	initialize:function()
	{
		//hook up the editor object
		$('#vwf-root').mousedown(function(e){_Editor.mousedown(e)});
		
		$('#vwf-root').mouseup(function(e){_Editor.mouseup(e)});
		$('#vwf-root').click(function(e){_Editor.click(e)});
		$('#index-vwf').mouseleave(function(e){_Editor.mouseleave(e)});
		$('#vwf-root').mousemove(function(e){_Editor.mousemove(e)});
		$('#index-vwf').attr('tabindex',0);
		$('#index-vwf').on('touchstart',function(e){
			e.preventDefault();
			var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
			_Editor.mousedown(touch)
		});
		
		// $('#index-vwf')[0].requestPointerLock = $('#index-vwf')[0].requestPointerLock ||
			     // $('#index-vwf')[0].mozRequestPointerLock ||
			     // $('#index-vwf')[0].webkitRequestPointerLock;
		

		//Ask the browser to release the pointer
		// document.exitPointerLock = document.exitPointerLock ||
					   // document.mozExitPointerLock ||
					   // document.webkitExitPointerLock;
		
		
		$('#index-vwf').on('touchmove',function(e){
		e.preventDefault();
			var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
			_Editor.mousemove(touch)
		});
		$('#index-vwf').on('touchend',function(e){
		e.preventDefault();
			var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
			_Editor.mouseup(touch)
		});
		$('#vwf-root').keydown(function(e){
			
			try{
			_Editor.keydown(e)
			if(e.keyCode == 32 && e.shiftKey)
				focusSelected();
			}catch(e)
			{
				
			}
		});
		
		
		
		
		
		$('#vwf-root').keyup(function(e){

			_Editor.keyup(e)
			
		});
		
	}
});