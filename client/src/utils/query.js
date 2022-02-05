export function configureQueryString(query) {
  let stringSegments = [];
  Object.keys(query).forEach((key) => {
    if (query[key] !== undefined) stringSegments.push(`${key}=${query[key]}`);
  });
  if (!stringSegments.length) return "";
  return `?${stringSegments.join("&")}`;
}
