import { useEffect, useState } from "react";
// import Button from "../Button/Button";
// import Modal from "../Modal/Modal";
// import { AppContext } from "../../contexts/AppContext";
// import PropTypes from "prop-types";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import Select from "../../components/Select/Select";
import Modal from "../../components/Modal/Modal";
// import { AppContext } from "../contexts/AppContext";

const RequestPaymentDetails = () => {
  const [item, setItem] = useState({});
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [modal, setModal] = useState(false);
  const [transactionID, setTransactionID] = useState("");
  //   console.log(item);
  const date = new Date();
  const location = useLocation();
  const [selectedReason, setSelectedReason] = useState("");
  const id =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  //   console.log(id);
  useEffect(() => {
    axios
      .get("https://api.forevisiondigital.in/disburse-payment/" + id)
      .then(({ data }) => setItem(data));
  }, [id]);

  const handleDisburse = () => {
    // console.log(date.getMonth());
    const month = date.getMonth() + 1;

    item.disbursed = true;
    item.paymentDate = date.getDate() + "/" + month + "/" + date.getFullYear();
    item.paymentMethod = paymentMethod;
    item.transactionID = transactionID;
    // console.log(item);

    axios
      .put("http://api.forevisiondigital.in/disburse-payment/" + item._id, item)
      .then(({ data }) => {
        // console.log(data)
        if (data.message === "Success") {
          navigate("/");
        }
      });
  };

  const handleDecline = (e) => {
    e.preventDefault();
    const month = date.getMonth() + 1;

    item.paymentDate = date.getDate() + "/" + month + "/" + date.getFullYear();
    const newData = { ...item };
    delete newData._id;
    newData.reason = selectedReason;
    // console.log(newData);

    axios
      .post(
        "https://api.forevisiondigital.in/disburse-payment/" + item._id,
        newData
      )
      .then(({ data }) => {
        if (data.deleteCursor.acknowledged) {
          navigate("/");
        }
      });
  };

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

  //   console.log(item);

  return (
    <div
      className="w-3/4 mx-auto my-5 rounded-2xl bg-white shadow-[0px_0px_35px_#ccc] px-7"
      key={item._id}
    >
      {Object.keys(item).map((key, k) =>
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
                item[key]
              ) : key === "pdfUrl" ||
                key === "signatureUrl" ||
                key === "aadharUrl" ||
                key === "panUrl" ||
                key === "gstUrl" ||
                key === "cancelledChequeUrl" ? (
                <a
                  className="text-primary border-b border-primary hover:border-b-0"
                  href={item[key]}
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

      <div className="flex gap-3 justify-center">
        <Button
          type="submit"
          action="confirmation"
          disabled={!(paymentMethod.length > 0 && transactionID.length)}
          onClick={handleDisburse}
        >
          Disburse
        </Button>

        <Button
          type="submit"
          action="destructive"
          onClick={() => setModal(true)}
        >
          Decline
        </Button>
      </div>

      {modal && (
        <Modal handleClose={() => setModal(false)}>
          <form
            className="mt-10 flex flex-col gap-4 items-center px-4"
            onSubmit={handleDecline}
          >
            {/* <InputField
              label={"Reason"}
              placeholder={"Why are you declining this withdrawal request?"}
              containerClassName={"mt-5 w-full"}
              name="reason"
            /> */}

            <Select
              label="Reason"
              options={[
                "The govt. issued id card/ adhar card is not properly attached or the card is not properly visible",
                "The govt. issued id card/pan card is not properly attached or the card is not properly visible",
                "Signature of the vendor is not properly attached or the card is not properly visible",
                "Cancelled cheque  is not properly attached or the card is not properly visible",
                "GST certificate is not properly attached or  is not properly visible",
                "GST number mismatch with the provided GST certificate",
                "Bank details mismatched with cancelled cheque",
                "Pan number mismatched with attached pan card",
                "SAC is not valid",
                "CIN number is invalid",
                "Address is incomplete",
              ]}
              selectedValue={selectedReason}
              setSelectedValue={setSelectedReason}
              name="reason"
              placeholder="Why are you declining this withdrawal request?"
            />
            <Button action={"confirmation"} type={"submit"}>
              Confirm
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default RequestPaymentDetails;
