import { BASE_URL } from "./baseUrl";

export const regularFont = fetch(
  new URL(BASE_URL + "/fonts/inter-regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export const boldFont = fetch(
  new URL(BASE_URL + "/fonts/inter-semibold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
