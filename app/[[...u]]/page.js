import "@/app/App.css";
import Pm from "@/components/Pm";
import getAccs from "@/fn/accs";
import get from "@/fn/get";
import mod from "@/fn/mod";
// import Pm from "@/components/Pm";
// import Pos from "@/components/Pos";
// import mod from "@/fn/mod";

async function App({ params }) {
  console.log("render");
  let u = params.u?.[0];
  let accs = getAccs(u);

  let [pmR] = await Promise.all([
    get("/v5/account/wallet-balance", { accountType: "UNIFIED" }, accs), //assetR
  ]);
  // let [assetR, pmR, umR, cmR, priceR] = await Promise.all([
  //   get("/papi/v1/balance", {}, accs), //assetR
  //   get("/papi/v1/account", {}, accs), //pmR
  //   get("/papi/v1/um/positionRisk", {}, accs), //umR
  //   get("/papi/v1/cm/positionRisk", {}, accs), //cmR
  //   get("/api/v3/ticker/price", {}), //priceR
  //   // get("/sapi/v1/portfolio/collateralRate", setCollateralRatio);
  //   // get("/fapi/v1/fundingRate", { symbol: "BTCUSDT" }, setFundingRate);
  // ]);

  // let [priceM, assetM, pmW, posW, ucmSum, ucm] = mod([assetR, pmR, umR, cmR, priceR]);
  let [pmW] = mod([pmR]);
  console.log(pmW);

  return (
    <>
      <Pm pmW={pmW} />
      {/* {console.log("return")}
      <div className="flex">
        <span className="pr-3">Binance {u}</span>
        <span>mbx: {global.mbx1m}/6000</span>
      </div>
      <Pm pmW={pmW} />
      {/* <Pos {...{ umR, cmR, assetM, priceR }} /> */}
    </>
  );
}

export default App;
