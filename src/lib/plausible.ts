export const trackPlausibleEvent = async ({
  event,
  url,
  ip,
  props = {},
  userAgent,
}: {
  event: string;
  url: string;
  ip: string;
  props?: Record<string, any>;
  userAgent: string;
}) => {
  const body = JSON.stringify({
    name: event,
    url,
    domain: "wahlchecker.at",
    props: {
      ...props,
    },
  });

  console.log("Tracking event", body);

  return await fetch("https://plausible.io/api/event", {
    body,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": userAgent,
      "X-Forwarded-For": ip,
    },
  });
};
