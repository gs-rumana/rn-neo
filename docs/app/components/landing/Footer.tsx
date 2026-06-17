export function Footer() {
  return (
    <footer className="bg-black text-white py-5 px-7 mt-10">
      <div className="container mx-auto flex gap-4 flex-wrap justify-between">
        <div className="flex-1">Open source UI Library</div>
        <div className="flex-1 text-right">
          Built with ❤️ by{' '}
          <a href="https://gs-rumana.com" className="underline" target="_blank" rel="noreferrer">
            GS Rumana
          </a>
        </div>
      </div>
    </footer>
  );
}
