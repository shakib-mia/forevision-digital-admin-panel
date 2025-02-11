import { useContext, useState } from "react";
// import Button from "../Button/Button";
// import Modal from "../Modal/Modal";
// import { AppContext } from "../../contexts/AppContext";
// import PropTypes from "prop-types";
// import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
// import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import Select from "../../components/Select/Select";
// import Modal from "../../components/Modal/Modal";
import { AppContext } from "../../contexts/AppContext";
// import { AppContext } from "../contexts/AppContext";

const PaymentDetails = () => {
  const [item, setItem] = useState({});
  // const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  // const [modal, setModal] = useState(false);
  const [transactionID, setTransactionID] = useState("");
  const location = useLocation();
  const { history } = useContext(AppContext);

  const id =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  //// console.log(id);
  //   useEffect(() => {
  //     axios
  //       .get("https://api.forevisiondigital.in/disburse-payment/" + id)
  //       .then(({ data }) => setItem(data));
  //   }, [id]);

  console.log(history.find((item) => item._id === id));

  //   const keys = [
  //     "Vendor Name",
  //     "Invoice Number",
  //     "Invoice Date",
  //     "Address",
  //     "Street Name",
  //     "Land Mark",
  //     "pinCode",
  //     "city",
  //     "state",
  //     "gstinNumber",
  //     "placeOfSupply",
  //     "cinNumber",
  //     "serviceAccount",
  //     "panNumber",
  //     "taxableValue",
  //     "totalAmount",
  //     "bankName",
  //     "branch",
  //     "accountType",
  //     "ifscCode",
  //     "beneficiaryName",
  //     "accountNumber",
  //     "userName",
  //     "emailId",
  //     "confirmAccountNumber",
  //     "aadharUrl",
  //     "panUrl",
  //     "gstUrl",
  //     "cancelledUrl",
  //     "signatureUrl",
  //     "pdfUrl",
  //     "partner_name",
  //     "billing_country",
  //     "isrc",
  //     "accountBalance",
  //     "lifetimeDisbursed",
  //     "lifetimeRevenue",
  //   ]

  function normalizeCamelCase(text) {
    // Use regular expression to insert a space before all caps
    return text.replace(/([a-z])([A-Z])/g, "$1 $2");
  }

  //// console.log(item);

  return (
    <div
      className="w-3/4 mx-auto my-5 rounded-2xl bg-white shadow-[0px_0px_35px_#ccc] px-7"
      key={item._id}
    >
      {Object.keys(history.find((item) => item._id === id)).map((key, k) =>
        key !== "_id" && key !== "isrc" ? (
          <div className="grid grid-cols-2 py-6 items-center" key={k}>
            <h5 className="text-heading-5-bold capitalize py-2 text-grey-dark">
              {key.includes("_")
                ? key.split("_").join(" ")
                : //   : key.includes("Url")
                  //  ? normalizeCamelCase(key).split(" ")
                  normalizeCamelCase(key).replace(/Url/gi, "").trim()}
              : <></>
            </h5>

            <p>
              {key !== "_id" &&
              key !== "isrc" &&
              key !== "pdfUrl" &&
              key !== "signatureUrl" &&
              key !== "aadharUrl" &&
              key !== "panUrl" &&
              key !== "gstUrl" &&
              key !== "cancelledChequeUrl" ? (
                history.find((item) => item._id === id)[key]
              ) : key === "pdfUrl" ||
                key === "signatureUrl" ||
                key === "aadharUrl" ||
                key === "panUrl" ||
                key === "gstUrl" ||
                key === "cancelledChequeUrl" ? (
                <a
                  className="text-primary border-b border-primary hover:border-b-0"
                  href={history.find((item) => item._id === id)[key]}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open
                </a>
              ) : (
                <></>
              )}
            </p>
          </div>
        ) : (
          <></>
        )
      )}

      <div className="grid grid-cols-2 py-6">
        <h5 className="text-heading-5-bold capitalize py-2 text-grey-dark">
          Payment Method
        </h5>

        {/* <InputField
          type="text"
          placeholder={"Enter the Name of Payment Method"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        /> */}

        <Select
          setSelectedValue={setPaymentMethod}
          selectedValue={paymentMethod}
          placeholder="Select your payment method"
          options={["RTGS", "PayPal", "NEFT", "IMPS"]}
        />
      </div>

      <div className="grid grid-cols-2 py-6">
        <h5 className="text-heading-5-bold capitalize py-2 text-grey-dark">
          Transaction ID
        </h5>

        <InputField
          type="text"
          placeholder={"Enter the Transaction ID"}
          onChange={(e) => setTransactionID(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PaymentDetails;
