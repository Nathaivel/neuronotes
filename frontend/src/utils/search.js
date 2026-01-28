export default function search_notes(query, data) {
  let new_data = data;
  if (query != "") {
    new_data = data.slice(1);
  }

  return new_data;
}
