/** Jimmy: Uses SugarCube's source code, modified for use as a macro.
 *         Likely should be updated after SugarCube updates their error system.
 */
Macro.add("error", {
	handler(/* place, message, source */) {
		if (this.args.length < 1) return this.error(`Missing <<error>> arguments. ${this.args}`);
		const message = this.args[0];
		const source = this.args[1] || this.parser.source.slice(0, this.parser.matchStart).slice(-128);

		const $wrapper = jQuery(document.createElement('div'));
		const $toggle  = jQuery(document.createElement('button'));
		const $source  = jQuery(document.createElement('pre'));
		const mesg     = `${L10n.get('errorTitle')}: ${message || 'unknown error'}`;

		$toggle
			.addClass('error-toggle')
			.ariaClick({
				label : L10n.get('errorToggle')
			}, () => {
				if ($toggle.hasClass('enabled')) {
					$toggle.removeClass('enabled');
					$source.attr({
						'aria-hidden' : true,
						hidden        : 'hidden'
					});
				}
				else {
					$toggle.addClass('enabled');
					$source.removeAttr('aria-hidden hidden');
				}
			})
			.appendTo($wrapper);
		jQuery(document.createElement('span'))
			.addClass('dol-error')
			.text(mesg)
			.appendTo($wrapper);
		jQuery(document.createElement('code'))
			.text(source)
			.appendTo($source);
		$source
			.addClass('error-source')
			.attr({
				'aria-hidden' : true,
				hidden        : 'hidden'
			})
			.appendTo($wrapper);
		$wrapper
			.addClass('error-view')
			.appendTo(this.output);
	
		console.warn(`${mesg}\n\t${source.replace(/\n/g, '\n\t')}`);

		return false;
	}
});
