import { useEffect, useState } from 'react';
import InputField from '../InputField/InputField';
import PropTypes from "prop-types"

const Users = ({ users, loading }) => {


    const [filteredList, setFilteredList] = useState(users)

    // console.log(users);
    useEffect(() => {
        setFilteredList(users)
    }, [users, users.length])



    const handleSearch = e => {
        // console.log(users);
        const foundUser = users.filter(({ first_name, last_name, partner_name }) => {
            if (first_name && first_name.length) {
                const fullName = first_name + ' ' + last_name;
                // return fullName.toLowerCase().includes(e.target.value.toLowerCase().length > 0 ? e.target.value.toLowerCase() : '');
                if (e.target.value.toLowerCase().length > 0) {
                    return fullName.toLowerCase().includes(e.target.value.toLowerCase())
                } else {
                    return users
                }
            } else {
                // return fullName.toLowerCase().includes(e.target.value.toLowerCase().length > 0 ? e.target.value.toLowerCase() : '');
                if (e.target.value.toLowerCase().length > 0) {
                    return partner_name.toLowerCase().includes(e.target.value.toLowerCase())
                } else {
                    return users
                }
            }
        })

        setFilteredList(foundUser);
    }

    // console.log(store);
    return (
        <>
            <InputField onChange={handleSearch} id='search-users' label="Search Users" placeholder="Search a User Here" />
            <ul className='flex flex-col gap-1 mt-2 bg-surface-white-line h-[20rem] overflow-y-auto p-1 rounded-lg'>
                {!loading
                    ? filteredList.map(({ first_name, last_name, partner_name, _id }) => (
                        <li className='py-2 px-3 capitalize cursor-pointer hover:bg-grey rounded' key={_id}>
                            {first_name && last_name ? first_name + ' ' + last_name : partner_name}
                        </li>
                    ))
                    : 'loading...'}
            </ul>

        </>
    );
};

Users.propTypes = {
    users: PropTypes.array,
    loading: PropTypes.bool
}

export default Users;