import { useState } from "react";

function SearchBar(props) {
  const [id, setID] = useState("");
  if (id.length) {
    console.log("ID", id);
  }
  const idInputHandler = (e) => {
    e.preventDefault();
    const id = e.target.value;
    console.log(id);
    setID(id);
  };

  const fetchAPI = async (id) => {
    console.log("FETCH",id);
    try{
      const request = await fetch(`http://localhost:8080/acc/${id}`);
      const response = await request.json();
      console.log("RESPONSE", response);

      if(response.data.message === 0){
        console.log("ERRR",response.data.err.name,response.data.err.message);
        const message = response.data.err.message || response.data.err.name;
        alert(`Something went wrong! Try again🐱‍🚀, Error: ${message} ,🚨`);
      }
    }catch(err){
      alert("Something went wrong! 🐱‍🚀🐱‍🚀 ");
      console.log(err);
    }
    
  };

  const devnetBtnHandler = async (e) => {
    console.log("HI FROM BTN");
    e.preventDefault();
    if (!id) {
      alert("⚓🚨 Enter a valid id!⚓");
     return;
    }
    await fetchAPI(id);
  };
  return (
    <aside className="flex flex-col mt-4 items-center md:mt-8">
      <input
        onChange={idInputHandler}
        placeholder="paste your public key"
        type={"text"}
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
          ></input>
          <h2 className="font-sans font-semibold text-sky-400 text-2xl text-center">
            SQL to
          </h2>
          <button onClick={devnetBtnHandler} className="font-sans font-semibold text-white-400 bg-red-400 text-xl text-center border-2 border-cyan-600 rounded-lg outline-8 p-1  hover:transition-ease-in-out hover:bg-sky-800 duration-300 shadow-2xl shadow-red-500/60">
            {" "}
            DEVNET{" "}
          </button>
        </div>
      </section>
    </aside>
  );
}

export default SearchBar;
