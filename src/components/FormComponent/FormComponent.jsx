import { Box, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

const FormComponent = (selectProducts, register) => {
  return (
    <Box mt={5}>
      {selectProducts?.selectProducts?.map((selectProduct) => (
        <Box key={selectProduct.id}>
          {selectProduct.product.sku?.map((selectSku) => (
            <Box mt={5} key={selectSku.sku_id}>
              <Text fontWeight='bold' fontSize={20}>
                SKU: {selectSku.sku_id}
              </Text>
              <FormControl mt={3}>
                <FormLabel htmlFor='rate'>Selling Rate: </FormLabel>
                <Input
                  type='number'
                  id='rate'
                  {...register("rate")}
                  placeholder='Enter selling rate'
                />
              </FormControl>
              <FormControl mt={3}>
                <FormLabel htmlFor='items'>Total items: </FormLabel>
                <Input
                  type='number'
                  id='items'
                  placeholder='Enter total items'
                />
                <Text textAlign='right' fontSize={14} textColor={"#2ECA7F"}>
                  {selectSku.quantity_in_inventory} items remaining
                </Text>
              </FormControl>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default FormComponent;
