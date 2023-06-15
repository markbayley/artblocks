import { ethers } from 'ethers';
import { useEffect } from 'react';

import Dropdown from "react-bootstrap/Dropdown";

const Navigation = ({ account, setAccount, provider }) => {

    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account);
    }

    useEffect(() => {
        connectHandler();
      }, [account]);

    


    return (
        <nav>
      <div className="nav__brand">
        <h1>Artblocks</h1>
      </div>

      {account ? (
        <div style={{ display: "flex" }}>
          <Dropdown>
            <Dropdown.Toggle className="nav__menu">Account</Dropdown.Toggle>

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
          <Dropdown>
            <Dropdown.Toggle className="nav__menu">Menu</Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Login</Dropdown.Item>
              <Dropdown.Item href="#/action-1">About</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Store</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Contact</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {provider ? (
            <button
              type="button"
              className="nav__connect"
              onClick={connectHandler}
            >
              Connect
            </button>
          ) : (
            <a target="_blank" href="https://metamask.io/">
              <button
                type="button"
                className="nav__connect"
                onClick={connectHandler}
              >
                Install
              </button>
            </a>
          )}
        </div>
      )}
    </nav>
      
    );
}

export default Navigation;