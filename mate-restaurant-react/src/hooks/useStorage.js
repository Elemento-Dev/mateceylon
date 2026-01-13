import { useState } from 'react';
import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export const useStorage = () => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    const uploadFile = async (file, path) => {
        setError(null);
        try {
            // Sanitize filename
            const cleanName = Date.now() + '_' + file.name.replace(/\s+/g, '_');
            const storageRef = ref(storage, `${path}/${cleanName}`);

            alert(`Debug: Uploading clean name: ${cleanName}`);

            // Create a timeout promise
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Upload timed out after 15 seconds")), 15000)
            );

            // Race upload against timeout
            await Promise.race([
                uploadBytes(storageRef, file),
                timeoutPromise
            ]);

            alert("Debug: Bytes uploaded, getting URL...");
            const downloadUrl = await getDownloadURL(storageRef);
            alert(`Debug: Got URL: ${downloadUrl}`);
            setUrl(downloadUrl);
            return downloadUrl;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const deleteFile = async (imageUrl) => {
        try {
            // Create a reference to the file to delete
            const storageRef = ref(storage, imageUrl);
            await deleteObject(storageRef);
        } catch (err) {
            console.error("Error deleting file:", err);
            // We don't throw hered because sometimes the file record might be missing even if DB has the link
        }
    };

    return { uploadFile, deleteFile, url, error };
};
