function PortHoverInfo(ev, hovered){
	$(window).off('pointermove', PortHoverInfo._move);

	if(!hovered){
		clearTimeout(PortHoverInfo._timer);
		if(PortHoverInfo._show) ToolTip.set();
		PortHoverInfo._show = false;
		return;
	}

	// Skip if any button was pressed
	if(ev.event.pressure !== 0){
		PortHoverInfo(ev, false);
		return;
	}

	let target = $(ev.event.target);
	if(!!target.attr('title')) target.attr('title', '');

	let event = ev.event;
	$(window).on('pointermove', PortHoverInfo._move = ev => {
		if(ev.pressure !== 0)
			PortHoverInfo(ev, false);
			
		event = ev;
	});

	clearTimeout(NodeHoverInfo._timer);
	clearTimeout(PortHoverInfo._timer);
	PortHoverInfo._timer = setTimeout(()=> {
		ToolTip.set(ev.port, event, 'port');
		PortHoverInfo._show = true;
	}, 400);
}

PortHoverInfo._timer = null;
PortHoverInfo._show = false;
PortHoverInfo._move = ()=>{};