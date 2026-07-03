const Footer = () => {
    return (
        <footer className="border-t border-gray-800 bg-gray-950">
            <div className="mx-auto max-w-7xl px-6 py-8 text-center">
                <p className="text-sm text-gray-400">
                    © {new Date().getFullYear()}{" "}
                    <span className="font-semibold text-white">
                        LazarusnimeKomik
                    </span>
                    . All Rights Reserved.
                </p>
                <p className="mt-2 text-xs text-gray-500">
                    Made with ❤️ using Next.js & Tailwind CSS
                </p>
            </div>
        </footer>
    );
};
export default Footer;
