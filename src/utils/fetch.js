async function fetchSOL(id,amt){
    try{
      // const request = await fetch(`http://localhost:8080/acc/${id}/${amt}`);

        const request = await fetch(`https://air-drop-sol-api.onrender.com/acc/${id}/${amt}`);
        const response = await request.json();
        
        const receiver = response.data.receiver;
        const sender = response.data.sender;
        const signature = response.data.signature;
       if(response.data.message !== 0)
        alert(`Congratulations 🎉🎉 
          receiver: ${receiver} 
          sender: ${sender} 
          signature: ${signature} 
          `);

          if(response.data.message === 0){
            const message = response.data.err.message || response.data.err.name;
            alert(`Something went wrong! Try again🐱‍🚀, Error: ${message || ""} ,🚨`);
             
          }
        return response;
    }catch(err){
        alert("Something went wrong! 🐱‍🚀🐱‍🚀 ");
    }

}

export default fetchSOL;