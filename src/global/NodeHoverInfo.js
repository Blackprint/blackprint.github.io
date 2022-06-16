function NodeHoverInfo(ev, hovered){
	$(window).off('pointermove', NodeHoverInfo._move);

	if(!hovered){
		clearTimeout(NodeHoverInfo._timer);
		if(NodeHoverInfo._show) ToolTip.set();
		NodeHoverInfo._show = false;
		return;
	}

	// Skip node decoration and skip if any button was pressed
	if(ev.event.target.closest('.extra') != null || ev.event.pressure !== 0){
		NodeHoverInfo(ev, false);
		return;
	}

	let target = $(ev.event.target);
	if(!!target.attr('title')) target.attr('title', '');

	target = target.parent();
	if(!!target.attr('title')) target.attr('title', '');

	let event = ev.event;
	$(window).on('pointermove', NodeHoverInfo._move = ev => {
		if(ev.pressure !== 0)
			NodeHoverInfo(ev, false);

		event = ev;
	});

	clearTimeout(NodeHoverInfo._timer);
	NodeHoverInfo._timer = setTimeout(()=> {
		ToolTip.set(ev.iface, event, 'node');
		NodeHoverInfo._show = true;
	}, 400);
}

NodeHoverInfo._timer = null;
NodeHoverInfo._show = false;
NodeHoverInfo._move = ()=>{};