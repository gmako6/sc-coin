import abi from "../abis/src/contracts/SCCrowd.sol/SCCrowd.json";
import address from "../abis/contractAddress.json";
import { getGlobalState, setGlobalState } from "../store";
import { ethers } from "ethers";

const { ethereum } = window;
const contractAddress = address.address;
const contractAbi = abi.abi;
let tx;

//Connect wallet.
const connectWallet = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
  } catch (error) {
    reportError(error);
  }
};

//Handle wallet connection.
const isWallectConnected = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    setGlobalState("connectedAccount", accounts[0]?.toLowerCase());

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async () => {
      setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
      await isWallectConnected();
    });

    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
    } else {
      alert("Please connect wallet.");
      console.log("No accounts found.");
    }
  } catch (error) {
    reportError(error);
  }
};

//Getting the contract.
const getContract = async () => {
  const connectedAccount = getGlobalState("connectedAccount");

  if (connectedAccount) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    return contract;
  } else {
    return getGlobalState("contract");
  }
};

//Create Project.
const createProject = async ({
  title,
  description,
  imageURL,
  cost,
  expiresAt,
}) => {
  try {
    if (!ethereum) return alert("Please install Metamask");

    const contract = await getContract();
    cost = ethers.utils.parseEther(cost);
    tx = await contract.createProject(
      title,
      description,
      imageURL,
      cost,
      expiresAt
    );
    await tx.wait();
    await loadProjects();
  } catch (error) {
    reportError(error);
  }
};

//Update Project.
const updateProject = async ({
  id,
  title,
  description,
  imageURL,
  expiresAt,
}) => {
  try {
    if (!ethereum) return alert("Please install Metamask");

    const contract = await getContract();
    tx = await contract.updateProject(
      id,
      title,
      description,
      imageURL,
      expiresAt
    );

    await tx.wait();
    await loadProject(id);
  } catch (error) {
    reportError(error);
  }
};

//Deleting the project.
const deleteProject = async (id) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();

    await contract.deleteProject(id);
  } catch (error) {
    reportError(error);
  }
};

//Load Projects.
const loadProjects = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");

    const contract = await getContract();
    const projects = await contract.getProjects();
    const stats = await contract.stats();

    setGlobalState("stats", structureStats(stats));
    setGlobalState("projects", structuredProjects(projects));
  } catch (error) {
    reportError(error);
  }
};

//Load a single project.
const loadProject = async (id) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    const project = await contract.getProject(id);

    setGlobalState("project", structuredProjects([project])[0]);
    console.log("Project Loaded");
  } catch (error) {
    alert(JSON.stringify(error.message));
    reportError(error);
  }
};

//Donate project.
const donateProject = async (id, amount) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getContract();
    amount = ethers.utils.parseEther(amount);

    tx = await contract.donateProject(id, {
      from: connectedAccount,
      value: amount._hex,
    });

    await tx.wait();
    await getDonators(id);
  } catch (error) {
    reportError(error);
  }
};

//Get donators.
const getDonators = async (id) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    let donators = await contract.getDonators(id);

    setGlobalState("donators", structuredDonators(donators));
  } catch (error) {
    reportError(error);
  }
};

//Get Payout.
const payoutProject = async (id) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getContract();

    tx = await contract.payOutProject(id, {
      from: connectedAccount,
    });

    await tx.wait();
    await getDonators(id);
  } catch (error) {
    reportError(error);
  }
};

const structuredDonators = (donators) =>
  donators
    .map((donator) => ({
      owner: donator.owner.toLowerCase(),
      refunded: donator.refunded,
      timestamp: new Date(donator.timestamp.toNumber() * 1000).toJSON(),
      contribution: parseInt(donator.contribution._hex) / 10 ** 18,
    }))
    .reverse();

const structuredProjects = (projects) =>
  projects
    .map((project) => ({
      id: project.id.toNumber(),
      owner: project.owner.toLowerCase(),
      title: project.title,
      description: project.description,
      timestamp: new Date(project.timestamp.toNumber()).getTime(),
      expiresAt: new Date(project.expiresAt.toNumber()).getTime(),
      date: toDate(project.expiresAt.toNumber() * 1000),
      imageURL: project.imageURL,
      raised: parseInt(project.raised._hex) / 10 ** 18,
      cost: parseInt(project.cost._hex) / 10 ** 18,
      donators: project.donators.toNumber(),
      status: project.status,
    }))
    .reverse();

const toDate = (timestamp) => {
  const date = new Date(timestamp);
  const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  const mm =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

const structureStats = (stats) => ({
  totalProjects: stats.totalProjects.toNumber(),
  totalDonating: stats.totalDonating.toNumber(),
  totalDonations: parseInt(stats.totalDonations._hex) / 10 ** 18,
});

const reportError = (error) => {
  console.log(error.message);
  throw new Error("No ethereum object.");
};

export {
  connectWallet,
  isWallectConnected,
  createProject,
  updateProject,
  deleteProject,
  loadProjects,
  loadProject,
  donateProject,
  getDonators,
  payoutProject,
};
