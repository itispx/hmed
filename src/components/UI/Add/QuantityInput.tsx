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
    quantity: yup.number().typeError("Número inválido").required(ErrorMessages.empty),
  });

  return (
    <View style={{ width: vw(80) }}>
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
                justifyContent: "space-between",
                width: vw(80),
                borderWidth: 2,
                borderColor: Colors.primary,
              }}
            >
              <TextInput
                style={{
                  padding: 10,
                  width: vw(69),
                  height: 50,
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
                  paddingRight: 10,
                  width: vw(10),
                  height: 50,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "500", color: Colors.grey }}>
                  mg
                </Text>
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
