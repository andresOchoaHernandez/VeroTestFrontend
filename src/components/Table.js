import React from "react";
import { useTable } from "react-table";
import classes from '../pages/layout/HomePage.module.css';

function Table({columns,data}){
    const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow } = useTable({columns,data});
    return (
        <table className={classes.examlist} {...getTableProps()}>
          <thead className={classes.examlistheader}>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={classes.examlistbody} {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
    );
}

export default Table;