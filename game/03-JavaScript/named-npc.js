/* This file contains utility functions for named NPCs. */

function statusCheck(name) {
	if (['Robin', 'Kylar', 'Sydney'].includes(name)) {
		const nnpc = V.NPCName[V.NPCNameList.indexOf(name)];


		/* To remove later */
		if (V.debugdisable === 't' && V.debug === 0) {
			T[name.toLowerCase()] = nnpc;
		}
		/* To remove later */


		/* Assume this is successful, unless the game is severely unhinged. */
		if (nnpc.init === 1) {
			switch (nnpc.nam) {
				case 'Robin':
					getRobinLocation();
					break;
				case 'Kylar':
					new Wikifier(null, '<<kylarStatusCheck>>');
					break;
				case 'Sydney':
					new Wikifier(null, '<<sydneyStatusCheck>>');
					break;
			}
		}
		return nnpc;
	} else {
		Errors.report(`getNNPC received an invalid name ${name}.`);
		return; /* Returns undefined. */
	}
}
window.statusCheck = statusCheck;
