# svelte-qr

QR code generator and scanner for Svelte, based on the libraries [qrcode](https://www.npmjs.com/package/qrcode) and [qr-scanner](https://www.npmjs.com/package/qr-scanner). Example usage:


```svelte
<script lang="ts">
  import { Generator, Scanner } from "svelte-qr";
  let lastDetectedCode: string;
</script>
<Generator content="Hello world!" fgColor="#ffff00ff" />
<Scanner on:detected={(e) => {lastDetectedCode = e.detail.data}} />
<p>
  Last detected code: {lastDetectedCode}
</p>
```

You will find a more detailed documentation in the JSDoc comments for each prop.
