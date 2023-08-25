<!--
  @component
  Here's some documentation for this component.
-->

<script lang="ts" context="module">
	// the `as any` casts guarantee that the `CamPreference | string`
	// type isn't automatically reduced to just `string`
	export enum CamPreference {
		User = 'user' as any,
		Environment = 'environment' as any,
	}

	export enum ColorDetectionMode {
		DarkOnLight = 'dark-on-light',
		LightOnDark = 'light-on-dark',
		Both = 'both',
	}
</script>

<script lang="ts">
	import QrScanner from 'qr-scanner';
	import { onMount, createEventDispatcher, onDestroy } from 'svelte';

	let video: HTMLVideoElement;
	let overlay: HTMLDivElement;
	let scanner: QrScanner | undefined;

	const dispatch = createEventDispatcher<{
		detected: QrScanner.ScanResult;
		error: Error | string;
	}>();
	const onDecode = (r: QrScanner.ScanResult) => {
		dispatch('detected', r);
	};
	const onError = (e: Error | string) => {
		if (e === QrScanner.NO_QR_CODE_FOUND) return;
		dispatch('error', e);
	};

	const configChanged = () => {
		scanner?.destroy();
		scanner = new QrScanner(video, onDecode, {
			overlay,
			maxScansPerSecond,
			highlightCodeOutline,
			preferredCamera: camDirection as string,
			returnDetailedScanResult: true,
			onDecodeError: onError,
		});
		if (scanning) scanner?.start();
	};

	let mounted = false;
	onMount(() => {
		configChanged();
		mounted = true;
	});
	onDestroy(() => {
		scanner?.destroy();
		scanner = undefined;
	});

	/**
	 * Set it whenever you're ready to scan, for example on a button click or directly on page load. It will prompt
	 * the user for permission to use a camera. Note: to read from a Web Cam stream, your page must be served via HTTPS.
	 * If you want, you can stop scanning anytime by removing this prop or setting it to false, and resume by setting
	 * it to true again.
	 */
	export let scanning = false;
	$: scanningChanged(scanning);
	const scanningChanged = (..._: any) => {
		if (scanning) scanner?.start();
		else scanner?.stop();
	};

	/**
	 * Preference for the camera to be used. The preference can be either a device id as returned by `listCameras`
	 * or a `CamPreference`. The default is `CamPreference.Environment`. Note that there is no guarantee that the
	 * preference can actually be fulfilled.
	 */
	export let camDirection: CamPreference | string = CamPreference.Environment;
	$: scanner?.setCamera(camDirection as string);

	/**
	 * Set this property to true for rendering an outline around detected QR codes. This uses an absolutely positioned
	 * div (with class `qr-overlay`) on which an SVG for rendering the outline will be placed. The SVG can be freely
	 * styled via CSS, e.g. by setting the fill color, stroke color, stroke width, etc. See the demo for examples.
	 * For more special needs, you can also use the `cornerPoints` field of the detection event.
	 */
	export let highlightCodeOutline = false;
	$: highlightCodeOutlineChanged(highlightCodeOutline);
	const highlightCodeOutlineChanged = (..._: any) => {
		if (mounted) configChanged();
	};

	/**
	 * This option can be used to throttle the scans for less battery consumption. The default is 25. If supported by
	 * the browser, the scan rate is never higher than the camera's frame rate to avoid unnecessary duplicate scans
	 * on the same frame (using the HTMLVideoElement.requestVideoFrameCallback method).
	 */
	export let maxScansPerSecond = 25;
	$: maxScansPerSecondChanged(maxScansPerSecond);
	const maxScansPerSecondChanged = (..._: any) => {
		if (mounted) configChanged();
	};

	/**
	 * By default, the scanner scans for dark QR codes on a bright background. You can change this behavior to scan
	 * for bright QR codes on dark background or for both at the same time.
	 */
	export let invertedDetection = ColorDetectionMode.DarkOnLight;
	$: _inversionMode = ((): QrScanner.InversionMode => {
		switch (invertedDetection) {
			case ColorDetectionMode.DarkOnLight:
				return 'original';
			case ColorDetectionMode.LightOnDark:
				return 'invert';
			case ColorDetectionMode.Both:
				return 'both';
		}
	})();
	$: scanner?.setInversionMode(_inversionMode);

	// TODO add support for color correction and flashlight
</script>

<div class="qr">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video bind:this={video} />
	<div class="qr-overlay" bind:this={overlay} />
</div>
