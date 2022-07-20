import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [subAccounts, setSubAccounts] = useState()
  const [loading, setLoading] = useState(false)
  const fetchAccounts = async () => {
    try {
      setLoading(true)
      const res = await axios.get("https://stage.getprospa.com/api/v1/account/holder_sub_wallets/548", {
        headers: {
          Authorization: 'Token d337ca660fdf9b2181d81fc064e4527e2e6b739d1a4dc57e93c30efa0fdb309d'
        }
      })

     
      if (res.status === 200) {
        setSubAccounts(res.data.data)
        setLoading(false)
      }

    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  const updateAccounts = async () => {
    try {
      const res = axios.get("https://stage.getprospa.com/api/v1/account/holder_sub_wallets/548", {
        headers: {
          Authorization: 'Token d337ca660fdf9b2181d81fc064e4527e2e6b739d1a4dc57e93c30efa0fdb309d'
        }
      })
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }
  // Logic / Requirement for implmenting update is not clear

  const setDefaultAccount = async () => {
    try {
      setLoading(true)
      const res = await axios.post("https://stage.getprospa.com/api/v1/account/readjust_wallet_share/", { biz_account_id: 548 }, {
        headers: {
          Authorization: 'Token d337ca660fdf9b2181d81fc064e4527e2e6b739d1a4dc57e93c30efa0fdb309d'
        }
      })

      if (res.status === 200) {
      
        setLoading(false)
      }
      
    } catch (e) {

      setLoading(false)
      console.log(e)
    }
  }

  useEffect(() => {
    fetchAccounts()
  }, [])


  const handleChange = (e, key) => {
    setSubAccounts((subAccounts)=> subAccounts.map((account, i)=>{
      if(key === i){
        return {...account, incoming_allocation:  e.target.value  }
      }else return account
    }))
  }


  return (
    <>
      <h1 className='text-center my-4'>Manage Sub Accounts
      </h1>

      <div className="w-full max-w-lg m-auto">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {subAccounts && subAccounts.map((account, key) => (
            <div className="mb-4" key={key}>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Biz Wallet ID: {account?.biz_wallet_id}
              </label>
              <input onChange={(e)=> handleChange(e, key)} disabled={account?.biz_wallet_type === "current"} name={account.biz_wallet_id} value={account.incoming_allocation} className={`${account?.biz_wallet_type === "current" ? "bg-red-300" : undefined}shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}/>
            </div>
          ))}
          <div className="mt-6 flex items-center space-x-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
             {loading ? "Loading" : "Update"} 
            </button>
            <button onClick={setDefaultAccount} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              {loading ? "Loading": "Default"}
            </button>
          </div>
        </form>

      </div>
    </>

  );
}

export default App;