const T = {};
T.CONTINUE_DETECTION = "continue-detection", T.SWITCH_CAMERA = "switch-camera", T.TOGGLE_MIRROR = "toggle-mirror";
const H = T, _ = {};
_.FIRST_FRAME = "first-frame", _.FIRST_VALID_FRAME = "first-valid-frame";
const l = _, O = {};
O.REQUEST_CAPTURE = "dot-custom-event:request-capture";
const R = O;
var A = ((t) => (t.CAMERA_PROPS_CHANGED = "document-auto-capture:camera-props-changed", t.CONTROL = "document-auto-capture:control", t.DETECTED_DOCUMENT_CHANGED = "document-auto-capture:detected-document-changed", t.DOCUMENT_DETECTION = "document-auto-capture:document-detection", t.INSTRUCTION_CHANGED = "document-auto-capture:instruction-changed", t.INSTRUCTION_ESCALATED = "document-auto-capture:instruction-escalated", t.STATE_CHANGED = "document-auto-capture:state-changed", t.VIDEO_ELEMENT_SIZE = "document-auto-capture:video-element-size", t))(A || {}), S = ((t) => (t.CAMERA_PROPS_CHANGED = "face-auto-capture:camera-props-changed", t.CONTROL = "face-auto-capture:control", t.DETECTED_FACE_CHANGED = "face-auto-capture:detected-face-changed", t.FACE_DETECTION = "face-auto-capture:face-detection", t.INSTRUCTION_CHANGED = "face-auto-capture:instruction-changed", t.STATE_CHANGED = "face-auto-capture:state-changed", t.VIDEO_ELEMENT_SIZE = "face-auto-capture:video-element-size", t))(S || {}), p = ((t) => (t.ANIMATION_END = "magnifeye-auto-capture:animation-end", t.CONTROL = "magnifeye-auto-capture:control", t.STATUS_CHANGED = "magnifeye-auto-capture:status-changed", t))(p || {}), I = ((t) => (t.CONTROL = "smile-auto-capture:control", t.INSTRUCTION_ESCALATED = "smile:instruction-escalated", t.STATUS_CHANGED = "smile-auto-capture:status-changed", t))(I || {}), m = ((t) => (t.CAMERA_PROPS_CHANGED = "palm-capture:camera-props-changed", t.CONTROL = "palm-capture:control", t.DETECTED_PALM_CHANGED = "palm-capture:detected-palm-changed", t.INSTRUCTION_CHANGED = "palm-capture:instruction-changed", t.STATE_CHANGED = "palm-capture:state-changed", t.VIDEO_ELEMENT_SIZE = "palm-capture:video-element-size", t))(m || {}), d = ((t) => (t.CONTROL = "eye-gaze-auto-capture:control", t.STATUS_CHANGED = "eye-gaze-auto-capture:status-changed", t))(d || {});
const N = (t, a) => {
  const n = {};
  n.detail = a, document.dispatchEvent(new CustomEvent(t, n));
}, G = (t, a) => {
  const n = {};
  n.instruction = a, N(t, n);
};
function g(t) {
  const a = {};
  a.instruction = t;
  const n = a;
  N(R.REQUEST_CAPTURE, n);
}
const s = {};
s.FRONT = "user", s.REAR = "environment";
const P = s, u = {};
u.AUTO_CAPTURE = "AUTO_CAPTURE", u.WAIT_FOR_REQUEST = "WAIT_FOR_REQUEST";
const L = u, c = {};
c.LOADING = "LOADING", c.ERROR = "ERROR", c.WAITING = "WAITING", c.RUNNING = "RUNNING";
const D = c, C = { ...D };
C.DONE = "DONE";
const U = C, i = {};
i.EYE_NOT_PRESENT = "eye_not_present";
const r = i, e = {};
e.CANDIDATE_SELECTION = "candidate_selection", e.FACE_TOO_CLOSE = "face_too_close", e.FACE_TOO_FAR = "face_too_far", e.FACE_CENTERING = "face_centering", e.FACE_NOT_PRESENT = "face_not_present", e.SHARPNESS_TOO_LOW = "sharpness_too_low", e.BRIGHTNESS_TOO_LOW = "brightness_too_low", e.BRIGHTNESS_TOO_HIGH = "brightness_too_high", e.DEVICE_PITCHED = "device_pitched", e.LEFT_EYE_NOT_PRESENT = "left_" + r.EYE_NOT_PRESENT, e.RIGHT_EYE_NOT_PRESENT = "right_" + r.EYE_NOT_PRESENT, e.MOUTH_NOT_PRESENT = "mouth_not_present", e.MOUTH_SCORE_TOO_HIGH = "mouth_score_too_high", e.MOUTH_SCORE_TOO_LOW = "mouth_score_too_low";
const o = e, E = {};
E.isPresent = o.FACE_NOT_PRESENT, E.isNotPitched = o.DEVICE_PITCHED, E.isNotSmall = o.FACE_TOO_FAR, E.isNotLarge = o.FACE_TOO_CLOSE, E.isNotOutOfBounds = o.FACE_CENTERING, E.isNotDim = o.BRIGHTNESS_TOO_LOW, E.isNotBright = o.BRIGHTNESS_TOO_HIGH, E.isSharp = o.SHARPNESS_TOO_LOW, E.isLeftEyePresent = o.LEFT_EYE_NOT_PRESENT, E.isRightEyePresent = o.RIGHT_EYE_NOT_PRESENT, E.isMouthPresent = o.MOUTH_NOT_PRESENT, E.isMouthScoreNotTooHigh = o.MOUTH_SCORE_TOO_HIGH, E.isMouthScoreNotTooLow = o.MOUTH_SCORE_TOO_LOW;
const f = E;
export {
  D as AppStateValues,
  L as CaptureMode,
  R as ComponentCustomEvent,
  H as ControlEventInstruction,
  f as FaceCheckToInstructionCodeMap,
  S as FaceCustomEvent,
  o as FaceInstructionCodeValues,
  P as FacingMode,
  U as LivenessStateValues,
  l as RequestCaptureInstruction,
  g as dispatchCaptureEvent,
  G as dispatchControlEvent
};
