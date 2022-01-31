/** Jimmy: To be used in Twee files to print an error, where the error container mimics SugarCube's own error handler.
 * 		   Leaving the second argument out will grab a snippet of the code before it, up to 128 characters.
 * 		   Will not trigger the widget handler's error capturing system as it uses a different class (.dol-error instead of .error) */
Macro.add('error', {
	handler() {
		if (this.args.length < 1) return this.error(`Missing <<error>> arguments. ${this.args}`);
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
		}
		else
		{
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
