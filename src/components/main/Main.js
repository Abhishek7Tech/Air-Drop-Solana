function Main() {
  return (
    <main className="flex flex-col mt-4 gap-4 items-center text-center md:mt-8">
      <div className="gap-2 md:mt-4">
        <h1 className="text-4xl text-amber-300 font-mono">Why this exist?</h1>
      </div>
      <div className="gap-2">
        <p className="text-xl font-sans md:text-2xl md:mt-2">
          I am learning about web-3 from an amazing developer on Youtube.
          <br></br>
          As a part of learning, I am developing this application <br></br>
          <br></br>If you also want to dive into the world of Web-3. Start Learning
          --&gt;
          <a
            href={"https://www.youtube.com/@harkirat1"}
            target="_blank"
            rel="noopener, noreferrer"
            // onClick={()=> openLink("https://www.youtube.com/@harkirat1")}
            className="text-amber-300"
          >
            HERE!
          </a>
        </p>
      </div>
      <div>
        <h2 className="text-2xl md:mt-4">
          Fund your devnet wallet and join the fun in SOL.
        </h2>
      </div>
    </main>
  );
}

export default Main;
