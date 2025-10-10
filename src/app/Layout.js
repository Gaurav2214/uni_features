export default function Layout({ children }) {
  return (
    <div className={` relative shadow-[0_2px_14px_rgba(0,0,0,0.1)] z-1`}>
      <main className="pt-[30px]">
        <div className="max-w-[952px] mx-auto px-[25px]">
          {children}
        </div>
      </main>
    </div>
  );
}