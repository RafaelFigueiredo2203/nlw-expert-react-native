import { TextInput, TextInputProps } from "react-native";
import colors from "tailwindcss/colors";

export function InputInformations({...rest} : TextInputProps){
  return <TextInput multiline textAlignVertical="top" 
  placeholderTextColor={colors.slate[400]}
  className="h-24 mx-4 bg-slate-800 rounded-md px-4 py-3 font-body text-sm text-white"
  {...rest} />
}