//-----------------------------------Check Wallet Balance
const walletInput = document.getElementById('wallet-input')
const checkBtn = document.getElementById('check-btn')
const balanceText = document.getElementById('balance-text')


//-----------------------------------Generate Keypair
const generateKeyBtn = document.getElementById('gen-keypair-btn')
const publickeyBox = document.getElementById('publickey-readonly-input')
const privatekeyBox = document.getElementById('privatekey-readonly-input')





//------------------------------------------Airdrop
const airdropBtn = document.getElementById('airdrop-btn')
const airdropInput = document.getElementById('airdrop-input')

const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'))


let input;
let publicKey;
let solBalance = 0;

console.log(solanaWeb3);


walletInput.addEventListener("input", (e) => {

    input = e.target.value
})



checkBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    if (!input?.trim()) {
        alert("please enter a valid wallet address")
        return
    }

    const address = input
    console.log(address)
    fetchSolana(address)
})



async function fetchSolana(address) {
    // console.log("fetchFun reached")
    try {

        const publicKey = new solanaWeb3.PublicKey(address);
        const lamports = await connection.getBalance(publicKey);
        solBalance = lamports / 1000000000;
        console.log("solBalance is", lamports)
        balanceText.innerText = `You have ${solBalance} sol in you wallet.  `

    } catch (error) {
        console.log("error from try catch", error)

    }

    // const keypair = await solanaWeb3.Keypair.generate()
    // const base64publicKey = keypair.publicKey.toString('base64')
    // console.log("gen key pair control reach", base64publicKey) 

    // const airdropSign  = await connection.requestAirdrop(keypair.publicKey, solanaWeb3.LAMPORTS_PER_SOL)
    // await connection.confirmTransaction(airdropSign);
}



generateKeyBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    const { publicKey, privateKey } = await genKeypair()
    // console.log(publicKey)
    // console.log(publickeyBox)
    publickeyBox.value = publicKey
    privatekeyBox.value = privateKey

})


airdropBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const airdropPublicAddress = await airdropInput.value;
    // console.log(airdropWalletAddress)
    await airdropSol(airdropPublicAddress)

})

// ------------------generate keypair

async function genKeypair() {

    const keypair = await solanaWeb3.Keypair.generate()
    console.log(keypair);

    const publicKey = keypair.publicKey
    const privateKey = keypair.secretKey



    return { publicKey, privateKey }
}


//-----------------Airdrop Function

async function airdropSol(publicKey) {
    console.log("airdrop control", publicKey);
    console.log(typeof publicKey);
    // typeof publicKey
    try {
        const pubKey = typeof publicKey === "string"
            ? new solanaWeb3.PublicKey(publicKey)
            : publicKey;

        console.log('pubkey is ', pubKey);

        const airdropSign = await connection.requestAirdrop(pubKey, solanaWeb3.LAMPORTS_PER_SOL)
        await connection.confirmTransaction(airdropSign)
        console.log("Airdrop successful");

    } catch (error) {
        console.log("air error is", error);

    }


}




// 7oa7e9u1FVksWwjwUKvEtdMeyhkgbBDu5VNRhkkyQp2x