function NodeHoverInfo(ev, hovered){
	$(window).off('pointermove', PortHoverInfo._move);

	if(!hovered){
		clearTimeout(NodeHoverInfo._timer);
		if(NodeHoverInfo._show) ToolTip.set();
		return;
	}

	// Skip node decoration
	if(ev.event.target.closest('.extra') != null){
		NodeHoverInfo(ev, false);
		return;
	}

	let target = $(ev.event.target);
	if(!!target.attr('title')) target.attr('title', '');

	let event = ev.event;
	$(window).on('pointermove', PortHoverInfo._move = ev => event = ev);

	clearTimeout(NodeHoverInfo._timer);
	NodeHoverInfo._timer = setTimeout(()=> {
		ToolTip.set(ev.iface.namespace, event);
		NodeHoverInfo._show = true;
	}, 400);
}

NodeHoverInfo._timer = null;
NodeHoverInfo._show = true;