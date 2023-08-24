import { SvelteComponent } from "svelte";
export declare enum CamPreference {
    User,
    Environment
}
export declare enum ColorDetectionMode {
    DarkOnLight = "dark-on-light",
    LightOnDark = "light-on-dark",
    Both = "both"
}
import QrScanner from 'qr-scanner';
declare const __propDef: {
    props: {
        /**
             * Set it whenever you're ready to scan, for example on a button click or directly on page load. It will prompt
             * the user for permission to use a camera. Note: to read from a Web Cam stream, your page must be served via HTTPS.
             * If you want, you can stop scanning anytime by removing this prop or setting it to false, and resume by setting
             * it to true again.
             */ scanning?: boolean | undefined;
        /**
             * Preference for the camera to be used. The preference can be either a device id as returned by `listCameras`
             * or a `CamPreference`. The default is `CamPreference.Environment`. Note that there is no guarantee that the
             * preference can actually be fulfilled.
             */ camDirection?: string | CamPreference | undefined;
        /**
             * Set this property to true for rendering an outline around detected QR codes. This uses an absolutely positioned
             * div (with class `qr-overlay`) on which an SVG for rendering the outline will be placed. The SVG can be freely
             * styled via CSS, e.g. by setting the fill color, stroke color, stroke width, etc. See the demo for examples.
             * For more special needs, you can also use the `cornerPoints` field of the detection event.
             */ highlightCodeOutline?: boolean | undefined;
        /**
             * This option can be used to throttle the scans for less battery consumption. The default is 25. If supported by
             * the browser, the scan rate is never higher than the camera's frame rate to avoid unnecessary duplicate scans
             * on the same frame (using the HTMLVideoElement.requestVideoFrameCallback method).
             */ maxScansPerSecond?: number | undefined;
        /**
             * By default, the scanner scans for dark QR codes on a bright background. You can change this behavior to scan
             * for bright QR codes on dark background or for both at the same time.
             */ invertedDetection?: ColorDetectionMode.DarkOnLight | undefined;
    };
    events: {
        detected: CustomEvent<QrScanner.ScanResult>;
        error: CustomEvent<string | Error>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ScannerProps = typeof __propDef.props;
export type ScannerEvents = typeof __propDef.events;
export type ScannerSlots = typeof __propDef.slots;
/** Here's some documentation for this component. */
export default class Scanner extends SvelteComponent<ScannerProps, ScannerEvents, ScannerSlots> {
}
export {};
