import { ethers } from "ethers";

import Dropdown from "react-bootstrap/Dropdown";

const Navigation = ({ account, setAccount }) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };

  return (
    <nav>
      <div className="nav__brand">
        <h1>Artblocks</h1>
      </div>
      {/* <div className='nav__brand'>
                 <h6>Home</h6>
                <h6>About</h6>
                <h6>Store</h6>
                <h6>Contact</h6> 
            </div> */}

      {account ? (
        <div style={{ display: "flex" }}>
          <Dropdown>
            <Dropdown.Toggle className="nav__menu">
              Account
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Setings</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Contact</Dropdown.Item>
              <Dropdown.Item href="#/action-1">Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <button type="button" className="nav__menu">
            {account.slice(0, 6) + "..." + account.slice(38, 42)}
          </button>
        </div>
      ) : (
        <div style={{ display: "flex" }}>
          {/* <button
            type="button"
            className="nav__menu"
               onClick={connectHandler}
          >
            Menu
          </button> */}
            <Dropdown>
            <Dropdown.Toggle  className="nav__menu">
              Menu
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Login</Dropdown.Item>
              <Dropdown.Item href="#/action-1">About</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Store</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Contact</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <button
            type="button"
            className="nav__connect"
            onClick={connectHandler}
          >
            Connect
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
