const isLocalStorageAvailable = () => {
    if (typeof window !== "undefined") {
        return true
    }
};

const setLocalStorage = (key: string, value: any) => {
    if (!isLocalStorageAvailable()) return;

    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error setting item in localStorage', error);
    }
};

const getLocalStorage = (key: string) => {
    if (!isLocalStorageAvailable()) return null;

    try {
        const value = window.localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error getting item from localStorage', error);
        return null;
    }
};

const clearLocalStorage = (key: string) => {
    if (!isLocalStorageAvailable()) return;

    try {
        window.localStorage.removeItem(key);
    } catch (error) {
        console.error('Error clearing item from localStorage', error);
    }
};

const clearAllLocalStorage = () => {
    if (!isLocalStorageAvailable()) return;

    try {
        window.localStorage.clear();
    } catch (error) {
        console.error('Error clearing all items from localStorage', error);
    }
};

export {getLocalStorage, clearLocalStorage, setLocalStorage, clearAllLocalStorage};
