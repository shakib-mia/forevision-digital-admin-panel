import { useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import PropTypes from "prop-types";

const Users = ({ users, loading }) => {
  const [detailedId, setDetailedId] = useState("");
  const [filteredList, setFilteredList] = useState(users);
  const selectedItem = filteredList.find(({ _id }) => _id === detailedId);
  const [searchText, setSearchText] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // console.log(selectedItem);

  // selectedItem && console.log(selectedItem['isrc']);
  // console.log(users);
  useEffect(() => {
    setFilteredList(users);
  }, [users, users.length]);

  function camelCaseToSpaces(str) {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add a space before each capital letter
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2"); // Handle consecutive capital letters followed by a lowercase letter
  }

  const handleSearch = (e) => {
    // console.log(users);
    setSearchText(e.target.value);
    const foundUser = users.filter(
      ({ first_name, last_name, partner_name, emailId }) => {
        // console.log(emailId.includes(e.target.value.toLowerCase()));
        if (first_name && first_name.length) {
          const fullName = first_name + " " + last_name;
          // return fullName.toLowerCase().includes(e.target.value.toLowerCase().length > 0 ? e.target.value.toLowerCase() : '');
          if (e.target.value.toLowerCase().length > 0) {
            return fullName
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          } else {
            return users;
          }
        } else if (emailId) {
          return emailId.includes(e.target.value.toLowerCase());
        } else {
          // return fullName.toLowerCase().includes(e.target.value.toLowerCase().length > 0 ? e.target.value.toLowerCase() : '');
          if (e.target.value.toLowerCase().length > 0) {
            return partner_name
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          } else {
            return users;
          }
        }
      }
    );

    // console.log(foundUser);

    setFilteredList(foundUser);
  };

  // console.log(selectedItem?.lifetimeRevenue - selectedItem?.lifetimeDisbursed);

  return (
    <>
      <div className="relative">
        <InputField
          onChange={handleSearch}
          id="search-users"
          type="text"
          label="Search Users"
          placeholder="Search a User Here"
        />
        <ul
          className={`${
            !searchText.length ? "hidden" : "flex"
          } flex-col gap-1 mt-2 bg-surface-white-line max-h-[20rem] overflow-y-auto p-1 rounded-lg absolute w-full z-[9999]`}
        >
          {!loading
            ? filteredList.map(
                ({
                  first_name,
                  last_name,
                  partner_name,
                  _id,
                  user_email,
                  lifetimeRevenue,
                }) => (
                  <li
                    className="py-2 px-3 capitalize cursor-pointer hover:bg-grey rounded flex justify-between"
                    onClick={() => {
                      setDetailedId(_id);
                      setUserEmail(user_email);
                    }}
                    key={_id}
                  >
                    <p>
                      {first_name && last_name
                        ? first_name + " " + last_name
                        : partner_name}
                    </p>
                    <p
                      className="text-interactive-light-confirmation"
                      title="Lifetime Revenue"
                    >
                      &#8377; {lifetimeRevenue?.toFixed(2)}
                    </p>
                  </li>
                )
              )
            : "loading..."}
        </ul>
      </div>

      {/* {detailedId.length ? (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-45 flex items-center justify-center z-[999999]">
          <div className="bg-white w-1/2 shadow-lg rounded relative">
            <button
              className="absolute -top-6 -right-6 text-heading-5 text-white"
              onClick={() => setDetailedId("")}
            >
              &times;
            </button>
            <div className="overflow-auto  max-h-[50vh]">
              {Object.keys(selectedItem).map(
                (item) =>
                  item !== "_id" && (
                    <div className="flex py-3 w-1/2 mx-auto" key={item}>
                      <aside className="w-1/2 capitalize">
                        {item !== "accountBalance"
                          ? item.includes("_")
                            ? item.split("_").join(" ")
                            : camelCaseToSpaces(item)
                          : "Account Balance"}
                      </aside>
                      <aside className="w-1/2 text-wrap">
                        {item === "isrc"
                          ? selectedItem[item]
                              .split(",")
                              .map((ite, key) => <li key={key}>{ite}</li>)
                          : item === "accountBalance"
                          ? selectedItem.lifetimeRevenue -
                            selectedItem.lifetimeDisbursed
                          : selectedItem[item]}
                      </aside>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )} */}

      {selectedItem && (
        <UserDetailsPopup
          user={selectedItem}
          setUserEmail={setUserEmail}
          onClose={() => {
            setDetailedId("");
          }}
        />
      )}

      {userEmail && (
        <div className="fixed left-0 top-0 bg-black bg-opacity-50 h-screen w-screen flex justify-center items-center z-[9999999999]">
          <CreateNewRecordLabel
            onClose={() => setUserEmail("")}
            email={userEmail}
          />
        </div>
      )}
    </>
  );
};

Users.propTypes = {
  users: PropTypes.array,
  loading: PropTypes.bool,
};

export default Users;
