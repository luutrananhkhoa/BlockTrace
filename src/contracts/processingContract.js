import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

export const ABI =[
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
			},
			{
				"internalType": "address",
				"name": "squashDatabaseContractAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "dryDatabaseContractAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "packageDatabaseContractAddress",
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
				"name": "batchId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "userName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dryDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "warehouseAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "processPhoto",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "keyValue",
				"type": "uint256"
			}
		],
		"name": "addDry",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "userName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "farmerCccd",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "ingressDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ingressAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "contractPhoto",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "keyValue",
				"type": "uint256"
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
				"internalType": "string",
				"name": "packageDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "warehouseAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "processPhoto",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "keyValue",
				"type": "uint256"
			}
		],
		"name": "addPackage",
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
				"internalType": "string",
				"name": "roughDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "warehouseAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "processPhoto",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "keyValue",
				"type": "uint256"
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
				"internalType": "string",
				"name": "squashDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "warehouseAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "processPhoto",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "keyValue",
				"type": "uint256"
			}
		],
		"name": "addSquash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "warehouseName",
				"type": "string"
			},
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
		"inputs": [],
		"name": "dryDatabase",
		"outputs": [
			{
				"internalType": "contract DryDatabase",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllDry",
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
						"name": "dryDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "warehouseAddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "processPhoto",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "keyValue",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "dryIsChecked",
						"type": "bool"
					}
				],
				"internalType": "struct Dry[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
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
						"internalType": "uint256",
						"name": "farmerCccd",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "ingressDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ingressAddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "contractPhoto",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "keyValue",
						"type": "uint256"
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
		"name": "getAllPackage",
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
						"name": "packageDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "warehouseAddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "processPhoto",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "keyValue",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "packageIsChecked",
						"type": "bool"
					}
				],
				"internalType": "struct Package[]",
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
						"internalType": "string",
						"name": "roughDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "warehouseAdress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "processPhoto",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "keyValue",
						"type": "uint256"
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
		"name": "getAllSquash",
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
						"name": "squashDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "warehouseAddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "processPhoto",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "keyValue",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "squashIsChecked",
						"type": "bool"
					}
				],
				"internalType": "struct Squash[]",
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
						"name": "warehouseName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "warehouseAddress",
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
		"name": "packageDatabase",
		"outputs": [
			{
				"internalType": "contract PackageDatabase",
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
		"name": "squashDatabase",
		"outputs": [
			{
				"internalType": "contract SquashDatabase",
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
export const ADDRESS = "0xF6c338D0E7ab1A9Ac2FbcA1614951Ba3D3f2a1a1";

export async function getContractProcessing() {
  const provider = await detectEthereumProvider();
  const web3 = new Web3(provider);
  return new web3.eth.Contract(ABI, ADDRESS);
}
