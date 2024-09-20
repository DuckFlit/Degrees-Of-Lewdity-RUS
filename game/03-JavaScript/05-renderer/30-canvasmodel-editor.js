// @ts-check
/* globals MultiCanvasModel, Partial, CompositeLayerSpec */

class CombatEditor {
	static createCanvasCombatEditor() {
		const fragment = document.createDocumentFragment();

		const para = document.createElement("div");
		para.classList.add("d-flex", "flex-row", "p-1", "gap-1", "justify-content-end");
		para.append(
			CombatEditor.createButtonAsIcon("./img/ui/reload.png", "Reload", () => {
				CombatEditor.recompileCombatCanvas();
			})
		);

		para.append(
			CombatEditor.createButtonAsIcon("./img/ui/refresh.png", "Refresh", () => {
				CombatEditor.refreshCombatCanvas();
			})
		);
		fragment.append(para);

		return fragment;
	}

	/**
	 * @param {string} key
	 * @returns {DocumentFragment}
	 */
	static createLayerEditor(key) {
		const fragment = document.createDocumentFragment();

		const container = document.createElement("div");
		container.classList.add("d-flex", "flex-column");
		const layers = CombatEditor.getModelLayers(key);
		const items = layers.map(function (layer) {
			const btn = document.createElement("button");
			btn.textContent = layer.name || "Unknown";
			if (layer.show !== true) {
				btn.classList.add("faded");
			}
			btn.addEventListener("click", ev => {
				console.log("Layer", layer.name, "clicked.");
				CombatEditor.layer = layer;
				const dialog = document.getElementById("combatMainLayerDialog");
				if (dialog && dialog instanceof HTMLDialogElement) {
					dialog.replaceChildren(CombatEditor.createLayerDialogContent(btn));
					dialog.showModal();
				}
			});
			return btn;
		});
		items.forEach(item => container.append(item));
		fragment.append(container);

		return fragment;
	}

	/**
	 * @param {HTMLElement} parent
	 * @returns {DocumentFragment}
	 */
	static createLayerDialogContent(parent) {
		const fragment = document.createDocumentFragment();
		const title = document.createElement("span");
		title.textContent = CombatEditor.layer?.name || "Unknown";
		fragment.append(title);
		const showEle = document.createElement("input");
		showEle.type = "checkbox";
		showEle.checked = !!CombatEditor.layer?.show;
		showEle.addEventListener("change", ev => {
			if (CombatEditor.layer == null) {
				return;
			}
			if (!(ev.target instanceof HTMLInputElement)) {
				return;
			}
			CombatEditor.layer.show = ev.target.checked;
			if (CombatEditor.layer.show) {
				parent.classList.remove("faded");
			} else {
				parent.classList.add("faded");
			}
			CombatEditor.refreshCombatCanvas();
		});
		fragment.append(showEle);
		return fragment;
	}

	static createLayerDialog() {
		return CombatEditor.createDialog("combatMainLayerDialog", null);
	}

	/**
	 * @param {string} id
	 * @param {DocumentFragment?} content
	 * @returns {DocumentFragment}
	 */
	static createDialog(id, content) {
		const fragment = document.createDocumentFragment();
		const dialog = document.createElement("dialog");
		dialog.id = id;
		dialog.classList.add("p-0");
		dialog.addEventListener("click", ev => {
			if (ev.target !== dialog) {
				return;
			}
			dialog.close();
		});
		if (content) {
			dialog.append(content);
		}
		fragment.append(dialog);
		return fragment;
	}

	/**
	 * @param {string} src
	 * @param {string} title
	 * @param {function():void} callback
	 */
	static createButtonAsIcon(src, title, callback) {
		const button = document.createElement("button");
		button.classList.add("btn", "btn-info", "btn-icon");
		button.title = title;
		const icon = document.createElement("img");
		icon.src = src;
		button.append(icon);
		button.addEventListener("click", function () {
			callback();
		});
		return button;
	}

	/**
	 * @param {string} text
	 * @param {function():void} callback
	 */
	static createButton(text, callback) {
		const button = document.createElement("button");
		button.classList.add("btn", "btn-info");
		button.textContent = text;
		button.addEventListener("click", function () {
			callback();
		});
		return button;
	}

	static refreshCombatCanvas() {
		MultiCanvasModel.ensureStorage();
		const model = T.multiCombatModels.combatMain;
		if (model != null) {
			model.refreshAnimation();
		}
	}

	static recompileCombatCanvas() {
		MultiCanvasModel.ensureStorage();
		const model = T.multiCombatModels.combatMain;
		if (model != null) {
			model.refresh();
		}
	}

	/**
	 * @param {string} key
	 * @returns {CompositeLayerSpec[]}
	 */
	static getModelLayers(key) {
		const model = T.multiCombatModels[key];
		return model.layers || [];
	}
}
window.CombatEditor = CombatEditor;

/** @type {Partial<CompositeLayerSpec>?} */
CombatEditor.layer = null;

Macro.add("canvasCombatEditor", {
	handler() {
		const fragment = CombatEditor.createCanvasCombatEditor();
		this.output.append(fragment);
	},
});

Macro.add("addLayerElements", {
	handler() {
		const fragment = CombatEditor.createLayerEditor("combatMain");
		this.output.append(fragment);
	},
});

Macro.add("addLayerDialog", {
	handler() {
		const fragment = CombatEditor.createLayerDialog();
		this.output.append(fragment);
	},
});
