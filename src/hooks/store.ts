import { AppDispatch, AppRootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
