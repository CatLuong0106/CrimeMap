const configConsoleColor = () => {
    console.color = (output, text, bg) => {
        console.log(
            " %c" + output,
            "color:" + text + ";" +
            "background-color: " + bg + " "
        )
    }
}
export default configConsoleColor;