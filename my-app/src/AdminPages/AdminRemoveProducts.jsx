import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AdminAuthContext } from "./AdminAuthContext";

const AdminRemoveProducts = () => {
  const [data, setData] = useState([]);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { page, handlePageChange } = useContext(AdminAuthContext);
  const [endpoint, setEndPoint] = useState("mens");

  const fetchData = (page, endpoint) => {
    setLoading(true);
    axios
      .get(`https://newjsonserver.onrender.com/${endpoint}`, {
        params: {
          _page: page,
          _limit: 10,
        },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(page, endpoint);
  }, [page, endpoint]);


  const handleDelete = (endpoint, id) => {
    fetch(`https://newjsonserver.onrender.com/${endpoint}/${id}`, {
      method: "DELETE",
    }).then(() => fetchData(page,endpoint));
    toast({
      title: `Product removed from the Data`,
      status: "error",
      duration: 1000,
      isClosable: true,
    });
  };

  if (loading === true) {
    return (
      <>
        <Image
          src="https://i.stack.imgur.com/hzk6C.gif"
          alt="loading"
          margin="auto"
          paddingTop="90px"
          marginBottom="360px"
        />
      </>
    );
  }
  if (error === true) {
    return (
      <>
        <Image
          src="https://cdn.dribbble.com/users/774806/screenshots/3823110/something-went-wrong.gif"
          alt="error"
          margin="auto"
          paddingTop="30px"
        />
      </>
    );
  }

  return (
    <div>
        <Heading textAlign='center'>Remove Products</Heading>
        <br/>
      <Center>
        <Select
          placeholder="Select Product Category"
          onChange={(e) => setEndPoint(e.target.value)}
        >
          <option value="mens">Mens Products</option>
          <option value="womens">Womens Products</option>
          <option value="kids">Kids Products</option>
          <option value="indie">Indie Products</option>
          <option value="homekitchen">Home & Kitchen Products</option>
        </Select>
      </Center>
      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>S.No.</Th>
              <Th>Product Image</Th>
              <Th>Product Details</Th>
              <Th>Remove Product</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((el, i) => (
              <Tr key={i + 1}>
                <Td>
                  {page === 1
                    ? i + 1
                    : page === 2
                    ? i + 11
                    : page === 3
                    ? i + 21
                    : page === 4
                    ? i + 31
                    : page === 5
                    ? i + 41
                    : i}
                  .
                </Td>
                <Td>
                  {" "}
                  <Image src={el.image} alt={el.title} width="50px" />
                </Td>
                <Td>
                  <Text marginBottom="5px">Brand : {el.brand}</Text>
                  Title : {el.title}
                </Td>
                <Td>
                  <Center>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDelete(endpoint, el.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Center>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Box align="center" marginBottom="20px">
        <Button
          mt={8}
          size={"sm"}
          py={"4"}
          textTransform={"uppercase"}
          onClick={() => handlePageChange(-1)}
          isDisabled={page === 1}
          _hover={{
            transform: "translateY(2px)",
            boxShadow: "lg",
          }}
        >
          PREV
        </Button>
        <Button
          mt={8}
          size={"sm"}
          py={"5"}
          textTransform={"uppercase"}
          isDisabled
          _hover={{
            boxShadow: "lg",
          }}
        >
          {page}
        </Button>
        <Button
          mt={8}
          size={"sm"}
          py={"4"}
          textTransform={"uppercase"}
          onClick={() => handlePageChange(1)}
          isDisabled={page === 5}
          _hover={{
            transform: "translateY(2px)",
            boxShadow: "lg",
          }}
        >
          NEXT
        </Button>
      </Box>
    </div>
  );
};

export default AdminRemoveProducts;
