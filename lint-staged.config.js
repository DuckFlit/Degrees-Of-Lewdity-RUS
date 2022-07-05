export default {
	"*.js": (filenames) => `eslint --cache --fix ${filenames.join(" ")}`,
	"*.css": "stylelint --fix",
	// Format other files with Prettier
	"**/*.!js": "prettier --write --ignore-unknown",
};
