// Use xchat's coloring algorithm; see xchat/src/common/text.c
const rcolors = [19, 20, 22, 24, 25, 26, 27, 28, 29];

// Generates a string from "color-19" to "color-29" based on an input string
export default (str: string) => {
	let sum = 0;

	for (let i = 0; i < str.length; i++) {
		sum += str.charCodeAt(i);
	}

	return "color-" + rcolors[sum % rcolors.length].toString();
};
