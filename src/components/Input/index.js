import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputBase = styled.input`
    
    background-color: ${({ theme }) => theme.colors.mainBg};
    color: ${({ theme }) => theme.colors.contrastText};

    margin-bottom: 25px;
    border: 1px solid ;

    width: 100%;
    padding: 16px 0px;
    border-radius: 4px;

    text-align: center;



`;

function Input({ onChange, placeholder, ...props }){

    return(
        <div>
            <InputBase 
            onChange={ onChange } 
            placeholder={placeholder}
            { ...props }
            />
        </div>
    )
};

Input.defaultProp = {
    value: '',
};

Input.propTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,

};





export default Input;

