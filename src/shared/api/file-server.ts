import axios from 'axios';
import * as FormData from 'form-data';

export const sendImage = async (fileStream: NodeJS.ReadableStream) => {
    try {
        const buffer = await streamToBuffer(fileStream)

        var formData = new FormData();
        formData.append('files', buffer, { filename: 'generated.png' })

        const FILE_SERVER_URL = process.env.FILE_SERVER_URL
        const url = `${FILE_SERVER_URL}/upload`
        await axios.post(url, formData, { headers: formData.getHeaders() });

        const resultUrl = `${FILE_SERVER_URL}/upload/generated.png`

        return resultUrl;
    } catch (err) {
        console.log("error send image", err);
    }

}


async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    const chunks: Buffer[] = [];

    for await (const chunk of stream) {
        chunks.push(chunk as Buffer);
    }

    return Buffer.concat(chunks);
}