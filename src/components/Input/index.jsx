import{ Box, Input, Label} from "./styled"
const InputCp = ({value, onChange, text,placeholder}) => {
    return ( 
        <Box>
            <Label>
                {text}
            </Label>
          <Input type="text" placeholder={placeholder} value={value} onChange={onChange}/>
            
        </Box>
     );
}
 
export default InputCp;