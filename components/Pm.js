import prec from "toprecision";
import { v4 as uid } from "uuid";

function Pm({ pmW }) {
  let pmK = pmW.keys;
  let pmM = pmW.subs;

  function Table({ children }) {
    return (
      <table>
        <caption>PM</caption>
        <thead>
          <tr>
            <th></th>
            {pmK.map((k) => {
              return <th key={uid()}>{k}</th>;
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    );
  }

  function PmRows() {
    return Object.keys(pmM).map((sub) => {
      return (
        <tr key={uid()}>
          <td className="stickyL" key={uid()}>
            {sub}
          </td>
          {pmK.map((k) => {
            let subR = pmM[sub];
            let v = subR[k];
            // let extra = subR.extra;
            return (
              <td key={uid()}>
                {v !== null && prec(v, 3)}
                {/* {prec(v, 3)} */}
                {/* {v !== null && v} */}
                {/* {v !== null &&
                  (["uniMMR", "USDT", "FDUSD", "USDC"].includes(k)
                    ? prec(v, 3)
                    : prec(v, 3, { dollar: 1 }))}
                {k === "available" && extra < 0 && `(${prec(extra, 3)})`} */}
              </td>
            );
          })}
        </tr>
      );
    });
  }

  return (
    <Table>
      <PmRows />
    </Table>
  );
}

export default Pm;
