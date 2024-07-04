const util = require("util");
import toNum from "string-values-to-numbers";
import oa2o from "oa2o";

function mod(p) {
  // console.log(util.inspect(p, true, null, true));
  p.forEach((r) => {
    r = toNum(r);
  });
  let [pmR] = p;

  let pmK = [
    "equity",
    "margin",
    "wallet",
    "available",
    "LTV",
    "uPNL",
    "IM",
    "IMr",
    "MM",
    "MMr",
  ];
  let pmM = { T: {} };
  Object.entries(pmR).forEach(([sub, subR]) => {
    console.log(subR);

    pmM[sub] = {};
    pmK.forEach((k) => {
      let e = subR.list[0];
      let r = e[k];
      if (k === "equity") r = e.totalEquity;
      else if (k === "margin") r = e.totalMarginBalance;
      else if (k === "wallet") r = e.totalWalletBalance;
      else if (k === "available") r = e.totalAvailableBalance;
      else if (k === "LTV") r = e.accountLTV;
      else if (k === "uPNL") r = e.totalPerpUPL;
      else if (k === "IM") r = e.totalInitialMargin;
      else if (k === "IMr") r = e.accountIMRate;
      else if (k === "MM") r = e.totalMaintenanceMargin;
      else if (k === "MMr") r = e.accountMMRate;
      pmM[sub][k] = r;
      pmM.T[k] = ["IMr", "MMr"].includes(k) ? null : (pmM.T[k] || 0) + r;
    });
  });
  // console.log(pmM);
  // console.log(util.inspect(pmM, true, null, true));

  // let assetM = {};
  // Object.entries(assetR).forEach(([sub, e]) => {
  //   assetM[sub] = oa2o(e, "asset", "totalWalletBalance");
  // });
  // let priceM = oa2o(priceR, "symbol", "price");

  // let pmK = [
  //   "uniMMR",
  //   "available",
  //   "USDT",
  //   "FDUSD",
  //   "USDC",
  //   "equity",
  //   "asset",
  //   "IM",
  //   "MM",
  // ];
  // let pmM = { T: {} };
  // Object.entries(pmR).forEach(([sub, e]) => {
  //   pmM[sub] = {};
  //   pmK.forEach((k) => {
  //     let r = e[k];
  //     //no accountStatus, virtualMaxWithdrawAmount, totalMarginOpenLoss
  //     if (k === "available") r = e.totalAvailableBalance;
  //     else if (k === "USDT") {
  //       r = assetM[sub].USDT;
  //       let extra = e.accountEquity - e.accountInitialMargin;
  //       pmM[sub].extra = extra;
  //       pmM.T.extra = (pmM.T.extra || 0) + extra;
  //     } else if (k === "FDUSD") r = assetM[sub].FDUSD;
  //     else if (k === "USDC") r = assetM[sub].USDC;
  //     else if (k === "equity") r = e.accountEquity;
  //     else if (k === "asset") r = e.actualEquity;
  //     else if (k === "IM") r = e.accountInitialMargin;
  //     else if (k === "MM") r = e.accountMaintMargin;
  //     pmM[sub][k] = r;
  //     pmM.T[k] = ["uniMMR", "IM", "MM"].includes(k) ? null : (pmM.T[k] || 0) + r;
  //   });
  // });
  // let pmW = { keys: pmK, subs: pmM };

  // let [posW, ucmSum, ucm] = modPos(umR, cmR, priceR);

  // // return [pmW, posW, assetM];
  // return [priceM, assetM, pmW, posW, ucmSum, ucm];
  let pmW = { keys: pmK, subs: pmM };
  return [pmW];
}
export default mod;
