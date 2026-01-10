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
            const storageRef = ref(storage, `${path}/${file.name}`);
            await uploadBytes(storageRef, file);
            const downloadUrl = await getDownloadURL(storageRef);
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
