/**
 * Returns true if the given pathname matches the pattern
 * of a project preview path (i.e. /projects/:projectId/:typologyId/preview).
 * @param pathname the pathname to check
 * @returns true if the pathname is a project preview path
 */
export function isProjectPreviewPath(pathname: string) {
  const regex = /^\/projects\/[^/]+\/[^/]+\/preview$/;
  return regex.test(pathname);
}
