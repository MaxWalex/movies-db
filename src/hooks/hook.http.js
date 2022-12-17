export const useHttp = () => {
    const request = async (url, headers = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://movies-db-alpha.vercel.app/'}, method = "GET", body = null) => {
        try {
            const response = await fetch(url, {method, body, headers})

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