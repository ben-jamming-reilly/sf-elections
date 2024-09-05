/* eslint-disable react/no-unescaped-entities */
import { MailerliteInput } from "../../ui/mailerlite-input";
import { getMailerliteFormId, MAILERLITE_ACCOUNT_ID } from "~/app/utils.index";

export const revalidate = false;

export default async function Newsletter({
  params,
}: {
  params: { electionSlug: string };
}) {
  const mailerLiteId = getMailerliteFormId(
    params.electionSlug,
    "nr-election-2024",
  );

  return (
    <div className="flex h-full flex-col gap-10">
      <section
        aria-label="Newsletter Anmeldung"
        className="mx-auto flex w-[900px] max-w-full flex-col gap-4 text-[1.125rem] leading-[1.6875rem]"
      >
        <h1 className="pt-5 text-[1.75rem] leading-[2.125rem]">
          Du möchtest mehr Infos in Einfacher Sprache?
        </h1>
        <p>
          Melde Dich jetzt für unseren kostenlosen Newsletter an: “Freitagmorgen
          mit andererseits”
          <br />
          Der Newsletter, der dir hilft Behinderungen zu verstehen und erklärt,
          warum Barrierefreiheit für alle wichtig ist.
        </p>

        <div className="max-w-[700px]">
          <MailerliteInput
            action={`https://assets.mailerlite.com/jsonp/${MAILERLITE_ACCOUNT_ID}/forms/${mailerLiteId}/subscribe`}
          />
        </div>

        <p>
          Damit gibst Du uns auch die Erlaubnis, Dir unseren wöchentlichen
          Newsletter, Neuigkeiten und Werbung von{" "}
          <span className="italic">andererseits</span> zu schicken. Du kannst
          Dich jederzeit abmelden.
        </p>
        <p>
          Infos zum Datenschutz bei <span className="italic">andererseits</span>{" "}
          und unserem Newsletterprogramm findest Du hier:
        </p>
        <ul className="my-3 ml-4 list-disc space-y-1">
          {[
            {
              text: "Privacy Policy – MailerLite",
              href: "https://www.mailerlite.com/legal/privacy-policy",
            },
            {
              text: "Datenschutz – andererseits",
              href: "https://andererseits.org/datenschutz",
            },
          ].map((link) => (
            <li key={link.href}>
              <a
                className="font-semibold text-black underline"
                target="blank"
                rel="noreferrer noopener"
                href={link.href}
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
