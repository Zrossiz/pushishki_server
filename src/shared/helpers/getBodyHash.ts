export async function sha256(message: string): Promise<string> {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(message).digest('hex');
}