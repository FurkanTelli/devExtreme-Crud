import React, { useEffect, useState } from "react";
import DataGrid, { Column, Editing } from 'devextreme-react/data-grid';
import { Form, SimpleItem, GroupItem, Item, TabbedItem, Tab } from 'devextreme-react/form';
import { useSelector } from "react-redux";
import axios from "axios";

const NewUser = (selectedRowData) => {
    const [product, setProduct] = useState([])
    const [cardsProducts, setCardProducts] = useState([])
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        gender: '',
        birthDate: '',
        age: '',
        phone: '',
        weight: '',
        bloodGroup: '',
        address: {
            address: '',
            state: '',
            country: '',
            postalCode: '',
            stateCode: ''
        }
    })

    const newUserRequest = async () => {
        try {
            const response = await axios.post(`https://dummyjson.com/users/add`, newUser)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }


    const birthDateOptions = { width: '100%' };
    const buttonOptions = {
        text: "Save",
        type: "success",
        onClick: function () {
            newUserRequest()
        }
    };

    // useEffect(() => {
    //     setNewUser({ ...user }); 
    // }, [user]);

    const handleFieldChange = (e) => {
        setNewUser((prevUser) => ({
            ...prevUser,
            [e.dataField]: e.value,
        }));
    };



    // const formatCurrency = (value) => {
    //     return `$${Number(value).toFixed(2)}`;
    // };

    // const formatPercentage = (value) => {
    //     return ` %${Number(value).toFixed(0)}`;
    // };


    return (
        <div>
            <Form formData={newUser} onFieldDataChanged={handleFieldChange}>
                <TabbedItem>
                    <Tab title="new">
                        <div className="form-container">
                            <Form
                                colCount={2}
                                id="form"
                                formData={newUser}
                                onFieldDataChanged={handleFieldChange}
                            >
                                <GroupItem>
                                    <GroupItem>
                                        <GroupItem caption="Personal Data">
                                            <GroupItem colSpan={3}>
                                                <SimpleItem dataField="firstName" />
                                                <SimpleItem dataField="lastName" />
                                                <SimpleItem dataField="username" />
                                                <SimpleItem dataField="gender" />
                                                <SimpleItem
                                                    dataField="birthDate"
                                                    editorType="dxDateBox"
                                                    editorOptions={birthDateOptions}
                                                />
                                                <SimpleItem dataField="age" />
                                                <SimpleItem dataField="phone" />
                                                <SimpleItem dataField="weight" />
                                                <SimpleItem dataField="bloodGroup" />
                                            </GroupItem>
                                        </GroupItem>
                                    </GroupItem>
                                </GroupItem>
                                <GroupItem
                                    caption="Address"
                                    name="phones-container"
                                >
                                    <SimpleItem dataField="address.address" />
                                    <SimpleItem dataField="address.state" />
                                    <SimpleItem dataField="address.country" />
                                    <SimpleItem dataField="address.postalCode" />
                                    <SimpleItem dataField="address.stateCode" />

                                    <Item itemType="button" buttonOptions={buttonOptions} />
                                </GroupItem>
                            </Form>
                        </div>
                    </Tab>
                </TabbedItem>
            </Form>
        </div>
    )
};

export default NewUser;
