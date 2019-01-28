{{#each channels}}
<div
	class="chan {{type}} chan-{{slugify name}}"
	data-id="{{id}}"
	data-target="#chan-{{id}}"
	role="tab"
	aria-label="{{name}}"
	aria-controls="chan-{{id}}"
	aria-selected="false"
>
	{{#equal type "lobby"}}
		<button class="collapse-network" aria-label="Collapse" aria-controls="network-{{../uuid}}" aria-expanded="true">
			<span class="collapse-network-icon"></span>
		</button>
		<div class="lobby-wrap">
			<span class="name" title="{{name}}">{{name}}</span>
			<span class="not-connected-tooltip tooltipped tooltipped-w" aria-label="Disconnected">
				<span class="not-connected-icon"></span>
			</span>
			<span class="badge{{#if highlight}} highlight{{/if}}" data-highlight="{{highlight}}">{{#if unread}}{{roundBadgeNumber unread}}{{/if}}</span>
		</div>
		<span class="add-channel-tooltip tooltipped tooltipped-w tooltipped-no-touch" aria-label="Join a channel…" data-alt-label="Cancel">
			<button class="add-channel" aria-label="Join a channel…" aria-controls="join-channel-{{id}}"></button>
		</span>
	{{else}}
		<span class="name" title="{{name}}">{{name}}</span>
		<span class="badge{{#if highlight}} highlight{{/if}}" data-highlight="{{highlight}}">{{#if unread}}{{roundBadgeNumber unread}}{{/if}}</span>
		{{#equal type "channel"}}
			<span class="close-tooltip tooltipped tooltipped-w" aria-label="Leave">
				<button class="close" aria-label="Leave"></button>
			</span>
		{{else}}
			<span class="close-tooltip tooltipped tooltipped-w" aria-label="Close">
				<button class="close" aria-label="Close"></button>
			</span>		
		{{/equal}}
	{{/equal}}
</div>
{{#equal type "lobby"}}
	{{> join_channel}}
{{/equal}}
{{/each}}
