async function fetchSOL(id,amt){
    try{
      const request = await fetch(`http://localhost:8080/acc/${id}/${amt}`);

        // const request = await fetch(`https://air-drop-sol-api.onrender.com/acc/${id}/${amt}`);
        const response = await request.json();
        
        const receiver = response.data.receiver;
        const sender = response.data.sender;
        const signature = response.data.signature;
       if(response.data.message !== 0)
        alert(`Congratulations ππ 
          receiver: ${receiver} 
          sender: ${sender} 
          signature: ${signature} 
          `);

          if(response.data.message === 0){
            console.log("ERRR",response.data.err.name,response.data.err.message);
            const message = response.data.err.message || response.data.err.name;
            alert(`Something went wrong! Try againπ±βπ, Error: ${message} ,π¨`);
             
          }
        return response;
    }catch(err){
        alert("Something went wrong! π±βππ±βπ ");
    }

}

export default fetchSOL;