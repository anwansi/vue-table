export default {
    add(target, event, handler, ...args) {
        target.addEventListener(event, handler, ...args);

        return {
            remove() {
                target.removeEventListener(event, handler);
            }
        };
    }
};
