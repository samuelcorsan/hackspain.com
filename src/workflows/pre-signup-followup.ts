import { sleep } from "workflow";
import {
  type PreSignupEmailInput,
  sendPreSignupConfirmationEmail,
} from "../lib/signup-confirmation-email";

export async function handlePreSignupFollowup(input: PreSignupEmailInput) {
  "use workflow";

  await sleep("9.5 minutes");
  await sendPreSignupConfirmationEmailStep(input);

  return { status: "sent" };
}

async function sendPreSignupConfirmationEmailStep(input: PreSignupEmailInput) {
  "use step";

  const result = await sendPreSignupConfirmationEmail(input);
  if (!result.ok) {
    throw new Error(
      `pre-signup confirmation email failed: ${result.reason}${result.detail ? ` (${result.detail})` : ""}`
    );
  }
  return result;
}
