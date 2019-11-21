export default {
    formatInteger(integer) {
        let value = `${integer}`;

        if (value.length < 4) {
            return value;
        }

        const parts = [];

        while (/(\d{3})$/.test(value)) {
            parts.unshift(RegExp.$1);
            value = value.slice(0, value.length - 3);
        }

        if (value.length) {
            parts.unshift(value);
        }

        return parts.join(',');
    },
    capitalize(text) {
        // To be applied to a single word
        return text.charAt(0).toUpperCase() + text.substr(1);
    },

    titleCase(text) {
        // To be applied to a phrase (separated by white space)
        const result = text.replace(/\b([A-Za-z0-9]+)/g, (match, word, posn) => {
            if (/.+[A-Z]/.test(word)) {
                // If there's a capital anywhere after the first letter of the word,
                // assume it's an acronym or abbreviation
                return word;
            }

            if (posn === 0) {
                // First word should always be capitalized
                return this.capitalize(word);
            }

            if (posn === text.length - match.length) {
                // Last word should always be capitalized
                return this.capitalize(word);
            }

            // Articles, conjunctions, and prepositions should not be
            // capitalized
            const acp = [
                "a", "an", "the",
                "and", "but", "or", "for", "nor",
                "as", "at", "but", "by", "for", "in", "of", "off", "on",
                "per", "to", "up", "via"
            ];
            if (acp.includes(word.toLowerCase())) {
                return word.toLowerCase();
            }

            return this.capitalize(word);
        });

        return result;
    }
};
