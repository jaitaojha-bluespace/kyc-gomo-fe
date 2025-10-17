import type { InstructionEscalatedEvent } from './common';
import type { SmileInstructionCode } from '../smile';
export declare enum SmileCustomEvent {
    CONTROL = "smile-auto-capture:control",
    INSTRUCTION_ESCALATED = "smile:instruction-escalated",
    STATUS_CHANGED = "smile-auto-capture:status-changed"
}
export type SmileInstructionEscalatedEvent = InstructionEscalatedEvent<SmileInstructionCode>;
