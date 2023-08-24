import { type QRCodeSegment } from 'qrcode';
export declare enum ErrorCorrectionLevel {
    Low = "low",
    Medium = "medium",
    Quartile = "quartile",
    High = "high"
}
export type ZeroToSeven = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type OneToFourty = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40;
export interface GeneratorProps {
    content: string | QRCodeSegment[];
    fgColor?: string;
    bgColor?: string;
    margin?: number;
    scale?: number;
    width?: number;
    size?: OneToFourty;
    errorCorrection?: ErrorCorrectionLevel;
    maskPattern?: ZeroToSeven;
}
export type GeneratorResult = string;
export declare function generateCode({ content, fgColor, bgColor, margin, scale, width, size, errorCorrection, maskPattern, }: GeneratorProps): Promise<GeneratorResult>;
