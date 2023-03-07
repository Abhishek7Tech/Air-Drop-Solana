// import {Info} from "./senderInfo";
const secretKEY = require("./id.json");
const web3 = require("@solana/web3.js");
const web3SPL = require("@solana/spl-token");

async function transferSOL(id) {
  console.log(id);
  const receiverPublicKey = new web3.PublicKey(
    "AghGTdDxwcwyAFvY9mixEoDddpEAxuhkLDvvQMAVGRTi"
  );
  console.log(receiverPublicKey);

  const connection = new web3.Connection(
    web3.clusterApiUrl("devnet"),
    "confirmed"
  );

  try{
    const senderWallet = web3.Keypair.fromSecretKey(new Uint8Array(secretKEY));
    console.log(senderWallet.publicKey.toBase58());
  
    const senderAirDrop = await connection.requestAirdrop(
      senderWallet.publicKey,
      1 * web3.LAMPORTS_PER_SOL
    );
  console.log("Waiting for confirmation");
    const sol = await connection.confirmTransaction(senderAirDrop);
    console.log(sol);
  
    const tokenMint = await web3SPL.createMint(
      connection,
      senderWallet,
      senderWallet.publicKey,
      null,
      9
    );
  
    const senderTokenAccount = await web3SPL.getOrCreateAssociatedTokenAccount(
      connection,
      senderWallet,
      tokenMint,
      senderWallet.publicKey
    );
  
    const senderTokenAccountBalance = senderTokenAccount.amount;
    console.log(senderTokenAccountBalance);
  
    const receiverTokenAccount = await web3SPL.getOrCreateAssociatedTokenAccount(
      connection,
      senderWallet,
      tokenMint,
      receiverPublicKey
    );

    let signature = await web3SPL.mintTo(
      connection,
      senderWallet,
      tokenMint,
      senderTokenAccount.address,
      senderWallet.publicKey,
      10000000000
    );
  
    console.log("mint tx:", signature);
  
  
    signature = await web3SPL.transfer(
      connection,
      senderWallet,
      senderTokenAccount.address,
      receiverTokenAccount.address,
      senderWallet.publicKey,
      50
    );
  
    const senderAccountInfo = await web3SPL.getAccount(
      connection,
      senderTokenAccount.address
    )

    console.log("sender",senderAccountInfo.amount + "");


    const receiverAccountInfo = await web3SPL.getAccount(
      connection,
      receiverTokenAccount.address
    )

    console.log("receiver",receiverAccountInfo.amount + "");

    const transfertDetails = {
      sender: senderWallet.publicKey,
      receiver: receiverPublicKey,
      receiverbalance:receiverAccountInfo.amount + "",
      signature,
    };
    return transfertDetails;
  }catch(err){
    console.log("ERRR",err);
    return{message:0, err}
  }
}

module.exports = {
  transferSOL,
  // transferTokens,
  // mintSolanaToken,
  // getMintInfo,
  // createTokenAccount,
  // accountInfo,
  // mintSOLToAccount
};
