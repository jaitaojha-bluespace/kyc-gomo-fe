import type { FaceCameraProps, FaceThresholds } from './face';
import type { OnCompleteData } from './liveness';
import type { CustomElement } from '../../../ui-common/src/types';
export * from './liveness';
declare global {
    interface Window {
        DOT_DEBUG_MODE?: boolean;
    }
    namespace preact.JSX {
        interface IntrinsicElements {
            'x-dot-smile-liveness': CustomElement<{
                props: SmileLivenessProps;
            }>;
        }
    }
    namespace React.JSX {
        interface IntrinsicElements {
            'x-dot-smile-liveness': CustomElement<{
                props: SmileLivenessProps;
            }>;
        }
    }
}
export type SmileLivenessProps = Pick<FaceCameraProps, 'assetsDirectoryPath' | 'onError' | 'sessionToken' | 'styleTarget' | 'transactionCountingToken'> & {
    onComplete: SmileLivenessCallback;
    thresholds?: Pick<FaceThresholds, 'minFaceSizeRatio' | 'maxFaceSizeRatio'>;
};
export type HTMLSmileLivenessElement = HTMLElement & {
    props: SmileLivenessProps;
};
export type SmileLivenessCallback = (imagesData: Array<OnCompleteData>, content: Uint8Array) => void;
