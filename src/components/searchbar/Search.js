import { useState } from "react";
import fetchSOL from "../../utils/fetch";
function SearchBar(props) {
  const [devnet, setDevnet] = useState(true);
  const [token, setToken] = useState(1);
  let [id, setID] = useState("");

  const idInputHandler = (e) => {
    e.preventDefault();
    const id = e.target.value.trim();
    console.log("INPUT", id);
    setID(id);
  };

  const tokenInputHandler = (e) => {
    e.preventDefault();
    const no = e.target.value || 1;

    if (no > 101 || no < 1) {
      alert("Limit is between 1 to 100 🤞🤞");
    }
    setToken(no);
  };
  const devnetBtnHandler = async (e) => {
    e.preventDefault();
    if (!id) {
      console.log("RESET", id);
      alert("⚓🚨 Enter a valid id!⚓");
      e.target.reset();
    }
    setDevnet(false);
    await fetchSOL(id, token);
    setDevnet(true);
    setToken(1);
    e.target.reset();
  };
  return (
    <aside>
      <form
        onSubmit={devnetBtnHandler}
        className="flex flex-col mt-4 items-center md:mt-8"
      >
        <input
          onChange={idInputHandler}
          placeholder="paste your public key"
          type={"text"}
          name={"id"}
          className="w-11/12 lg:w-8/12 h-8 text-center text-black focus:outline-none focus:ring focus:border-blue-500 focus:outline-8 rounded-lg md:text-xl"
        ></input>
        <section>
          <div className="flex gap-4 mt-4 md:mt-8 ">
            <h2 className="font-sans font-semibold text-sky-400 text-2xl text-center">
              Airdrop
            </h2>
            <input
              className="w-12 h-8 md:md:text-xl focus:outline-none focus:ring focus:border-blue-500 text-black text-center focus:outline-4 rounded-lg"
              type={"number"}
              min={0}
              defaultValue={1}
              max={100}
              name={"token"}
              onChange={tokenInputHandler}
            ></input>
            <h2 className="font-sans font-semibold text-sky-400 text-2xl text-center">
              SQL to
            </h2>
            <button
              type="submit"
              className="font-sans font-semibold text-white-400 bg-red-400 text-xl text-center border-2 border-cyan-600 rounded-lg outline-8 p-1  hover:transition-ease-in-out hover:bg-sky-800 duration-300 shadow-2xl shadow-red-500/60"
            >
              {devnet ? "DEVNET" : "⌛...⏳"}
            </button>
          </div>
        </section>
      </form>
    </aside>
  );
}

export default SearchBar;
