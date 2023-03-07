function HeaderComponent() {
  return (
    <header className="flex flex-col items-center mt-2">
      <h1 className="font-mono font-medium text-4xl">Air Drop Sol</h1>
      <h3 className="font-sans text-2xl mt-2 md:mt-4">Transfer Solana Devnet!</h3>
      <h3 className="font-sans font-semibold text-green-400 text-2xl text-center mt-2 md:mt-4">
        This Tool does "NOT" provide real $SOL or Solana tokens.
      </h3>
    </header>
  );
}

export default HeaderComponent;
