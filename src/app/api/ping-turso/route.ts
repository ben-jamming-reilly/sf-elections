export const GET = async (request: Request) => {
  try {
    const data = await fetch(
      `https://andererseits-wahlkabine-arthouse.turso.io/v2/pipeline`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.TURSO_AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requests: [
            { type: "execute", stmt: { sql: "SELECT * FROM Candidate" } },
            { type: "close" },
          ],
        }),
      },
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const revalidate = 0;
