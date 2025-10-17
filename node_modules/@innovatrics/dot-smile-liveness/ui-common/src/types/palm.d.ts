import type { DetectedCorners, ImageParameters, ObjectValues } from './common';
export declare const PalmInstructionCodeValues: {
    readonly CANDIDATE_SELECTION: "candidate_selection";
    readonly PALM_CENTERING: "palm_centering";
    readonly PALM_NOT_PRESENT: "palm_not_present";
    readonly PALM_TOO_FAR: "palm_too_far";
    readonly PALM_TOO_CLOSE: "palm_too_close";
    readonly SHARPNESS_TOO_LOW: "sharpness_too_low";
    readonly BRIGHTNESS_TOO_LOW: "brightness_too_low";
    readonly BRIGHTNESS_TOO_HIGH: "brightness_too_high";
    readonly DEVICE_PITCHED: "device_pitched";
    readonly TEMPLATE_EXTRACTION_QUALITY_TOO_LOW: "template_extraction_quality_too_low";
};
export declare const PalmHandPosition: {
    readonly LEFT: "Left";
    readonly RIGHT: "Right";
};
export declare const PalmHandOrientation: {
    readonly PALMAR: "Palmar";
    readonly DORSAL: "Dorsal";
};
export declare const PalmCheckToInstructionCodeMap: {
    isPresent: "palm_not_present";
    isNotPitched: "device_pitched";
    isNotSmall: "palm_too_far";
    isNotOutOfBounds: "palm_centering";
    isNotDim: "brightness_too_low";
    isNotBright: "brightness_too_high";
    isSharp: "sharpness_too_low";
    isNotLarge: "palm_too_close";
    isTemplateExtractionQualityHighEnough: "template_extraction_quality_too_low";
};
export type PalmInstructionCode = ObjectValues<typeof PalmInstructionCodeValues>;
export type DetectedPalmCorners = DetectedCorners;
export type PalmImageParameters = ImageParameters;
export type PalmQualityAttributes = {
    handOrientation: ObjectValues<typeof PalmHandOrientation>;
    handPosition: ObjectValues<typeof PalmHandPosition>;
    quality: number;
};
export type DetectedPalm = PalmQualityAttributes & PalmImageParameters & DetectedPalmCorners & {
    confidence: number;
    smallestEdge: number;
};
