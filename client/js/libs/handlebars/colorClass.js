"use strict";

// Use xchat's coloring algorithm; see xchat/src/common/text.c
const rcolors = [19, 20, 22, 24, 25, 26, 27, 28, 29];

// Generates a string from "color-1" to "color-32" based on an input string
module.exports = function(str) {
	let sum = 0;

	for (let i = 0; i < str.length; i++) {
		sum += str.charCodeAt(i);
	}

	const index = sum % rcolors.length;
	return "color-" + rcolors[index];
};
