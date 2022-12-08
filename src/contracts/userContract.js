import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

export const ABI =[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "fullName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "userCatergory",
				"type": "uint256"
			}
		],
		"name": "addUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "destroy",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userDatabaseContractAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "checkExistUser",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllUser",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "userId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "fullName",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "userAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "userCatergory",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "userIsChecked",
						"type": "bool"
					}
				],
				"internalType": "struct User[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "login",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "userId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "fullName",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "userAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "userCatergory",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "userIsChecked",
						"type": "bool"
					}
				],
				"internalType": "struct User",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "userDatabase",
		"outputs": [
			{
				"internalType": "contract UserDatabase",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export const ADDRESS = "0x4d90A8cDBb6f6D4971F3a0d2828ad3b76227138c";

export async function getContract() {
  const provider = await detectEthereumProvider();
  const web3 = new Web3(provider);
  return new web3.eth.Contract(ABI, ADDRESS);
}
