"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const DeleteCollectionButton = ({ slug }) => {
    const router = useRouter();

    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const confirmDelete = confirm("Hapus anime ini dari collection?");

        if (!confirmDelete) return;

        await fetch("/api/v1/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                slug,
            }),
        });

        router.refresh();
    };

    return (
        <button
            onClick={handleDelete}
            className="absolute top-2 right-2 z-20 bg-red-500/80 hover:bg-red-600 p-2 rounded-full transition"
        >
            <Trash2 size={16} />
        </button>
    );
};

export default DeleteCollectionButton;
