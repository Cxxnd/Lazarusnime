"use client";
import React, { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

const BookmarkButton = ({ slug, user_email, poster }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [error, setError] = useState(null);

    const handlerCollections = async (event) => {
        event.preventDefault();

        if (isSubmitting || isAdded) return;

        setIsSubmitting(true);
        setError(null);

        const data = { slug, user_email, poster };

        try {
            const response = await fetch("/api/v1/bookmark", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.message || "Failed to add to collection",
                );
            }

            setIsAdded(true);
        } catch (error) {
            console.error("Error in handlerCollections:", error);
            setError(error.message || "An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-end items-end">
            <button
                className={`text-sm rounded py-1 px-1 hover:font-bold transition-all ${
                    isAdded
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-color-accent hover:bg-color-dark"
                } ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                onClick={handlerCollections}
                disabled={isSubmitting || isAdded}
            >
                {isSubmitting ? (
                    "Adding..."
                ) : isAdded ? (
                    <BookmarkCheck size={32} className="inline-block" />
                ) : (
                    <Bookmark size={32} className="inline-block" />
                )}
            </button>

            {error && (
                <p className="text-red-500 text-xs animate-pulse">
                    gagal menambahkan ke koleksi
                </p>
            )}
        </div>
    );
};

export default BookmarkButton;
