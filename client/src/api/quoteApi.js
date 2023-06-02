export const getZenQuote = async () => {
    try {
        const response = await fetch('https://zenquotes.io/api/today')
        const data = await response.json()
        const quote = data[0].q;
        const author = data[0].a;
        return {quote, author};
    } catch(error) {
        console.log('Error:', error);
    }
};