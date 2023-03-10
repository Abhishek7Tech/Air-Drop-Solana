// import {Info} from "./senderInfo";
const secretKEY = require("./id.json");
const web3 = require("@solana/web3.js");
const web3SPL = require("@solana/spl-token");
const { getAccount } = require("@solana/spl-token");

// SEND TOKENS//

// async function transferSOL(id, token) {
//   console.log(id, +token * web3.LAMPORTS_PER_SOL);
//   const receiverPublicKey = new web3.PublicKey(
//     id
//   );
//   console.log(receiverPublicKey);

//   const connection = new web3.Connection(
//     web3.clusterApiUrl("devnet"),
//     "confirmed"
//   );

//   try{
//     const senderWallet = web3.Keypair.fromSecretKey(new Uint8Array(secretKEY));

//     const senderAirDrop = await connection.requestAirdrop(
//       senderWallet.publicKey,
//       web3.LAMPORTS_PER_SOL
//     );
//   console.log("Waiting for confirmation");
//     const sol = await connection.confirmTransaction(senderAirDrop);
//     console.log(sol);

//     const tokenMint = await web3SPL.createMint(
//       connection,
//       senderWallet,
//       senderWallet.publicKey,
//       null,
//       9
//     );

//     const senderTokenAccount = await web3SPL.getOrCreateAssociatedTokenAccount(
//       connection,
//       senderWallet,
//       tokenMint,
//       senderWallet.publicKey
//     );

//     const senderTokenAccountBalance = senderTokenAccount.amount;
//     console.log(senderTokenAccountBalance);

//     const receiverTokenAccount = await web3SPL.getOrCreateAssociatedTokenAccount(
//       connection,
//       senderWallet,
//       tokenMint,
//       receiverPublicKey
//     );

//     let signature = await web3SPL.mintTo(
//       connection,
//       senderWallet,
//       tokenMint,
//       senderTokenAccount.address,
//       senderWallet.publicKey,
//       10000000000000
//     );

//     console.log("mint tx:", signature);

//     signature = await web3SPL.transfer(
//       connection,
//       senderWallet,
//       senderTokenAccount.address,
//       receiverTokenAccount.address,
//       senderWallet.publicKey,
//       +token
//     );

//     const senderAccountInfo = await web3SPL.getAccount(
//       connection,
//       senderTokenAccount.address
//     )

//     console.log("sender",senderAccountInfo.amount + "");

//     const receiverAccountInfo = await web3SPL.getAccount(
//       connection,
//       receiverTokenAccount.address
//     )

//     console.log("receiver",receiverAccountInfo.amount + "");

//     const transfertDetails = {
//       sender: senderWallet.publicKey,
//       receiver: receiverPublicKey,
//       receiverbalance:receiverAccountInfo.amount + "",
//       signature,
//     };
//     return transfertDetails;
//   }catch(err){
//     console.log("ERRR",err);
//     return{message:0, err}
//   }
// }


// SEND SOL //
async function transferSOL(id, token) {
  console.log(id, +token * web3.LAMPORTS_PER_SOL);
  const receiverPublicKey = new web3.PublicKey(id);
  console.log(receiverPublicKey);

  const connection = new web3.Connection(
    web3.clusterApiUrl("devnet"),
    "confirmed"
  );

  try {
    const senderWallet = web3.Keypair.fromSecretKey(new Uint8Array(secretKEY));

    // const senderWallet = web3.Keypair.generate();
    const senderAirDrop = await connection.requestAirdrop(
      senderWallet.publicKey,
      2 * web3.LAMPORTS_PER_SOL
    );
    console.log("Waiting for confirmation");

    const sol = await connection.confirmTransaction(senderAirDrop);
    console.log(sol);

   
    console.log(await connection.getBalance(senderWallet.publicKey));

    const solTransferTtansaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: senderWallet.publicKey,
        toPubkey: receiverPublicKey,
        lamports: +token * web3.LAMPORTS_PER_SOL,
      })
      // web3SPL.createSyncNativeInstruction(senderAssociatedTokenAccount)
    );
    const sol3 = await web3.sendAndConfirmTransaction(
      connection,
      solTransferTtansaction,
      [senderWallet]
    );
    console.log(await connection.getBalance(senderWallet.publicKey));
  
    return {signature:sol3,sender:senderWallet.publicKey.toBase58(), receiver: receiverPublicKey.toBase58()};
  } catch (err) {
    return { message: 0, err };
  }
}
module.exports = {
  transferSOL,
};
