/** Jimmy: To be used in Twee files to print an error, where the error container mimics SugarCube's own error handler.
 * 		   Leaving the second argument out will grab a snippet of the code before it, up to 128 characters.
 * 		   Will not trigger the widget handler's error capturing system as it uses a different class (.dol-error instead of .error) */
const ErrorSystem = ((Scripting, Errors) => {
	/**
	 * Retrieve a snippet of the code surrounding the widget's parent, or ancestors. Good for figuring out where an error occurred.
	 * @param {number} depth A depth of zero indicates to return the callee of `<<error>>`. One would retrieve the parent of that callee. And so on.
	 * @returns The source text of the target, or the source of the last ancestor in the stack.
	 */
	function getTargetSource(depth = 0) {
		/* Always assumed because of the parent of the `<<error>>` macro is where it was called. */
		let callee = this.parent !== null ? this.parent : this;
		for (let index = 0; index < depth; index++) {
			callee = callee.parent !== null ? callee.parent : callee;
		}
		const parser = callee.parser;
		const source = parser.source.slice(0, parser.matchStart).slice(-128);
		return source;
	}

	Macro.add('error', {
		skipArgs : true,
		handler() {
			const exp = this.args.full;
			const result = Scripting.evalJavaScript(exp[0] === '{' ? `(${exp})` : exp);
			let { message, source, depth, exportable } = Object.assign({
				message: 'Message not set',
				source: null,
				depth: 0,
				exportable: true
			}, result);
			if (source === null) source = getTargetSource.call(this, depth);
			Errors.inlineReport(message, source, exportable).appendTo(this.output);
		}
	});

	Macro.add('errorp', {
		handler() {
			if (this.args.length < 1) return this.error(`Missing <<errorP>> arguments. ${this.args}`);
			const message = this.args[0];
			const source = this.args[1] || this.parser.source.slice(0, this.parser.matchStart).slice(-128);
			Errors.inlineReport(message, source).appendTo(this.output);
		}
	});

	/** Jimmy: checkTimeSystem macro to print a message if time desynchronises.
	 *  	   Potential to place time correction code here instead of in backComp. */
	Macro.add('checkTimeSystem', {
		handler() {
			if (V.time != undefined && V.hour != undefined && V.minute != undefined) {
				if (V.time !== V.hour * 60 + V.minute) {
					const message = `$time: ${V.time} desynchronised from $hour: ${V.hour} and $minute: ${V.minute}. Total: ${(V.hour * 60 + V.minute)}.`;
					const source = `Caught in Passage ${this.args[0]}. ${V.passage}, <<checkTimeSystem>>.`;
					Errors.inlineReport(message, source).appendTo(this.output);
				}
			} else {
				console.debug(`One of the time variables is not accessible yet: ${V.passage}: ${DOL.Stack}.`);
			}
		}
	});

	/** Jimmy: defer Macro, to be used to defer execution of the provided contents until after the passage has been processed.
	 * 		   For example, let's say you create <div id="myDiv"></div> in a widget. And you want to use $('#myDiv') in that
	 * 		   same widget, to manipulate your HTML elements... You cannot, as these HTML elements do not actually exist yet.
	 *
	 * 		   This is where <<defer>> comes in, it will hold off on executing $('#myDiv'), if you specify, so that when it does
	 * 		   execute, you can rest assured that your HTML elements are loaded into the document, rather than being in their
	 * 		   fragment. */
	Macro.add('defer', {
		tags: null,
		handler() {
			const handler = this.createShadowWrapper(function() {
				new Wikifier('#passages .passage', this.payload[0].contents);
			});
			$(document).one(':passageend', function() {
				handler.apply(this, arguments);
			});
		}
	});

	return Object.seal({
		getTargetSource
	});
})(Scripting, Errors);