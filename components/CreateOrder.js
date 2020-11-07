import { Formik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { addOrders } from "../actions/index";
import FormButton from "./FormButton";
import FormInput from "./FormInput";
import { deactivateModal } from "../actions/index";
import {theme} from "../core/theme";

const styles = StyleSheet.create({
  container: {

    width: "100%",
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
});

const CreateOrder = (buildingNumber) => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        name: "",
        building: buildingNumber.buildingNumber,
        room: "",
        problem: "",
        description: "",
      }}
      onSubmit={(values) => {
        console.log(values);
        addOrders(values)(dispatch);
        dispatch(deactivateModal())
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <FormInput
            placeholder=" Personnel Name"
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
          />
          {/* <FormInput
            placeholder="Building #"
            onChangeText={handleChange("building")}
            onBlur={handleBlur("building")}
            value={values.building}
          /> */}
          <FormInput
            placeholder=" Room #"
            onChangeText={handleChange("room")}
            onBlur={handleBlur("room")}
            value={values.room}
          />
          <FormInput
            placeholder=" Problem"
            onChangeText={handleChange("problem")}
            onBlur={handleBlur("problem")}
            value={values.problem}
          />
          <FormInput
            placeholder=" Description"
            multiline={true}
            numberOfLines={2}
            onChangeText={handleChange("description")}
            onBlur={handleBlur("description")}
            value={values.description}
          />
          <FormButton onSubmit={handleSubmit} text="Submit" />
        </View>
      )}
    </Formik>
  );
};
export default CreateOrder;

/*
The work order needs

Name of the user.
Building Number - should be dropdown
Room Name/Number - leave as textfield
Problem: leave as textfield
Description: also leave as textfield.

*/
