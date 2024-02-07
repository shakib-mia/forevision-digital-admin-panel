import { useEffect, useState } from 'react';
import InputField from '../InputField/InputField';
import PropTypes from "prop-types"

const Users = ({ users, loading }) => {

    const [detailedId, setDetailedId] = useState("")
    const [filteredList, setFilteredList] = useState(users);
    const selectedItem = filteredList.find(({ _id }) => _id === detailedId);

    // selectedItem && console.log(selectedItem['isrc']);
    // console.log(users);
    useEffect(() => {
        setFilteredList(users)
    }, [users, users.length])



    const handleSearch = e => {
        // console.log(users);
        const foundUser = users.filter(({ first_name, last_name, partner_name, emailId }) => {
            // console.log(emailId.includes(e.target.value.toLowerCase()));
            if (first_name && first_name.length) {
                const fullName = first_name + ' ' + last_name;
                // return fullName.toLowerCase().includes(e.target.value.toLowerCase().length > 0 ? e.target.value.toLowerCase() : '');
                if (e.target.value.toLowerCase().length > 0) {
                    return fullName.toLowerCase().includes(e.target.value.toLowerCase())
                } else {
                    return users
                }
            } else if (emailId) {
                return emailId.includes(e.target.value.toLowerCase())
            } else {
                // return fullName.toLowerCase().includes(e.target.value.toLowerCase().length > 0 ? e.target.value.toLowerCase() : '');
                if (e.target.value.toLowerCase().length > 0) {
                    return partner_name.toLowerCase().includes(e.target.value.toLowerCase())
                } else {
                    return users
                }
            }
        })

        console.log(foundUser);

        setFilteredList(foundUser);
    }

    // console.log(store);
    return (
        <>
            <InputField onChange={handleSearch} id='search-users' type='text' label="Search Users" placeholder="Search a User Here" />
            <ul className='flex flex-col gap-1 mt-2 bg-surface-white-line h-[20rem] overflow-y-auto p-1 rounded-lg'>
                {!loading
                    ? filteredList.map(({ first_name, last_name, partner_name, _id }) => (
                        <li className='py-2 px-3 capitalize cursor-pointer hover:bg-grey rounded' onClick={() => setDetailedId(_id)} key={_id}>
                            {first_name && last_name ? first_name + ' ' + last_name : partner_name}
                        </li>
                    ))
                    : 'loading...'}
            </ul>

            {detailedId.length ? <div className='absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-45 flex items-center justify-center'>
                <div className='bg-white w-1/2 shadow-lg rounded relative'>
                    <button className='absolute -top-6 -right-6 text-heading-5 text-white' onClick={() => setDetailedId("")}>&times;</button>
                    <div className="overflow-auto  max-h-[50vh]">
                        {Object.keys(selectedItem).map(item => <div className='flex py-3 w-1/2 mx-auto' key={item}>
                            <aside className='w-1/2'>{item}</aside>
                            <aside className='w-1/2 text-wrap'>
                                {item === 'isrc' ? selectedItem[item].split(",").map((ite, key) => <li key={key}>{ite}</li>) : selectedItem[item]}
                            </aside>
                        </div>)}
                    </div>
                </div>

            </div> : <></>}

        </>
    );
};

Users.propTypes = {
    users: PropTypes.array,
    loading: PropTypes.bool
}

export default Users;