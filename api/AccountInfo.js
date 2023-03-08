// import {Info} from "./senderInfo";
const secretKEY = require("./id.json");
const web3 = require("@solana/web3.js");
const web3SPL = require("@solana/spl-token");

async function transferSOL(id, token) {
  console.log(id, token);
  const receiverPublicKey = new web3.PublicKey(
    id
  );
  console.log(receiverPublicKey);

  const connection = new web3.Connection(
    web3.clusterApiUrl("devnet"),
    "confirmed"
  );

  try{
    const senderWallet = web3.Keypair.fromSecretKey(new Uint8Array(secretKEY));
  
    const senderAirDrop = await connection.requestAirdrop(
      senderWallet.publicKey,
      web3.LAMPORTS_PER_SOL
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


    const senderAccountInfo = await web3SPL.getAccount(
      connection,
      senderTokenAccount.address
    )

    console.log("BEFORE minting",senderAccountInfo.amount + "")
    let signature = await web3SPL.mintTo(
      connection,
      senderWallet,
      tokenMint,
      senderTokenAccount.address,
      senderWallet.publicKey,
      10000000000000
    );
  
    console.log("mint tx:", signature);
  
  
    signature = await web3SPL.transfer(
      connection,
      senderWallet,
      senderTokenAccount.address,
      receiverTokenAccount.address,
      senderWallet.publicKey,
      +token * web3.LAMPORTS_PER_SOL
    );
  
   

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
};
