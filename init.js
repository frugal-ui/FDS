"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
// TEMPLATES
const htmlTemplate = `<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width,initial-scale=1" />

		<link rel="stylesheet" href="index.css" />
	</head>
	<body></body>
	<script src="index.js"></script>
	<script>
		APP.main();
	</script>
</html>`;
const tsTemplate = `import { buildInterface, Text, VStack } from '@frugal-ui/base'

export function main() {
	buildInterface(
		VStack(
			Text('Hello, world!'),
		)
	)
}`;
// MAIN
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        //create files
        const filesToCreate = [
            ['dist/index.html', htmlTemplate],
            ['src/index.ts', tsTemplate],
        ];
        for (const [path, content] of filesToCreate) {
            const dir = path_1.default.dirname(path);
            yield promises_1.default.mkdir(dir, { recursive: true });
            yield promises_1.default.writeFile(path, content);
        }
        //update package
        let pkg = {};
        try {
            pkg = JSON.parse(yield promises_1.default.readFile('package.json', { encoding: 'utf8' }));
        }
        catch (_a) {
            console.warn('Creating package.json');
        }
        if (typeof pkg.scripts != 'object')
            pkg.scripts = {};
        pkg.scripts.build = 'esbuild src/index.ts --format=iife --global-name=APP --bundle --outdir=dist --loader:.woff=file --loader:.woff2=file --loader:.ttf=file --loader:.otf=file';
        promises_1.default.writeFile('package.json', JSON.stringify(pkg, null, 2));
    });
}
exports.default = init;
