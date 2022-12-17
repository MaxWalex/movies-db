export const useHttp = () => {
    const request = async (url, headers = {'Content-Type': 'application/json'}, method = "GET", body = null) => {
        try {
            console.log(headers)
            const response = await fetch(url, {method, body, headers, })

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json()

            return data;
        } catch(err) {
            throw err;
        }
    }

    return {request}
}