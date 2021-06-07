export interface KeyValue {
    pk: PublicKey;
    sk: PrivateKey;
}

export interface PublicKey {
    a: number[];
    b: number[];
}

export interface PrivateKey {
    s: number[][];
}

export interface Encrypted {
    c1: number[];
    c2: number[];
}
