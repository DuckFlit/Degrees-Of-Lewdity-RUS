/* simple alias C.npc.Robin => V.NPCName[V.NPCNameList.indexOf("Robin")]
 * `C.npc.Black Hawk` won't work however, use `C.npc["Great Wolf"]` instead
 * run this after V.NPCName exists */
function initCNPC() {
	C.npc = {};
	for (const name of V.NPCNameList) {
		Object.defineProperty(C.npc, name, {
			get() {
				return V.NPCName[V.NPCNameList.indexOf(name)];
			},
			set(val) {
				return (V.NPCName[V.NPCNameList.indexOf(name)] = val);
			},
		});
	}
}
window.initCNPC = initCNPC;
