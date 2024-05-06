export const MAILER_GROUP_IDS = {
  MARKETING: "82008295096715100",
  FREITAG_MORGEN: "82008288374294263",
  WAHLKABINE: "118855685167384023",
  SENSIBLE_SPRECHEN: "92055770822083891",
};

export const MAILER_LITE_BASE_URL = "https://connect.mailerlite.com";

export const createOrUpdateSubscriber = async ({
  email,
  groups,
  subscribed_at,
  fields,
}: {
  email: string;
  subscribed_at: string;
  groups: string[];
  fields: Record<string, string>;
}) => {
  const response = await fetch(`${MAILER_LITE_BASE_URL}/api/subscribers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${process.env.MAILER_LITE_API_KEY!}`,
    },
    body: JSON.stringify({
      email,
      subscribed_at: subscribed_at,
      opted_in_at: subscribed_at,
      groups,
      fields,
    }),
  });

  const data = await response.json();

  return data;
};

export const updateSubscriber = async ({
  subscriberId,
  email,
  groups,
  subscribed_at,
  fields,
}: {
  subscriberId: string;
  email?: string;
  subscribed_at?: string;
  groups?: string[];
  fields?: Record<string, string>;
}) => {
  const response = await fetch(
    `${MAILER_LITE_BASE_URL}/api/subscribers/${subscriberId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${process.env.MAILER_LITE_API_KEY!}`,
      },
      body: JSON.stringify({
        email,
        subscribed_at: subscribed_at,
        opted_in_at: subscribed_at,
        groups,
        fields,
      }),
    },
  );

  const data = await response.json();

  return data;
};

export const getSubscriber = async ({
  email,
}: {
  email: string;
}): Promise<any> => {
  const response = await fetch(
    `${MAILER_LITE_BASE_URL}/api/subscribers/${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${process.env.MAILER_LITE_API_KEY!}`,
      },
    },
  );

  const data = await response.json();

  return data;
};

export const getCampaigns = async ({
  status,
  page = 1,
}: {
  status: "sent" | "draft" | "ready";
  page?: number;
}): Promise<any> => {
  const response = await fetch(
    `${MAILER_LITE_BASE_URL}/api/campaigns?filter[status]=sent&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${process.env.MAILER_LITE_API_KEY!}`,
      },
    },
  );

  const data = await response.json();

  return data;
};

export const fetchAllCampaigns = async ({
  status,
  subjectSearch,
}: {
  status: "sent" | "draft" | "ready";
  subjectSearch?: string;
}): Promise<any> => {
  let page = 1;
  let lastPage = undefined;
  const allCampaigns: any = [];
  do {
    const response = await getCampaigns({ status, page });

    if (!response || !response?.data) {
      console.log("No response for page", page);
      continue;
    }

    console.log(`Page ${page} of ${response?.meta?.last_page}`);

    page += 1;
    lastPage = response?.meta?.last_page;
    for (const listCampaign of response.data) {
      const campaign = (await getCampaign({ campaignId: listCampaign.id }))
        ?.data;
      console.log("campaign", campaign?.name);

      if (!campaign?.emails?.length || campaign?.emails?.length === 0) {
        console.log("No emails for campaign", campaign?.id, campaign?.name);
        continue;
      }

      if (
        !subjectSearch ||
        campaign["emails"][0]["subject"].includes(subjectSearch)
      ) {
        allCampaigns.push({
          subject: campaign["emails"][0]["subject"],
          content: campaign["emails"][0]["content"],
          id: campaign["id"],
        });
      }
    }
  } while (lastPage && page <= lastPage);

  return allCampaigns;
};

export const getCampaign = async ({
  campaignId,
}: {
  campaignId: string;
}): Promise<any> => {
  const response = await fetch(
    `${MAILER_LITE_BASE_URL}/api/campaigns/${campaignId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${process.env.MAILER_LITE_API_KEY!}`,
      },
    },
  );

  const data = await response.json();

  return data;
};
