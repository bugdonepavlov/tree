import mockList from '../mock/list';
import arrayToTree from '../utils/arrayToTree';

const InitialState = {
  loading: false,
  data: [],
  items: [],
};

const EDIT_SUCCESS = 'EDIT_SUCCESS';
const LOADING_REQUEST = 'LOADING_REQUEST';
const FETCH_LIST = 'FETCH_LIST';


export default function reducer(state = InitialState, action) {
  const {
    type,
    payload,
  } = action;

  switch (type) {
    case FETCH_LIST:
      return {
        loading: false,
        data: mockList,
        items: arrayToTree(mockList),
      };

    case EDIT_SUCCESS:
      const updatedArray = state.data.map(e => (
        e._id === payload.id
          ? { ...e, title: payload.text }
          : e
      ));

      return {
        loding: false,
        data: updatedArray,
        items: arrayToTree(updatedArray),
      }

    case LOADING_REQUEST:
      return {
        ...state,
        loading: true,
      }

    default:
      return state;
  }
}

export function fetchList() {
  return (dispatch) => {
    dispatch({ type: LOADING_REQUEST });

    setTimeout(() => {
      dispatch({ type: FETCH_LIST });
    }, 1000);
  }
}

export function editAction(text, id) {
  return (dispatch) => {
    dispatch({ type: LOADING_REQUEST });

    setTimeout(() => {
      dispatch({
        type: EDIT_SUCCESS,
        payload: {
          loading: false,
          text,
          id,
        }
      })
    }, 500);
  }
}
