<script lang="ts">
	import type { QRCodeSegment } from 'qrcode';
	import {
		ErrorCorrectionLevel,
		generateCode,
		type GeneratorResult,
		type OneToFourty,
		type ZeroToSeven,
	} from './generator';

	/**
	 * The string to be encoded in this QR code.
	 */
	export let content: string | QRCodeSegment[];

	/**
	 * Color of the code itself, usually black. Must be a RGBA hex (eg. #000000ff).
	 */
	export let fgColor: string | undefined = undefined;

	/**
	 * Color of the background, usually white. Must be a RGBA hex (eg. #ffffffff).
	 */
	export let bgColor: string | undefined = undefined;

	/**
	 * How wide the quiet zone should be, by default 4 modules.
	 */
	export let margin: number | undefined = undefined;

	/**
	 * How many pixels should there should be per point, by default 4px.
	 */
	export let scale: number | undefined = undefined;

	/**
	 * Forces a specific width for the output image.
	 * If width is too small to contain the qr symbol, this option will be ignored.
	 * Takes precedence over `scale`.
	 */
	export let width: number | undefined = undefined;

	/**
	 * The "version number" of the QR code, a number between 1 and 40, signifying the size
	 * of the code. For size 1, the code is 21x21 points, for size 2 it's 25x25, for size 3
	 * it's 29x29 – each step both sides expands by 4 points.
	 */
	export let size: OneToFourty | undefined = undefined;

	/**
	 * Error correction capability allows to successfully scan a QR Code even if the
	 * symbol is dirty or damaged. Higher levels offer a better error resistance but
	 * reduce the symbol's capacity.
	 *
	 * | Level    | Redundancy | Numeric cap. | Alphanum. cap. | Binary cap. | Kanji cap  |
	 * |:---------|:----------:|:------------:|:--------------:|:-----------:|:----------:|
	 * | Low      | **~7%**    |   7089 chars |     4296 chars |  2953 chars | 1817 chars |
	 * | Medium   | **~15%**   |   5596 chars |     3391 chars |  2331 chars | 1435 chars |
	 * | Quartile | **~25%**   |   3993 chars |     2420 chars |  1663 chars | 1024 chars |
	 * | High     | **~30%**   |   3057 chars |     1852 chars |  1273 chars |  784 chars |
	 */
	export let errorCorrection: ErrorCorrectionLevel | undefined = undefined;

	/**
	 * Mask patterns are used to negate specific points of the code from dark to light and
	 * vice versa in order to make the code easier to read. There are eight masks in total.
	 * If none is specified, the best one will be chosen automatically.
	 * ![](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/QR_Code_Mask_Patterns.svg/564px-QR_Code_Mask_Patterns.svg.png)
	 */
	export let maskPattern: ZeroToSeven | undefined = 0;

	/**
	 * This library cannot do SSR on its own, it needs your help! You can pass the pre-rendered
	 * data URI in this prop to make it look great even before hydration.
	 * For more information about this see the docs or this link:
	 * https://stackoverflow.com/q/67366554/
	 */
	export let ssr: GeneratorResult = '';

	export let alt: string | undefined = undefined;
	const contentToAlt = (c: string | QRCodeSegment[]) => {
		if (typeof c === 'string') return c;
		return c
			.map((s) => {
				if (typeof s === 'object') {
					if (typeof s.data === 'object') return '[Binary part]';
					return String(s.data);
				}
				return String(s);
			})
			.join(', ');
	};
	$: _alt = alt ?? `QR code containing: ${contentToAlt(content)}`;

	let dataUri = ssr;
	$: generateCode({
		content,
		fgColor,
		bgColor,
		margin,
		scale,
		width,
		size,
		errorCorrection,
		maskPattern,
	}).then((u) => (dataUri = u));
</script>

<img alt={_alt} src={dataUri} />
