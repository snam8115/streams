import streamsdb from "../apis/streamsdb";
import history from "../history";
//import { reset } from "redux-form";

import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  EDIT_STREAM,
  DELETE_STREAM,
} from "./types";
export const signIn = (userId) => {
  return { type: SIGN_IN, payload: userId };
};

export const signOut = () => {
  return { type: SIGN_OUT, payload: null };
};

export const createStream = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    if (!userId) return;
    else {
      const response = await streamsdb.post("/streams", {
        ...formValues,
        userId,
      });
      dispatch({ type: CREATE_STREAM, payload: response.data });
      //dispatch(reset("streamCreate"));
      history.push("/");
    }
  };
};

export const fetchStreams = () => async (dispatch) => {
  const response = await streamsdb.get("/streams");
  //console.log(response.data);
  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async (dispatch) => {
  const response = await streamsdb.get("/streams/" + id);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async (dispatch) => {
  const response = await streamsdb.patch("/streams/" + id, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });

  history.push("/");
};
export const deleteStream = (id) => async (dispatch) => {
  await streamsdb.delete("/streams/" + id);

  dispatch({ type: DELETE_STREAM, payload: id });
  history.push("/");
};
