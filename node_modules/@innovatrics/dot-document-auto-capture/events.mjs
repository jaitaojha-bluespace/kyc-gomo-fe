const u = {};
u.CONTINUE_DETECTION = "continue-detection", u.SWITCH_CAMERA = "switch-camera", u.TOGGLE_MIRROR = "toggle-mirror";
const D = u, s = {};
s.FIRST_FRAME = "first-frame", s.FIRST_VALID_FRAME = "first-valid-frame";
const l = s, N = {};
N.REQUEST_CAPTURE = "dot-custom-event:request-capture";
const _ = N;
var i = ((t) => (t.CAMERA_PROPS_CHANGED = "document-auto-capture:camera-props-changed", t.CONTROL = "document-auto-capture:control", t.DETECTED_DOCUMENT_CHANGED = "document-auto-capture:detected-document-changed", t.DOCUMENT_DETECTION = "document-auto-capture:document-detection", t.INSTRUCTION_CHANGED = "document-auto-capture:instruction-changed", t.INSTRUCTION_ESCALATED = "document-auto-capture:instruction-escalated", t.STATE_CHANGED = "document-auto-capture:state-changed", t.VIDEO_ELEMENT_SIZE = "document-auto-capture:video-element-size", t))(i || {}), A = ((t) => (t.CAMERA_PROPS_CHANGED = "face-auto-capture:camera-props-changed", t.CONTROL = "face-auto-capture:control", t.DETECTED_FACE_CHANGED = "face-auto-capture:detected-face-changed", t.FACE_DETECTION = "face-auto-capture:face-detection", t.INSTRUCTION_CHANGED = "face-auto-capture:instruction-changed", t.STATE_CHANGED = "face-auto-capture:state-changed", t.VIDEO_ELEMENT_SIZE = "face-auto-capture:video-element-size", t))(A || {}), R = ((t) => (t.ANIMATION_END = "magnifeye-auto-capture:animation-end", t.CONTROL = "magnifeye-auto-capture:control", t.STATUS_CHANGED = "magnifeye-auto-capture:status-changed", t))(R || {}), p = ((t) => (t.CONTROL = "smile-auto-capture:control", t.INSTRUCTION_ESCALATED = "smile:instruction-escalated", t.STATUS_CHANGED = "smile-auto-capture:status-changed", t))(p || {}), m = ((t) => (t.CAMERA_PROPS_CHANGED = "palm-capture:camera-props-changed", t.CONTROL = "palm-capture:control", t.DETECTED_PALM_CHANGED = "palm-capture:detected-palm-changed", t.INSTRUCTION_CHANGED = "palm-capture:instruction-changed", t.STATE_CHANGED = "palm-capture:state-changed", t.VIDEO_ELEMENT_SIZE = "palm-capture:video-element-size", t))(m || {}), S = ((t) => (t.CONTROL = "eye-gaze-auto-capture:control", t.STATUS_CHANGED = "eye-gaze-auto-capture:status-changed", t))(S || {});
const O = (t, c) => {
  const n = {};
  n.detail = c, document.dispatchEvent(new CustomEvent(t, n));
}, G = (t, c) => {
  const n = {};
  n.instruction = c, O(t, n);
};
function g(t) {
  const c = {};
  c.instruction = t;
  const n = c;
  O(_.REQUEST_CAPTURE, n);
}
const T = {};
T.FRONT = "user", T.REAR = "environment";
const h = T, r = {};
r.AUTO_CAPTURE = "AUTO_CAPTURE", r.WAIT_FOR_REQUEST = "WAIT_FOR_REQUEST";
const H = r, E = {};
E.LOADING = "LOADING", E.ERROR = "ERROR", E.WAITING = "WAITING", E.RUNNING = "RUNNING";
const d = E, C = { ...d };
C.DONE = "DONE";
const U = C, e = {};
e.CANDIDATE_SELECTION = "candidate_selection", e.DOCUMENT_CENTERING = "document_centering", e.DOCUMENT_NOT_PRESENT = "document_not_present", e.DOCUMENT_TOO_FAR = "document_too_far", e.SHARPNESS_TOO_LOW = "sharpness_too_low", e.BRIGHTNESS_TOO_LOW = "brightness_too_low", e.BRIGHTNESS_TOO_HIGH = "brightness_too_high", e.HOTSPOTS_PRESENT = "hotspots_present";
const a = e, o = {};
o.isPresent = a.DOCUMENT_NOT_PRESENT, o.isNotSmall = a.DOCUMENT_TOO_FAR, o.isNotOutOfBounds = a.DOCUMENT_CENTERING, o.isSharp = a.SHARPNESS_TOO_LOW, o.isNotDim = a.BRIGHTNESS_TOO_LOW, o.isNotBright = a.BRIGHTNESS_TOO_HIGH, o.noHotspots = a.HOTSPOTS_PRESENT;
const v = o;
export {
  d as AppStateValues,
  H as CaptureMode,
  _ as ComponentCustomEvent,
  D as ControlEventInstruction,
  v as DocumentCheckToInstructionCodeMap,
  i as DocumentCustomEvent,
  a as DocumentInstructionCodeValues,
  h as FacingMode,
  U as LivenessStateValues,
  l as RequestCaptureInstruction,
  g as dispatchCaptureEvent,
  G as dispatchControlEvent
};
