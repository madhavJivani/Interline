import axios from 'axios';

const getRuntimes = async () => {
    const url = 'https://emkc.org/api/v2/piston/runtimes'

    try {
        const response = await axios.get(url)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error(error.response.data)
    }
}

const runCode = async (language, version, code, input) => {
    const url = 'https://emkc.org/api/v2/piston/execute'
    try {
        const response = await axios.post(url, {
            language: language,
            version: version,
            files: [
                {
                    content: code
                }
            ],
            stdin: input
        });
        // console.log(response.data)
        return response.data
    } catch (error) {
        console.error(error.response.data)
    }
}
export { getRuntimes, runCode }
