export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");

  if (!type || !Object.keys(ogTypes).includes(type)) {
    return NextResponse.json({ message: "Slug not found" }, { status: 404 });
  }

  if (type === "vergleich") {
    const candidateSlugs = url.searchParams.get("candidateSlugs")?.split(",");
    console.log(candidateSlugs);
    if (candidateSlugs && candidateSlugs.length >= 2) {
      return await ogTypes.vergleich({
        params: {
          candidateSlugs,
        },
      });
    }
  }

  return NextResponse.json({ message: "Not found" }, { status: 404 });
}
