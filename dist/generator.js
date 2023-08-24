import { toDataURL } from 'qrcode';
export var ErrorCorrectionLevel;
(function (ErrorCorrectionLevel) {
    ErrorCorrectionLevel["Low"] = "low";
    ErrorCorrectionLevel["Medium"] = "medium";
    ErrorCorrectionLevel["Quartile"] = "quartile";
    ErrorCorrectionLevel["High"] = "high";
})(ErrorCorrectionLevel || (ErrorCorrectionLevel = {}));
export async function generateCode({ content, fgColor, bgColor, margin, scale, width, size, errorCorrection, maskPattern, }) {
    const dataUri = await toDataURL(content, {
        color: {
            dark: fgColor,
            light: bgColor,
        },
        margin,
        scale,
        width,
        version: size,
        errorCorrectionLevel: errorCorrection,
        maskPattern,
    });
    return dataUri;
}
