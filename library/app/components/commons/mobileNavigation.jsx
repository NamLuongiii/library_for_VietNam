export default function MobileNavigation({ onClose }) {
    return <section className="md:hidden fixed inset-0 z-auto bg-white p-4">
        <header className="flex justify-between items-center">
            <h1 className="text-2xl mb-4">Menu</h1>
            <span className="p-2 aspect-square rounded-full bg-slate-50 hover:bg-slate-100 active:bg-slate-200" onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>

            </span>
        </header>
        
    </section>
}