function NodeHoverInfo(ev, hovered){
	$(window).off('pointermove', PortHoverInfo._move);

	if(!hovered){
		clearTimeout(NodeHoverInfo._timer);
		if(NodeHoverInfo._show) ToolTip.set();
		return;
	}

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