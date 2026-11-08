import { z } from "zod";
import { TrackId } from "./schema";

export const ProofChip = z.object({
  label: z.string().min(1),
  track: TrackId,
  placeholder: z.boolean().default(false),
});
export type ProofChip = z.infer<typeof ProofChip>;

// Hero proof chips (docs/01 core content). All placeholder until verified.
export const proofChips = z.array(ProofChip).parse([
  { label: "~20 marathons", track: "endurance", placeholder: true },
  { label: "Pulse — full-stack app", track: "code", placeholder: true },
  { label: "Kangourou ×2", track: "maths", placeholder: true },
]);
