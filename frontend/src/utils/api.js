let api_url = "http://127.0.0.1:8000";

export default async function fetch_notes() {
  let res = await fetch(`${api_url}/notes/`)
    .then((r) => r.json())
    .catch((e) => console.log(e));

  if (res == undefined) {
    res = [];
  }

  return res;
}

export async function fetch_note(id) {
  let res = await fetch(`${api_url}/notes/${id}`)
    .then((r) => r.json())
    .catch((e) => console.log(e));

  if (res == undefined) {
    res = [];
  }

  return res;
}

export async function save_note(t, c) {
  let res = await fetch(`${api_url}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: t, content: c }),
  })
    .then((r) => r.json())
    .catch((e) => console.log(e));

  return res;
}

export async function delete_note(id) {
  let res = await fetch(`${api_url}/notes/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return res;
}

export async function update_note(i, t, c) {
  let res = await fetch(`${api_url}/notes/${i}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: t, content: c }),
  })
    .then((r) => r.json())
    .catch((e) => console.log(e));

  return res;
}
