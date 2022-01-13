class Utils {
    GetStack() {
        let stack = "";
        if (DOL.Stack.length >= 1) {
            stack = ", " + DOL.Stack.join(", ");
        }
        return V.passage + stack;
    }
}

window.Utils = new Utils();
