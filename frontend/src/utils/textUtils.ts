import sanitizeHtml from "sanitize-html";

export const truncateText = (htmlString: string, length: number): string => {
  const sanitizedString = sanitizeHtml(htmlString, {
    allowedTags: [],
    allowedAttributes: {},
  });

  // Truncate sanitized string
  return sanitizedString.length > length ? `${sanitizedString.slice(0, length)}...` : sanitizedString;
};
