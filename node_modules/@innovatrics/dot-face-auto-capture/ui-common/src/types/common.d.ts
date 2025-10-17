type CustomEvents<K extends string> = {
    [key in K]: (event: CustomEvent) => void;
};
export type CustomElement<T, K extends string = ''> = Partial<T & HTMLElement & {
    children: unknown;
} & CustomEvents<`on${K}`> & {
    ref?: unknown;
}>;
export type DeepRequired<T> = Required<{
    [P in keyof T]: T[P] extends Record<string, unknown> | undefined ? DeepRequired<Required<T[P]>> : T[P];
}>;
export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
export type RequireSome<T, K extends keyof T> = T & {
    [P in K]-?: T[P];
};
export type ObjectValues<T> = T[keyof T];
export declare const FacingMode: {
    readonly FRONT: "user";
    readonly REAR: "environment";
};
export type FacingModeValues = ObjectValues<typeof FacingMode>;
export declare const CaptureMode: {
    readonly AUTO_CAPTURE: "AUTO_CAPTURE";
    readonly WAIT_FOR_REQUEST: "WAIT_FOR_REQUEST";
};
export type CaptureModeValues = ObjectValues<typeof CaptureMode>;
export type BaseCameraProps<CallbackData> = {
    assetsDirectoryPath?: string;
    cameraFacing?: FacingModeValues;
    candidateSelectionDurationMillis?: number;
    captureMode?: CaptureModeValues;
    onError: (e: Error) => void;
    onPhotoTaken: (imageData: CallbackImage<CallbackData>, content: Uint8Array) => void;
    sessionToken?: string;
    styleTarget?: HTMLElement;
    transactionCountingToken?: string;
};
export type ImageParameters = {
    brightness: number;
    sharpness: number;
};
export type CameraSettings = MediaTrackSettings & {
    deviceName?: string;
};
export type Resolution = {
    height: number;
    width: number;
};
export type Point = {
    x: number;
    y: number;
};
export declare const AppStateValues: {
    readonly LOADING: "LOADING";
    readonly ERROR: "ERROR";
    readonly WAITING: "WAITING";
    readonly RUNNING: "RUNNING";
};
export declare const LivenessStateValues: {
    readonly DONE: "DONE";
    readonly LOADING: "LOADING";
    readonly ERROR: "ERROR";
    readonly WAITING: "WAITING";
    readonly RUNNING: "RUNNING";
};
export type AppState = ObjectValues<typeof AppStateValues>;
export type Crop = {
    height: number;
    shiftX: number;
    shiftY: number;
    width: number;
};
export type CallbackImage<T> = {
    data: T;
    image: Blob;
};
export type DetectedCorners = {
    bottomLeft: Point;
    bottomRight: Point;
    topLeft: Point;
    topRight: Point;
};
export type ThresholdInterval = {
    max: number;
    min: number;
};
export {};
