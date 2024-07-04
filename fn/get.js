import axios from "axios";

async function get(url, pr = {}, accs = {}) {
  if (Object.keys(accs).length !== 0) {
    let r = await Promise.all(
      Object.values(accs).map((sub) => {
        return sub.get(url, pr);
      })
    );
    let dt = {};
    Object.keys(accs).forEach((sub, i) => {
      dt[sub] = r[i];
    });
    return dt;
  } else {
    let r = await axios.get("https://api.bybit.com" + url);
    return r.data;
  }
}

export default get;
