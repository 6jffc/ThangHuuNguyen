export function renderMarkdown(source: string): string {
  const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const inline = (value: string) => {
    let text = escapeHtml(value);
    text = text.replace(/!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g, '<figure class="my-8"><img src="$2" alt="$1" loading="lazy" class="w-full rounded-2xl" /><figcaption class="mt-2 text-center text-sm text-slate-500">$1</figcaption></figure>');
    text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>').replace(/`([^`]+)`/g, '<code>$1</code>');
    return text;
  };
  const lines = source.replace(/\r/g, '').split('\n');
  const out: string[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let inCode = false;
  let code: string[] = [];
  const flushParagraph = () => { if (paragraph.length) { out.push('<p>' + inline(paragraph.join(' ')) + '</p>'); paragraph = []; } };
  const flushList = () => { if (list.length) { out.push('<ul>' + list.map(item => '<li>' + inline(item) + '</li>').join('') + '</ul>'); list = []; } };
  for (const line of lines) {
    if (line.trim().startsWith('```')) { flushParagraph(); flushList(); if (inCode) { out.push('<pre><code>' + escapeHtml(code.join('\n')) + '</code></pre>'); code = []; } inCode = !inCode; continue; }
    if (inCode) { code.push(line); continue; }
    if (!line.trim()) { flushParagraph(); flushList(); continue; }
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) { flushParagraph(); flushList(); const level = heading[1].length + 1; out.push('<h' + level + '>' + inline(heading[2]) + '</h' + level + '>'); continue; }
    if (line.startsWith('> ')) { flushParagraph(); flushList(); out.push('<blockquote>' + inline(line.slice(2)) + '</blockquote>'); continue; }
    if (/^[-*+]\s+/.test(line)) { flushParagraph(); list.push(line.replace(/^[-*+]\s+/, '')); continue; }
    if (/^---+$/.test(line.trim())) { flushParagraph(); flushList(); out.push('<hr />'); continue; }
    paragraph.push(line.trim());
  }
  flushParagraph(); flushList();
  if (inCode) out.push('<pre><code>' + escapeHtml(code.join('\n')) + '</code></pre>');
  return out.join('\n');
}
