import { z } from "zod";
import { MAILER_GROUP_IDS, createOrUpdateSubscriber } from "~/lib/mailerlite";

export type NewsletterSignupResponse = { success: boolean; message: string };

export const POST = async (request: Request) => {
  try {
    const data = await request.json();

    const parsedData = z.object({
      email: z.string().email(),
    });

    const mailerliteSignupResponse = await createOrUpdateSubscriber({
      groups: [
        MAILER_GROUP_IDS.WAHLKABINE,
        MAILER_GROUP_IDS.SENSIBLE_SPRECHEN,
        MAILER_GROUP_IDS.MARKETING,
        MAILER_GROUP_IDS.FREITAG_MORGEN,
      ],
      email: parsedData.parse(data).email,
      subscribed_at: dateInYyyyMmDdHhMmSs(new Date()),
      fields: {},
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Erfolgreich angemeldet!",
      }),
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          message: error.errors,
        }),
        {
          status: 400,
        },
      );
    }

    if (error instanceof Error) {
      return new Response(
        JSON.stringify({
          success: false,
          message: error.message,
        }),
        {
          status: 500,
        },
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        message:
          "Ein unbekannter Fehler ist passiert. Bitte versuche es nochmal.",
      }),
      {
        status: 500,
      },
    );
  }
};

function padTwoDigits(num: number) {
  return num.toString().padStart(2, "0");
}

export function dateInYyyyMmDdHhMmSs(date: Date, dateDiveder: string = "-") {
  // :::: Exmple Usage ::::
  // The function takes a Date object as a parameter and formats the date as YYYY-MM-DD hh:mm:ss.
  // 👇️ 2023-04-11 16:21:23 (yyyy-mm-dd hh:mm:ss)
  //console.log(dateInYyyyMmDdHhMmSs(new Date()));

  //  👇️️ 2025-05-04 05:24:07 (yyyy-mm-dd hh:mm:ss)
  // console.log(dateInYyyyMmDdHhMmSs(new Date('May 04, 2025 05:24:07')));
  // Date divider
  // 👇️ 01/04/2023 10:20:07 (MM/DD/YYYY hh:mm:ss)
  // console.log(dateInYyyyMmDdHhMmSs(new Date(), "/"));
  return (
    [
      date.getFullYear(),
      padTwoDigits(date.getMonth() + 1),
      padTwoDigits(date.getDate()),
    ].join(dateDiveder) +
    " " +
    [
      padTwoDigits(date.getHours()),
      padTwoDigits(date.getMinutes()),
      padTwoDigits(date.getSeconds()),
    ].join(":")
  );
}
