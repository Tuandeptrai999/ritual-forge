async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Balance:", ethers.formatEther(balance), "RITUAL");

  const Factory = await ethers.getContractFactory("RitualForgeFactory");
  const factory = await Factory.deploy();
  await factory.waitForDeployment();

  const addr = await factory.getAddress();
  console.log("\n===== DEPLOYED =====");
  console.log("Factory Address:", addr);
  console.log("Explorer: https://explorer.ritualfoundation.org/address/" + addr);
  console.log("Add to frontend .env:");
  console.log("VITE_FACTORY_ADDRESS=" + addr);
}

main().catch(e => { console.error(e); process.exit(1); });
