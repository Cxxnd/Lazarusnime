import ButtonBack from "@/components/Navbar/ButtonBack";
export default function maintenence() {
    return (
        <main className="p-4 min-h-screen">
            <ButtonBack />
            <div className="flex items-center justify-center bg-gray-900 p-6">
                <div className="bg-black rounded-xl shadow-lg p-10 text-center">
                    <h1 className="text-3xl font-semibold">
                        Fitur Sedang Dalam Pengembangan🚀
                    </h1>
                    <p className="text-gray-600 mt-2">Di Tunggu yaa 😉</p>
                </div>
            </div>
        </main>
    );
}
