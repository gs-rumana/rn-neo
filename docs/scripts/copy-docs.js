import fs from 'node:fs';

const files = [
  ['../CONTRIBUTING.md', 'src/content/docs/contributing.md'],
  ['../CODE_OF_CONDUCT.md', 'src/content/docs/code-of-conduct.md'],
  ['../CHANGELOG.md', 'src/content/docs/changelog.md'],
];

for (const [src, dest] of files) {
  if (fs.existsSync(dest)) {
    fs.unlinkSync(dest);
  }
  let content = fs.readFileSync(src, 'utf-8');

  // Inject frontmatter if not present
  if (!content.startsWith('---')) {
    const title = src.replace('.md', '').replace(/_/g, ' ');
    content = `---\ntitle: ${title}\ndescription: ${title}\n---\n\n${content}`;
  }

  fs.writeFileSync(dest, content);
}

console.log('Docs files copied.');
