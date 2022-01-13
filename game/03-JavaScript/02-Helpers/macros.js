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
				const source = `Caught in passage footer. ${V.passage}, <<checkTimeSystem>>.`;
				Errors.inlineReport(message, source).appendTo(this.output);
			}
		}
		else
		{
			console.debug(`One of the time variables is not accessible yet: ${V.passage}: ${DOL.Stack}.`);
		}
	}
});
