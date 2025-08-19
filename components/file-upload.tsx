"use client";

import { X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";

//import "@uploadthing/react/styles.css"

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps) => {
    const fileType = value?.split(".").pop();

    if (value && fileType !== "pdf") {
        return (
            <div className ="relative h-20 w-20">
                <Image 
                    fill
                    src={value}
                    alt="Upload"
                    className="rounded-full"
                />
                <button
                    onClick={() => onChange("")}
                    className="bg-rose-500 text-white p-1 rounded-full absolute
                    top-0 right-0 shadow-sm"
                    type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }

    return (
            <UploadDropzone
                endpoint={endpoint}
                appearance={{
                    container: "border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white w-full",
                    uploadIcon: "size-12",
                    button: "bg-blue-500 text-white px-3 py-0 rounded mt-2 hover:bg-blue-600 text-sm w-full",
                    label: "text-gray-700 text-sm font-medium",
                    allowedContent: "text-gray-500 text-xs"
                    }}
                onClientUploadComplete={(res) => {
                    onChange(res?.[0].ufsUrl);
                }}
                onUploadError={(error: Error) => {
                    console.log(error);
                }}
            />
    )
}