// utils/truncate.ts

export type TruncateOptions = {
  suffix?: string; // শেষে কী যোগ হবে (ডিফল্ট '...')
  wordSafe?: boolean; // শব্দ না কেটে স্পেসে থামবে কি না
};

const truncate = (
  text: string,
  maxLength: number = 20,
  options: TruncateOptions = {} // ✅ ডিফল্ট অবজেক্ট
): string => {
  // ✅ ফাঁকা/ফলসি ইনপুট
  if (!text) return '';

  const { suffix = '...', wordSafe = true } = options;

  // ✅ কোডপয়েন্ট–সেফ (ইমোজি/বাংলা কাটলেও ভাঙবে না)
  const chars = Array.from(text);

  // ✅ ছোট হলে রিটার্ন
  if (chars.length <= maxLength) return text;

  // ✅ মোট দৈর্ঘ্য = maxLength এর মধ্যে রাখি (suffix সহ)
  const suffixLen = Array.from(suffix).length;
  const cutLen = Math.max(0, maxLength - suffixLen);

  // যদি suffix-ই maxLength-এর চেয়ে বড় হয়, suffix-এর অংশ দেখাও
  if (cutLen === 0) {
    return suffix.slice(0, maxLength);
  }

  // প্রথমে কাটলাম
  let sliced = chars.slice(0, cutLen).join('');

  if (wordSafe) {
    // শব্দ ভাঙবো না: শেষ স্পেস পর্যন্ত কাটবো
    const lastSpace = sliced.lastIndexOf(' ');
    if (lastSpace > 0) {
      sliced = sliced.slice(0, lastSpace).trimEnd();
    }
  }

  return sliced + suffix;
};

export default truncate;
