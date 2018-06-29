import buble from 'rollup-plugin-buble';
import flow from 'rollup-plugin-flow';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('./package.json'));

export default {
	input: 'src/index.js',
	plugins: [
		flow(),
		buble()
	],
	output: [
		{ file: pkg.main, format: 'cjs', sourcemap: true, strict: false },
		{ file: pkg.module, format: 'es', sourcemap: true, strict: false  },
		{ file: pkg['umd:main'], format: 'umd', name: pkg.name, sourcemap: true, strict: false }
	]
};
