# The Lounge, Modified

This is a modified version of [The Lounge](https://github.com/thelounge/thelounge), a self-hosted browser-based IRC client, with some fixes to make it look and feel more like HexChat:

* less padding / higher information density
* increase font sizes slightly
* make default theme black on light gray-brown
* use xchat/hexchat's nick coloring algorithm and colors
* [remove the in-message nick highlighting feature](https://github.com/thelounge/thelounge/pull/2682) because of false positives
* remove the in-message `#channel` detection feature because of false positives
* scroll instantly instead of smoothly on PgUp/PgDn
* show seconds in timestamps by default
* remove the not-secure icon for unencrypted IRC connections
* don't automatically focus newly joined channels

Please note: the commits in branch `prime` **will be rebased** once in a while on top of thelounge `master`.

<p align="center">
	<img src="https://user-images.githubusercontent.com/4458/43366682-5532c680-9331-11e8-8941-819ca6b5bd56.png">
</p>

## Installation and usage

Installation requires [Node.js](https://nodejs.org/) v6+ and yarn.

### Running from source

```sh
git clone https://github.com/ludios/thelounge.git
cd thelounge
yarn install --ignore-scripts --ignore-optional
NODE_ENV=production yarn build && yarn start
```

The `thelounge` executable is not created. Use `node index <command>` to run other commands.
