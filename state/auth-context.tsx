/**
 * Note this file is currently not in use anywhere.
 *
 * Leaving it here for reference for Context structure
 *
 */
import { ReactElement, useReducer, createContext, useEffect } from 'react';
import { api } from '@utils/api';
import { useCookies } from 'react-cookie';
import { User } from '@common/auth-types';
import { useToast } from '@chakra-ui/toast';

type State = {
  user: User | null;
  loadingState: 'idle' | 'fetching' | 'failed' | 'initial';
};

type Props = {
  children: ReactElement | ReactElement[];
};

enum Actions {
  loginStart = 'loginStart',
  loginFail = 'loginFail',
  loginSuccess = 'loginSuccess',
  verifyStart = 'verifyStart',
  verifyFail = 'verifyFail',
  verifySuccess = 'verifySuccess',
  logoutStart = 'logoutStart',
  logoutFail = 'logoutFail',
  logoutSuccess = 'logoutSuccess',
  initialized = 'initialized',
}

type Payload = User | undefined;

type Action = {
  type: Actions;
  payload?: Payload;
};

type ActionFunction = (state: State, payload: Payload) => State;

type Dispatch = {
  login: (email: string, password: string) => Promise<User | undefined>;
  verifyLogin: () => Promise<User | undefined>;
  logout: () => void;
};

const actions: Record<Actions, ActionFunction> = {
  loginStart: (state: State) => ({
    ...state,
    loadingState: 'fetching',
  }),
  loginFail: (state: State) => ({
    ...state,
    loadingState: 'failed',
    user: null,
  }),
  loginSuccess: (state: State, payload: Payload) => ({
    ...state,
    loadingState: 'idle',
    user: payload as User,
  }),
  verifyStart: (state: State) => ({
    ...state,
    loadingState: 'fetching',
  }),
  verifyFail: (state: State) => ({
    ...state,
    loadingState: 'failed',
    user: null,
  }),
  verifySuccess: (state: State, payload: Payload) => ({
    ...state,
    loadingState: 'idle',
    user: payload as User,
  }),
  logoutStart: (state: State) => ({
    ...state,
    loadingState: 'fetching',
  }),
  logoutFail: (state: State) => ({
    ...state,
    loadingState: 'failed',
    user: null,
  }),
  logoutSuccess: (state: State) => ({
    ...state,
    loadingState: 'idle',
    user: null,
  }),
  initialized: (state: State) => ({
    ...state,
    loadingState: 'idle',
  }),
};

const initialState: State = {
  user: null,
  loadingState: 'initial',
};

export const AuthContext = createContext<{ state: State; dispatch?: Dispatch }>(
  { state: initialState },
);

function reducer(state: State, action: Action): State {
  return actions[action.type]?.(state, action.payload) || state;
}

export function AuthProvider({ children }: Props) {
  const [cookies, setCookie, removeCookie] = useCookies(['auth']);
  const toast = useToast();
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email: string, password: string) => {
    dispatch({ type: Actions.loginStart });
    try {
      const { data } = await api().login({ email, password });
      dispatch({ type: Actions.loginSuccess, payload: data?.user as User });
      setCookie('auth', data.token);
      return data?.user as User;
    } catch (error: any) {
      console.error(error);
      toast({
        status: 'error',
        description: error.message,
      });
      dispatch({ type: Actions.loginFail });
    }
  };

  const verifyLogin = async () => {
    dispatch({ type: Actions.verifyStart });
    try {
      const token = cookies.auth;
      const { data } = await api().verifyToken({ token });
      dispatch({ type: Actions.verifySuccess, payload: data.user });
      return data.user;
    } catch (error: any) {
      console.error(error);
      removeCookie('auth');
      dispatch({ type: Actions.verifyFail });
    }
  };

  const logout = () => {
    dispatch({ type: Actions.logoutStart });
    removeCookie('auth');
    dispatch({ type: Actions.logoutSuccess });
  };

  useEffect(() => {
    if (cookies.auth) {
      verifyLogin();
    } else {
      dispatch({
        type: Actions.initialized,
      });
    }
  }, [cookies]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch: {
          login,
          verifyLogin,
          logout,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
