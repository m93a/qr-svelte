import { SvelteComponent } from "svelte";
import type { QRCodeSegment } from 'qrcode';
import { ErrorCorrectionLevel, type OneToFourty, type ZeroToSeven } from './generator';
declare const __propDef: {
    props: {
        /**
             * The string to be encoded in this QR code.
             */ content: string | QRCodeSegment[];
        /**
             * Color of the code itself, usually black. Must be a RGBA hex (eg. #000000ff).
             */ fgColor?: string | undefined;
        /**
             * Color of the background, usually white. Must be a RGBA hex (eg. #ffffffff).
             */ bgColor?: string | undefined;
        /**
             * How wide the quiet zone should be, by default 4 modules.
             */ margin?: number | undefined;
        /**
             * How many pixels should there should be per point, by default 4px.
             */ scale?: number | undefined;
        /**
             * Forces a specific width for the output image.
             * If width is too small to contain the qr symbol, this option will be ignored.
             * Takes precedence over `scale`.
             */ width?: number | undefined;
        /**
             * The "version number" of the QR code, a number between 1 and 40, signifying the size
             * of the code. For size 1, the code is 21x21 points, for size 2 it's 25x25, for size 3
             * it's 29x29 – each step both sides expands by 4 points.
             */ size?: OneToFourty | undefined;
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
             */ errorCorrection?: ErrorCorrectionLevel | undefined;
        /**
             * Mask patterns are used to negate specific points of the code from dark to light and
             * vice versa in order to make the code easier to read. There are eight masks in total.
             * If none is specified, the best one will be chosen automatically.
             * ![](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/QR_Code_Mask_Patterns.svg/564px-QR_Code_Mask_Patterns.svg.png)
             */ maskPattern?: ZeroToSeven | undefined;
        /**
             * This library cannot do SSR on its own, it needs your help! You can pass the pre-rendered
             * data URI in this prop to make it look great even before hydration.
             * For more information about this see the docs or this link:
             * https://stackoverflow.com/q/67366554/
             */ ssr?: string | undefined;
        alt?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type GeneratorProps = typeof __propDef.props;
export type GeneratorEvents = typeof __propDef.events;
export type GeneratorSlots = typeof __propDef.slots;
export default class Generator extends SvelteComponent<GeneratorProps, GeneratorEvents, GeneratorSlots> {
}
export {};
