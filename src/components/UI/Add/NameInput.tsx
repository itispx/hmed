import React from "react";
import { View, Text, TextInput } from "react-native";

import { vw } from "../../../library/viewport-units";

import { Formik, FormikProps } from "formik";
import * as yup from "yup";

import Styles from "../../../constants/Styles";
import Colors from "../../../constants/Colors";

interface Props {
  setName: (name: string) => void;
  inputRef: React.Ref<FormikProps<{ name: string }>>;
}

const ErrorMessages = {
  empty: "Preencha o nome",
};

const NameInput: React.FC<Props> = ({ setName, inputRef }) => {
  function submitHandler(name: string) {
    setName(name);
  }

  const nameSchema = yup.object({
    name: yup.string().required(ErrorMessages.empty),
  });

  return (
    <View>
      <Formik
        innerRef={inputRef}
        initialValues={{ name: "" }}
        validationSchema={nameSchema}
        onSubmit={(values) => submitHandler(values.name)}
      >
        {(fprops) => (
          <>
            <View style={{ borderWidth: 3, borderColor: Colors.primary }}>
              <TextInput
                style={{
                  height: 50,
                  width: vw(75),
                  padding: 10,
                  fontSize: 20,
                  color: Colors.background,
                }}
                placeholder="Nome do remédio"
                onChangeText={fprops.handleChange("name")}
                value={fprops.values.name}
                onBlur={() => {
                  fprops.handleBlur("name");
                  submitHandler(fprops.values.name);
                }}
              />
            </View>
            <Text style={Styles.errorText}>
              {fprops.touched.name && fprops.errors.name}
            </Text>
          </>
        )}
      </Formik>
    </View>
  );
};

export default NameInput;
