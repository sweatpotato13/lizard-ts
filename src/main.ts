import { Encrypted, KeyValue, PrivateKey, PublicKey } from "./interfaces/interface";
import { aa, ss, ee, rr } from "./constants/random";
import { m, n, l, t, p, q, h, alpha } from "./constants/const";

//The default constructor
function initMatrixDefault(x, y) {
    const matrix = new Array(x);
    for (let i = 0; i < x; i++) {
        matrix[i] = new Array(y);
    }
    return matrix;
}

//The constructor, each element is chosen uniformly at random
function initMatrixRandom(x, y, q) {
    const matrix = new Array(x);
    for (let i = 0; i < x; i++) {
        matrix[i] = new Array(y);
        for (let j = 0; j < y; j++) {
            matrix[i][j] = nextInt(q);
        }
    }
    return matrix;
}

//Returns A', the transpose of a matrix A
function transpose(A) {
    const A_x = A.length;
    const A_y = A[0].length;

    const C = initMatrixDefault(A_y, A_x);
    for (let i = 0; i < A_x; i++) {
        for (let j = 0; j < A_y; j++) {
            C[j][i] = A[i][j];
        }
    }
    return C;
}

//Matrix addition, C = A + B, each element modulo q
function addMod(A, B, q) {
    checkDimensions(A, B);
    const A_x = A.length;
    const A_y = A[0].length;

    const C = initMatrixDefault(A_x, A_y);
    for (let i = 0; i < A_x; i++) {
        for (let j = 0; j < A_y; j++) {
            C[i][j] = (A[i][j] + B[i][j]) % q;
            if (C[i][j] < 0) {
                C[i][j] += q;
            }
        }
    }
    return C;
}

//Vector subtraction, c = a - b
function vectorSubstract(a, b) {
    if (b.length != a.length) {
        alert("Vector length must agree");
        return;
    }

    const c = new Array(a.length);
    for (let i = 0; i < a.length; i++) {
        c[i] = a[i] - b[i];
    }
    return c;
}

//Multiplies a vector by a scalar, c = s*v
export function scalarMultiplyVector(s, v) {
    const c = new Array(v.length);
    for (let i = 0; i < v.length; i++) {
        c[i] = s * v[i];
    }
    return c;
}

//Multiplies a matrix by a scalar, C = s*A
function scalarMultiplyMod(s, A, q) {
    const A_x = A.length;
    const A_y = A[0].length;

    const C = initMatrixDefault(A_x, A_y);
    for (let i = 0; i < A_x; i++) {
        for (let j = 0; j < A_y; j++) {
            C[i][j] = (s * A[i][j]) % q;
            if (C[i][j] < 0) {
                C[i][j] += q;
            }
        }
    }
    return C;
}

//Matrix multiplication, C = A * B
function multiply(A, B) {
    const A_x = A.length;
    const A_y = A[0].length;
    const B_x = B.length;
    const B_y = B[0].length;

    if (B_x != A_y) {
        alert("Matrix inner dimensions must agree");
        return;
    }

    const C = initMatrixDefault(A_x, B_y);
    const Bcolj = new Array(A_y);
    for (let j = 0; j < B_y; j++) {
        for (let k = 0; k < A_y; k++) {
            Bcolj[k] = B[k][j];
        }
        for (let i = 0; i < A_x; i++) {
            const Arowi = A[i];
            let s = 0;
            for (let k = 0; k < A_y; k++) {
                if (Bcolj[k] == 0) {
                    //s += 0;
                } else if (Bcolj[k] == 1) {
                    s += Arowi[k];
                } else if (Bcolj[k] == -1) {
                    s -= Arowi[k];
                } else {
                    s += Arowi[k] * Bcolj[k];
                }
            }
            C[i][j] = s;
        }
    }
    return C;
}

//Matrix multiplication, C = A * B, each element of C modulo q
function multiplyMod(A, B, q) {
    const A_x = A.length;
    const A_y = A[0].length;
    const B_x = B.length;
    const B_y = B[0].length;

    if (B_x != A_y) {
        alert("Matrix inner dimensions must agree");
        return;
    }

    const C = initMatrixDefault(A_x, B_y);
    const Bcolj = new Array(A_y);
    for (let j = 0; j < B_y; j++) {
        for (let k = 0; k < A_y; k++) {
            Bcolj[k] = B[k][j];
        }
        for (let i = 0; i < A_x; i++) {
            const Arowi = A[i];
            let s = 0;
            for (let k = 0; k < A_y; k++) {
                if (Bcolj[k] == 0) {
                    //s += 0;
                } else if (Bcolj[k] == 1) {
                    s += Arowi[k];
                } else if (Bcolj[k] == -1) {
                    s -= Arowi[k];
                } else {
                    s += Arowi[k] * Bcolj[k];
                }
            }
            C[i][j] = s % q;
            if (C[i][j] < 0) {
                C[i][j] += q;
            }
        }
    }
    return C;
}

//For Encrypt
//Multiplies a matrix B by a vector a, c = a * B
function encVectorMultiplyMatrix(a, B) {
    //let A_x = 1;
    const A_y = a.length;
    const B_x = B.length;
    const B_y = B[0].length;

    if (B_x != A_y) {
        alert("Matrix inner dimensions must agree");
        return;
    }

    const v = new Array(B_y);
    for (let j = 0; j < B_y; j++) {
        v[j] = 0;
    }

    for (let i = 0; i < A_y; i++) {
        const Browi = B[i];
        for (let j = 0; j < B_y; j++) {
            if (a[i] == 0) {
                //v[j] += 0;
            } else if (a[i] == 1) {
                v[j] += Browi[j];
            } else if (a[i] == -1) {
                v[j] -= Browi[j];
            } else {
                v[j] += a[i] * Browi[j];
            }
        }
    }
    return v;
}

//For Decrypt
//Multiplies a matrix B by a vector a, c = a * B
function decVectorMultiplyMatrix(a, B) {
    //let A_x = 1;
    const A_y = a.length;
    const B_x = B.length;
    const B_y = B[0].length;

    if (B_x != A_y) {
        alert("Matrix inner dimensions must agree");
        return;
    }

    const v = new Array(B_y);
    for (let j = 0; j < B_y; j++) {
        v[j] = 0;
    }

    for (let i = 0; i < A_y; i++) {
        const Browi = B[i];
        for (let j = 0; j < B_y; j++) {
            /*
            if (Browi[j] == 0) {
                //v[j] += 0;
            } else if (Browi[j] == 1) {
                v[j] += a[i];
            } else if (Browi[j] == -1) {
                v[j] -= a[i];
            } else {
            */
            v[j] += a[i] * Browi[j]; // it will be a little bit faster for decrypt on Firefox
            //}
        }
    }
    return v;
}

//Modulo q
function mod(A, q) {
    const A_x = A.length;
    const A_y = A[0].length;
    if (q <= 0) {
        alert("modulus not positive");
        return;
    }
    for (let i = 0; i < A_x; i++) {
        for (let j = 0; j < A_y; j++) {
            A[i][j] %= q;
            if (A[i][j] < 0) {
                A[i][j] += q;
            }
        }
    }
}

//Checks if size(A) == size(B)
function checkDimensions(A, B) {
    const A_x = A.length;
    const A_y = A[0].length;
    const B_x = B.length;
    const B_y = B[0].length;

    if (B_x != A_x || B_y != A_y) {
        alert("Matrix dimensions must agree");
        return;
    }
}

//Returns the next pseudorandom, uniformly distributed integer between 0(inclusive) and q-1(inclusive)
function nextInt(q) {
    return Math.floor(Math.random() * q);
}

//Returns the pseudorandom integer value between low(inclusive) and high(inclusive)
function rangeValue(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

//Shuffles the input array
function shuffle(arr) {
    const arr2 = arr.slice();
    for (
        let j, x, i = arr2.length;
        i;
        j = Math.random() * i, x = arr2[--i], arr2[i] = arr2[j], arr2[j] = x
    );
    return arr2;
}

//***********************************************************
export function randomPlaintext() {
    const plaintext = new Array(l);
    for (let i = 0; i < l; i++) {
        plaintext[i] = nextInt(2);
    }
    return plaintext;
}
//***********************************************************
export function keyGeneration(): KeyValue {
    //A, m*n
    const amatrix = initMatrixRandom(m, n, q);
    //let amatrix = aa;	// Does not apply in WSH
    //S, n*l
    const smatrix = ss;
    //E, m*l
    const ematrix = ee;
    //B = AS + E mod q, m*l
    let bmatrix = multiply(amatrix, smatrix);
    bmatrix = addMod(bmatrix, ematrix, q);

    return { pk: { a: amatrix, b: bmatrix }, sk: { s: smatrix } };
}

export function encrypt(msg: Array<any>, pk: PublicKey): Encrypted {
    const amatrix = pk.a;
    const bmatrix = pk.b;

    const rvector_transpose = rr; // Z^1*m
    const c1_prime_transpose = encVectorMultiplyMatrix(
        rvector_transpose,
        amatrix
    );
    const c2_prime_transpose = encVectorMultiplyMatrix(
        rvector_transpose,
        bmatrix
    );

    const c1_transpose = new Array(n);
    for (let i = 0; i < n; i++) {
        c1_prime_transpose[i] = c1_prime_transpose[i] % q;
        c1_transpose[i] = Math.round(0.25 * c1_prime_transpose[i]) % p;
        if (c1_transpose[i] < 0) {
            c1_transpose[i] += p;
        }
    }

    const c2_transpose = new Array(l);
    for (let i = 0; i < l; i++) {
        c2_prime_transpose[i] = c2_prime_transpose[i] % q;
        c2_transpose[i] = Math.round(msg[i] + 0.25 * c2_prime_transpose[i]) % p;
        if (c2_transpose[i] < 0) {
            c2_transpose[i] += p;
        }
    }

    return { c1: c1_transpose, c2: c2_transpose };
}

export function decrypt(encrypted: Encrypted, sk: PrivateKey) {
    const c1vector_transpose = encrypted.c1;
    const c2vector_transpose = encrypted.c2;
    const smatrix = sk.s;

    const c1TS = decVectorMultiplyMatrix(c1vector_transpose, smatrix);
    const resultvector_transpose = vectorSubstract(c2vector_transpose, c1TS);

    const resultvector = new Array(l);
    for (let i = 0; i < l; i++) {
        resultvector[i] = Math.round(0.0078125 * resultvector_transpose[i]) % t;
        if (resultvector[i] < 0) {
            resultvector[i] += t;
        }
    }
    return resultvector;
}