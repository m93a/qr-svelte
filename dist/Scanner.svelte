<!--
  @component
  Here's some documentation for this component.
-->

<script context="module">export var CamPreference = /* @__PURE__ */ ((CamPreference2) => {
  CamPreference2["User"] = "user";
  CamPreference2["Environment"] = "environment";
  return CamPreference2;
})(CamPreference || {});
export var ColorDetectionMode = /* @__PURE__ */ ((ColorDetectionMode2) => {
  ColorDetectionMode2["DarkOnLight"] = "dark-on-light";
  ColorDetectionMode2["LightOnDark"] = "light-on-dark";
  ColorDetectionMode2["Both"] = "both";
  return ColorDetectionMode2;
})(ColorDetectionMode || {});
</script>

<script>import QrScanner from "qr-scanner";
import { onMount, createEventDispatcher, onDestroy } from "svelte";
let video;
let overlay;
let scanner;
const dispatch = createEventDispatcher();
const onDecode = (r) => {
  dispatch("detected", r);
};
const onError = (e) => {
  if (e === QrScanner.NO_QR_CODE_FOUND)
    return;
  dispatch("error", e);
};
const configChanged = () => {
  scanner?.destroy();
  scanner = new QrScanner(video, onDecode, {
    overlay,
    maxScansPerSecond,
    highlightCodeOutline,
    preferredCamera: camDirection,
    returnDetailedScanResult: true,
    onDecodeError: onError
  });
};
let mounted = false;
onMount(() => {
  configChanged();
  mounted = true;
});
onDestroy(() => {
  scanner?.destroy();
  scanner = void 0;
});
export let scanning = false;
$:
  scanningChanged(scanning);
const scanningChanged = (..._) => {
  if (scanning)
    scanner?.start();
  else
    scanner?.stop();
};
export let camDirection = CamPreference.Environment;
$:
  scanner?.setCamera(camDirection);
export let highlightCodeOutline = false;
$:
  highlightCodeOutlineChanged(highlightCodeOutline);
const highlightCodeOutlineChanged = (..._) => {
  if (mounted)
    configChanged();
};
export let maxScansPerSecond = 25;
$:
  maxScansPerSecondChanged(maxScansPerSecond);
const maxScansPerSecondChanged = (..._) => {
  if (mounted)
    configChanged();
};
export let invertedDetection = ColorDetectionMode.DarkOnLight;
$:
  _inversionMode = (() => {
    switch (invertedDetection) {
      case ColorDetectionMode.DarkOnLight:
        return "original";
      case ColorDetectionMode.LightOnDark:
        return "invert";
      case ColorDetectionMode.Both:
        return "both";
    }
  })();
$:
  scanner?.setInversionMode(_inversionMode);
</script>

<div class="qr">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video bind:this={video} />
	<div class="qr-overlay" bind:this={overlay} />
</div>
