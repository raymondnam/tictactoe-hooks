const EMOJI_VALUES = {
  'X': '❌',
  'O': '⭕',
};

export function getEmoji(value: string) : string {
  return EMOJI_VALUES[value] || '';
}