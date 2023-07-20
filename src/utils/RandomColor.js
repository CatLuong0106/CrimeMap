const getRandomColor = () => {
    let chars = "0123456789ABCDEF"
    let ans = "#"

    for (let i = 0; i < 6; i++) {
        let ran = Math.round(Math.random() * 15)
        ans += chars[ran]
    }
    return ans
}

export default getRandomColor