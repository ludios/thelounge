"use strict";

const Handlebars = require("handlebars/runtime");
const parseStyle = require("./ircmessageparser/parseStyle");
const findLinks = require("./ircmessageparser/findLinks");
const findEmoji = require("./ircmessageparser/findEmoji");
const merge = require("./ircmessageparser/merge");
const emojiMap = require("../fullnamemap.json");

// Create an HTML `span` with styling information for a given fragment
function createFragment(fragment) {
	const classes = [];

	if (fragment.bold) {
		classes.push("irc-bold");
	}

	if (fragment.textColor !== undefined) {
		classes.push("irc-fg" + fragment.textColor);
	}

	if (fragment.bgColor !== undefined) {
		classes.push("irc-bg" + fragment.bgColor);
	}

	if (fragment.italic) {
		classes.push("irc-italic");
	}

	if (fragment.underline) {
		classes.push("irc-underline");
	}

	if (fragment.strikethrough) {
		classes.push("irc-strikethrough");
	}

	if (fragment.monospace) {
		classes.push("irc-monospace");
	}

	let attributes = classes.length ? ` class="${classes.join(" ")}"` : "";
	const escapedText = Handlebars.Utils.escapeExpression(fragment.text);

	if (fragment.hexColor) {
		attributes += ` style="color:#${fragment.hexColor}`;

		if (fragment.hexBgColor) {
			attributes += `;background-color:#${fragment.hexBgColor}`;
		}

		attributes += '"';
	}

	if (attributes.length) {
		return `<span${attributes}>${escapedText}</span>`;
	}

	return escapedText;
}

// Transform an IRC message potentially filled with styling control codes
// and URLs into a string of HTML elements to display on the client.
module.exports = function parse(text) {
	// Extract the styling information and get the plain text version from it
	const styleFragments = parseStyle(text);
	const cleanText = styleFragments.map((fragment) => fragment.text).join("");

	// On the plain text, find URLs and emojis, returned as "parts". Parts are
	// arrays of objects containing start and end markers, as well as metadata
	// depending on what was found.
	const linkParts = findLinks(cleanText);
	const emojiParts = findEmoji(cleanText);

	const parts = linkParts
		.concat(emojiParts);

	// Merge the styling information with the channels / URLs / text objects and
	// generate HTML strings with the resulting fragments
	return merge(parts, styleFragments, cleanText).map((textPart) => {
		// Create HTML strings with styling information
		const fragments = textPart.fragments.map(createFragment).join("");

		// Wrap these potentially styled fragments
		if (textPart.link) {
			const escapedLink = Handlebars.Utils.escapeExpression(textPart.link);
			return `<a href="${escapedLink}" target="_blank" rel="noopener">${fragments}</a>`;
		} else if (textPart.emoji) {
			if (!emojiMap[textPart.emoji]) {
				return `<span class="emoji" role="img">${fragments}</span>`;
			}

			return `<span class="emoji" role="img" aria-label="Emoji: ${emojiMap[textPart.emoji]}" title="${emojiMap[textPart.emoji]}">${fragments}</span>`;
		}

		return fragments;
	}).join("");
};
