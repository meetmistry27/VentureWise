import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { N } from 'ethers';

export async function noncehandler() {
    const nonce = crypto.randomBytes(32).toString('hex');
    return nonce;
}