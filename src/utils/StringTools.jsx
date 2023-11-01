export function convertToTitleCase(str) {
    return str.toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
}

