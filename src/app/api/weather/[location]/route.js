export const GET = async (request, { params }) => {
  const { API_KEY, API_BASE_URL } = process.env;
  const apiKey = API_KEY;
  const apiUrl = API_BASE_URL;
  try {
    const { location } = params;
    const url = `${apiUrl}current.json?key=${apiKey}&q=${location}&aqi=no`;
    const response = await fetch(url);
    const data = await response.json();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
