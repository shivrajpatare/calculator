export const TIP_PRESETS = [5, 10, 15, 25, 50] as const;

export type TipPreset = typeof TIP_PRESETS[number];
