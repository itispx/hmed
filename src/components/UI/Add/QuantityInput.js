import React from "react";
import { View, Text, TextInput } from "react-native";

import { vw } from "../../../library/viewport-units";

import { Formik } from "formik";
import * as yup from "yup";

import Styles from "../../../constants/Styles";
import Colors from "../../../constants/Colors";

const QuantityInput = ({ setQuantity }) => {
  // TODO Do not submit if empty

  function submitHandler(quantity) {
    setQuantity(quantity);
  }

  const quantitySchema = yup.object({
    quantity: yup.number().required("Preencha a quantidade"),
  });

  return (
    <View>
      <Formik
        initialValues={{ quantity: 0 }}
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
                value={fprops.values.quantity}
                onBlur={() => fprops.handleSubmit()}
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
