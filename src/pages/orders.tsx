import { ReactElement, useState } from "react";
import { Column } from "react-table";
import TableHOC from "../components/admin/TableHOC";
import { Link } from "react-router-dom";
type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action?: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
   {
    Header: "Action",
    accessor: "action",
  },
];

const Orders = () => {

  const [rows] = useState<DataType[]>([
    {
  _id: "order123",
  amount: 2500,
  quantity: 3,
  discount: 3,
  status: <span className="green">Delivered</span>,
  action: <Link to="/order/order123">View</Link>,
},{
  _id: "order124",
  amount: 1500,
   quantity: 3,
  discount: 3,
  status: <span className="red">Cancelled</span>,
  action: <Link to="/order/order124">View</Link>,
},
  ]);

  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6
  )();
  return (
    <div className="container">
      <h1>My Orders</h1>
      {Table}
    </div>
  );
};

export default Orders;
