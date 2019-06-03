"use strict";

const $ = require("jquery");
const socket = require("../socket");
const render = require("../render");
const chat = $("#chat");
const templates = require("../../views");
const sidebar = $("#sidebar");

socket.on("join", function(data) {
	const id = data.network;
	const network = sidebar.find(`.network[data-uuid="${id}"]`);
	const channels = network.children();
	const position = $(channels[data.index || channels.length - 1]); // Put channel in correct position, or the end if we don't have one
	const sidebarEntry = templates.chan({
		channels: [data.chan],
	});
	$(sidebarEntry).insertAfter(position);
	chat.append(
		templates.chat({
			channels: [data.chan],
		})
	);
	render.renderChannel(data.chan);
});
