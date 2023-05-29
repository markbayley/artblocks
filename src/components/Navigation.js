import { ethers } from 'ethers';

const Navigation = ({ account, setAccount }) => {
    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account);
    }

    return (
    
        <nav>
            <div className='nav__brand'>
                <h1>ArtBlocks</h1>
            </div>
            <div className='nav__brand'>
                <h6>Home</h6>
                <h6>About</h6>
                <h6>Store</h6>
                <h6>Contact</h6>
            </div>

            {account ? (
                <button
                    type="button"
                    className='nav__connect'
                >
                    {account.slice(0, 6) + '...' + account.slice(38, 42)}
                </button>
            ) : (
                <button
                    type="button"
                    className='nav__connect'
                    onClick={connectHandler}
                >
                    Connect
                </button>
            )}
         
        </nav>
      
    );
}

export default Navigation;