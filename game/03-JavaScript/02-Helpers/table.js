// Macro.add("table", {
// 	skipArgs: ["table"],
// 	tags: ["tableColumn", "tableRow"],
// 	isAsync: true,
// 	handler() {
// 		for (let i = 0; i < this.payload.length; i++) {
// 			switch (this.payload[i].name) {
// 				// case Combat.macroNames.main:
// 				// 	Wikifier.wikifyEval(this.payload[i].contents);
// 				// 	break;
// 				case "tableColumn":
// 					// Save until end of combat
// 					// Wikifier.wikifyEval(this.payload[i].contents);
// 					break;
// 				case Combat.macroNames.endCondition:
// 					Combat.addEndCondition(this.payload[i].args, this.payload[i].contents);
// 					break;
// 			}
// 		}

// 		//const output = Combat.create();
// 		//this.output.append(output);
// 	},
// });
