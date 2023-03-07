function Footer(){
    return(
        <footer className="mt-4 flex flex-row gap-4 w-full fixed bottom-1 place-items-center">
            <div className="w-full">
            <ul className="flex flex-row gap-4 w-full justify-center">
                <li className="hover:text-amber-300"><a href="#">Link to github.</a></li>
                <li className="hover:text-amber-300"><a href="#">Solana Docs. </a></li>
                <li className="hover:text-amber-300"><a href="#">Solana SDK. </a></li>

            </ul>
            <p className="w-full text-center">&copy; all rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;