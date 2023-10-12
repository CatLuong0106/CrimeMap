export const enableClass = (selector, className) => {
    document.querySelector(selector).classList.add(className)
}

export const disableClass = (selector, className) => {
    document.querySelector(selector).classList.remove(className)
}