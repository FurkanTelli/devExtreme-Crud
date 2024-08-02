import React, { useEffect, useState } from "react";
import DataGrid, { Column, Editing } from 'devextreme-react/data-grid';
import { Form, SimpleItem, GroupItem, Item, TabbedItem, Tab } from 'devextreme-react/form';
import { useSelector } from "react-redux";
import axios from "axios";

const ProductDetailPage = (selectedRowData) => {
    const user = useSelector(state => state.user.userObject)
    const objectOfUser = JSON.parse(localStorage.getItem('objectOfUser')) || {};
    const [product, setProduct] = useState([])
    const [cardsProducts, setCardProducts] = useState([])
    const [editUser, setEditUser] = useState({
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

    const editUserRequest = async () => {
        try {
            const response = await axios.put(`https://dummyjson.com/users/${user?.id}`, editUser)
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
            editUserRequest()
        }
    };

    useEffect(() => {
        console.log(objectOfUser)
        getUsersCard(objectOfUser?.id);
        setEditUser({ ...objectOfUser }); 
    }, [user]);

    const handleFieldChange = (e) => {
        console.log(e)
        setEditUser((prevUser) => ({
            ...prevUser,
            [e.dataField]: e.value,
        }));
    };

    const getUsersCard = async (id) => {
        try {
            const response = await axios.get(`https://dummyjson.com/carts/user/${id}`);
            let cardProductsArray = [];
            setProduct(() => {
                response?.data.carts?.map((val) => val?.products?.map((val2) => cardProductsArray.push(val2)))
                setCardProducts([...cardProductsArray]);
                return [...response?.data?.carts];
            });

        } catch (error) {
            console.log(error);
        }
    };

    const formatCurrency = (value) => {
        return `$${Number(value).toFixed(2)}`;
    };

    const formatPercentage = (value) => {
        return ` %${Number(value).toFixed(0)}`;
    };

    const deleteProduct = async (e) => {
        console.log(e);
        try {
            const response = await axios.delete(`https://dummyjson.com/products/${e?.data?.id}`);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Form formData={editUser} onFieldDataChanged={handleFieldChange}>
                <TabbedItem>
                    <Tab title="new">
                        <div className="form-container">
                            <Form
                                colCount={2}
                                id="form"
                                formData={editUser}
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
            { product && (
                <DataGrid
                    dataSource={cardsProducts}
                    keyExpr="id"
                    showBorders={true}
                    onRowClick={() => console.log("nasılsın")}
                    onRowRemoving={deleteProduct}
                    className='dataPage'
                >
                    <Column
                        dataField="title"
                        caption="Title"
                        width={200}
                    />
                    <Column
                        dataField="price"
                        caption="Price"
                        width={200}
                        cellRender={(cellData) => formatCurrency(cellData.value)}
                    />
                    <Column
                        dataField="quantity"
                        caption="Quantity"
                        width={150}
                        cellRender={(cellData) => formatCurrency(cellData.value)}
                    />
                    <Column
                        dataField="total"
                        caption="Total"
                        width={150}
                        cellRender={(cellData) => formatCurrency(cellData.value)}
                    />
                    <Column
                        dataField="discountPercentage"
                        caption="Discount"
                        width={150}
                        cellRender={(cellData) => formatPercentage(cellData.value)}
                    />
                    <Column
                        dataField="discountedTotal"
                        caption="Discounted Total"
                        width={150}
                        cellRender={(cellData) => formatCurrency(cellData.value)}
                    />
                    <Editing
                        mode="cell"
                        editColumnName={"edit"}
                        useIcons={true}
                        allowDeleting={true}
                    />
                </DataGrid>
            )}
        </div>
    )
};

export default ProductDetailPage;
