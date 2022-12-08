import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

export const ABI =[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "userName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "farmerName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "ingressDate",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "ingressAddress",
				"type": "string"
			}
		],
		"name": "addIngress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "batchId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "userName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "roughDate",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "roughAddress",
				"type": "string"
			}
		],
		"name": "addRough",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "warehouseAddress",
				"type": "string"
			}
		],
		"name": "addWarehouse",
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
				"name": "warehouseDatabaseContractAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "ingressDatabaseContractAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "roughDatabaseContractAddress",
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
		"inputs": [],
		"name": "getAllIngress",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "batchId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "userName",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "userAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "farmerName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "ingressDate",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "ingressAddress",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "ingressIsChecked",
						"type": "bool"
					}
				],
				"internalType": "struct Ingress[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllRough",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "batchId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "userName",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "userAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "roughDate",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "roughAdress",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "roughIsChecked",
						"type": "bool"
					}
				],
				"internalType": "struct Rough[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllWarehouse",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "warehouseId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "warehoustAddress",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "warehouseIsChecked",
						"type": "bool"
					}
				],
				"internalType": "struct Warehouse[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ingressDatabase",
		"outputs": [
			{
				"internalType": "contract IngressDatabase",
				"name": "",
				"type": "address"
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
		"name": "roughDatabase",
		"outputs": [
			{
				"internalType": "contract RoughDatabase",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "warehouseDatabase",
		"outputs": [
			{
				"internalType": "contract WarehouseDatabase",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export const ADDRESS = "0x9fD9A4445D81935f67aacd362bD59CCCB3cf474a";

export async function getContractProcessing() {
  const provider = await detectEthereumProvider();
  const web3 = new Web3(provider);
  return new web3.eth.Contract(ABI, ADDRESS);
}
