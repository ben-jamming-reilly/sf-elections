"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import useMediaQuery from "~/hooks/useMediaQuery";
import { Loading } from "./loading";
import { ThumbUpIcon } from "./yes-no-result";

export const MailerliteInput = ({ action }: { action: string }) => {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  const isMobile = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    fetch(
      "https://assets.mailerlite.com/jsonp/345641/forms/118855395671279343/takel",
    );
  }, []);
  return (
    <>
      <div
        id="mlb2-14086309"
        className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-14086309 w-full py-5"
      >
        <div className="ml-form-align-center ">
          <div className="ml-form-embedWrapper embedForm !max-w-full">
            <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
              <form
                className="ml-block-form relative flex  flex-row"
                action={action}
                data-code=""
                method="post"
                target="_blank"
              >
                <div className="ml-form-formContent flex-grow">
                  <div className="ml-form-fieldRow ml-last-item !w-full">
                    <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                      <input
                        aria-label="email"
                        aria-required="true"
                        type="email"
                        className="form-control !w-full !rounded-[100px] !border-2 !border-black !px-6 !py-3 !text-black !caret-black !outline-offset-4  !outline-black focus-visible:!outline-2"
                        data-inputmask=""
                        name="fields[email]"
                        placeholder={
                          isMobile ? "Email Addresse" : "Deine Email Addresse"
                        }
                        autoComplete="email"
                      />
                    </div>
                  </div>
                </div>

                <input type="hidden" name="ml-submit" value="1" />

                <div className="ml-form-embedSubmit flex-shrink">
                  <button
                    onClick={(e) => {
                      setState("loading");

                      window.setTimeout(() => {
                        setState("success");
                      }, 1000);
                    }}
                    type="submit"
                    className="primary absolute right-0 top-0 !flex !h-full !w-fit !items-center !justify-center !rounded-[100px] !border-2 !border-black !bg-[#FBFF95] !px-6 !py-3 !text-black !outline-offset-4  !outline-black !transition-all focus-visible:!outline-2 notouch:hover:!bg-black notouch:hover:!text-[#FBFF95]"
                  >
                    <span className={clsx(state === "loading" && "invisible")}>
                      Ich bin dabei!
                    </span>
                    <span className="absolute left-1/2 top-1/2 h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2">
                      {state === "loading" && <Loading size={30} />}
                    </span>
                  </button>

                  <button
                    disabled
                    style={{ display: "none" }}
                    type="button"
                    className="loading"
                  >
                    <div className="ml-form-embedSubmitLoad"></div>
                    <span className="sr-only">Loading...</span>
                  </button>
                </div>

                <input type="hidden" name="anticsrf" value="true" />
              </form>
            </div>

            {state === "success" && (
              <p
                aria-label="Erfolgsmeldung"
                className="mt-5 flex items-start justify-start gap-2  "
              >
                <ThumbUpIcon
                  aria-hidden="true"
                  className="mt-1 inline-block h-5 w-5 stroke-2 text-green-500"
                />

                <div>
                  <h4 className="text-lg font-semibold text-green-500">
                    Bitte bestätige die Anmeldung zu Emails von andererseits mit
                    dem Link in deinem Postfach.
                  </h4>
                </div>
              </p>
            )}
          </div>
        </div>
      </div>

      <script
        async
        src="https://groot.mailerlite.com/js/w/webforms.min.js?v2d8fb22bb5b3677f161552cd9e774127"
        type="text/javascript"
      ></script>
    </>
  );
};
