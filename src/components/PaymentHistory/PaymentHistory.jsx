// import axios from "axios";
import { useContext } from "react";
// import { backendUrl } from "../../constants";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";

const PaymentHistory = () => {
  // const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const { history } = useContext(AppContext);
  // console.log(history);

  // useEffect(() => {
  //   axios.get(backendUrl + "history").then(({ data }) => setHistory(data));
  // }, []);

  // console.log(history);

  return (
    <div className="w-full relative h-96 overflow-y-auto bg-white rounded-[20px] custom-shadow text-interactive-dark-hover flex flex-col justify-between mx-auto">
      {/* header */}

      <div className="py-2 px-3 flex gap-[0.69rem] items-center justify-center border-b border-grey-light sticky top-0 left-0 bg-white">
        <p className="text-heading-6-bold">Payment History</p>
        {/* <Arrow increased={true} /> */}
      </div>

      <div className="flex p-4 text-center font-medium text-interactive-light">
        <p className="w-1/2">Mail/Name</p>
        <div className="w-1/2 grid grid-cols-3">
          <p>Amount</p>
          <p>Status</p>
          <p>Date</p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {history.map((item) => (
          <div
            className="flex px-4 text-center text-interactive-light-focus cursor-pointer"
            onClick={() => navigate("/payment-details/" + item._id)}
            key={item._id}
          >
            <p className="text-wrap w-1/2">
              {item["Email ID"] || item.emailId}
            </p>
            <div className="w-1/2 grid grid-cols-3">
              <p className="text-wrap">
                &#8377;{" "}
                {parseFloat(item.totalAmount)?.toFixed(2) ||
                  item.lifetimeRevenue?.toFixed(2)}
              </p>
              <p
                className={
                  item.disbursed
                    ? "text-interactive-light-confirmation"
                    : item.declined
                    ? "text-interactive-light-destructive"
                    : ""
                }
              >
                {item.disbursed ? "Disbursed" : item.declined ? "Declined" : ""}
              </p>
              <p className="text-wrap">{item.paymentDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
