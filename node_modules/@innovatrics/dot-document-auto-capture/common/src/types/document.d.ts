import type { BaseCameraProps, CustomElement, DetectedDocument, Resolution } from '../../../ui-common/src/types';
export * from '../../../ui-common/src/types/common';
export * from '../../../ui-common/src/types/document';
export * from '../../../ui-common/src/error';
declare global {
    interface Window {
        DOT_DEBUG_MODE?: boolean;
    }
    namespace preact.JSX {
        interface IntrinsicElements {
            'x-dot-document-auto-capture': CustomElement<{
                cameraOptions: DocumentCameraProps;
            }>;
        }
    }
    namespace React.JSX {
        interface IntrinsicElements {
            'x-dot-document-auto-capture': CustomElement<{
                cameraOptions: DocumentCameraProps;
            }>;
        }
    }
}
export type HTMLDocumentCaptureElement = HTMLElement & {
    cameraOptions: DocumentCameraProps;
};
export type DocumentComponentData = {
    detection: DetectedDocument;
    imageResolution: Resolution;
};
export type DocumentThresholds = {
    brightnessHighThreshold?: number;
    brightnessLowThreshold?: number;
    confidenceThreshold?: number;
    hotspotsScoreThreshold?: number;
    outOfBoundsThreshold?: number;
    sharpnessThreshold?: number;
    sizeSmallThreshold?: number;
};
export type DocumentCameraProps = BaseCameraProps<DocumentComponentData> & {
    thresholds?: DocumentThresholds;
};
export type DocumentCallback = DocumentCameraProps['onPhotoTaken'];
