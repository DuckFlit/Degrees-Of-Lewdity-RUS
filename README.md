# Degrees of Lewdity

## Lexicon of Lewdity

Looking to contribute to Degrees of Lewdity? Read the [Lexicon of Lewdity](https://gitgud.io/Vrelnir/degrees-of-lewdity/-/wikis/home).

_Failure to do so can lead to your work being denied._

## How to build

### Changing the build version and type

1. Open `01-config\sugarcubeConfig.js`.
2. Edit the `window.StartConfig` object to the relevant config type.
   - Normal Build - `enableImages` needs to be `true` and `enableLinkNumberify` needs to be `true`.
   - Text Only Build - `enableImages` needs to be `false` and `enableLinkNumberify` needs to be `true`.
   - Android Build - `enableImages` needs to be `true` and `enableLinkNumberify` needs to be `false`.
3. `version` is optional between release versions but will be displayed on screen in several places and stored in the saves made.
4. `debug` is optional and will only effect new games.

### Compiling the html

1. On Windows: Run `compile.bat` or `compile-watch.bat`.
2. On Linux: Run `compile.sh`
3. Open `Degrees of Lewdity VERSION.html`.

### Build Android version (.apk)

See [mobile-build.md](docs\mobile-build.md)

## Development

### Prerequisites

- Read [Coder's-Guide](https://gitgud.io/Vrelnir/degrees-of-lewdity/-/wikis/Programming/Coder's-Guide)
- [Node.js 16 or later](https://nodejs.org/en/).

### Optional Prerequisites

1. Install [Tweego](http://www.motoslave.net/tweego/) and remember the path where it was installed.
2. Add path to `tweego.exe` (e.g. `C:\Program Files\Twine\tweego-2.1.0-windows-x64`) to Windows `Path` environment variable.

### Initial setup

1. Install project dependencies:

   ```bash
   npm i
   ```

2. If you use Visual Studio Code:
   1. Install [Twee 3 Language Tools extension](https://marketplace.visualstudio.com/items?itemName=cyrusfirheir.twee3-language-tools)
   2. Install [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and configure as formatter for `javascript`
   3. Install [Stylelint extension](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) and configure as formatter for `css`
   4. Install and configure [Code Spell Checker extension](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker):
      1. Use "English - United Kingdom" and "English - United States" dictionaries
      2. Enable spellchecking for `twee3-sugarcube-2`, `markdown`, `javascript` and other programming languages

### Linting & Formatting

Linting JavaScript is handled by `ESLint`. As a part of `ESLint` `fix` command the code is also formatted with `Prettier`.

To run ESLint:

```bash
npx eslint "game/03-JavaScript/02-Helpers/Utils.js"
```

or for all files inside `game` directory:

```bash
npx eslint "game/**"
```

To apply `ESLint` fixes on save you can set setting in Visual Studio Code:

```json
"editor.codeActionsOnSave": {
   "source.fixAll.eslint": true
},
```

Linting CSS is handled by `Stylelint`. `Stylint` also applies [rules for properties order](https://github.com/cahamilton/stylelint-config-property-sort-order-smacss)

To run `Stylelint`:

```bash
npx stylelint "game/02-CSS/pillsInventory.css"
```

or for all CSS file inside `game` directory:

```bash
npx stylelint "game/**/*.css"
```

To apply `Stylelint` fixes on save you can set setting in Visual Studio Code:

```json
"editor.codeActionsOnSave": {
   "source.fixAll.stylelint": true
}
```

Formatting CSS and other non-JavaScript file is handled by `Prettier`. Formatting rules are set in `.prettierrc.yaml`

#### Global variable

ESLint may report a issue like `'myVariable' is not defined`. It means ESLint cannot figure out where the variable is defined. If you really meant to make variable global add the new variable to `.eslintrc.js` `globals` section inside corresponding group:

```json
myVariable: "readonly"
```

If the variable is suppose to be writable set `myVariable: "writable"` instead.

### Pre-commit hook

On pre-commit `lint-staged` lints/formats `.js`, `.css` with ESLint, Stylelint and formats other supported files with Prettier.

If for some reason you really want to commit the code that fails linting add `--no-verify` parameter to `commit` call

```bash
commit --no-verify
```
