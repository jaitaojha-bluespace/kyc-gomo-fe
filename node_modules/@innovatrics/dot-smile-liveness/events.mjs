const _ = {};
_.CONTINUE_DETECTION = "continue-detection", _.SWITCH_CAMERA = "switch-camera", _.TOGGLE_MIRROR = "toggle-mirror";
const G = _, s = {};
s.FIRST_FRAME = "first-frame", s.FIRST_VALID_FRAME = "first-valid-frame";
const P = s, C = {};
C.REQUEST_CAPTURE = "dot-custom-event:request-capture";
const A = C;
var I = ((t) => (t.CAMERA_PROPS_CHANGED = "document-auto-capture:camera-props-changed", t.CONTROL = "document-auto-capture:control", t.DETECTED_DOCUMENT_CHANGED = "document-auto-capture:detected-document-changed", t.DOCUMENT_DETECTION = "document-auto-capture:document-detection", t.INSTRUCTION_CHANGED = "document-auto-capture:instruction-changed", t.INSTRUCTION_ESCALATED = "document-auto-capture:instruction-escalated", t.STATE_CHANGED = "document-auto-capture:state-changed", t.VIDEO_ELEMENT_SIZE = "document-auto-capture:video-element-size", t))(I || {}), p = ((t) => (t.CAMERA_PROPS_CHANGED = "face-auto-capture:camera-props-changed", t.CONTROL = "face-auto-capture:control", t.DETECTED_FACE_CHANGED = "face-auto-capture:detected-face-changed", t.FACE_DETECTION = "face-auto-capture:face-detection", t.INSTRUCTION_CHANGED = "face-auto-capture:instruction-changed", t.STATE_CHANGED = "face-auto-capture:state-changed", t.VIDEO_ELEMENT_SIZE = "face-auto-capture:video-element-size", t))(p || {}), m = ((t) => (t.ANIMATION_END = "magnifeye-auto-capture:animation-end", t.CONTROL = "magnifeye-auto-capture:control", t.STATUS_CHANGED = "magnifeye-auto-capture:status-changed", t))(m || {}), d = ((t) => (t.CONTROL = "smile-auto-capture:control", t.INSTRUCTION_ESCALATED = "smile:instruction-escalated", t.STATUS_CHANGED = "smile-auto-capture:status-changed", t))(d || {}), l = ((t) => (t.CAMERA_PROPS_CHANGED = "palm-capture:camera-props-changed", t.CONTROL = "palm-capture:control", t.DETECTED_PALM_CHANGED = "palm-capture:detected-palm-changed", t.INSTRUCTION_CHANGED = "palm-capture:instruction-changed", t.STATE_CHANGED = "palm-capture:state-changed", t.VIDEO_ELEMENT_SIZE = "palm-capture:video-element-size", t))(l || {}), D = ((t) => (t.CONTROL = "eye-gaze-auto-capture:control", t.STATUS_CHANGED = "eye-gaze-auto-capture:status-changed", t))(D || {});
const i = (t, a) => {
  const n = {};
  n.detail = a, document.dispatchEvent(new CustomEvent(t, n));
}, g = (t, a) => {
  const n = {};
  n.instruction = a, i(t, n);
};
function U(t) {
  const a = {};
  a.instruction = t;
  const n = a;
  i(A.REQUEST_CAPTURE, n);
}
const u = {};
u.FRONT = "user", u.REAR = "environment";
const M = u, r = {};
r.AUTO_CAPTURE = "AUTO_CAPTURE", r.WAIT_FOR_REQUEST = "WAIT_FOR_REQUEST";
const f = r, c = {};
c.LOADING = "LOADING", c.ERROR = "ERROR", c.WAITING = "WAITING", c.RUNNING = "RUNNING";
const h = c, R = { ...h };
R.DONE = "DONE";
const H = R, S = {};
S.EYE_NOT_PRESENT = "eye_not_present";
const O = S, e = {};
e.CANDIDATE_SELECTION = "candidate_selection", e.FACE_TOO_CLOSE = "face_too_close", e.FACE_TOO_FAR = "face_too_far", e.FACE_CENTERING = "face_centering", e.FACE_NOT_PRESENT = "face_not_present", e.SHARPNESS_TOO_LOW = "sharpness_too_low", e.BRIGHTNESS_TOO_LOW = "brightness_too_low", e.BRIGHTNESS_TOO_HIGH = "brightness_too_high", e.DEVICE_PITCHED = "device_pitched", e.LEFT_EYE_NOT_PRESENT = "left_" + O.EYE_NOT_PRESENT, e.RIGHT_EYE_NOT_PRESENT = "right_" + O.EYE_NOT_PRESENT, e.MOUTH_NOT_PRESENT = "mouth_not_present", e.MOUTH_SCORE_TOO_HIGH = "mouth_score_too_high", e.MOUTH_SCORE_TOO_LOW = "mouth_score_too_low";
const E = e, o = {};
o.isPresent = E.FACE_NOT_PRESENT, o.isNotPitched = E.DEVICE_PITCHED, o.isNotSmall = E.FACE_TOO_FAR, o.isNotLarge = E.FACE_TOO_CLOSE, o.isNotOutOfBounds = E.FACE_CENTERING, o.isNotDim = E.BRIGHTNESS_TOO_LOW, o.isNotBright = E.BRIGHTNESS_TOO_HIGH, o.isSharp = E.SHARPNESS_TOO_LOW, o.isLeftEyePresent = E.LEFT_EYE_NOT_PRESENT, o.isRightEyePresent = E.RIGHT_EYE_NOT_PRESENT, o.isMouthPresent = E.MOUTH_NOT_PRESENT, o.isMouthScoreNotTooHigh = E.MOUTH_SCORE_TOO_HIGH, o.isMouthScoreNotTooLow = E.MOUTH_SCORE_TOO_LOW;
const T = { ...E };
T.SMILE = "smile", T.SMILE_CANDIDATE_SELECTION = "smile_candidate_selection", T.KEEP_NEUTRAL_EXPRESSION = "keep_neutral_expression";
const v = T, N = {};
N.NEUTRAL = "NEUTRAL", N.SMILE = "SMILE";
const F = N, V = H;
export {
  h as AppStateValues,
  f as CaptureMode,
  A as ComponentCustomEvent,
  G as ControlEventInstruction,
  M as FacingMode,
  H as LivenessStateValues,
  P as RequestCaptureInstruction,
  d as SmileCustomEvent,
  v as SmileInstructionCodeValues,
  F as SmilePhaseValues,
  V as SmileStateValues,
  U as dispatchCaptureEvent,
  g as dispatchControlEvent
};
