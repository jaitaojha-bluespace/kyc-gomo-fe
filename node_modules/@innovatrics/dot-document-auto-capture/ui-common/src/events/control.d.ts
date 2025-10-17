import type { ControlEventInstructionValues, DocumentCustomEvent, EyeGazeCustomEvent, FaceCustomEvent, MagnifEyeCustomEvent, PalmCustomEvent, RequestCaptureInstructionValues, SmileCustomEvent } from '../types/events';
/**
 * It dispatches a custom event with the given event name and event detail
 * @param {DocumentCustomEvent.CONTROL | FaceCustomEvent.CONTROL |  PalmCustomEvent.CONTROL | SmileCustomEvent.CONTROL | EyeGazeCustomEvent.CONTROL | MagnifEyeCustomEvent.CONTROL} eventName - The name of the event to
 * dispatch.
 * @param {ControlEventInstruction} instruction - ControlEventInstruction
 */
export declare const dispatchControlEvent: (eventName: DocumentCustomEvent.CONTROL | FaceCustomEvent.CONTROL | PalmCustomEvent.CONTROL | SmileCustomEvent.CONTROL | EyeGazeCustomEvent.CONTROL | MagnifEyeCustomEvent.CONTROL, instruction: ControlEventInstructionValues) => void;
export declare function dispatchCaptureEvent(instruction: RequestCaptureInstructionValues): void;
