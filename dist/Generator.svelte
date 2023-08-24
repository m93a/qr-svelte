<script>import {
  ErrorCorrectionLevel,
  generateCode
} from "./generator";
export let content;
export let fgColor = void 0;
export let bgColor = void 0;
export let margin = void 0;
export let scale = void 0;
export let width = void 0;
export let size = void 0;
export let errorCorrection = void 0;
export let maskPattern = 0;
export let ssr = "";
export let alt = void 0;
const contentToAlt = (c) => {
  if (typeof c === "string")
    return c;
  return c.map((s) => {
    if (typeof s === "object") {
      if (typeof s.data === "object")
        return "[Binary part]";
      return String(s.data);
    }
    return String(s);
  }).join(", ");
};
$:
  _alt = alt ?? `QR code containing: ${contentToAlt(content)}`;
let dataUri = ssr;
$:
  generateCode({
    content,
    fgColor,
    bgColor,
    margin,
    scale,
    width,
    size,
    errorCorrection,
    maskPattern
  }).then((u) => dataUri = u);
</script>

<img alt={_alt} src={dataUri} />
