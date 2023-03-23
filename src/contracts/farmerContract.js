import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

export const ABI =[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "FarmerDatabaseContractAddress",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "farmerCccd",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "farmerName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "farmerEmail",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "farmerAddress",
				"type": "string"
			}
		],
		"name": "addFarmer",
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
		"inputs": [],
		"name": "farmerDatabase",
		"outputs": [
			{
				"internalType": "contract FarmerDatabase",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllFarmer",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "farmerId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "farmerCccd",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "farmerName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "farmerEmail",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "farmerAddress",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "farmerIsChecked",
						"type": "bool"
					}
				],
				"internalType": "struct Farmer[]",
				"name": "",
				"type": "tuple[]"
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
	}
]
export const ADDRESS = "0x6e314466Aa27A62D840e3C18Ba1810Be16349Bae";

export async function getContractFarmer() {
  const provider = await detectEthereumProvider();
  const web3 = new Web3(provider);
  return new web3.eth.Contract(ABI, ADDRESS);
}
