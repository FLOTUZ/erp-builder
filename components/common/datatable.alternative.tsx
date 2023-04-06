import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface DatatableAlternativeProps {
  data: any[] | undefined;
  onRowClicked?: (row: any) => void;
}

function DatatableAlternative({
  data,
  onRowClicked,
}: DatatableAlternativeProps) {
  const isRendered = useRef(true);
  const [headers, setHeaders] = useState<ReactNode[]>([]);
  const [rows, setRows] = useState<any>([]);
    const buildHeaders = () => {
      if (data && data.length > 0) {
        const headers = Object.keys(data[0]).map((key, index) => {
          return <Th key={index}>{key}</Th>;
        });

        setHeaders(headers);
      }
    };

    const buildRows = () => {
      if (data && data.length > 0) {
        const rows = data.map((row, index) => {
          return (
            <Tr
              key={index}
              cursor="pointer"
              onClick={() => {
                onRowClicked && onRowClicked(row);
              }}
            >
              {Object.keys(row).map((key, index) => {
                return (
                  <Td key={index}>
                    {row[key] instanceof Date
                      ? row[key].toISOString()
                      : row[key]?.toString()}
                  </Td>
                );
              })}
            </Tr>
          );
        });
        setRows(rows);
      }
    };

  useMemo(() => {
    if (isRendered.current) {
      buildHeaders();
      buildRows();
    }

    return () => {
      isRendered.current = false;
    };
  }, [data, onRowClicked]);

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            {headers}
          </Tr>
        </Thead>
        <Tbody>{rows}</Tbody>
      </Table>
    </TableContainer>
  );
}

export default DatatableAlternative;
