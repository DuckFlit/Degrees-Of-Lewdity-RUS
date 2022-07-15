module.exports = {
	plugins: ["stylelint-no-unsupported-browser-features"],
	extends: [
		"stylelint-config-standard",
		"stylelint-config-property-sort-order-smacss",
		"stylelint-prettier/recommended",
	],
	rules: {
		"plugin/no-unsupported-browser-features": [
			true,
			{
				severity: "warning",
				// To prevent stylelint from removing -webkit-background-clip
				ignore: ["background-clip"],
			},
		],

		// Class and ID patterns disabled for now due to the large amounts of classes and IDs that break this rule
		"selector-class-pattern": null,
		"selector-id-pattern": null,

		// Modified kebab-case for numbered CSS vars
		"custom-property-pattern": [
			"^([a-z0-9]*)(-[a-z0-9]+)*$",
			{
				message: "Expected custom property name to be kebab-case",
			},
		],
	},
};
