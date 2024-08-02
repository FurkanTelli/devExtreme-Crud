import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataGrid, { Column, Editing, Paging } from 'devextreme-react/data-grid';
import Popup from 'devextreme-react/popup';
import axios from 'axios';
import "./style.css"
import { useDispatch } from 'react-redux';
import { setUserValue } from '../../store/user';

const DataPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [product, setProduct] = useState([])
    const [cardsProducts, setCardProducts] = useState([])
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const getAllUsers = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/users');
            setUsers(response.data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    const getUsersCard = async (id) => {
        try {
            const response = await axios.get(`https://dummyjson.com/carts/user/${id}`)
            let cardProductsArray = []
            setProduct(() => {
                response?.data.carts?.map((val) => val?.products?.map((val2) => cardProductsArray.push(val2)))
                setCardProducts([...cardProductsArray])
                return [...response?.data?.carts]
            })

        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async (e) => {
        try {
            const response = await axios.delete(`https://dummyjson.com/users/${e?.data.id}`)
            console.log(response)
        } catch (error) {
            console.log(error)
        }

    }



    const formatCurrency = (value) => {
        return `$${Number(value).toFixed(2)}`;
    };

    const formatPercentage = (value) => {
        return ` %${Number(value).toFixed(0)}`;
    };


    const birthDateOptions = { width: '100%' };
    // const positionOptions = {
    //     items: positions,
    //     value: '',
    //   };
    useEffect(() => {
        getAllUsers();
    }, []);



    const handleRowClick = (e) => {
        getUsersCard(e?.data?.id)
        deleteUser(e?.data?.id)
        setEdit(!edit)
        setSelectedRowData(e.data);
        dispatch(setUserValue(e.data))
        console.log(selectedRowData)
    };

    const handleDetailsPage = (e) => {
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault();
        }
        dispatch(setUserValue(e?.data));
        navigate("/detail");
    }

    const handleAddNewRow = () => {
        navigate("/add")
    };

    return (
        <>
            <DataGrid
                dataSource={users}
                keyExpr="id"
                showBorders={true}
                onRowClick={handleRowClick}
                onInitNewRow={handleAddNewRow}
                onRowRemoving={deleteUser}
                onEditingStart={handleDetailsPage}
                className='dataPage'
            >
                <Column
                    dataField="firstName"
                    caption="First Name"
                    width={200}
                />
                <Column
                    dataField="lastName"
                    caption="Last7 Name"
                    width={150}
                />
                <Column
                    dataField="phone"
                    caption="Phone"
                    width={200}
                />
                <Column
                    dataField="email"
                    caption="Email"
                    width={200}
                />
                <Editing
                    mode="row"
                    useIcons={true}
                    allowAdding={true} 
                    allowUpdating={true}
                    allowDeleting={true}
                />
                <Paging defaultPageSize={10} />
            </DataGrid>
            <Popup
                visible={isPopupVisible}
                onHiding={() => setIsPopupVisible(false)}
                dragEnabled={false}
                closeOnOutsideClick={true}
                showTitle={true}
                title="Delete Confirmation"
                width={300}
                height={200}
            >
                <div>
                    <p>Are you sure you want to delete this user?</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <button className="popup-button">Yes</button>
                        <button className="popup-button" onClick={() => setIsPopupVisible(false)}>No</button>
                    </div>
                </div>
            </Popup>
            {product && (
                <div>
                    <DataGrid
                        dataSource={cardsProducts}
                        keyExpr="id"
                        showBorders={true}
                        onRowClick={() => console.log("nasılsın")}
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
                        />                        <Editing
                            mode="cell"
                            editColumnName={"edit"}
                            useIcons={true}
                        />
                    </DataGrid>
                </div>
            )}
        </>
    );
}

export default DataPage;
