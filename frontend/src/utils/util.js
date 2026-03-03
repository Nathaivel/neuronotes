export function htmlToText(content){
  let parser = new DOMParser()
  let doc = parser.parseFromString(content, "text/html");
  return doc.body.textContent || ''
}
