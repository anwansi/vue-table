export default {
    validateColumnDef(def) {
        const keys = Object.keys(def);
        return keys.includes('id') && keys.includes('name');
    }
};
