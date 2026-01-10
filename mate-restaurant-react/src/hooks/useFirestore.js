import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';

export const useFirestore = (collectionName) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const q = query(collection(db, collectionName), orderBy('createdAt', 'desc')); // Default sort by recent
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const results = [];
            snapshot.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id });
            });
            setData(results);
            setLoading(false);
        }, (err) => {
            console.error(err);
            setError(err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [collectionName]);

    const addDocument = async (docData) => {
        try {
            const timestamp = new Date();
            await addDoc(collection(db, collectionName), { ...docData, createdAt: timestamp });
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    const deleteDocument = async (id) => {
        try {
            await deleteDoc(doc(db, collectionName, id));
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    const updateDocument = async (id, updates) => {
        try {
            await updateDoc(doc(db, collectionName, id), updates);
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    return { data, loading, error, addDocument, deleteDocument, updateDocument };
};
