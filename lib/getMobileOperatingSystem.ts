export type OS = "Android" | "iOS" | "unknown";

export function getOS(): OS {
  const userAgent = navigator.userAgent;

  // Android detection
  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // iOS detection
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return "iOS";
  }

  return "unknown";
}
