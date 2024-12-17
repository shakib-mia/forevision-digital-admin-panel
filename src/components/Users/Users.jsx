import { useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import PropTypes from "prop-types";
import UserDetailsPopup from "../UserDetailsPopup/UserDetailsPopup";
import CreateNewRecordLabel from "../CreateNewRecordLabel/CreateNewRecordLabel";

const Users = ({ users, loading }) => {
  const [detailedId, setDetailedId] = useState("");
  const [filteredList, setFilteredList] = useState(users);
  const selectedItem = filteredList.find(({ _id }) => _id === detailedId);
  const [searchText, setSearchText] = useState("");
  const [userEmail, setUserEmail] = useState("");

  console.log(users);

  // Set filteredList whenever users change
  useEffect(() => {
    setFilteredList(users);
  }, [users]);

  console.log(users);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchText(query);

    const filteredUsers = users.filter(
      ({ first_name, last_name, partner_name, emailId, user_email }) => {
        const fullName = (first_name + " " + last_name).toLowerCase();

        // If both emailId and user_email are missing, search by name
        if (!emailId && !user_email) {
          return fullName.includes(query);
        }

        // If one or both emails exist, search by email or name
        return (
          fullName.includes(query) ||
          (emailId && emailId.toLowerCase().includes(query)) ||
          (user_email && user_email.toLowerCase().includes(query)) ||
          (partner_name && partner_name.toLowerCase().includes(query))
        );
      }
    );

    setFilteredList(filteredUsers);
  };

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
                      // setUserEmail(user_email);
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

      {/* User Details Popup */}
      {selectedItem && (
        <UserDetailsPopup
          user={selectedItem}
          setUserEmail={setUserEmail}
          onClose={() => {
            setDetailedId("");
          }}
        />
      )}

      {/* Create New Record Label */}
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
