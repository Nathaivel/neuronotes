let api_url = "http://127.0.0.1:8000";

export default async function fetch_notes() {
  let res = await fetch(`${api_url}/notes/`)
    .then((r) => r.json())
    .catch((e) => console.log(e));
  console.log(res);
  return res;
}

fetch_notes();
