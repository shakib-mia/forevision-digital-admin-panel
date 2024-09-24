import { useContext } from "react";
// import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import { AppContext } from "../../contexts/AppContext";
import PropTypes from "prop-types";
import axios from "axios";
import { backendUrl } from "../../constants";

const RequestPaymentDetails = ({
  partner_name,
  isrc,
  vendorName,
  invoiceNumber,
  invoiceDate,
  address,
  streetName,
  landMark,
  pinCode,
  city,
  state,
  gctinNumber,
  placeOfSupply,
  cinNumber,
  serviceAccount,
  panNumber,
  taxableValue,
  cgstAmount,
  sgstAmount,
  igstAmount,
  totalAmount,
  bankName,
  branch,
  accountType,
  ifscCode,
  beneficiaryName,
  accountNumber,
  userName,
  emailId,
  lifetimeRevenue,
  lifetimeDisbursed,
  aadharUrl,
  panUrl,
  cancelledUrl,
  "gst-url": gstUrl,
  item,
}) => {
  const { setShowModal } = useContext(AppContext);
  const date = new Date();

  const handleDisburse = () => {
    // console.log(date.getMonth());
    const month = date.getMonth() + 1;

    item.disbursed = true;
    item.paymentDate = date.getDate() + "/" + month + "/" + date.getFullYear();
    // console.log(item);

    axios
      .put(backendUrl + "disburse-payment/" + item._id, item)
      .then(({ data }) => console.log(data));
  };

  const handleDecline = () => {
    const month = date.getMonth() + 1;

    item.paymentDate = date.getDate() + "/" + month + "/" + date.getFullYear();
    const newData = { ...item };
    delete newData._id;

    // axios
    //   .post(
    //     "https://api.forevisiondigital.in/disburse-payment/" + item._id,
    //     newData
    //   )
    //   .then(({ data }) => console.log(data));
  };

  return (
    <Modal handleClose={() => setShowModal(false)}>
      {/* <div className="text-center">
        <h5 className="font-medium">{partner_name}</h5>
        <h5 className="font-medium my-2">
          Total Songs: {isrc?.split(",").length}
        </h5>
        <h5 className="font-medium">Vendor Name: {vendorName}</h5>

        <h5 className="font-medium">Invoice Number: {invoiceNumber}</h5>

        <h5 className="font-medium">Invoice Date: {invoiceDate}</h5>
        <h5 className="font-medium">Address: {address}</h5>
        <h5 className="font-medium">Street: {streetName}</h5>
        <h5 className="font-medium">Land Mark: {landMark}</h5>
        <h5 className="font-medium">Pin Code: {pinCode}</h5>
        <h5 className="font-medium">City: {city}</h5>
        <h5 className="font-medium">State: {state}</h5>
        <h5 className="font-medium">GCTIN Number: {gctinNumber}</h5>
        <h5 className="font-medium">Place of Supply: {placeOfSupply}</h5>
        <h5 className="font-medium">CIN Number: {cinNumber}</h5>

        <h5 className="font-medium">Service Account: {serviceAccount}</h5>

        <h5 className="font-medium">PAN Number: {panNumber}</h5>

        <h5 className="font-medium">Taxable Value: {taxableValue}</h5>

        <h5 className="font-medium">CGST Amount: {cgstAmount}</h5>

        <h5 className="font-medium">SGST Amount: {sgstAmount}</h5>

        <h5 className="font-medium">IGST Amount: {igstAmount}</h5>

        <h5 className="font-medium">Total Amount: {totalAmount}</h5>

        <h5 className="font-medium">Bank Name: {bankName}</h5>

        <h5 className="font-medium">Branch: {branch}</h5>
        <h5 className="font-medium">Account Type: {accountType}</h5>
        <h5 className="font-medium">IFSC Code: {ifscCode}</h5>
        <h5 className="font-medium">Beneficiary Name: {beneficiaryName}</h5>
        <h5 className="font-medium">Account Number: {accountNumber}</h5>
        <h5 className="font-medium">User Name: {userName}</h5>
        <h5 className="font-medium">Email Id: {emailId}</h5>

        <h5 className="font-medium">
          Amount Requested:{" "}
          {(lifetimeRevenue - (lifetimeDisbursed || 0)).toFixed(2)}
        </h5>

        <>
          <div className="flex">
            <h5>GST Certificate</h5>
            <img src={gstUrl} alt="" />
          </div>
        </>

        <div className="mt-4">
          <div className="grid grid-cols-2 justify-center">
            Adhar Card:{" "}
            <a href={aadharUrl} target="_blank" rel="noreferrer">
              <img
                src={aadharUrl}
                alt=""
                className="w-1/2 cursor-pointer"
                // onClick={() => setEnlargedAadhar(true)}
              />
            </a>
          
          </div>
          <div className="grid grid-cols-2 justify-center mt-4">
            PAN Card:{" "}
            <a href={panUrl} target="_blank" rel="noreferrer">
              <img
                src={panUrl}
                alt=""
                className="w-1/2"
                // onClick={() => setEnlargedPan(true)}
              />
            </a>
        
          </div>
          <div className="grid grid-cols-2 mt-4">
            Cancelled Cheque:{" "}
            
            <a href={cancelledUrl} target="_blank" rel="noreferrer">
              <img
                src={cancelledUrl}
                className="cursor-pointer"
                // onClick={() => setEnlargedCancelled(false)}
              />
            </a>
            
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Button action="confirmation" onClick={handleDisburse}>
            Disburse
          </Button>
          <Button action="destructive" onClick={handleDecline}>
            Decline
          </Button>
        </div>
      </div> */}
      <div className="flex m-3 gap-3 justify-center">
        <h3 className="text-heading-3-bold text-right">Name:</h3>
        <h3 className="text-heading-3">{partner_name}</h3>
      </div>
      <div className="flex gap-3 justify-center mb-3">
        <h3 className="text-heading-3-bold text-right">Total Uploads:</h3>
        <h3 className="text-heading-3">{isrc.split(",").length}</h3>
      </div>

      <div className="flex gap-3">
        <h5 className="text-heading-5-bold text-right">Total Uploads:</h5>
        <h5 className="text-heading-5">{isrc.split(",").length}</h5>
      </div>
    </Modal>
  );
};

RequestPaymentDetails.propTypes = {
  partner_name: PropTypes.string,
  isrc: PropTypes.string,
  vendorName: PropTypes.string,
  invoiceNumber: PropTypes.string,
  invoiceDate: PropTypes.string,
  address: PropTypes.string,
  streetName: PropTypes.string,
  landMark: PropTypes.string,
  pinCode: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  gctinNumber: PropTypes.string,
  placeOfSupply: PropTypes.string,
  cinNumber: PropTypes.string,
  serviceAccount: PropTypes.string,
  panNumber: PropTypes.string,
  taxableValue: PropTypes.string,
  cgstAmount: PropTypes.string,
  sgstAmount: PropTypes.string,
  igstAmount: PropTypes.string,
  totalAmount: PropTypes.string,
  bankName: PropTypes.string,
  branch: PropTypes.string,
  accountType: PropTypes.string,
  ifscCode: PropTypes.string,
  beneficiaryName: PropTypes.string,
  accountNumber: PropTypes.string,
  userName: PropTypes.string,
  emailId: PropTypes.string,
  lifetimeRevenue: PropTypes.string,
  lifetimeDisbursed: PropTypes.string,
  aadharUrl: PropTypes.string,
  panUrl: PropTypes.string,
  cancelledUrl: PropTypes.string,
  "gst-url": PropTypes.string,
  item: PropTypes.object,
};

export default RequestPaymentDetails;
