const LocalStorageService = {
    getItem<T = unknown>(key: string): T | null {
        const item = localStorage.getItem(key);

        if (!item) {
            return null;
        }

        return JSON.parse(item);
    },

    setItem(key: string, value: unknown): void {
        localStorage.setItem(key, JSON.stringify(value));
    },

    hasKey(key: string): boolean {
        return localStorage.getItem(key) !== null;
    },

    removeItem(key: string): void {
        localStorage.removeItem(key);
    },
};

export default LocalStorageService;