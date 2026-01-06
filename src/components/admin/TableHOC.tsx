import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import {
  Column,
  Row,
  Cell,
  TableOptions,
  TableState,
  useTable,
  useSortBy,
  usePagination,
  TableInstance,
  ColumnInstance,
} from "react-table";

// Extend ColumnInstance to include useSortBy props
interface SortableColumnInstance<D extends object> extends ColumnInstance<D> {
  isSorted?: boolean;
  isSortedDesc?: boolean;
  getSortByToggleProps?: () => Record<string, unknown>;
}

// TableInstance extended to include pagination
type TableInstanceWithPlugins<T extends object> = TableInstance<T> & {
  page: Row<T>[];
  nextPage: () => void;
  previousPage: () => void;
  canNextPage: boolean;
  canPreviousPage: boolean;
  pageCount: number;
  state: { pageIndex: number; pageSize: number };
};

// Pagination state type
interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

function TableHOC<T extends object>(
  columns: Column<T>[],
  data: T[],
  containerClassname: string,
  heading: string,
  showPagination: boolean = false
) {
  return function HOC() {
    const options: TableOptions<T> = {
      columns,
      data,
      initialState: {
        pageSize: 6, // default page size
      } as Partial<TableState<T> & PaginationState>,
    };

    const tableInstance = useTable<T>(
      options,
      useSortBy,
      usePagination
    ) as TableInstanceWithPlugins<T>;

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      nextPage,
      previousPage,
      canNextPage,
      canPreviousPage,
      pageCount,
      state: { pageIndex },
    } = tableInstance;

    return (
      <div className={containerClassname}>
        <h2 className="heading">{heading}</h2>

        <table className="table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map(
                  (column: SortableColumnInstance<T>) => (
                    <th
                      {...column.getHeaderProps?.(
                        column.getSortByToggleProps?.()
                      )}
                      key={column.id}
                    >
                      {column.render("Header")}
                      {column.isSorted && (
                        <span>
                          {column.isSortedDesc ? (
                            <AiOutlineSortDescending />
                          ) : (
                            <AiOutlineSortAscending />
                          )}
                        </span>
                      )}
                    </th>
                  )
                )}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row: Row<T>) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell: Cell<T>) => (
                    <td {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        {showPagination && (
          <div className="table-pagination">
            <button onClick={previousPage} disabled={!canPreviousPage}>
              Prev
            </button>
            <span>
              Page {pageIndex + 1} of {pageCount}
            </span>
            <button onClick={nextPage} disabled={!canNextPage}>
              Next
            </button>
          </div>
        )}
      </div>
    );
  };
}

export default TableHOC;
