import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const type = searchParams.get("type") || "page";

  // Validate the secret
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  // Enable Draft Mode
  const draft = await draftMode();
  draft.enable();

  // Redirect to the appropriate page
  let redirectUrl = "/";

  switch (type) {
    case "post":
      redirectUrl = slug ? `/blog/${slug}` : "/blog";
      break;
    case "project":
      redirectUrl = slug ? `/projects/${slug}` : "/projects";
      break;
    case "experience":
      redirectUrl = "/experience";
      break;
    case "profile":
      redirectUrl = "/about";
      break;
    default:
      redirectUrl = slug || "/";
  }

  redirect(redirectUrl);
}
