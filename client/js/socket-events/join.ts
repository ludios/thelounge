import socket from "../socket";
import {store} from "../store";
import {ClientChan} from "../types";
import {toClientChan} from "../chan";

socket.on("join", function (data) {
	const network = store.getters.findNetwork(data.network);

	if (!network) {
		return;
	}

	const clientChan: ClientChan = toClientChan(data.chan);
	network.channels.splice(data.index || -1, 0, clientChan);
});
