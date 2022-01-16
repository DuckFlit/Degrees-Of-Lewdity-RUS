class Utils {
    GetStack() {
        let output = `:: ${V.passage}`;
        if (DOL.Stack.length >= 1) {
            output += ` [${DOL.Stack.join(", ")}]`;
        }
        return output;
    }
}

window.Utils = new Utils();
