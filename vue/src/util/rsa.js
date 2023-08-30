import {JSEncrypt} from 'jsencrypt';

//RSA 位数，这里要跟后端对应
// eslint-disable-next-line no-unused-vars
let bits = 1024;

//当前JSEncrypted对象
let thisKeyPair = {};

//生成密钥对(公钥和私钥)
function genKeyPair() {
    let genKeyPair = {};
    thisKeyPair = new JSEncrypt();

    //获取私钥
    genKeyPair.privateKey = thisKeyPair.getPrivateKey();

    //获取公钥
    genKeyPair.publicKey = thisKeyPair.getPublicKey();

    return genKeyPair;
}


//公钥加密
function rsaEncrypt(plaintext, publicKey) {
    if (plaintext instanceof Object) {
        //1、JSON.stringify
        plaintext = JSON.stringify(plaintext)
    }
    publicKey && thisKeyPair.setPublicKey(publicKey);
    return thisKeyPair.encrypt(plaintext);
}

//私钥解密
function rsaDecrypt(ciphertext, privateKey) {
    privateKey && thisKeyPair.setPrivateKey(privateKey);
    let decString = thisKeyPair.decrypt(ciphertext);
    if (decString.charAt(0) === "{" || decString.charAt(0) === "[") {
        //JSON.parse
        decString = JSON.parse(decString);
    }
    return decString;
}

export default {
    genKeyPair,
    rsaEncrypt,
    rsaDecrypt
}
