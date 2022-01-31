class Utils {
    GetStack() {
        let output = `:: ${V.passage}`;
        if (DOL.Stack.length >= 1) {
            output += ` [${DOL.Stack.join(", ")}]`;
        }
        return output;
    }

    Defer(func, ...params) {
        if (Engine.isIdle()) {
            $(() => func(...params));
        } else {
            $(document).one(':passageend', () => func(...params));
        }
    }
}

window.Utils = new Utils();
