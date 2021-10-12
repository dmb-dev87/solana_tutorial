const web3 = require("@solana/web3.js");

(async() => {
  const connection = new web3.Connection(
    web3.clusterApiUrl('devnet'),
    'confirmed',
  );

  const from = web3.Keypair.generate();
  const airdropSignature = await connection.requestAirdrop(
    from.publicKey,
    web3.LAMPORTS_PER_SOL,
  );
  await connection.confirmTransaction(airdropSignature);

  const to = web3.Keypair.generate();

  const transaction = new web3.Transaction().add(
    web3.SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to.publicKey,
      lamports: web3.LAMPORTS_PER_SOL / 100,
    }),
  );

  const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [from],
  );

  console.log('SIGNATURE', signature);
})();