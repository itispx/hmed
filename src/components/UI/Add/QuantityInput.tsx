import React from "react";
import { View, Text, TextInput } from "react-native";

import { vw } from "../../../library/viewport-units";

import { Formik, FormikProps } from "formik";
import * as yup from "yup";

import Styles from "../../../constants/Styles";
import Colors from "../../../constants/Colors";

interface Props {
  setQuantity: (quantity: number) => void;
  inputRef: React.Ref<FormikProps<{ quantity: string }>>;
}

const ErrorMessages = {
  empty: "Preencha a quantidade",
};

const QuantityInput: React.FC<Props> = ({ setQuantity, inputRef }) => {
  function submitHandler(quantity: string) {
    setQuantity(parseFloat(quantity));
  }

  const quantitySchema = yup.object({
    quantity: yup.number().required(ErrorMessages.empty),
  });

  return (
    <View>
      <Formik
        innerRef={inputRef}
        initialValues={{ quantity: "" }}
        validationSchema={quantitySchema}
        onSubmit={(values) => {
          submitHandler(values.quantity);
        }}
      >
        {(fprops) => (
          <>
            <View
              style={{
                flexDirection: "row",
                borderWidth: 3,
                borderColor: Colors.primary,
              }}
            >
              <TextInput
                style={{
                  height: 50,
                  width: vw(65),
                  padding: 10,
                  fontSize: 20,
                  color: Colors.background,
                }}
                keyboardType="numeric"
                placeholder="Quantidade"
                onChangeText={fprops.handleChange("quantity")}
                value={fprops.values.quantity.toString()}
                onBlur={() => {
                  fprops.handleBlur("quantity");
                  submitHandler(fprops.values.quantity);
                }}
              />
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 50,
                  width: vw(10),
                }}
              >
                <Text style={{ fontSize: 20, color: Colors.grey }}>mg</Text>
              </View>
            </View>
            <Text style={Styles.errorText}>
              {fprops.touched.quantity && fprops.errors.quantity}
            </Text>
          </>
        )}
      </Formik>
    </View>
  );
};

export default QuantityInput;
